import {
  Certificate,
  Question,
  QuestionAnswerRecord,
  TestAttempt,
  TestItem,
  User,
} from '../types';
import { generateCertificateId, generateId } from '../utils/crypto';
import { authService } from './authService';
import { contentService } from './contentService';
import { ensureSeeded, readStore, STORAGE_KEYS, writeStore } from './storageService';

export interface SubmittedAnswerInput {
  selectedIndices?: number[];
  selectedBoolean?: boolean;
  matchingSelections?: Record<string, string>;
}

export const testService = {
  getTests(includeDrafts = false): TestItem[] {
    ensureSeeded();
    const list = readStore<TestItem[]>(STORAGE_KEYS.TESTS, []);
    return includeDrafts ? list : list.filter((t) => t.published);
  },

  saveTest(test: TestItem): void {
    const list = this.getTests(true);
    const exists = list.some((t) => t.id === test.id);
    const next = exists ? list.map((t) => (t.id === test.id ? test : t)) : [...list, test];
    writeStore(STORAGE_KEYS.TESTS, next);
  },

  deleteTest(id: string): void {
    const next = this.getTests(true).filter((t) => t.id !== id);
    writeStore(STORAGE_KEYS.TESTS, next);
  },

  getAttempts(userId?: string): TestAttempt[] {
    ensureSeeded();
    const all = readStore<TestAttempt[]>(STORAGE_KEYS.ATTEMPTS, []);
    return userId ? all.filter((a) => a.userId === userId) : all;
  },

  getCertificates(studentId?: string): Certificate[] {
    ensureSeeded();
    const all = readStore<Certificate[]>(STORAGE_KEYS.CERTIFICATES, []);
    return studentId ? all.filter((c) => c.studentId === studentId) : all;
  },

  verifyCertificateById(certId: string): Certificate | null {
    const clean = certId.trim().toUpperCase();
    return this.getCertificates().find((c) => c.id.toUpperCase() === clean) ?? null;
  },

  evaluateQuestion(q: Question, input: SubmittedAnswerInput | undefined): boolean {
    if (!input) return false;
    if (q.type === 'true_false') {
      return input.selectedBoolean === q.correctBoolean;
    }
    if (q.type === 'matching' && q.matchingPairs) {
      const sel = input.matchingSelections || {};
      return q.matchingPairs.every((pair) => sel[pair.id] === pair.id);
    }
    if (q.type === 'multiple') {
      const expected = [...(q.correctIndices || [])].sort((a, b) => a - b);
      const actual = [...(input.selectedIndices || [])].sort((a, b) => a - b);
      return expected.length === actual.length && expected.every((v, i) => v === actual[i]);
    }
    // single, image, fault_code
    const expectedIdx = q.correctIndices?.[0];
    return (input.selectedIndices || [])[0] === expectedIdx;
  },

  submitAttempt(params: {
    test: TestItem;
    user: User;
    answersMap: Record<string, SubmittedAnswerInput>;
    durationSeconds: number;
  }): { attempt: TestAttempt; certificate?: Certificate } {
    let earnedPoints = 0;
    let totalPoints = 0;
    const records: QuestionAnswerRecord[] = [];

    params.test.questions.forEach((q) => {
      totalPoints += q.points;
      const input = params.answersMap[q.id];
      const isCorrect = this.evaluateQuestion(q, input);
      if (isCorrect) earnedPoints += q.points;
      records.push({
        questionId: q.id,
        isCorrect,
        selectedIndices: input?.selectedIndices,
        selectedBoolean: input?.selectedBoolean,
        matchingSelections: input?.matchingSelections,
      });
    });

    const scorePercent = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const passed = scorePercent >= params.test.passScore;

    const attempt: TestAttempt = {
      id: generateId('att'),
      testId: params.test.id,
      userId: params.user.id,
      scorePercent,
      passed,
      earnedPoints,
      totalPoints,
      durationSeconds: params.durationSeconds,
      completedAt: new Date().toISOString(),
      answers: records,
    };

    const existingAttempts = this.getAttempts();
    writeStore(STORAGE_KEYS.ATTEMPTS, [attempt, ...existingAttempts]);

    // Gamification rewards
    if (scorePercent === 100) {
      authService.awardXpAndBadge(params.user.id, 80, 'perfect_test');
    } else if (passed) {
      authService.awardXpAndBadge(params.user.id, 40);
    } else {
      authService.awardXpAndBadge(params.user.id, 10);
    }

    let certificate: Certificate | undefined;
    if (passed && params.test.isFinalExam) {
      const allCerts = this.getCertificates();
      const existingCert = allCerts.find((c) => c.studentId === params.user.id);
      if (existingCert) {
        // Upgrade score if higher
        certificate = {
          ...existingCert,
          scorePercent: Math.max(existingCert.scorePercent, scorePercent),
          issuedAt: new Date().toISOString(),
        };
        writeStore(
          STORAGE_KEYS.CERTIFICATES,
          allCerts.map((c) => (c.id === existingCert.id ? certificate! : c))
        );
      } else {
        certificate = {
          id: generateCertificateId(),
          studentId: params.user.id,
          studentName: params.user.name,
          courseTitle: {
            uz: 'Avtomobil dvigatellarini diagnostika qilish: usullar, texnik xizmat, video darslar va testlar',
            ru: 'Диагностика автомобильных двигателей: методы, обслуживание, видеоуроки и тесты',
            en: 'Automotive Engine Diagnostics: Diagnostic Methods, Maintenance, Video Lessons & Tests',
          },
          scorePercent,
          issuedAt: new Date().toISOString(),
          instructorName: 'Rustam Karimov',
        };
        writeStore(STORAGE_KEYS.CERTIFICATES, [certificate, ...allCerts]);
      }

      authService.awardXpAndBadge(params.user.id, 100, 'master_diagnostician');
      contentService.pushNotification({
        userId: params.user.id,
        title: {
          uz: 'Sertifikat rasmiylashtirildi!',
          ru: 'Сертификат оформлен!',
          en: 'Certificate Issued!',
        },
        message: {
          uz: `Tabriklaymiz! Yakuniy imtihon ${scorePercent}% bilan topshirildi. ID: ${certificate.id}`,
          ru: `Поздравляем! Итоговый экзамен сдан на ${scorePercent}%. ID: ${certificate.id}`,
          en: `Congratulations! Final exam passed at ${scorePercent}%. ID: ${certificate.id}`,
        },
        link: '/student',
      });
    }

    return { attempt, certificate };
  },
};

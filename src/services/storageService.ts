import {
  SEED_ANNOUNCEMENTS,
  SEED_LESSONS,
  SEED_MODULES,
  SEED_USERS,
} from '../data/seedCourse';
import { SEED_EBOOKS, SEED_PRESENTATIONS } from '../data/seedMaterials';
import { SEED_ASSIGNMENTS, SEED_DTC_CODES } from '../data/seedPractical';
import { SEED_TESTS } from '../data/seedTests';
import { PlatformBackup } from '../types';

export const STORAGE_KEYS = {
  SEEDED: 'avtoedu_seeded_v1',
  USERS: 'avtoedu_users',
  SESSION: 'avtoedu_session',
  MODULES: 'avtoedu_modules',
  LESSONS: 'avtoedu_lessons',
  COMMENTS: 'avtoedu_lesson_comments',
  EBOOKS: 'avtoedu_ebooks',
  PRESENTATIONS: 'avtoedu_presentations',
  TESTS: 'avtoedu_tests',
  ATTEMPTS: 'avtoedu_test_attempts',
  CERTIFICATES: 'avtoedu_certificates',
  ASSIGNMENTS: 'avtoedu_assignments',
  SUBMISSIONS: 'avtoedu_submissions',
  DTC_CODES: 'avtoedu_dtc_codes',
  ANNOUNCEMENTS: 'avtoedu_announcements',
  CONTACT_MESSAGES: 'avtoedu_contact_messages',
  NOTIFICATIONS: 'avtoedu_notifications',
  PROGRESS_PREFIX: 'avtoedu_progress_',
  LANG: 'avtoedu_lang',
  THEME: 'avtoedu_theme',
} as const;

export function readStore<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStore<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('localStorage write error:', err);
  }
}

export function ensureSeeded(): void {
  if (localStorage.getItem(STORAGE_KEYS.SEEDED)) return;

  writeStore(STORAGE_KEYS.USERS, SEED_USERS);
  writeStore(STORAGE_KEYS.MODULES, SEED_MODULES);
  writeStore(STORAGE_KEYS.LESSONS, SEED_LESSONS);
  writeStore(STORAGE_KEYS.EBOOKS, SEED_EBOOKS);
  writeStore(STORAGE_KEYS.PRESENTATIONS, SEED_PRESENTATIONS);
  writeStore(STORAGE_KEYS.TESTS, SEED_TESTS);
  writeStore(STORAGE_KEYS.ASSIGNMENTS, SEED_ASSIGNMENTS);
  writeStore(STORAGE_KEYS.DTC_CODES, SEED_DTC_CODES);
  writeStore(STORAGE_KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS);

  // Seed initial sample attempts, submission, comments, certificates, and notifications so demo accounts look rich right away
  writeStore(STORAGE_KEYS.COMMENTS, [
    {
      id: 'cmt_1',
      lessonId: 'les_5',
      userId: 'user_student_1',
      userName: 'Azizbek Tursunov',
      userRole: 'student',
      text: 'Agar LTFT +16% bo‘lib, gaz berganda ham tushmasa, demak bu MAF datchigimi?',
      createdAt: '2026-11-11T10:15:00.000Z',
      reply: {
        text: 'Ha, yaxshi kuzatuv! Shuningdek yonilg‘i nasosi bosimini ham manometr bilan tekshirib ko‘rish shart.',
        teacherName: 'Rustam Karimov',
        repliedAt: '2026-11-11T12:20:00.000Z',
      },
    },
  ]);

  writeStore(STORAGE_KEYS.ATTEMPTS, [
    {
      id: 'att_demo_1',
      testId: 'test_1',
      userId: 'user_student_1',
      scorePercent: 80,
      passed: true,
      earnedPoints: 80,
      totalPoints: 100,
      durationSeconds: 310,
      completedAt: '2026-11-10T14:00:00.000Z',
      answers: [],
    },
    {
      id: 'att_demo_2',
      testId: 'test_5',
      userId: 'user_student_3',
      scorePercent: 90,
      passed: true,
      earnedPoints: 90,
      totalPoints: 100,
      durationSeconds: 480,
      completedAt: '2026-11-12T16:00:00.000Z',
      answers: [],
    },
  ]);

  writeStore(STORAGE_KEYS.CERTIFICATES, [
    {
      id: 'AVTO-2026-DEMO90',
      studentId: 'user_student_3',
      studentName: 'Madina Alimova',
      courseTitle: {
        uz: 'Avtomobil dvigatellarini diagnostika qilish: usullar, texnik xizmat, video darslar va testlar',
        ru: 'Диагностика автомобильных двигателей: методы, обслуживание, видеоуроки и тесты',
        en: 'Automotive Engine Diagnostics: Diagnostic Methods, Maintenance, Video Lessons & Tests',
      },
      scorePercent: 90,
      issuedAt: '2026-11-12T16:00:00.000Z',
      instructorName: 'Rustam Karimov',
    },
  ]);

  writeStore(STORAGE_KEYS.SUBMISSIONS, [
    {
      id: 'sub_demo_1',
      assignmentId: 'assign_1',
      studentId: 'user_student_1',
      studentName: 'Azizbek Tursunov',
      reportText:
        'Idle: ECT 88°C, STFT +2.3%, LTFT +14.1%, MAF 2.4 g/s. At 2500 RPM: LTFT dropped to +3.1%. Vacuum hose leak found near PCV valve.',
      checkedSteps: [0, 1, 2, 3, 4],
      status: 'submitted',
      submittedAt: '2026-11-13T09:40:00.000Z',
    },
  ]);

  writeStore(STORAGE_KEYS.CONTACT_MESSAGES, []);

  writeStore(STORAGE_KEYS.NOTIFICATIONS, [
    {
      id: 'notif_1',
      userId: 'user_student_1',
      title: {
        uz: '5-modul darslari ochildi',
        ru: 'Открыт 5-й модуль курса',
        en: 'Module 5 lessons unlocked',
      },
      message: {
        uz: 'Ossillograf diagnostikasi bo‘yicha yangi video darslarni ko‘ring.',
        ru: 'Посмотрите новые видеоуроки по осциллографии ДВС.',
        en: 'Explore the new oscilloscope waveform lessons now available.',
      },
      link: '/videos',
      read: false,
      createdAt: '2026-11-12T08:00:00.000Z',
    },
  ]);

  writeStore(`${STORAGE_KEYS.PROGRESS_PREFIX}user_student_1`, {
    completedLessonIds: ['les_1', 'les_2', 'les_3'],
    lessonPositions: { les_4: 120 },
    lessonNotes: {
      les_1: 'Salt yurishda vakuum me’yori -58..-71 kPa oralig‘ida bo‘ladi.',
    },
    bookmarkedEbookIds: ['book_1'],
    readEbookIds: ['book_1'],
    ebookProgress: { book_1: 100 },
    assignmentChecklists: { assign_1: [0, 1, 2, 3, 4] },
  });

  localStorage.setItem(STORAGE_KEYS.SEEDED, '1');
}

export function exportAllDataAsJson(): string {
  const data: Record<string, unknown> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('avtoedu_')) {
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          data[key] = JSON.parse(raw);
        } catch {
          data[key] = raw;
        }
      }
    }
  }
  const backup: PlatformBackup = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    data,
  };
  return JSON.stringify(backup, null, 2);
}

export function importAllDataFromJson(jsonText: string): boolean {
  try {
    const parsed = JSON.parse(jsonText) as PlatformBackup;
    if (!parsed || typeof parsed !== 'object' || !parsed.data) return false;
    Object.entries(parsed.data).forEach(([key, val]) => {
      if (key.startsWith('avtoedu_')) {
        localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
      }
    });
    localStorage.setItem(STORAGE_KEYS.SEEDED, '1');
    return true;
  } catch {
    return false;
  }
}

export function resetAllDataToDemo(): void {
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('avtoedu_') && k !== STORAGE_KEYS.LANG && k !== STORAGE_KEYS.THEME) {
      keysToRemove.push(k);
    }
  }
  keysToRemove.forEach((k) => localStorage.removeItem(k));
  ensureSeeded();
}

import React, { useEffect, useMemo, useState } from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  Download,
  Flag,
  RotateCcw,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Badge,
  Breadcrumbs,
  Button,
  Card,
  EmptyState,
  Input,
  Modal,
  Select,
} from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { usePageMeta, useT } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';
import { SubmittedAnswerInput, testService } from '../services/testService';
import { Certificate, Question, TestAttempt, TestItem } from '../types';
import { downloadCertificatePdf } from '../utils/pdfGenerator';

export const TestsPage: React.FC = () => {
  const { lang, t, formatDate } = useT();
  const { user, refreshUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  usePageMeta(t.tests.title, t.tests.subtitle);

  const [tests] = useState<TestItem[]>(() => testService.getTests());
  const [attempts, setAttempts] = useState<TestAttempt[]>(() =>
    user ? testService.getAttempts(user.id) : []
  );

  // Active exam runner state
  const [runningTest, setRunningTest] = useState<TestItem | null>(null);
  const [orderedQuestions, setOrderedQuestions] = useState<Question[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [answersMap, setAnswersMap] = useState<Record<string, SubmittedAnswerInput>>({});
  const [flaggedIds, setFlaggedIds] = useState<string[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [startedAt, setStartedAt] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Result state
  const [resultData, setResultData] = useState<{
    test: TestItem;
    questions: Question[];
    attempt: TestAttempt;
    certificate?: Certificate;
  } | null>(null);

  useEffect(() => {
    setAttempts(user ? testService.getAttempts(user.id) : []);
  }, [user]);

  useEffect(() => {
    const idParam = searchParams.get('id');
    if (idParam && !runningTest && !resultData) {
      const found = tests.find((tst) => tst.id === idParam);
      if (found && user) startTest(found);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Countdown timer with auto-submit
  useEffect(() => {
    if (!runningTest) return;
    if (secondsLeft <= 0) {
      finalizeTest();
      return;
    }
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runningTest, secondsLeft]);

  const startTest = (test: TestItem) => {
    if (!user) {
      showToast(t.auth.authRequired, 'info');
      navigate('/login', { state: { message: t.auth.authRequired, from: '/tests' } });
      return;
    }
    const shuffleQuestionOptions = (q: Question): Question => {
      if (!q.options || q.options.length <= 1) return q;
      const perm = q.options.map((_, i) => i).sort(() => Math.random() - 0.5);
      const newOptions = perm.map((oldIdx) => q.options![oldIdx]);
      const newCorrect = (q.correctIndices || [])
        .map((oldCorrect) => perm.indexOf(oldCorrect))
        .filter((idx) => idx >= 0);
      return { ...q, options: newOptions, correctIndices: newCorrect };
    };

    const baseQs = test.shuffleQuestions
      ? [...test.questions].sort(() => Math.random() - 0.5).map(shuffleQuestionOptions)
      : [...test.questions];
    const qs = baseQs;

    setRunningTest(test);
    setOrderedQuestions(qs);
    setQIndex(0);
    setAnswersMap({});
    setFlaggedIds([]);
    setSecondsLeft(test.durationMinutes * 60);
    setStartedAt(Date.now());
    setResultData(null);
  };

  const finalizeTest = () => {
    if (!runningTest || !user) return;
    setConfirmOpen(false);
    const elapsed = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
    const { attempt, certificate } = testService.submitAttempt({
      test: { ...runningTest, questions: orderedQuestions },
      user,
      answersMap,
      durationSeconds: elapsed,
    });
    refreshUser();
    setAttempts(testService.getAttempts(user.id));
    setResultData({
      test: runningTest,
      questions: orderedQuestions,
      attempt,
      certificate,
    });
    setRunningTest(null);
  };

  const currentQuestion = orderedQuestions[qIndex];

  const topicChartData = useMemo(() => {
    if (!resultData) return [];
    const map = new Map<string, { topic: string; earned: number; total: number }>();
    resultData.questions.forEach((q) => {
      const topicName = q.topic[lang];
      const rec = resultData.attempt.answers.find((a) => a.questionId === q.id);
      const curr = map.get(topicName) || { topic: topicName, earned: 0, total: 0 };
      curr.total += q.points;
      if (rec?.isCorrect) curr.earned += q.points;
      map.set(topicName, curr);
    });
    return Array.from(map.values()).map((v) => ({
      topic: v.topic,
      score: v.total > 0 ? Math.round((v.earned / v.total) * 100) : 0,
    }));
  }, [resultData, lang]);

  const formatClock = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Active Test Runner View
  if (runningTest && currentQuestion) {
    const ans = answersMap[currentQuestion.id] || {};
    const isFlagged = flaggedIds.includes(currentQuestion.id);

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <p className="text-xs text-orange-600 dark:text-amber-400 font-semibold">
              {runningTest.moduleTag[lang]}
            </p>
            <h1 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              {runningTest.title[lang]}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 text-white font-mono text-sm tabular-nums">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{formatClock(secondsLeft)}</span>
            </div>
            <Button variant="primary" size="sm" onClick={() => setConfirmOpen(true)}>
              {t.tests.submitTest}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <Card className="lg:col-span-8 space-y-5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-slate-500 tabular-nums">
                {qIndex + 1} / {orderedQuestions.length} · {currentQuestion.topic[lang]}
              </span>
              <button
                type="button"
                onClick={() =>
                  setFlaggedIds((prev) =>
                    prev.includes(currentQuestion.id)
                      ? prev.filter((id) => id !== currentQuestion.id)
                      : [...prev, currentQuestion.id]
                  )
                }
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md cursor-pointer ${
                  isFlagged
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{isFlagged ? t.tests.flagged : t.tests.flagQuestion}</span>
              </button>
            </div>

            {currentQuestion.faultCodeBadge && (
              <div className="inline-block font-mono text-sm font-bold px-3 py-1 rounded-md bg-slate-900 text-amber-400 border border-slate-700">
                DTC: {currentQuestion.faultCodeBadge}
              </div>
            )}

            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white leading-snug">
              {currentQuestion.prompt[lang]}
            </h2>

            {currentQuestion.imageUrl && (
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 max-w-md">
                <img
                  src={currentQuestion.imageUrl}
                  alt={currentQuestion.prompt[lang]}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Answer Inputs by QuestionType */}
            {(currentQuestion.type === 'single' ||
              currentQuestion.type === 'image' ||
              currentQuestion.type === 'fault_code') &&
              currentQuestion.options && (
                <div className="space-y-2.5">
                  {currentQuestion.options.map((opt, idx) => {
                    const selected = ans.selectedIndices?.[0] === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          setAnswersMap((prev) => ({
                            ...prev,
                            [currentQuestion.id]: { selectedIndices: [idx] },
                          }))
                        }
                        className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors cursor-pointer ${
                          selected
                            ? 'border-orange-600 bg-orange-50 dark:bg-orange-950/40 text-slate-900 dark:text-white font-medium'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {opt[lang]}
                      </button>
                    );
                  })}
                </div>
              )}

            {currentQuestion.type === 'multiple' && currentQuestion.options && (
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt, idx) => {
                  const selectedArr = ans.selectedIndices || [];
                  const checked = selectedArr.includes(idx);
                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm cursor-pointer ${
                        checked
                          ? 'border-orange-600 bg-orange-50 dark:bg-orange-950/40 text-slate-900 dark:text-white font-medium'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          const nextArr = checked
                            ? selectedArr.filter((i) => i !== idx)
                            : [...selectedArr, idx];
                          setAnswersMap((prev) => ({
                            ...prev,
                            [currentQuestion.id]: { selectedIndices: nextArr },
                          }));
                        }}
                        className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span>{opt[lang]}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === 'true_false' && (
              <div className="grid grid-cols-2 gap-3">
                {[true, false].map((val) => {
                  const selected = ans.selectedBoolean === val;
                  return (
                    <button
                      key={String(val)}
                      type="button"
                      onClick={() =>
                        setAnswersMap((prev) => ({
                          ...prev,
                          [currentQuestion.id]: { selectedBoolean: val },
                        }))
                      }
                      className={`px-4 py-3.5 rounded-lg border text-sm font-medium cursor-pointer ${
                        selected
                          ? 'border-orange-600 bg-orange-50 dark:bg-orange-950/40 text-slate-900 dark:text-white'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {val ? t.tests.trueOption : t.tests.falseOption}
                    </button>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === 'matching' && currentQuestion.matchingPairs && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">{t.tests.matchPrompt}</p>
                {currentQuestion.matchingPairs.map((pair) => {
                  const selMap = ans.matchingSelections || {};
                  return (
                    <div key={pair.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <div className="px-3.5 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white">
                        {pair.left[lang]}
                      </div>
                      <Select
                        value={selMap[pair.id] || ''}
                        onChange={(e) =>
                          setAnswersMap((prev) => ({
                            ...prev,
                            [currentQuestion.id]: {
                              matchingSelections: { ...selMap, [pair.id]: e.target.value },
                            },
                          }))
                        }
                      >
                        <option value="">—</option>
                        {currentQuestion.matchingPairs!.map((optPair) => (
                          <option key={optPair.id} value={optPair.id}>
                            {optPair.right[lang]}
                          </option>
                        ))}
                      </Select>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <Button
                size="sm"
                variant="outline"
                disabled={qIndex === 0}
                onClick={() => setQIndex((i) => Math.max(0, i - 1))}
              >
                {t.common.previous}
              </Button>
              {qIndex < orderedQuestions.length - 1 ? (
                <Button size="sm" variant="primary" onClick={() => setQIndex((i) => i + 1)}>
                  {t.common.next}
                </Button>
              ) : (
                <Button size="sm" variant="primary" onClick={() => setConfirmOpen(true)}>
                  {t.tests.submitTest}
                </Button>
              )}
            </div>
          </Card>

          {/* Question Navigator */}
          <Card className="lg:col-span-4 space-y-4">
            <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
              {t.tests.questionNavigator}
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {orderedQuestions.map((q, idx) => {
                const answered = Boolean(answersMap[q.id]);
                const flagged = flaggedIds.includes(q.id);
                const current = idx === qIndex;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setQIndex(idx)}
                    className={`h-10 rounded-lg font-mono text-xs font-semibold tabular-nums border cursor-pointer relative ${
                      current
                        ? 'border-orange-600 bg-orange-600 text-white'
                        : answered
                        ? 'border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {idx + 1}
                    {flagged && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title={t.tests.submitTest} size="sm">
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">{t.tests.confirmSubmit}</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setConfirmOpen(false)}>
                {t.common.cancel}
              </Button>
              <Button variant="primary" size="sm" onClick={finalizeTest}>
                {t.tests.submitTest}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  // Results & Review View
  if (resultData) {
    const { attempt, test, questions, certificate } = resultData;
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <Card className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-orange-600 dark:text-amber-400">
                {test.title[lang]}
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {t.tests.resultsTitle}
              </h1>
            </div>
            <Badge variant={attempt.passed ? 'success' : 'danger'}>
              {attempt.passed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              <span>{attempt.passed ? t.common.passed : t.common.failed}</span>
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-slate-200 dark:border-slate-800 py-5">
            <div>
              <p className="text-xs text-slate-500">{t.common.score}</p>
              <p className="font-display text-3xl font-bold tabular-nums text-slate-900 dark:text-white">
                {attempt.scorePercent}%
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">{t.tests.earnedPoints}</p>
              <p className="font-display text-3xl font-bold tabular-nums text-orange-600 dark:text-amber-400">
                {attempt.earnedPoints} / {attempt.totalPoints}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">{t.tests.passMark}</p>
              <p className="font-display text-3xl font-bold tabular-nums text-slate-700 dark:text-slate-300">
                {test.passScore}%
              </p>
            </div>
          </div>

          {certificate && (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-50/70 dark:bg-emerald-950/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <p className="font-display text-sm font-bold text-slate-900 dark:text-white">
                    ID: {certificate.id}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {certificate.studentName} · {certificate.scorePercent}%
                  </p>
                </div>
              </div>
              <Button size="sm" variant="primary" onClick={() => downloadCertificatePdf(certificate, lang)}>
                <Download className="w-4 h-4" />
                <span>{t.tests.downloadCertificate}</span>
              </Button>
            </div>
          )}

          {/* Per-topic Strength Chart */}
          <div className="space-y-3">
            <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">
              {t.tests.topicStrength}
            </h2>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topicChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.25} />
                  <XAxis dataKey="topic" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#EA580C" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => startTest(test)}>
              <RotateCcw className="w-4 h-4" />
              <span>{t.tests.retakeTest}</span>
            </Button>
            <Button variant="outline" onClick={() => setResultData(null)}>
              {t.common.back}
            </Button>
          </div>
        </Card>

        {/* Detailed Answer Review */}
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {t.tests.answerReview}
          </h2>
          {questions.map((q, idx) => {
            const rec = attempt.answers.find((a) => a.questionId === q.id);
            const ok = rec?.isCorrect ?? false;
            return (
              <Card key={q.id} className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                    {idx + 1}. {q.prompt[lang]}
                  </h3>
                  <Badge variant={ok ? 'success' : 'danger'}>
                    {ok ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{ok ? `+${q.points}` : '0'}</span>
                  </Badge>
                </div>

                {q.options && (
                  <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <p>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {t.tests.correctAnswer}:{' '}
                      </span>
                      {(q.correctIndices || []).map((i) => q.options?.[i]?.[lang]).join(', ')}
                    </p>
                  </div>
                )}

                {q.type === 'true_false' && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    {t.tests.correctAnswer}: {q.correctBoolean ? t.tests.trueOption : t.tests.falseOption}
                  </p>
                )}

                <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg">
                  <span className="font-semibold text-slate-900 dark:text-slate-200">{t.tests.explanation}: </span>
                  {q.explanation[lang]}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Test List Landing View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Breadcrumbs items={[{ label: t.nav.home, to: '/' }, { label: t.nav.tests }]} />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {t.tests.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{t.tests.subtitle}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate('/verify-certificate')}>
          <ShieldCheck className="w-4 h-4" />
          <span>{t.nav.verifyCert}</span>
        </Button>
      </div>

      {tests.length === 0 ? (
        <EmptyState title={t.common.noData} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => {
            const bestAttempt = attempts
              .filter((a) => a.testId === test.id)
              .sort((a, b) => b.scorePercent - a.scorePercent)[0];

            return (
              <Card key={test.id} className="flex flex-col justify-between space-y-5">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-orange-600 dark:text-amber-400">
                      {test.moduleTag[lang]}
                    </span>
                    {test.isFinalExam && (
                      <Badge variant="accent">
                        <Award className="w-3.5 h-3.5" />
                        <span>{t.tests.finalExamBadge}</span>
                      </Badge>
                    )}
                  </div>
                  <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {test.title[lang]}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{test.description[lang]}</p>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap gap-2 pt-1 tabular-nums">
                    <span>{test.questions.length} {t.tests.questionsCount}</span>
                    <span>·</span>
                    <span>{test.durationMinutes} {t.common.minutes}</span>
                    <span>·</span>
                    <span>{t.tests.passMark}: {test.passScore}%</span>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  {bestAttempt && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">{formatDate(bestAttempt.completedAt)}</span>
                      <Badge variant={bestAttempt.passed ? 'success' : 'warning'}>
                        <span className="tabular-nums">{bestAttempt.scorePercent}%</span>
                      </Badge>
                    </div>
                  )}
                  <Button className="w-full" variant="primary" onClick={() => startTest(test)}>
                    {bestAttempt ? t.tests.retakeTest : t.tests.startTest}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const CertificateVerifyPage: React.FC = () => {
  const { lang, t, formatDate } = useT();
  usePageMeta(t.tests.verifyCertificateTitle);

  const [certId, setCertId] = useState('AVTO-2026-DEMO90');
  const [result, setResult] = useState<Certificate | null | undefined>(undefined);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;
    setResult(testService.verifyCertificateById(certId));
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-14 space-y-6">
      <Card className="space-y-6">
        <div className="space-y-1.5">
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            {t.tests.verifyCertificateTitle}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">{t.tests.verifyCertificateSub}</p>
        </div>

        <form onSubmit={handleVerify} className="flex gap-2">
          <Input
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            placeholder="AVTO-2026-XXXXXX"
          />
          <Button type="submit" variant="primary">
            {t.tests.verifyBtn}
          </Button>
        </form>

        {result !== undefined && (
          result ? (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/30 p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>{t.tests.certValid}</span>
              </div>
              <div className="text-sm space-y-1 text-slate-700 dark:text-slate-200">
                <p><strong>ID:</strong> <span className="font-mono">{result.id}</span></p>
                <p><strong>{t.auth.fullName}:</strong> {result.studentName}</p>
                <p><strong>{t.common.score}:</strong> <span className="tabular-nums">{result.scorePercent}%</span></p>
                <p><strong>{t.common.date}:</strong> {formatDate(result.issuedAt)}</p>
              </div>
              <Button size="sm" variant="primary" onClick={() => downloadCertificatePdf(result, lang)}>
                <Download className="w-4 h-4" />
                <span>{t.tests.downloadCertificate}</span>
              </Button>
            </div>
          ) : (
            <div className="rounded-xl border border-red-500/40 bg-red-50 dark:bg-red-950/30 p-4 text-sm text-red-700 dark:text-red-300 flex items-center gap-2">
              <XCircle className="w-5 h-5 shrink-0" />
              <span>{t.tests.certInvalid}</span>
            </div>
          )
        )}
      </Card>
    </div>
  );
};

import React, { useMemo, useState } from 'react';
import {
  Award,
  BookMarked,
  CheckCircle2,
  Download,
  Flame,
  NotebookPen,
  PlayCircle,
  Trophy,
  Upload,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  CartesianGrid,
  Line,
  LineChart,
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
  ProgressBar,
  Select,
  Table,
  Tabs,
} from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { usePageMeta, useT } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';
import { authService } from '../services/authService';
import { contentService } from '../services/contentService';
import { testService } from '../services/testService';
import { Language } from '../types';
import { downloadCertificatePdf } from '../utils/pdfGenerator';

type StudentTab = 'overview' | 'tests' | 'assignments' | 'notes' | 'favorites' | 'certificates' | 'profile';

const BADGE_LABELS: Record<string, { uz: string; ru: string; en: string }> = {
  first_lesson: { uz: 'Ilk dars', ru: 'Первый урок', en: 'First Lesson' },
  perfect_test: { uz: '100% Test', ru: 'Идеальный тест', en: 'Perfect Test' },
  streak_7: { uz: '7 kunlik seriya', ru: '7 дней подряд', en: '7-Day Streak' },
  master_diagnostician: { uz: 'Usta diagnost', ru: 'Мастер-диагност', en: 'Master Diagnostician' },
};

export const StudentCabinetPage: React.FC = () => {
  const { lang, t, formatDate } = useT();
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  usePageMeta(t.student.title);

  const [activeTab, setActiveTab] = useState<StudentTab>('overview');
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [langPref, setLangPref] = useState<Language>(user?.preferredLanguage || lang);

  const lessons = useMemo(() => contentService.getLessons(), []);
  const ebooks = useMemo(() => contentService.getEbooks(), []);
  const assignments = useMemo(() => contentService.getAssignments(), []);
  const tests = useMemo(() => testService.getTests(), []);

  const progress = useMemo(
    () => (user ? contentService.getStudentProgress(user.id) : null),
    [user]
  );
  const attempts = useMemo(
    () => (user ? testService.getAttempts(user.id) : []),
    [user]
  );
  const submissions = useMemo(
    () => (user ? contentService.getSubmissions().filter((s) => s.studentId === user.id) : []),
    [user]
  );
  const certificates = useMemo(
    () => (user ? testService.getCertificates(user.id) : []),
    [user]
  );
  const leaderboard = useMemo(
    () => authService.getStudents().sort((a, b) => b.xp - a.xp).slice(0, 6),
    []
  );

  if (!user || !progress) return null;

  const completedCount = progress.completedLessonIds.length;
  const coursePct = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;
  const level = Math.floor(user.xp / 200) + 1;

  const nextLesson = lessons.find((l) => !progress.completedLessonIds.includes(l.id)) || lessons[0];
  const bookmarkedBooks = ebooks.filter((b) => progress.bookmarkedEbookIds.includes(b.id));

  const chartData = [...attempts]
    .reverse()
    .map((att, idx) => {
      const tst = tests.find((x) => x.id === att.testId);
      return {
        name: tst ? tst.moduleTag[lang] : `#${idx + 1}`,
        score: att.scorePercent,
      };
    });

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateProfile({ avatar: String(reader.result) });
      showToast(t.common.savedSuccess, 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    updateProfile({ name: nameInput.trim(), preferredLanguage: langPref });
    showToast(t.common.savedSuccess, 'success');
  };

  // SVG Ring Math
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (coursePct / 100) * circumference;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Breadcrumbs items={[{ label: t.nav.home, to: '/' }, { label: t.student.title }]} />

      {/* Top Welcome & Gamification Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="p-5" className="flex items-center gap-4">
          <svg width="92" height="92" viewBox="0 0 92 92" className="shrink-0">
            <circle cx="46" cy="46" r={radius} strokeWidth="8" fill="none" className="stroke-slate-200 dark:stroke-slate-800" />
            <circle
              cx="46"
              cy="46"
              r={radius}
              strokeWidth="8"
              fill="none"
              stroke="#EA580C"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 46 46)"
            />
            <text
              x="46"
              y="51"
              textAnchor="middle"
              className="fill-slate-900 dark:fill-white font-display font-bold text-base tabular-nums"
            >
              {coursePct}%
            </text>
          </svg>
          <div>
            <p className="text-xs text-slate-500">{t.student.overallProgress}</p>
            <p className="font-display text-lg font-bold text-slate-900 dark:text-white tabular-nums">
              {completedCount} / {lessons.length}
            </p>
          </div>
        </Card>

        <Card padding="p-5" className="flex flex-col justify-center">
          <p className="text-xs text-slate-500">{t.student.xpPoints}</p>
          <p className="font-display text-3xl font-bold text-orange-600 dark:text-amber-400 tabular-nums mt-1">
            {user.xp} XP
          </p>
          <p className="text-xs text-slate-500 mt-1 tabular-nums">
            {t.student.level} {level}
          </p>
        </Card>

        <Card padding="p-5" className="flex flex-col justify-center">
          <p className="text-xs text-slate-500">{t.student.streak}</p>
          <p className="font-display text-3xl font-bold text-slate-900 dark:text-white tabular-nums flex items-center gap-2 mt-1">
            <Flame className="w-6 h-6 text-amber-500" />
            <span>{user.streakDays}</span>
          </p>
        </Card>

        <Card padding="p-5" className="flex flex-col justify-center">
          <p className="text-xs text-slate-500">{t.student.badgesTitle}</p>
          <p className="font-display text-3xl font-bold text-slate-900 dark:text-white tabular-nums mt-1">
            {user.badges.length}
          </p>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {user.badges.map((b) => (
              <Badge key={b} variant="accent">
                {BADGE_LABELS[b]?.[lang] || b}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'overview', label: t.student.tabs.overview },
          { id: 'tests', label: t.student.tabs.tests },
          { id: 'assignments', label: t.student.tabs.assignments },
          { id: 'notes', label: t.student.tabs.notes },
          { id: 'favorites', label: t.student.tabs.favorites },
          { id: 'certificates', label: t.student.tabs.certificates },
          { id: 'profile', label: t.student.tabs.profile },
        ]}
      />

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            {nextLesson && (
              <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-orange-600 dark:text-amber-400">
                    {t.student.continueLearning}
                  </p>
                  <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {nextLesson.title[lang]}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {nextLesson.durationMinutes} {t.common.minutes}
                  </p>
                </div>
                <Link to={`/videos?lesson=${nextLesson.id}`}>
                  <Button variant="primary">
                    <PlayCircle className="w-4 h-4" />
                    <span>{t.home.continueCourse}</span>
                  </Button>
                </Link>
              </Card>
            )}

            <Card className="space-y-4">
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                {t.student.upcomingAssignments}
              </h3>
              <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {assignments.map((assign) => {
                  const sub = submissions.find((s) => s.assignmentId === assign.id);
                  return (
                    <div key={assign.id} className="py-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {assign.title[lang]}
                        </p>
                        <p className="text-xs text-slate-500 tabular-nums">
                          {assign.estimatedMinutes} {t.common.minutes}
                        </p>
                      </div>
                      {sub ? (
                        <Badge variant={sub.status === 'accepted' ? 'success' : 'warning'}>
                          {t.practical.statuses[sub.status]}
                          {sub.grade !== undefined ? ` · ${sub.grade}/100` : ''}
                        </Badge>
                      ) : (
                        <Link to="/practical?tab=assignments">
                          <Button size="sm" variant="outline">{t.common.view}</Button>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Leaderboard */}
          <Card className="lg:col-span-4 space-y-4">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>{t.student.leaderboardTitle}</span>
            </h3>
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {leaderboard.map((st, idx) => (
                <div key={st.id} className="py-2.5 flex items-center justify-between gap-2 text-sm">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-xs font-bold text-slate-400 w-5">#{idx + 1}</span>
                    <span className={`truncate ${st.id === user.id ? 'font-bold text-orange-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      {st.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold tabular-nums text-slate-600 dark:text-slate-300">
                    {st.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'tests' && (
        <div className="space-y-6">
          {chartData.length > 0 && (
            <Card className="space-y-3">
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                {t.student.recentResults}
              </h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.25} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#EA580C" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          <Table
            emptyMessage={t.common.noData}
            rows={attempts}
            keyExtractor={(r) => r.id}
            columns={[
              {
                key: 'test',
                header: t.nav.tests,
                render: (r) => tests.find((x) => x.id === r.testId)?.title[lang] || r.testId,
              },
              {
                key: 'score',
                header: t.common.score,
                align: 'right',
                render: (r) => <span className="font-mono font-semibold">{r.scorePercent}%</span>,
              },
              {
                key: 'status',
                header: t.common.status,
                render: (r) => (
                  <Badge variant={r.passed ? 'success' : 'danger'}>
                    {r.passed ? t.common.passed : t.common.failed}
                  </Badge>
                ),
              },
              {
                key: 'date',
                header: t.common.date,
                render: (r) => formatDate(r.completedAt),
              },
            ]}
          />
        </div>
      )}

      {activeTab === 'assignments' && (
        <div className="space-y-4">
          {submissions.length === 0 ? (
            <EmptyState
              title={t.common.noData}
              action={
                <Link to="/practical?tab=assignments">
                  <Button size="sm">{t.practical.tabs.assignments}</Button>
                </Link>
              }
            />
          ) : (
            submissions.map((sub) => {
              const assign = assignments.find((a) => a.id === sub.assignmentId);
              return (
                <Card key={sub.id} className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                      {assign?.title[lang] || sub.assignmentId}
                    </h3>
                    <Badge variant={sub.status === 'accepted' ? 'success' : sub.status === 'needs_revision' ? 'danger' : 'warning'}>
                      {t.practical.statuses[sub.status]}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{sub.reportText}</p>
                  {sub.grade !== undefined && (
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-3 text-xs space-y-1">
                      <p className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                        {t.practical.teacherGrade}: {sub.grade} / 100
                      </p>
                      {sub.feedback && <p>{sub.feedback}</p>}
                    </div>
                  )}
                </Card>
              );
            })
          )}
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="space-y-4">
          {Object.entries(progress.lessonNotes).filter(([, txt]) => txt.trim()).length === 0 ? (
            <EmptyState title={t.common.noData} icon={<NotebookPen className="w-8 h-8" />} />
          ) : (
            Object.entries(progress.lessonNotes)
              .filter(([, txt]) => txt.trim())
              .map(([lessonId, txt]) => {
                const les = lessons.find((l) => l.id === lessonId);
                return (
                  <Card key={lessonId} className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                        {les?.title[lang] || lessonId}
                      </h3>
                      <Link to={`/videos?lesson=${lessonId}`} className="text-xs text-orange-600 dark:text-amber-400 hover:underline">
                        {t.common.view}
                      </Link>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{txt}</p>
                  </Card>
                );
              })
          )}
        </div>
      )}

      {activeTab === 'favorites' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarkedBooks.length === 0 ? (
            <div className="md:col-span-2">
              <EmptyState title={t.common.noData} icon={<BookMarked className="w-8 h-8" />} />
            </div>
          ) : (
            bookmarkedBooks.map((book) => (
              <Card key={book.id} className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    {book.title[lang]}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{book.author}</p>
                </div>
                <Link to={`/ebooks?id=${book.id}`}>
                  <Button size="sm" variant="outline">{t.common.view}</Button>
                </Link>
              </Card>
            ))
          )}
        </div>
      )}

      {activeTab === 'certificates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.length === 0 ? (
            <div className="md:col-span-2">
              <EmptyState
                title={t.common.noData}
                icon={<Award className="w-8 h-8" />}
                action={
                  <Link to="/tests">
                    <Button size="sm">{t.nav.tests}</Button>
                  </Link>
                }
              />
            </div>
          ) : (
            certificates.map((cert) => (
              <Card key={cert.id} className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-orange-600 dark:text-amber-400 font-bold">
                      {cert.id}
                    </p>
                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mt-1">
                      {cert.courseTitle[lang]}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 tabular-nums">
                      {cert.scorePercent}% · {formatDate(cert.issuedAt)}
                    </p>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                </div>
                <Button size="sm" variant="primary" onClick={() => downloadCertificatePdf(cert, lang)}>
                  <Download className="w-4 h-4" />
                  <span>{t.tests.downloadCertificate}</span>
                </Button>
              </Card>
            ))
          )}
        </div>
      )}

      {activeTab === 'profile' && (
        <Card className="max-w-xl space-y-6">
          <div className="flex items-center gap-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-display text-xl font-bold">
                {user.name[0]}
              </div>
            )}
            <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
              <Upload className="w-4 h-4" />
              <span>{t.student.uploadAvatar}</span>
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </label>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <Input
              label={t.auth.fullName}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <Select
              label={t.student.languagePref}
              value={langPref}
              onChange={(e) => setLangPref(e.target.value as Language)}
            >
              <option value="uz">O'zbekcha (UZ)</option>
              <option value="ru">Русский (RU)</option>
              <option value="en">English (EN)</option>
            </Select>
            <ProgressBar value={coursePct} label={t.student.overallProgress} />
            <Button type="submit" variant="primary">
              {t.common.save}
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
};

import React, { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Download,
  Edit3,
  Eye,
  EyeOff,
  MailOpen,
  MessageSquare,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
} from 'lucide-react';
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
  EMPTY_LOC,
  LocalizedInput,
  LocalizedTabsBar,
  useLangTab,
} from '../components/LocalizedInputs';
import {
  Badge,
  Breadcrumbs,
  Button,
  Card,
  EmptyState,
  Input,
  Modal,
  Select,
  Table,
  Tabs,
  TextArea,
} from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { usePageMeta, useT } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';
import { authService } from '../services/authService';
import { contentService } from '../services/contentService';
import {
  exportAllDataAsJson,
  importAllDataFromJson,
  resetAllDataToDemo,
} from '../services/storageService';
import { testService } from '../services/testService';
import {
  Announcement,
  Assignment,
  EBook,
  Lesson,
  Presentation,
  PresentationSlide,
  Question,
  QuestionType,
  Submission,
  SubmissionStatus,
  TestItem,
  User,
} from '../types';
import { generateId } from '../utils/crypto';
import { exportToCsv } from '../utils/csvExporter';

type TeacherTab =
  | 'analytics'
  | 'lessons'
  | 'ebooks'
  | 'presentations'
  | 'tests'
  | 'assignments'
  | 'submissions'
  | 'students'
  | 'messages'
  | 'backup';

export const TeacherCabinetPage: React.FC = () => {
  const { lang, t, formatDate } = useT();
  const { user } = useAuth();
  const { showToast } = useToast();
  usePageMeta(t.teacher.title);

  const [activeTab, setActiveTab] = useState<TeacherTab>('analytics');
  const [tick, setTick] = useState(0);
  const reload = () => setTick((n) => n + 1);

  const modules = useMemo(() => contentService.getModules(), [tick]);
  const lessons = useMemo(() => contentService.getLessons(true), [tick]);
  const ebooks = useMemo(() => contentService.getEbooks(true), [tick]);
  const presentations = useMemo(() => contentService.getPresentations(true), [tick]);
  const tests = useMemo(() => testService.getTests(true), [tick]);
  const assignments = useMemo(() => contentService.getAssignments(true), [tick]);
  const submissions = useMemo(() => contentService.getSubmissions(), [tick]);
  const students = useMemo(() => authService.getStudents(), [tick]);
  const attempts = useMemo(() => testService.getAttempts(), [tick]);
  const announcements = useMemo(() => contentService.getAnnouncements(true), [tick]);
  const messages = useMemo(() => contentService.getContactMessages(), [tick]);
  const comments = useMemo(() => contentService.getLessonComments(), [tick]);

  // KPIs
  const avgScore = useMemo(() => {
    if (attempts.length === 0) return 0;
    return Math.round(attempts.reduce((a, b) => a + b.scorePercent, 0) / attempts.length);
  }, [attempts]);

  const avgCompletion = useMemo(() => {
    if (students.length === 0 || lessons.length === 0) return 0;
    const sum = students.reduce((acc, st) => {
      const p = contentService.getStudentProgress(st.id);
      return acc + (p.completedLessonIds.length / lessons.length) * 100;
    }, 0);
    return Math.round(sum / students.length);
  }, [students, lessons, tick]);

  const pendingCount = submissions.filter(
    (s) => s.status === 'submitted' || s.status === 'under_review'
  ).length;

  const moduleChartData = useMemo(
    () =>
      modules.map((m) => {
        const modLessons = lessons.filter((l) => l.moduleId === m.id);
        const doneTotal = students.reduce((acc, st) => {
          const p = contentService.getStudentProgress(st.id);
          return acc + modLessons.filter((l) => p.completedLessonIds.includes(l.id)).length;
        }, 0);
        const denom = Math.max(1, modLessons.length * students.length);
        return {
          name: `M${m.order}`,
          completion: Math.round((doneTotal / denom) * 100),
        };
      }),
    [modules, lessons, students, tick]
  );

  // Confirm Delete Modal
  const [deleteTarget, setDeleteTarget] = useState<{ label: string; onConfirm: () => void } | null>(null);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  // ── LESSON CRUD ──
  const { editLang, setEditLang } = useLangTab();
  const [lessonModal, setLessonModal] = useState<Lesson | null>(null);

  const openNewLesson = () => {
    setLessonModal({
      id: generateId('les'),
      moduleId: modules[0]?.id || 'mod_1',
      order: lessons.length + 1,
      title: EMPTY_LOC(),
      description: EMPTY_LOC(),
      durationMinutes: 15,
      videoType: 'youtube',
      videoUrl: 'https://www.youtube.com/watch?v=ZQvfHyfgBtA',
      attachedMaterialIds: [],
      keyTakeaways: { uz: [''], ru: [''], en: [''] },
      published: true,
    });
  };

  const saveLessonForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonModal || !lessonModal.title.uz.trim()) {
      showToast(t.common.requiredField, 'error');
      return;
    }
    const clean = {
      ...lessonModal,
      title: {
        uz: lessonModal.title.uz,
        ru: lessonModal.title.ru || lessonModal.title.uz,
        en: lessonModal.title.en || lessonModal.title.uz,
      },
      description: {
        uz: lessonModal.description.uz,
        ru: lessonModal.description.ru || lessonModal.description.uz,
        en: lessonModal.description.en || lessonModal.description.uz,
      },
    };
    contentService.saveLesson(clean);
    setLessonModal(null);
    reload();
    showToast(t.common.savedSuccess, 'success');
  };

  const moveLesson = (idx: number, dir: -1 | 1) => {
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= lessons.length) return;
    const ids = lessons.map((l) => l.id);
    [ids[idx], ids[targetIdx]] = [ids[targetIdx], ids[idx]];
    contentService.reorderLessons(ids);
    reload();
  };

  // ── EBOOK CRUD ──
  const [ebookModal, setEbookModal] = useState<EBook | null>(null);

  const openNewEbook = () => {
    setEbookModal({
      id: generateId('book'),
      title: EMPTY_LOC(),
      author: user?.name || 'Rustam Karimov',
      category: 'diagnostics',
      language: 'all',
      pages: 40,
      sizeLabel: '1.5 MB PDF',
      coverUrl: '/src/assets/images/ebook_cover_diagnostics_1794929842391.jpg',
      tags: ['OBD-II', 'Diagnostics'],
      summary: EMPTY_LOC(),
      chapters: {
        uz: [{ heading: '1-bob', body: '' }],
        ru: [{ heading: 'Глава 1', body: '' }],
        en: [{ heading: 'Chapter 1', body: '' }],
      },
      published: true,
      createdAt: new Date().toISOString(),
    });
  };

  const saveEbookForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ebookModal || !ebookModal.title.uz.trim()) {
      showToast(t.common.requiredField, 'error');
      return;
    }
    const clean: EBook = {
      ...ebookModal,
      title: {
        uz: ebookModal.title.uz,
        ru: ebookModal.title.ru || ebookModal.title.uz,
        en: ebookModal.title.en || ebookModal.title.uz,
      },
      summary: {
        uz: ebookModal.summary.uz,
        ru: ebookModal.summary.ru || ebookModal.summary.uz,
        en: ebookModal.summary.en || ebookModal.summary.uz,
      },
    };
    contentService.saveEbook(clean);
    setEbookModal(null);
    reload();
    showToast(t.common.savedSuccess, 'success');
  };

  // ── PRESENTATION CRUD + SLIDE EDITOR ──
  const [presModal, setPresModal] = useState<Presentation | null>(null);

  const openNewPres = () => {
    setPresModal({
      id: generateId('pres'),
      title: EMPTY_LOC(),
      description: EMPTY_LOC(),
      moduleRef: 'Module 1',
      author: user?.name || 'Rustam Karimov',
      slides: [
        {
          id: generateId('sl'),
          title: { uz: 'Kirish slaydi', ru: 'Вводный слайд', en: 'Introduction Slide' },
          bullets: { uz: ['Asosiy fikr'], ru: ['Ключевой тезис'], en: ['Key point'] },
          notes: EMPTY_LOC(),
          diagramType: 'four-stroke',
        },
      ],
      published: true,
      createdAt: new Date().toISOString(),
    });
  };

  const addSlideToPres = () => {
    if (!presModal) return;
    const newSlide: PresentationSlide = {
      id: generateId('sl'),
      title: EMPTY_LOC(),
      bullets: { uz: [''], ru: [''], en: [''] },
      notes: EMPTY_LOC(),
    };
    setPresModal({ ...presModal, slides: [...presModal.slides, newSlide] });
  };

  const moveSlide = (idx: number, dir: -1 | 1) => {
    if (!presModal) return;
    const target = idx + dir;
    if (target < 0 || target >= presModal.slides.length) return;
    const next = [...presModal.slides];
    [next[idx], next[target]] = [next[target], next[idx]];
    setPresModal({ ...presModal, slides: next });
  };

  const savePresForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!presModal || !presModal.title.uz.trim()) {
      showToast(t.common.requiredField, 'error');
      return;
    }
    const clean: Presentation = {
      ...presModal,
      title: {
        uz: presModal.title.uz,
        ru: presModal.title.ru || presModal.title.uz,
        en: presModal.title.en || presModal.title.uz,
      },
      description: {
        uz: presModal.description.uz,
        ru: presModal.description.ru || presModal.description.uz,
        en: presModal.description.en || presModal.description.uz,
      },
      slides: presModal.slides.map((sl) => ({
        ...sl,
        title: {
          uz: sl.title.uz || 'Slide',
          ru: sl.title.ru || sl.title.uz || 'Slide',
          en: sl.title.en || sl.title.uz || 'Slide',
        },
      })),
    };
    contentService.savePresentation(clean);
    setPresModal(null);
    reload();
    showToast(t.common.savedSuccess, 'success');
  };

  // ── TEST & QUESTION CRUD ──
  const [testModal, setTestModal] = useState<TestItem | null>(null);

  const openNewTest = () => {
    setTestModal({
      id: generateId('test'),
      title: EMPTY_LOC(),
      description: EMPTY_LOC(),
      moduleTag: { uz: 'Yangi modul', ru: 'Новый модуль', en: 'New Module' },
      durationMinutes: 10,
      passScore: 70,
      shuffleQuestions: false,
      questions: [],
      published: true,
    });
  };

  const addQuestionToTest = () => {
    if (!testModal) return;
    const q: Question = {
      id: generateId('q'),
      type: 'single',
      topic: { uz: 'Diagnostika', ru: 'Диагностика', en: 'Diagnostics' },
      prompt: EMPTY_LOC(),
      options: [EMPTY_LOC(), EMPTY_LOC(), EMPTY_LOC(), EMPTY_LOC()],
      correctIndices: [0],
      correctBoolean: true,
      explanation: EMPTY_LOC(),
      points: 10,
    };
    setTestModal({ ...testModal, questions: [...testModal.questions, q] });
  };

  const saveTestForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testModal || !testModal.title.uz.trim()) {
      showToast(t.common.requiredField, 'error');
      return;
    }
    const clean: TestItem = {
      ...testModal,
      title: {
        uz: testModal.title.uz,
        ru: testModal.title.ru || testModal.title.uz,
        en: testModal.title.en || testModal.title.uz,
      },
      description: {
        uz: testModal.description.uz,
        ru: testModal.description.ru || testModal.description.uz,
        en: testModal.description.en || testModal.description.uz,
      },
    };
    testService.saveTest(clean);
    setTestModal(null);
    reload();
    showToast(t.common.savedSuccess, 'success');
  };

  // ── ASSIGNMENT CRUD ──
  const [assignModal, setAssignModal] = useState<Assignment | null>(null);

  const openNewAssign = () => {
    setAssignModal({
      id: generateId('assign'),
      order: assignments.length + 1,
      title: EMPTY_LOC(),
      description: EMPTY_LOC(),
      estimatedMinutes: 30,
      tools: { uz: ['Multimetr', 'OBD-II skaner'], ru: ['Мультиметр', 'Сканер OBD-II'], en: ['Multimeter', 'OBD-II Scanner'] },
      safetyWarnings: { uz: ['Himoya qo‘lqopi kiying'], ru: ['Наденьте защитные перчатки'], en: ['Wear protective gloves'] },
      steps: { uz: ['1-qadam'], ru: ['Шаг 1'], en: ['Step 1'] },
      published: true,
    });
  };

  const saveAssignForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignModal || !assignModal.title.uz.trim()) {
      showToast(t.common.requiredField, 'error');
      return;
    }
    const clean: Assignment = {
      ...assignModal,
      title: {
        uz: assignModal.title.uz,
        ru: assignModal.title.ru || assignModal.title.uz,
        en: assignModal.title.en || assignModal.title.uz,
      },
      description: {
        uz: assignModal.description.uz,
        ru: assignModal.description.ru || assignModal.description.uz,
        en: assignModal.description.en || assignModal.description.uz,
      },
    };
    contentService.saveAssignment(clean);
    setAssignModal(null);
    reload();
    showToast(t.common.savedSuccess, 'success');
  };

  // ── ANNOUNCEMENT CRUD ──
  const [annTitle, setAnnTitle] = useState(EMPTY_LOC());
  const [annBody, setAnnBody] = useState(EMPTY_LOC());

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.uz.trim()) {
      showToast(t.common.requiredField, 'error');
      return;
    }
    const ann: Announcement = {
      id: generateId('ann'),
      title: { uz: annTitle.uz, ru: annTitle.ru || annTitle.uz, en: annTitle.en || annTitle.uz },
      body: { uz: annBody.uz, ru: annBody.ru || annBody.uz, en: annBody.en || annBody.uz },
      createdAt: new Date().toISOString(),
      published: true,
    };
    contentService.saveAnnouncement(ann);
    setAnnTitle(EMPTY_LOC());
    setAnnBody(EMPTY_LOC());
    reload();
    showToast(t.common.savedSuccess, 'success');
  };

  // ── SUBMISSION GRADING ──
  const [gradingSub, setGradingSub] = useState<Submission | null>(null);
  const [gradeVal, setGradeVal] = useState(90);
  const [gradeStatus, setGradeStatus] = useState<SubmissionStatus>('accepted');
  const [gradeFeedback, setGradeFeedback] = useState('');

  // ── STUDENTS SEARCH & INSPECT ──
  const [studentSearch, setStudentSearch] = useState('');
  const [inspectStudent, setInspectStudent] = useState<User | null>(null);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  // ── COMMENT REPLY ──
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Breadcrumbs items={[{ label: t.nav.home, to: '/' }, { label: t.teacher.title }]} />

      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          {t.teacher.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{t.teacher.subtitle}</p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="p-5">
          <p className="text-xs text-slate-500">{t.teacher.kpiStudents}</p>
          <p className="font-display text-3xl font-bold tabular-nums text-slate-900 dark:text-white mt-1">
            {students.length}
          </p>
        </Card>
        <Card padding="p-5">
          <p className="text-xs text-slate-500">{t.teacher.kpiCompletion}</p>
          <p className="font-display text-3xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400 mt-1">
            {avgCompletion}%
          </p>
        </Card>
        <Card padding="p-5">
          <p className="text-xs text-slate-500">{t.teacher.kpiAvgScore}</p>
          <p className="font-display text-3xl font-bold tabular-nums text-orange-600 dark:text-amber-400 mt-1">
            {avgScore}%
          </p>
        </Card>
        <Card padding="p-5">
          <p className="text-xs text-slate-500">{t.teacher.kpiPending}</p>
          <p className="font-display text-3xl font-bold tabular-nums text-slate-900 dark:text-white mt-1">
            {pendingCount}
          </p>
        </Card>
      </div>

      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'analytics', label: t.teacher.tabs.analytics },
          { id: 'lessons', label: t.teacher.tabs.lessons },
          { id: 'ebooks', label: t.teacher.tabs.ebooks },
          { id: 'presentations', label: t.teacher.tabs.presentations },
          { id: 'tests', label: t.teacher.tabs.tests },
          { id: 'assignments', label: t.teacher.tabs.assignments },
          { id: 'submissions', label: `${t.teacher.tabs.submissions} (${pendingCount})` },
          { id: 'students', label: t.teacher.tabs.students },
          { id: 'messages', label: `${t.teacher.tabs.messages} (${messages.filter((m) => !m.read).length})` },
          { id: 'backup', label: t.teacher.tabs.backup },
        ]}
      />

      {/* 1. ANALYTICS, ANNOUNCEMENTS & Q&A REPLIES */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <Card className="lg:col-span-7 space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {t.teacher.kpiCompletion} (M1–M6)
            </h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={moduleChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.25} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="completion" fill="#EA580C" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-orange-600" />
                <span>{t.videos.qaTab}</span>
              </h3>
              {comments.slice(0, 5).map((c) => (
                <div key={c.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span className="font-semibold text-slate-900 dark:text-white">{c.userName}</span>
                    <span>{formatDate(c.createdAt)}</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{c.text}</p>
                  {c.reply ? (
                    <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                      ✓ {c.reply.text}
                    </p>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        value={replyDrafts[c.id] || ''}
                        onChange={(e) => setReplyDrafts((p) => ({ ...p, [c.id]: e.target.value }))}
                        placeholder={t.teacher.replyComment}
                        className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-xs"
                      />
                      <Button
                        size="sm"
                        onClick={() => {
                          const txt = replyDrafts[c.id]?.trim();
                          if (!txt) return;
                          contentService.replyToComment(c.id, txt, user?.name || 'Teacher');
                          setReplyDrafts((p) => ({ ...p, [c.id]: '' }));
                          reload();
                          showToast(t.common.savedSuccess, 'success');
                        }}
                      >
                        {t.common.submit}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                {t.teacher.addAnnouncement}
              </h2>
              <LocalizedTabsBar activeLang={editLang} onChange={setEditLang} />
            </div>
            <form onSubmit={handleCreateAnnouncement} className="space-y-3">
              <LocalizedInput label="Title" value={annTitle} onChange={setAnnTitle} activeLang={editLang} />
              <LocalizedInput label="Body" value={annBody} onChange={setAnnBody} activeLang={editLang} multiline />
              <Button type="submit" size="sm" variant="primary">
                <Plus className="w-4 h-4" />
                <span>{t.teacher.addAnnouncement}</span>
              </Button>
            </form>
            <div className="divide-y divide-slate-200 dark:divide-slate-800 pt-2">
              {announcements.map((a) => (
                <div key={a.id} className="py-3 flex items-start justify-between gap-3">
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white">{a.title[lang]}</p>
                    <p className="text-slate-600 dark:text-slate-400">{a.body[lang]}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      contentService.deleteAnnouncement(a.id);
                      reload();
                    }}
                    className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                    aria-label={t.common.delete}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* 2. LESSONS CRUD */}
      {activeTab === 'lessons' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" onClick={openNewLesson}>
              <Plus className="w-4 h-4" />
              <span>{t.teacher.addLesson}</span>
            </Button>
          </div>
          <div className="space-y-2.5">
            {lessons.map((les, idx) => (
              <Card key={les.id} padding="p-4" className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono">#{les.order}</span>
                    <span>·</span>
                    <span>{les.durationMinutes} {t.common.minutes}</span>
                    <Badge variant={les.published ? 'success' : 'neutral'}>
                      {les.published ? t.common.published : t.common.draft}
                    </Badge>
                  </div>
                  <p className="font-display text-sm font-bold text-slate-900 dark:text-white truncate mt-1">
                    {les.title[lang]}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Button size="sm" variant="ghost" disabled={idx === 0} onClick={() => moveLesson(idx, -1)} title={t.teacher.moveUp}>
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" disabled={idx === lessons.length - 1} onClick={() => moveLesson(idx, 1)} title={t.teacher.moveDown}>
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      contentService.saveLesson({ ...les, published: !les.published });
                      reload();
                    }}
                  >
                    {les.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setLessonModal(les)}>
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      setDeleteTarget({
                        label: les.title[lang],
                        onConfirm: () => {
                          contentService.deleteLesson(les.id);
                          reload();
                        },
                      })
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 3. E-BOOKS CRUD */}
      {activeTab === 'ebooks' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" onClick={openNewEbook}>
              <Plus className="w-4 h-4" />
              <span>{t.teacher.addEbook}</span>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ebooks.map((book) => (
              <Card key={book.id} padding="p-4" className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <Badge variant={book.published ? 'success' : 'neutral'}>
                    {book.published ? t.common.published : t.common.draft}
                  </Badge>
                  <p className="font-display text-sm font-bold text-slate-900 dark:text-white truncate mt-1.5">
                    {book.title[lang]}
                  </p>
                  <p className="text-xs text-slate-500">{book.author} · {book.pages} {t.common.pages}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      contentService.saveEbook({ ...book, published: !book.published });
                      reload();
                    }}
                  >
                    {book.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEbookModal(book)}>
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      setDeleteTarget({
                        label: book.title[lang],
                        onConfirm: () => {
                          contentService.deleteEbook(book.id);
                          reload();
                        },
                      })
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 4. PRESENTATIONS CRUD */}
      {activeTab === 'presentations' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" onClick={openNewPres}>
              <Plus className="w-4 h-4" />
              <span>{t.teacher.addPresentation}</span>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {presentations.map((pres) => (
              <Card key={pres.id} padding="p-4" className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <Badge variant={pres.published ? 'success' : 'neutral'}>
                    {pres.published ? t.common.published : t.common.draft}
                  </Badge>
                  <p className="font-display text-sm font-bold text-slate-900 dark:text-white truncate mt-1.5">
                    {pres.title[lang]}
                  </p>
                  <p className="text-xs text-slate-500 tabular-nums">
                    {pres.slides.length} {t.presentations.slidesCount}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      contentService.savePresentation({ ...pres, published: !pres.published });
                      reload();
                    }}
                  >
                    {pres.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setPresModal(pres)}>
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      setDeleteTarget({
                        label: pres.title[lang],
                        onConfirm: () => {
                          contentService.deletePresentation(pres.id);
                          reload();
                        },
                      })
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 5. TESTS & QUESTIONS CRUD */}
      {activeTab === 'tests' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" onClick={openNewTest}>
              <Plus className="w-4 h-4" />
              <span>{t.teacher.addTest}</span>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tests.map((tst) => (
              <Card key={tst.id} padding="p-4" className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <Badge variant={tst.published ? 'success' : 'neutral'}>
                    {tst.published ? t.common.published : t.common.draft}
                  </Badge>
                  <p className="font-display text-sm font-bold text-slate-900 dark:text-white truncate mt-1.5">
                    {tst.title[lang]}
                  </p>
                  <p className="text-xs text-slate-500 tabular-nums">
                    {tst.questions.length} {t.tests.questionsCount} · {tst.durationMinutes} {t.common.minutes}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      testService.saveTest({ ...tst, published: !tst.published });
                      reload();
                    }}
                  >
                    {tst.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setTestModal(tst)}>
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      setDeleteTarget({
                        label: tst.title[lang],
                        onConfirm: () => {
                          testService.deleteTest(tst.id);
                          reload();
                        },
                      })
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 6. ASSIGNMENTS CRUD */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" onClick={openNewAssign}>
              <Plus className="w-4 h-4" />
              <span>{t.teacher.addAssignment}</span>
            </Button>
          </div>
          <div className="space-y-3">
            {assignments.map((a) => (
              <Card key={a.id} padding="p-4" className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <Badge variant={a.published ? 'success' : 'neutral'}>
                    {a.published ? t.common.published : t.common.draft}
                  </Badge>
                  <p className="font-display text-sm font-bold text-slate-900 dark:text-white truncate mt-1">
                    {a.title[lang]}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      contentService.saveAssignment({ ...a, published: !a.published });
                      reload();
                    }}
                  >
                    {a.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setAssignModal(a)}>
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      setDeleteTarget({
                        label: a.title[lang],
                        onConfirm: () => {
                          contentService.deleteAssignment(a.id);
                          reload();
                        },
                      })
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 7. SUBMISSIONS GRADING */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          {submissions.length === 0 ? (
            <EmptyState title={t.common.noData} />
          ) : (
            submissions.map((sub) => {
              const assign = assignments.find((a) => a.id === sub.assignmentId);
              return (
                <Card key={sub.id} className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-500">
                        {sub.studentName} · {formatDate(sub.submittedAt)}
                      </p>
                      <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                        {assign?.title[lang] || sub.assignmentId}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          sub.status === 'accepted'
                            ? 'success'
                            : sub.status === 'needs_revision'
                            ? 'danger'
                            : 'warning'
                        }
                      >
                        {t.practical.statuses[sub.status]}
                        {sub.grade !== undefined ? ` · ${sub.grade}/100` : ''}
                      </Badge>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => {
                          setGradingSub(sub);
                          setGradeVal(sub.grade ?? 90);
                          setGradeStatus(sub.status === 'submitted' ? 'accepted' : sub.status);
                          setGradeFeedback(sub.feedback || '');
                        }}
                      >
                        {t.teacher.gradeSubmission}
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{sub.reportText}</p>
                  {sub.attachmentBase64 && sub.attachmentBase64.startsWith('data:image') && (
                    <img
                      src={sub.attachmentBase64}
                      alt={sub.attachmentName || 'Submission'}
                      className="max-h-48 rounded-lg border border-slate-200 dark:border-slate-700"
                    />
                  )}
                </Card>
              );
            })
          )}
        </div>
      )}

      {/* 8. STUDENTS MANAGEMENT + CSV EXPORT */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="w-full sm:w-80">
              <Input
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder={t.common.search}
              />
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                exportToCsv(
                  'avto-edu-students.csv',
                  ['Name', 'Email', 'XP', 'Streak', 'Completed Lessons', 'Avg Test %'],
                  filteredStudents.map((st) => {
                    const p = contentService.getStudentProgress(st.id);
                    const stAttempts = attempts.filter((a) => a.userId === st.id);
                    const avg =
                      stAttempts.length > 0
                        ? Math.round(stAttempts.reduce((x, y) => x + y.scorePercent, 0) / stAttempts.length)
                        : 0;
                    return [st.name, st.email, st.xp, st.streakDays, p.completedLessonIds.length, avg];
                  })
                );
                showToast(t.common.savedSuccess, 'success');
              }}
            >
              <Download className="w-4 h-4" />
              <span>{t.teacher.exportCsv}</span>
            </Button>
          </div>

          <Table
            emptyMessage={t.common.noData}
            rows={filteredStudents}
            keyExtractor={(s) => s.id}
            columns={[
              { key: 'name', header: t.auth.fullName, render: (s) => <span className="font-medium">{s.name}</span> },
              { key: 'email', header: t.auth.email, render: (s) => s.email },
              {
                key: 'progress',
                header: t.student.overallProgress,
                align: 'right',
                render: (s) => {
                  const p = contentService.getStudentProgress(s.id);
                  const pct = lessons.length > 0 ? Math.round((p.completedLessonIds.length / lessons.length) * 100) : 0;
                  return <span className="font-mono">{pct}%</span>;
                },
              },
              { key: 'xp', header: 'XP', align: 'right', render: (s) => <span className="font-mono">{s.xp}</span> },
              {
                key: 'actions',
                header: t.common.actions,
                align: 'right',
                render: (s) => (
                  <Button size="sm" variant="outline" onClick={() => setInspectStudent(s)}>
                    {t.common.view}
                  </Button>
                ),
              },
            ]}
          />
        </div>
      )}

      {/* 9. CONTACT MESSAGES INBOX */}
      {activeTab === 'messages' && (
        <div className="space-y-3">
          {messages.length === 0 ? (
            <EmptyState title={t.common.noData} icon={<MailOpen className="w-8 h-8" />} />
          ) : (
            messages.map((m) => (
              <Card key={m.id} className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">{m.subject}</h3>
                    <p className="text-xs text-slate-500">
                      {m.name} ({m.email}) · {formatDate(m.createdAt)}
                    </p>
                  </div>
                  {!m.read && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        contentService.markMessageRead(m.id);
                        reload();
                      }}
                    >
                      {t.student.markAllRead}
                    </Button>
                  )}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300">{m.message}</p>
              </Card>
            ))
          )}
        </div>
      )}

      {/* 10. DATA BACKUP & RESET */}
      {activeTab === 'backup' && (
        <Card className="max-w-2xl space-y-5">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            {t.teacher.tabs.backup}
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              onClick={() => {
                const json = exportAllDataAsJson();
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `avto-edu-backup-${new Date().toISOString().slice(0, 10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
                showToast(t.common.savedSuccess, 'success');
              }}
            >
              <Download className="w-4 h-4" />
              <span>{t.teacher.exportJson}</span>
            </Button>

            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-medium cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
              <Upload className="w-4 h-4" />
              <span>{t.teacher.importJson}</span>
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    const ok = importAllDataFromJson(String(reader.result));
                    if (ok) {
                      reload();
                      showToast(t.common.savedSuccess, 'success');
                    } else {
                      showToast(t.common.errorOccurred, 'error');
                    }
                  };
                  reader.readAsText(file);
                }}
              />
            </label>

            <Button variant="danger" onClick={() => setResetModalOpen(true)}>
              <RotateCcw className="w-4 h-4" />
              <span>{t.teacher.resetDemo}</span>
            </Button>
          </div>
        </Card>
      )}

      {/* ── MODALS ── */}
      {/* Lesson Edit Modal */}
      <Modal open={Boolean(lessonModal)} onClose={() => setLessonModal(null)} title={t.teacher.addLesson} size="lg">
        {lessonModal && (
          <form onSubmit={saveLessonForm} className="space-y-4">
            <div className="flex justify-end">
              <LocalizedTabsBar activeLang={editLang} onChange={setEditLang} />
            </div>
            <LocalizedInput
              label="Title"
              value={lessonModal.title}
              onChange={(v) => setLessonModal({ ...lessonModal, title: v })}
              activeLang={editLang}
            />
            <LocalizedInput
              label="Description"
              value={lessonModal.description}
              onChange={(v) => setLessonModal({ ...lessonModal, description: v })}
              activeLang={editLang}
              multiline
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Select
                label="Module"
                value={lessonModal.moduleId}
                onChange={(e) => setLessonModal({ ...lessonModal, moduleId: e.target.value })}
              >
                {modules.map((m) => (
                  <option key={m.id} value={m.id}>{m.title[lang]}</option>
                ))}
              </Select>
              <Input
                label={t.common.minutes}
                type="number"
                value={lessonModal.durationMinutes}
                onChange={(e) => setLessonModal({ ...lessonModal, durationMinutes: Number(e.target.value) })}
              />
              <Select
                label="Video Type"
                value={lessonModal.videoType}
                onChange={(e) => setLessonModal({ ...lessonModal, videoType: e.target.value as 'youtube' | 'file' })}
              >
                <option value="youtube">YouTube URL</option>
                <option value="file">Video File URL / Data</option>
              </Select>
            </div>
            <Input
              label="Video URL"
              value={lessonModal.videoUrl}
              onChange={(e) => setLessonModal({ ...lessonModal, videoUrl: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setLessonModal(null)}>{t.common.cancel}</Button>
              <Button type="submit" variant="primary">{t.common.save}</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Ebook Edit Modal */}
      <Modal open={Boolean(ebookModal)} onClose={() => setEbookModal(null)} title={t.teacher.addEbook} size="lg">
        {ebookModal && (
          <form onSubmit={saveEbookForm} className="space-y-4">
            <div className="flex justify-end">
              <LocalizedTabsBar activeLang={editLang} onChange={setEditLang} />
            </div>
            <LocalizedInput
              label="Title"
              value={ebookModal.title}
              onChange={(v) => setEbookModal({ ...ebookModal, title: v })}
              activeLang={editLang}
            />
            <LocalizedInput
              label="Summary"
              value={ebookModal.summary}
              onChange={(v) => setEbookModal({ ...ebookModal, summary: v })}
              activeLang={editLang}
              multiline
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input
                label="Author"
                value={ebookModal.author}
                onChange={(e) => setEbookModal({ ...ebookModal, author: e.target.value })}
              />
              <Select
                label="Category"
                value={ebookModal.category}
                onChange={(e) => setEbookModal({ ...ebookModal, category: e.target.value as EBook['category'] })}
              >
                <option value="diagnostics">{t.ebooks.catDiagnostics}</option>
                <option value="maintenance">{t.ebooks.catMaintenance}</option>
                <option value="electrical">{t.ebooks.catElectrical}</option>
                <option value="reference">{t.ebooks.catReference}</option>
              </Select>
              <Input
                label={t.common.pages}
                type="number"
                value={ebookModal.pages}
                onChange={(e) => setEbookModal({ ...ebookModal, pages: Number(e.target.value) })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEbookModal(null)}>{t.common.cancel}</Button>
              <Button type="submit" variant="primary">{t.common.save}</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Presentation & Slide Editor Modal */}
      <Modal open={Boolean(presModal)} onClose={() => setPresModal(null)} title={t.teacher.addPresentation} size="xl">
        {presModal && (
          <form onSubmit={savePresForm} className="space-y-4">
            <div className="flex justify-between items-center">
              <Button size="sm" variant="outline" onClick={addSlideToPres}>
                <Plus className="w-4 h-4" />
                <span>{t.teacher.addSlide}</span>
              </Button>
              <LocalizedTabsBar activeLang={editLang} onChange={setEditLang} />
            </div>
            <LocalizedInput
              label="Deck Title"
              value={presModal.title}
              onChange={(v) => setPresModal({ ...presModal, title: v })}
              activeLang={editLang}
            />
            <LocalizedInput
              label="Description"
              value={presModal.description}
              onChange={(v) => setPresModal({ ...presModal, description: v })}
              activeLang={editLang}
            />
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {presModal.slides.map((sl, idx) => (
                <div key={sl.id} className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold">Slide #{idx + 1}</span>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" onClick={() => moveSlide(idx, -1)}><ArrowUp className="w-3.5 h-3.5" /></Button>
                      <Button size="sm" variant="ghost" onClick={() => moveSlide(idx, 1)}><ArrowDown className="w-3.5 h-3.5" /></Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setPresModal({
                            ...presModal,
                            slides: presModal.slides.filter((x) => x.id !== sl.id),
                          })
                        }
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <LocalizedInput
                    label="Slide Title"
                    value={sl.title}
                    onChange={(v) =>
                      setPresModal({
                        ...presModal,
                        slides: presModal.slides.map((x) => (x.id === sl.id ? { ...x, title: v } : x)),
                      })
                    }
                    activeLang={editLang}
                  />
                  <TextArea
                    label={`Bullets (${editLang.toUpperCase()}, 1 per line)`}
                    rows={2}
                    value={(sl.bullets[editLang] || []).join('\n')}
                    onChange={(e) =>
                      setPresModal({
                        ...presModal,
                        slides: presModal.slides.map((x) =>
                          x.id === sl.id
                            ? { ...x, bullets: { ...x.bullets, [editLang]: e.target.value.split('\n') } }
                            : x
                        ),
                      })
                    }
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setPresModal(null)}>{t.common.cancel}</Button>
              <Button type="submit" variant="primary">{t.common.save}</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Test & Question Editor Modal */}
      <Modal open={Boolean(testModal)} onClose={() => setTestModal(null)} title={t.teacher.addTest} size="xl">
        {testModal && (
          <form onSubmit={saveTestForm} className="space-y-4">
            <div className="flex justify-between items-center">
              <Button size="sm" variant="outline" onClick={addQuestionToTest}>
                <Plus className="w-4 h-4" />
                <span>{t.teacher.addQuestion}</span>
              </Button>
              <LocalizedTabsBar activeLang={editLang} onChange={setEditLang} />
            </div>
            <LocalizedInput
              label="Test Title"
              value={testModal.title}
              onChange={(v) => setTestModal({ ...testModal, title: v })}
              activeLang={editLang}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label={t.tests.timeLimit}
                type="number"
                value={testModal.durationMinutes}
                onChange={(e) => setTestModal({ ...testModal, durationMinutes: Number(e.target.value) })}
              />
              <Input
                label={t.tests.passMark}
                type="number"
                value={testModal.passScore}
                onChange={(e) => setTestModal({ ...testModal, passScore: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {testModal.questions.map((q, idx) => (
                <div key={q.id} className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold">Q#{idx + 1}</span>
                    <div className="flex items-center gap-2">
                      <Select
                        value={q.type}
                        onChange={(e) =>
                          setTestModal({
                            ...testModal,
                            questions: testModal.questions.map((x) =>
                              x.id === q.id ? { ...x, type: e.target.value as QuestionType } : x
                            ),
                          })
                        }
                      >
                        <option value="single">Single Choice</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="true_false">True / False</option>
                        <option value="fault_code">Fault Code</option>
                      </Select>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setTestModal({
                            ...testModal,
                            questions: testModal.questions.filter((x) => x.id !== q.id),
                          })
                        }
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <LocalizedInput
                    label="Prompt"
                    value={q.prompt}
                    onChange={(v) =>
                      setTestModal({
                        ...testModal,
                        questions: testModal.questions.map((x) => (x.id === q.id ? { ...x, prompt: v } : x)),
                      })
                    }
                    activeLang={editLang}
                  />
                  {q.type === 'fault_code' && (
                    <Input
                      label="DTC Code Badge (e.g. P0171)"
                      value={q.faultCodeBadge || ''}
                      onChange={(e) =>
                        setTestModal({
                          ...testModal,
                          questions: testModal.questions.map((x) =>
                            x.id === q.id ? { ...x, faultCodeBadge: e.target.value.toUpperCase() } : x
                          ),
                        })
                      }
                    />
                  )}
                  {q.type === 'true_false' && (
                    <Select
                      label={t.tests.correctAnswer}
                      value={q.correctBoolean ? 'true' : 'false'}
                      onChange={(e) =>
                        setTestModal({
                          ...testModal,
                          questions: testModal.questions.map((x) =>
                            x.id === q.id ? { ...x, correctBoolean: e.target.value === 'true' } : x
                          ),
                        })
                      }
                    >
                      <option value="true">{t.tests.trueOption}</option>
                      <option value="false">{t.tests.falseOption}</option>
                    </Select>
                  )}
                  {q.type !== 'true_false' && q.type !== 'matching' && q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isCorrect = q.correctIndices?.includes(optIdx) || false;
                        return (
                          <div key={optIdx} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-slate-600 dark:text-slate-300">
                                Option {optIdx + 1}
                              </span>
                              <label className="inline-flex items-center gap-1 cursor-pointer text-emerald-600 dark:text-emerald-400">
                                <input
                                  type={q.type === 'multiple' ? 'checkbox' : 'radio'}
                                  name={`correct_${q.id}`}
                                  checked={isCorrect}
                                  onChange={() => {
                                    const nextIndices =
                                      q.type === 'multiple'
                                        ? isCorrect
                                          ? (q.correctIndices || []).filter((i) => i !== optIdx)
                                          : [...(q.correctIndices || []), optIdx]
                                        : [optIdx];
                                    setTestModal({
                                      ...testModal,
                                      questions: testModal.questions.map((x) =>
                                        x.id === q.id ? { ...x, correctIndices: nextIndices } : x
                                      ),
                                    });
                                  }}
                                />
                                <span>{t.tests.correctAnswer}</span>
                              </label>
                            </div>
                            <Input
                              value={opt[editLang]}
                              onChange={(e) => {
                                const updatedOpts = q.options!.map((o, i) =>
                                  i === optIdx ? { ...o, [editLang]: e.target.value } : o
                                );
                                setTestModal({
                                  ...testModal,
                                  questions: testModal.questions.map((x) =>
                                    x.id === q.id ? { ...x, options: updatedOpts } : x
                                  ),
                                });
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <LocalizedInput
                    label={t.tests.explanation}
                    value={q.explanation}
                    onChange={(v) =>
                      setTestModal({
                        ...testModal,
                        questions: testModal.questions.map((x) => (x.id === q.id ? { ...x, explanation: v } : x)),
                      })
                    }
                    activeLang={editLang}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setTestModal(null)}>{t.common.cancel}</Button>
              <Button type="submit" variant="primary">{t.common.save}</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Assignment Modal */}
      <Modal open={Boolean(assignModal)} onClose={() => setAssignModal(null)} title={t.teacher.addAssignment} size="lg">
        {assignModal && (
          <form onSubmit={saveAssignForm} className="space-y-4">
            <div className="flex justify-end">
              <LocalizedTabsBar activeLang={editLang} onChange={setEditLang} />
            </div>
            <LocalizedInput
              label="Title"
              value={assignModal.title}
              onChange={(v) => setAssignModal({ ...assignModal, title: v })}
              activeLang={editLang}
            />
            <LocalizedInput
              label="Description"
              value={assignModal.description}
              onChange={(v) => setAssignModal({ ...assignModal, description: v })}
              activeLang={editLang}
              multiline
            />
            <Input
              label={t.common.minutes}
              type="number"
              value={assignModal.estimatedMinutes}
              onChange={(e) => setAssignModal({ ...assignModal, estimatedMinutes: Number(e.target.value) })}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setAssignModal(null)}>{t.common.cancel}</Button>
              <Button type="submit" variant="primary">{t.common.save}</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Submission Grading Modal */}
      <Modal open={Boolean(gradingSub)} onClose={() => setGradingSub(null)} title={t.teacher.gradeSubmission} size="md">
        {gradingSub && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              contentService.gradeSubmission(gradingSub.id, gradeVal, gradeStatus, gradeFeedback);
              setGradingSub(null);
              reload();
              showToast(t.common.savedSuccess, 'success');
            }}
            className="space-y-4"
          >
            <Input
              label={t.teacher.gradeLabel}
              type="number"
              min={0}
              max={100}
              value={gradeVal}
              onChange={(e) => setGradeVal(Number(e.target.value))}
            />
            <Select
              label={t.teacher.statusLabel}
              value={gradeStatus}
              onChange={(e) => setGradeStatus(e.target.value as SubmissionStatus)}
            >
              <option value="under_review">{t.practical.statuses.under_review}</option>
              <option value="accepted">{t.practical.statuses.accepted}</option>
              <option value="needs_revision">{t.practical.statuses.needs_revision}</option>
            </Select>
            <TextArea
              label={t.teacher.feedbackLabel}
              rows={3}
              value={gradeFeedback}
              onChange={(e) => setGradeFeedback(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setGradingSub(null)}>{t.common.cancel}</Button>
              <Button type="submit" variant="primary">{t.common.save}</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Student Detail Modal */}
      <Modal
        open={Boolean(inspectStudent)}
        onClose={() => setInspectStudent(null)}
        title={inspectStudent?.name || ''}
        size="md"
      >
        {inspectStudent && (() => {
          const p = contentService.getStudentProgress(inspectStudent.id);
          const stAttempts = attempts.filter((a) => a.userId === inspectStudent.id);
          return (
            <div className="space-y-4 text-sm">
              <p className="text-slate-600 dark:text-slate-300">{inspectStudent.email}</p>
              <div className="grid grid-cols-3 gap-3 border-y border-slate-200 dark:border-slate-800 py-3">
                <div>
                  <p className="text-xs text-slate-500">XP</p>
                  <p className="font-mono font-bold">{inspectStudent.xp}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">{t.student.streak}</p>
                  <p className="font-mono font-bold">{inspectStudent.streakDays}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">{t.nav.videos}</p>
                  <p className="font-mono font-bold">{p.completedLessonIds.length} / {lessons.length}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">{t.student.tabs.tests}</p>
                {stAttempts.length === 0 ? (
                  <p className="text-xs text-slate-500">{t.common.noData}</p>
                ) : (
                  stAttempts.map((a) => (
                    <div key={a.id} className="flex justify-between text-xs p-2 rounded bg-slate-50 dark:bg-slate-800">
                      <span>{tests.find((x) => x.id === a.testId)?.title[lang] || a.testId}</span>
                      <span className="font-mono font-bold">{a.scorePercent}%</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title={t.common.delete} size="sm">
        {deleteTarget && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {t.common.confirmDelete} <strong>{deleteTarget.label}</strong>
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setDeleteTarget(null)}>
                {t.common.cancel}
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  deleteTarget.onConfirm();
                  setDeleteTarget(null);
                  showToast(t.common.deletedSuccess, 'success');
                }}
              >
                {t.common.yesDelete}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Reset Demo Data Confirmation Modal */}
      <Modal open={resetModalOpen} onClose={() => setResetModalOpen(false)} title={t.teacher.resetDemo} size="sm">
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">{t.teacher.confirmReset}</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setResetModalOpen(false)}>
              {t.common.cancel}
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                resetAllDataToDemo();
                setResetModalOpen(false);
                reload();
                showToast(t.common.savedSuccess, 'success');
              }}
            >
              {t.common.reset}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

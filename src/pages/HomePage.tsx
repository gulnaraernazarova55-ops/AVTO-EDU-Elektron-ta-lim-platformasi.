import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Cpu,
  FileSpreadsheet,
  Play,
  PlayCircle,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button, Card, Input, ProgressBar, TextArea } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { usePageMeta, useT } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';
import { authService } from '../services/authService';
import { contentService } from '../services/contentService';
import { testService } from '../services/testService';

export const HomePage: React.FC = () => {
  const { lang, t, formatNumber } = useT();
  const { user } = useAuth();
  const { showToast } = useToast();
  usePageMeta();

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

  const stats = useMemo(() => {
    const studentsCount = authService.getStudents().length;
    const modules = contentService.getModules();
    const lessons = contentService.getLessons();
    const tests = testService.getTests();
    const totalQuestions = tests.reduce((acc, item) => acc + item.questions.length, 0);
    return {
      studentsCount,
      modulesAndLessons: modules.length + lessons.length,
      videosCount: lessons.length,
      questionsCount: totalQuestions,
    };
  }, []);

  const studentProgressPercent = useMemo(() => {
    if (!user || user.role !== 'student') return null;
    const lessons = contentService.getLessons();
    if (lessons.length === 0) return 0;
    const prog = contentService.getStudentProgress(user.id);
    return Math.round((prog.completedLessonIds.length / lessons.length) * 100);
  }, [user]);

  const latestBooks = useMemo(() => contentService.getEbooks().slice(0, 2), []);
  const latestPresentations = useMemo(() => contentService.getPresentations().slice(0, 2), []);
  const announcements = useMemo(() => contentService.getAnnouncements().slice(0, 2), []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!contactForm.name.trim()) errs.name = t.common.requiredField;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email.trim())) errs.email = t.common.invalidEmail;
    if (!contactForm.subject.trim()) errs.subject = t.common.requiredField;
    if (!contactForm.message.trim()) errs.message = t.common.requiredField;

    if (Object.keys(errs).length > 0) {
      setContactErrors(errs);
      return;
    }

    contentService.addContactMessage({
      name: contactForm.name.trim(),
      email: contactForm.email.trim(),
      subject: contactForm.subject.trim(),
      message: contactForm.message.trim(),
    });
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setContactErrors({});
    showToast(t.home.contactSuccess, 'success');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-6 flex flex-col justify-center space-y-6"
          >
            <p className="text-xs font-semibold tracking-wider text-amber-400">
              AVTO EDU · {t.home.courseModulesCount}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance">
              {t.home.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              {t.home.heroSubtitle}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link to="/videos">
                <Button size="lg" variant="primary">
                  <Play className="w-4 h-4" />
                  <span>{t.home.startLearning}</span>
                </Button>
              </Link>
              <Link to="/videos?lesson=les_1">
                <Button size="lg" variant="outline" className="border-slate-700 bg-slate-800/80 text-white hover:bg-slate-800">
                  <PlayCircle className="w-4 h-4" />
                  <span>{t.home.watchDemo}</span>
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="lg:col-span-6 flex items-stretch">
            <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col justify-between min-h-[280px]">
              <img
                src="/src/assets/images/hero_engine_bay_1794929842360.jpg"
                alt={t.home.heroTitle}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover lg:min-h-[360px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Animated SVG Piston Cycle Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 rounded-xl bg-slate-950/85 backdrop-blur-sm border border-slate-800 p-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <svg width="48" height="44" viewBox="0 0 64 56" fill="none" aria-hidden="true" className="shrink-0">
                    <rect x="6" y="4" width="22" height="44" rx="3" stroke="#475569" strokeWidth="2" fill="#0F172A" />
                    <g className="animate-piston">
                      <rect x="9" y="10" width="16" height="12" rx="2" fill="#F8FAFC" />
                      <rect x="15" y="22" width="4" height="14" rx="1" fill="#EA580C" />
                    </g>
                    <rect x="36" y="4" width="22" height="44" rx="3" stroke="#475569" strokeWidth="2" fill="#0F172A" />
                    <g className="animate-piston-alt">
                      <rect x="39" y="10" width="16" height="12" rx="2" fill="#F8FAFC" />
                      <rect x="45" y="22" width="4" height="14" rx="1" fill="#F59E0B" />
                    </g>
                  </svg>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-amber-400 truncate">DOHC 4-Cylinder Cycle</p>
                    <p className="text-xs text-slate-300 truncate">{t.home.courseDuration}</p>
                  </div>
                </div>
                <Link to="/practical?tab=diagram" className="text-xs font-medium text-white hover:text-amber-400 whitespace-nowrap shrink-0 flex items-center gap-1">
                  <span>{t.practical.tabs.diagram}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Live Data Statistics Strip */}
        <div className="border-t border-slate-800 bg-slate-950/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold tabular-nums text-white">
                {formatNumber(stats.studentsCount)}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{t.home.statStudents}</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold tabular-nums text-amber-400">
                {formatNumber(stats.modulesAndLessons)}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{t.home.statLessons}</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold tabular-nums text-white">
                {formatNumber(stats.videosCount)}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{t.home.statVideos}</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold tabular-nums text-orange-500">
                {formatNumber(stats.questionsCount)}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{t.home.statTests}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview + Announcements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-orange-600 dark:text-amber-400">
              {t.home.courseOverviewTitle}
            </p>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white text-balance">
              {t.home.courseTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.home.courseDesc}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span>{t.home.courseLevel}</span>
              <span aria-hidden="true">·</span>
              <span>{t.home.courseDuration}</span>
            </div>
          </div>

          {studentProgressPercent !== null && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <ProgressBar value={studentProgressPercent} label={t.home.yourProgress} />
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Link to="/videos">
              <Button variant="primary">
                {studentProgressPercent !== null ? t.home.continueCourse : t.home.startLearning}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/tests">
              <Button variant="outline">{t.nav.tests}</Button>
            </Link>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
            {t.home.latestMaterialsTitle}
          </h3>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {announcements.map((ann) => (
              <div key={ann.id} className="py-3 first:pt-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{ann.title[lang]}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{ann.body[lang]}</p>
              </div>
            ))}
            {latestBooks.map((book) => (
              <Link
                key={book.id}
                to={`/ebooks?id=${book.id}`}
                className="py-3 flex items-center gap-3 hover:text-orange-600 dark:hover:text-amber-400 transition-colors"
              >
                <BookOpen className="w-4 h-4 shrink-0 text-orange-600 dark:text-amber-400" />
                <span className="text-sm font-medium truncate">{book.title[lang]}</span>
              </Link>
            ))}
            {latestPresentations.map((pres) => (
              <Link
                key={pres.id}
                to={`/presentations?id=${pres.id}`}
                className="py-3 flex items-center gap-3 hover:text-orange-600 dark:hover:text-amber-400 transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4 shrink-0 text-sky-600 dark:text-sky-400" />
                <span className="text-sm font-medium truncate">{pres.title[lang]}</span>
              </Link>
            ))}
          </div>
        </Card>
      </section>

      {/* Learning Path Timeline */}
      <section className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t.home.learningPathTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {t.home.learningPathSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {t.home.pathSteps.map((step, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 space-y-2"
              >
                <p className="font-display text-sm font-bold text-orange-600 dark:text-amber-400">
                  {step.title}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Why AVTO EDU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {t.home.featuresTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.home.featuresList.map((feat, idx) => (
              <Card key={idx} className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-amber-400 flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {t.home.whyTitle}
          </h2>
          <div className="space-y-4">
            {t.home.whyList.map((w, idx) => (
              <Card key={idx} padding="p-5" className="flex items-start gap-3.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                    {w.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{w.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor & FAQ */}
      <section className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              {t.home.teacherTitle}
            </h2>
            <Card className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src="/src/assets/images/teacher_portrait_1794929843807.jpg"
                  alt={t.home.teacherName}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {t.home.teacherName}
                  </h3>
                  <p className="text-xs font-medium text-orange-600 dark:text-amber-400 mt-0.5">
                    {t.home.teacherRole}
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.home.teacherBio}
              </p>
            </Card>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              {t.home.faqTitle}
            </h2>
            <div className="space-y-2.5">
              {t.home.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-medium text-sm text-slate-900 dark:text-white cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <Card className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              {t.home.contactTitle}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t.home.contactSubtitle}
            </p>
          </div>
          <form onSubmit={handleContactSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={t.home.contactName}
                value={contactForm.name}
                onChange={(e) => setContactForm((f) => ({ ...f, name: e.target.value }))}
                error={contactErrors.name}
              />
              <Input
                label={t.home.contactEmail}
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                error={contactErrors.email}
              />
            </div>
            <Input
              label={t.home.contactSubject}
              value={contactForm.subject}
              onChange={(e) => setContactForm((f) => ({ ...f, subject: e.target.value }))}
              error={contactErrors.subject}
            />
            <TextArea
              label={t.home.contactMessage}
              rows={4}
              value={contactForm.message}
              onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
              error={contactErrors.message}
            />
            <Button type="submit" variant="primary">
              <Send className="w-4 h-4" />
              <span>{t.home.contactSend}</span>
            </Button>
          </form>
        </Card>
      </section>
    </div>
  );
};

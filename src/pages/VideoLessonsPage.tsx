import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  MessageSquare,
  Pause,
  PictureInPicture2,
  Play,
  PlayCircle,
  Save,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Breadcrumbs,
  Button,
  Card,
  EmptyState,
  ProgressBar,
  Tabs,
  TextArea,
} from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { usePageMeta, useT } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';
import { contentService } from '../services/contentService';
import { CourseModule, Lesson, LessonComment } from '../types';

function extractYoutubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.slice(1) || null;
    }
    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname.startsWith('/embed/')) return parsed.pathname.split('/embed/')[1];
      return parsed.searchParams.get('v');
    }
  } catch {
    return null;
  }
  return null;
}

export const VideoLessonsPage: React.FC = () => {
  const { lang, t, formatDate } = useT();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  usePageMeta(t.videos.title, t.videos.subtitle);

  const [modules] = useState<CourseModule[]>(() => contentService.getModules().filter((m) => m.published));
  const [lessons] = useState<Lesson[]>(() => contentService.getLessons());

  const initialLessonId = searchParams.get('lesson') || lessons[0]?.id || '';
  const [activeLessonId, setActiveLessonId] = useState<string>(initialLessonId);

  const activeLesson = useMemo(
    () => lessons.find((l) => l.id === activeLessonId) || lessons[0] || null,
    [lessons, activeLessonId]
  );

  const [activeTab, setActiveTab] = useState<'overview' | 'materials' | 'notes' | 'qa'>('overview');
  const [progress, setProgress] = useState(() =>
    user ? contentService.getStudentProgress(user.id) : null
  );

  const [noteDraft, setNoteDraft] = useState('');
  const [comments, setComments] = useState<LessonComment[]>([]);
  const [questionText, setQuestionText] = useState('');

  // Custom HTML5 video player state (when videoType === 'file')
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [youtubeSpeed, setYoutubeSpeed] = useState(1);

  useEffect(() => {
    const paramLesson = searchParams.get('lesson');
    if (paramLesson && lessons.some((l) => l.id === paramLesson)) {
      setActiveLessonId(paramLesson);
    }
  }, [searchParams, lessons]);

  useEffect(() => {
    if (!activeLesson) return;
    setComments(contentService.getLessonComments(activeLesson.id));
    if (user) {
      const p = contentService.getStudentProgress(user.id);
      setProgress(p);
      setNoteDraft(p.lessonNotes[activeLesson.id] || '');
    } else {
      setNoteDraft('');
    }
    setIsPlaying(false);
    setCurrentTime(0);
  }, [activeLesson, user]);

  // Keyboard shortcuts for HTML5 video
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (!videoRef.current || activeLesson?.videoType !== 'file') return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (videoRef.current.paused) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      } else if (e.key === 'ArrowRight') {
        videoRef.current.currentTime = Math.min(videoRef.current.duration || 0, videoRef.current.currentTime + 5);
      } else if (e.key === 'ArrowLeft') {
        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
      } else if (e.key.toLowerCase() === 'f') {
        playerWrapperRef.current?.requestFullscreen?.().catch(() => {});
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeLesson]);

  const selectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setSearchParams({ lesson: lessonId });
  };

  const handleToggleComplete = () => {
    if (!user || !activeLesson) {
      showToast(t.auth.authRequired, 'info');
      return;
    }
    const next = contentService.toggleLessonComplete(user.id, activeLesson.id);
    setProgress(next);
    showToast(t.common.savedSuccess, 'success');
  };

  const handleSaveNotes = () => {
    if (!user || !activeLesson) {
      showToast(t.auth.authRequired, 'info');
      return;
    }
    const next = contentService.updateStudentProgress(user.id, (prev) => ({
      ...prev,
      lessonNotes: { ...prev.lessonNotes, [activeLesson.id]: noteDraft },
    }));
    setProgress(next);
    showToast(t.common.savedSuccess, 'success');
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !activeLesson) {
      showToast(t.auth.authRequired, 'info');
      return;
    }
    if (!questionText.trim()) return;
    contentService.addLessonComment({
      lessonId: activeLesson.id,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      text: questionText.trim(),
    });
    setQuestionText('');
    setComments(contentService.getLessonComments(activeLesson.id));
    showToast(t.common.savedSuccess, 'success');
  };

  const completedIds = progress?.completedLessonIds ?? [];
  const overallProgress = lessons.length > 0 ? Math.round((completedIds.length / lessons.length) * 100) : 0;

  const activeIdx = activeLesson ? lessons.findIndex((l) => l.id === activeLesson.id) : -1;
  const prevLesson = activeIdx > 0 ? lessons[activeIdx - 1] : null;
  const nextLesson = activeIdx >= 0 && activeIdx < lessons.length - 1 ? lessons[activeIdx + 1] : null;

  const allEbooks = useMemo(() => contentService.getEbooks(), []);
  const allPresentations = useMemo(() => contentService.getPresentations(), []);

  const youtubeId = activeLesson?.videoType === 'youtube' ? extractYoutubeId(activeLesson.videoUrl) : null;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Breadcrumbs items={[{ label: t.nav.home, to: '/' }, { label: t.nav.videos }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {t.videos.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{t.videos.subtitle}</p>
        </div>
        <div className="w-full md:w-72">
          <ProgressBar
            value={overallProgress}
            label={`${t.videos.courseProgress} (${completedIds.length}/${lessons.length})`}
          />
        </div>
      </div>

      {!activeLesson ? (
        <EmptyState title={t.common.noData} icon={<PlayCircle className="w-8 h-8" />} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Player + Lesson Details */}
          <div className="lg:col-span-8 space-y-5">
            <Card padding="p-0" className="overflow-hidden">
              <div ref={playerWrapperRef} className="bg-slate-950 relative">
                {activeLesson.videoType === 'youtube' && youtubeId ? (
                  <div className="aspect-video w-full">
                    <iframe
                      key={`${activeLesson.id}_${youtubeSpeed}`}
                      src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                      title={activeLesson.title[lang]}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full relative bg-black">
                    <video
                      ref={videoRef}
                      src={activeLesson.videoUrl}
                      className="w-full h-full"
                      onLoadedMetadata={() => {
                        if (!videoRef.current) return;
                        setDuration(videoRef.current.duration || 0);
                        const savedPos = progress?.lessonPositions[activeLesson.id];
                        if (savedPos && savedPos < (videoRef.current.duration || 0)) {
                          videoRef.current.currentTime = savedPos;
                        }
                      }}
                      onTimeUpdate={() => {
                        if (!videoRef.current) return;
                        const cur = videoRef.current.currentTime;
                        setCurrentTime(cur);
                        if (user && Math.floor(cur) % 5 === 0) {
                          contentService.updateStudentProgress(user.id, (prev) => ({
                            ...prev,
                            lessonPositions: { ...prev.lessonPositions, [activeLesson.id]: Math.floor(cur) },
                          }));
                        }
                      }}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                  </div>
                )}

                {/* Custom Control Bar for HTML5 file videos OR external fallback bar for YouTube */}
                {activeLesson.videoType === 'file' ? (
                  <div className="px-4 py-3 bg-slate-900 text-white space-y-2 border-t border-slate-800">
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      value={currentTime}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (videoRef.current) videoRef.current.currentTime = val;
                        setCurrentTime(val);
                      }}
                      aria-label="Seek"
                      className="w-full accent-orange-500 cursor-pointer"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (!videoRef.current) return;
                            if (videoRef.current.paused) videoRef.current.play();
                            else videoRef.current.pause();
                          }}
                          className="p-1.5 rounded bg-orange-600 hover:bg-orange-700 cursor-pointer"
                          aria-label={t.videos.playPause}
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <span className="font-mono tabular-nums text-slate-300">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (!videoRef.current) return;
                            videoRef.current.muted = !muted;
                            setMuted(!muted);
                          }}
                          className="p-1 text-slate-300 hover:text-white cursor-pointer"
                        >
                          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.1}
                          value={muted ? 0 : volume}
                          onChange={(e) => {
                            const v = Number(e.target.value);
                            setVolume(v);
                            if (videoRef.current) videoRef.current.volume = v;
                          }}
                          aria-label="Volume"
                          className="w-16 accent-orange-500"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={playbackRate}
                          onChange={(e) => {
                            const rate = Number(e.target.value);
                            setPlaybackRate(rate);
                            if (videoRef.current) videoRef.current.playbackRate = rate;
                          }}
                          aria-label={t.videos.speed}
                          className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs"
                        >
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((r) => (
                            <option key={r} value={r}>{r}x</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => videoRef.current?.requestPictureInPicture?.().catch(() => {})}
                          title={t.videos.pip}
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 cursor-pointer"
                        >
                          <PictureInPicture2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => playerWrapperRef.current?.requestFullscreen?.().catch(() => {})}
                          title={t.videos.fullscreen}
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 cursor-pointer"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400">{t.videos.shortcutsHint}</p>
                  </div>
                ) : (
                  <div className="px-4 py-2.5 bg-slate-900 text-slate-300 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span>{t.videos.embedFallback}</span>
                    <a
                      href={activeLesson.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium whitespace-nowrap"
                    >
                      <span>{t.videos.openYoutube}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                      {activeLesson.durationMinutes} {t.common.minutes}
                    </p>
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                      {activeLesson.title[lang]}
                    </h2>
                  </div>
                  <Button
                    size="sm"
                    variant={completedIds.includes(activeLesson.id) ? 'secondary' : 'primary'}
                    onClick={handleToggleComplete}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {completedIds.includes(activeLesson.id) ? t.videos.completed : t.videos.markComplete}
                    </span>
                  </Button>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!prevLesson}
                    onClick={() => prevLesson && selectLesson(prevLesson.id)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{t.videos.prevLesson}</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!nextLesson}
                    onClick={() => nextLesson && selectLesson(nextLesson.id)}
                  >
                    <span>{t.videos.nextLesson}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Lesson Tabs */}
            <Tabs
              activeTab={activeTab}
              onChange={setActiveTab}
              tabs={[
                { id: 'overview', label: t.videos.descriptionTab },
                { id: 'materials', label: t.videos.materialsTab },
                { id: 'notes', label: t.videos.notesTab },
                { id: 'qa', label: `${t.videos.qaTab} (${comments.length})` },
              ]}
            />

            {activeTab === 'overview' && (
              <Card className="space-y-4">
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeLesson.description[lang]}
                </p>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                    {t.videos.keyTakeaways}
                  </h3>
                  <ul className="space-y-2">
                    {(activeLesson.keyTakeaways[lang] || activeLesson.keyTakeaways.en).map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            )}

            {activeTab === 'materials' && (
              <Card className="space-y-3">
                {activeLesson.attachedMaterialIds.length === 0 ? (
                  <p className="text-sm text-slate-500">{t.common.noData}</p>
                ) : (
                  activeLesson.attachedMaterialIds.map((matId) => {
                    const book = allEbooks.find((b) => b.id === matId);
                    if (book) {
                      return (
                        <Link
                          key={matId}
                          to={`/ebooks?id=${book.id}`}
                          className="flex items-center justify-between gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-orange-500 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <BookOpen className="w-4 h-4 text-orange-600 shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">{book.title[lang]}</p>
                              <p className="text-xs text-slate-500">{book.sizeLabel}</p>
                            </div>
                          </div>
                          <span className="text-xs font-medium text-orange-600 dark:text-amber-400">{t.common.view}</span>
                        </Link>
                      );
                    }
                    const pres = allPresentations.find((p) => p.id === matId);
                    if (pres) {
                      return (
                        <Link
                          key={matId}
                          to={`/presentations?id=${pres.id}`}
                          className="flex items-center justify-between gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-orange-500 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <PlayCircle className="w-4 h-4 text-sky-600 shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">{pres.title[lang]}</p>
                              <p className="text-xs text-slate-500">{pres.slides.length} {t.presentations.slidesCount}</p>
                            </div>
                          </div>
                          <span className="text-xs font-medium text-orange-600 dark:text-amber-400">{t.common.view}</span>
                        </Link>
                      );
                    }
                    return null;
                  })
                )}
              </Card>
            )}

            {activeTab === 'notes' && (
              <Card className="space-y-4">
                <TextArea
                  rows={5}
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  placeholder={t.videos.notesPlaceholder}
                />
                <Button size="sm" variant="primary" onClick={handleSaveNotes}>
                  <Save className="w-4 h-4" />
                  <span>{t.videos.saveNotes}</span>
                </Button>
              </Card>
            )}

            {activeTab === 'qa' && (
              <Card className="space-y-5">
                <form onSubmit={handlePostQuestion} className="space-y-3">
                  <TextArea
                    rows={3}
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder={t.videos.askQuestion}
                  />
                  <Button type="submit" size="sm" variant="primary">
                    <MessageSquare className="w-4 h-4" />
                    <span>{t.videos.postQuestion}</span>
                  </Button>
                </form>

                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {comments.length === 0 ? (
                    <p className="text-sm text-slate-500 py-4">{t.common.noData}</p>
                  ) : (
                    comments.map((c) => (
                      <div key={c.id} className="py-4 space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-semibold text-slate-900 dark:text-white">{c.userName}</span>
                          <span>{formatDate(c.createdAt)}</span>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{c.text}</p>
                        {c.reply && (
                          <div className="mt-2 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 p-3 space-y-1">
                            <p className="text-xs font-semibold text-orange-600 dark:text-amber-400">
                              {t.videos.teacherReply} · {c.reply.teacherName}
                            </p>
                            <p className="text-sm text-slate-700 dark:text-slate-200">{c.reply.text}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Module & Lesson Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
              {t.videos.modulesTitle}
            </h3>
            <div className="space-y-3">
              {modules.map((mod) => {
                const modLessons = lessons.filter((l) => l.moduleId === mod.id);
                const modCompleted = modLessons.filter((l) => completedIds.includes(l.id)).length;
                const modPct = modLessons.length > 0 ? Math.round((modCompleted / modLessons.length) * 100) : 0;

                return (
                  <Card key={mod.id} padding="p-4" className="space-y-3">
                    <div>
                      <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                        {mod.title[lang]}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {mod.description[lang]}
                      </p>
                    </div>
                    <ProgressBar value={modPct} showPercent label={`${modCompleted}/${modLessons.length}`} />
                    <div className="space-y-1.5 pt-1">
                      {modLessons.map((les) => {
                        const isActive = les.id === activeLesson.id;
                        const isDone = completedIds.includes(les.id);
                        return (
                          <button
                            key={les.id}
                            type="button"
                            onClick={() => selectLesson(les.id)}
                            className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                              isActive
                                ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-amber-300 font-semibold border border-orange-500/40'
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              <CheckCircle2
                                className={`w-4 h-4 shrink-0 ${
                                  isDone ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-700'
                                }`}
                              />
                              <span className="truncate">{les.title[lang]}</span>
                            </span>
                            <span className="tabular-nums text-slate-400 shrink-0">
                              {les.durationMinutes}m
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

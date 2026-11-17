import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileDown,
  FileSpreadsheet,
  Maximize2,
  Minimize2,
  Presentation as PresentationIcon,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { SlideDiagram } from '../components/SlideDiagram';
import { Breadcrumbs, Button, Card, EmptyState } from '../components/ui';
import { usePageMeta, useT } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';
import { contentService } from '../services/contentService';
import { Presentation } from '../types';
import { downloadPresentationPdf } from '../utils/pdfGenerator';
import { downloadPresentationPptx } from '../utils/pptxGenerator';

export const PresentationsPage: React.FC = () => {
  const { lang, t } = useT();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  usePageMeta(t.presentations.title, t.presentations.subtitle);

  const [presentations] = useState<Presentation[]>(() => contentService.getPresentations());
  const [activePres, setActivePres] = useState<Presentation | null>(() => presentations[0] ?? null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const idParam = searchParams.get('id');
    if (idParam) {
      const found = presentations.find((p) => p.id === idParam);
      if (found) {
        setActivePres(found);
        setSlideIdx(0);
      }
    }
  }, [searchParams, presentations]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!activePres) return;
      if (e.key === 'ArrowRight') {
        setSlideIdx((i) => Math.min(activePres.slides.length - 1, i + 1));
      } else if (e.key === 'ArrowLeft') {
        setSlideIdx((i) => Math.max(0, i - 1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activePres]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!viewerRef.current) return;
    if (!document.fullscreenElement) {
      await viewerRef.current.requestFullscreen().catch(() => {});
    } else {
      await document.exitFullscreen().catch(() => {});
    }
  };

  const handlePptxDownload = async (pres: Presentation) => {
    try {
      await downloadPresentationPptx(pres, lang);
      showToast(`${pres.title[lang]} (.pptx)`, 'success');
    } catch {
      showToast(t.common.errorOccurred, 'error');
    }
  };

  const currentSlide = activePres?.slides[slideIdx];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Breadcrumbs items={[{ label: t.nav.home, to: '/' }, { label: t.nav.presentations }]} />

      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          {t.presentations.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{t.presentations.subtitle}</p>
      </div>

      {presentations.length === 0 ? (
        <EmptyState title={t.common.noData} icon={<PresentationIcon className="w-8 h-8" />} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Deck Selector List */}
          <div className="lg:col-span-4 space-y-3">
            {presentations.map((pres) => {
              const selected = activePres?.id === pres.id;
              return (
                <Card
                  key={pres.id}
                  padding="p-4"
                  className={`transition-colors ${
                    selected ? 'border-orange-600 dark:border-amber-500 ring-1 ring-orange-600/30' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActivePres(pres);
                      setSlideIdx(0);
                    }}
                    className="w-full text-left space-y-1.5 cursor-pointer"
                  >
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {pres.moduleRef} · <span className="tabular-nums">{pres.slides.length}</span> {t.presentations.slidesCount}
                    </p>
                    <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">
                      {pres.title[lang]}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {pres.description[lang]}
                    </p>
                  </button>
                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <Button size="sm" variant="outline" onClick={() => handlePptxDownload(pres)}>
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>{t.presentations.downloadPptx}</span>
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => downloadPresentationPdf(pres, lang)}>
                      <FileDown className="w-3.5 h-3.5" />
                      <span>{t.presentations.downloadPdf}</span>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Interactive Slide Viewer */}
          {activePres && currentSlide && (
            <div ref={viewerRef} className="lg:col-span-8 space-y-4 bg-slate-50 dark:bg-slate-950 rounded-xl p-1">
              <Card padding="p-0" className="overflow-hidden">
                {/* Slide Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-slate-900 text-white border-b border-slate-800">
                  <div className="min-w-0">
                    <p className="text-xs text-amber-400 font-semibold truncate">{activePres.title[lang]}</p>
                    <p className="text-xs text-slate-400 tabular-nums">
                      {t.presentations.slideProgress} {slideIdx + 1} / {activePres.slides.length} · {t.presentations.keyboardHint}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="secondary" onClick={() => handlePptxDownload(activePres)}>
                      <Download className="w-3.5 h-3.5" />
                      <span>.PPTX</span>
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700" onClick={toggleFullscreen}>
                      {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">
                        {isFullscreen ? t.presentations.exitFullscreen : t.presentations.fullscreen}
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Slide Canvas */}
                <div className="p-6 sm:p-8 min-h-[340px] flex flex-col justify-between bg-white dark:bg-slate-900">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className={`${currentSlide.diagramType ? 'md:col-span-7' : 'md:col-span-12'} space-y-4`}>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {currentSlide.title[lang]}
                      </h3>
                      <ul className="space-y-3">
                        {(currentSlide.bullets[lang] || currentSlide.bullets.en).map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-orange-600 dark:bg-amber-400 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {currentSlide.diagramType && (
                      <div className="md:col-span-5">
                        <SlideDiagram type={currentSlide.diagramType} />
                      </div>
                    )}
                  </div>

                  {/* Speaker Notes */}
                  {currentSlide.notes[lang] && (
                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-slate-900 dark:text-slate-200">
                        {t.presentations.speakerNotes}:{' '}
                      </span>
                      {currentSlide.notes[lang]}
                    </div>
                  )}
                </div>

                {/* Slide Navigation & Thumbnails */}
                <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={slideIdx === 0}
                      onClick={() => setSlideIdx((i) => Math.max(0, i - 1))}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>{t.common.previous}</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={slideIdx >= activePres.slides.length - 1}
                      onClick={() => setSlideIdx((i) => Math.min(activePres.slides.length - 1, i + 1))}
                    >
                      <span>{t.common.next}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto">
                    {activePres.slides.map((s, idx) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSlideIdx(idx)}
                        className={`px-2.5 py-1 rounded-md text-xs font-mono tabular-nums cursor-pointer transition-colors ${
                          idx === slideIdx
                            ? 'bg-orange-600 text-white font-semibold'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, Cpu, FileSpreadsheet, PlayCircle, Search, ClipboardCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useT } from '../context/I18nContext';
import { contentService } from '../services/contentService';
import { testService } from '../services/testService';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => {
  const { lang, t } = useT();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (open) onClose();
      }
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const lessons = contentService.getLessons();
    const ebooks = contentService.getEbooks();
    const presentations = contentService.getPresentations();
    const tests = testService.getTests();
    const dtcs = contentService.getDtcCodes();

    const items: {
      id: string;
      category: string;
      title: string;
      subtitle: string;
      to: string;
      icon: React.ReactNode;
    }[] = [];

    lessons.forEach((l) => {
      if (!q || l.title[lang].toLowerCase().includes(q) || l.description[lang].toLowerCase().includes(q)) {
        items.push({
          id: `les_${l.id}`,
          category: t.nav.videos,
          title: l.title[lang],
          subtitle: `${l.durationMinutes} ${t.common.minutes}`,
          to: `/videos?lesson=${l.id}`,
          icon: <PlayCircle className="w-4 h-4 text-orange-500" />,
        });
      }
    });

    ebooks.forEach((b) => {
      if (!q || b.title[lang].toLowerCase().includes(q) || b.tags.some((tg) => tg.toLowerCase().includes(q))) {
        items.push({
          id: `book_${b.id}`,
          category: t.nav.ebooks,
          title: b.title[lang],
          subtitle: `${b.author} · ${b.pages} ${t.common.pages}`,
          to: `/ebooks?id=${b.id}`,
          icon: <BookOpen className="w-4 h-4 text-sky-500" />,
        });
      }
    });

    presentations.forEach((p) => {
      if (!q || p.title[lang].toLowerCase().includes(q)) {
        items.push({
          id: `pres_${p.id}`,
          category: t.nav.presentations,
          title: p.title[lang],
          subtitle: `${p.slides.length} ${t.presentations.slidesCount}`,
          to: `/presentations?id=${p.id}`,
          icon: <FileSpreadsheet className="w-4 h-4 text-emerald-500" />,
        });
      }
    });

    tests.forEach((tst) => {
      if (!q || tst.title[lang].toLowerCase().includes(q)) {
        items.push({
          id: `test_${tst.id}`,
          category: t.nav.tests,
          title: tst.title[lang],
          subtitle: `${tst.questions.length} ${t.tests.questionsCount}`,
          to: `/tests?id=${tst.id}`,
          icon: <ClipboardCheck className="w-4 h-4 text-amber-500" />,
        });
      }
    });

    dtcs.forEach((d) => {
      if (!q || d.code.toLowerCase().includes(q) || d.meaning[lang].toLowerCase().includes(q)) {
        items.push({
          id: `dtc_${d.code}`,
          category: 'OBD-II DTC',
          title: `${d.code} — ${d.meaning[lang]}`,
          subtitle: d.causes[lang][0] || '',
          to: `/practical?tab=obd&code=${d.code}`,
          icon: <Cpu className="w-4 h-4 text-red-500" />,
        });
      }
    });

    return items.slice(0, 14);
  }, [query, lang, t]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-slate-950/70 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t.common.search}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.nav.searchPlaceholder}
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t.common.close}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/70">
          {results.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
              {t.common.noData}
            </div>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  navigate(item.to);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <span className="shrink-0">{item.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {item.category} · {item.subtitle}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

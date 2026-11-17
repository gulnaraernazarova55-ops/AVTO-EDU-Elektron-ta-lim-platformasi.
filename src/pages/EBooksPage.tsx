import React, { useEffect, useMemo, useState } from 'react';
import {
  Bookmark,
  BookOpen,
  CheckCircle2,
  Download,
  Eye,
  LayoutGrid,
  List,
  Search,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import {
  Breadcrumbs,
  Button,
  Card,
  EmptyState,
  Modal,
  ProgressBar,
  Select,
} from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { usePageMeta, useT } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';
import { contentService } from '../services/contentService';
import { EBook, Language } from '../types';
import { downloadEbookPdf, generateEbookPdfBlobUrl } from '../utils/pdfGenerator';

export const EBooksPage: React.FC = () => {
  const { lang, t } = useT();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  usePageMeta(t.ebooks.title, t.ebooks.subtitle);

  const [ebooks] = useState<EBook[]>(() => contentService.getEbooks());
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [langFilter, setLangFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'title' | 'pages'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [activeBook, setActiveBook] = useState<EBook | null>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  const [progressState, setProgressState] = useState(() =>
    user ? contentService.getStudentProgress(user.id) : null
  );

  useEffect(() => {
    const idParam = searchParams.get('id');
    if (idParam) {
      const found = ebooks.find((b) => b.id === idParam);
      if (found) openPdfModal(found);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    return () => {
      if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
    };
  }, [pdfBlobUrl]);

  const openPdfModal = (book: EBook) => {
    if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
    const url = generateEbookPdfBlobUrl(book, lang);
    setPdfBlobUrl(url);
    setActiveBook(book);
    if (user) {
      const updated = contentService.updateStudentProgress(user.id, (prev) => ({
        ...prev,
        ebookProgress: { ...prev.ebookProgress, [book.id]: Math.max(prev.ebookProgress[book.id] || 0, 50) },
      }));
      setProgressState(updated);
    }
  };

  const closePdfModal = () => {
    setActiveBook(null);
    if (pdfBlobUrl) {
      URL.revokeObjectURL(pdfBlobUrl);
      setPdfBlobUrl(null);
    }
  };

  const toggleBookmark = (bookId: string) => {
    if (!user) {
      showToast(t.auth.authRequired, 'info');
      return;
    }
    const updated = contentService.updateStudentProgress(user.id, (prev) => {
      const exists = prev.bookmarkedEbookIds.includes(bookId);
      return {
        ...prev,
        bookmarkedEbookIds: exists
          ? prev.bookmarkedEbookIds.filter((id) => id !== bookId)
          : [...prev.bookmarkedEbookIds, bookId],
      };
    });
    setProgressState(updated);
    showToast(t.common.savedSuccess, 'success');
  };

  const toggleMarkRead = (bookId: string) => {
    if (!user) {
      showToast(t.auth.authRequired, 'info');
      return;
    }
    const updated = contentService.updateStudentProgress(user.id, (prev) => {
      const exists = prev.readEbookIds.includes(bookId);
      return {
        ...prev,
        readEbookIds: exists
          ? prev.readEbookIds.filter((id) => id !== bookId)
          : [...prev.readEbookIds, bookId],
        ebookProgress: {
          ...prev.ebookProgress,
          [bookId]: exists ? 0 : 100,
        },
      };
    });
    setProgressState(updated);
    showToast(t.common.savedSuccess, 'success');
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ebooks
      .filter((b) => {
        if (category !== 'all' && b.category !== category) return false;
        if (langFilter !== 'all' && b.language !== 'all' && b.language !== langFilter) return false;
        if (
          q &&
          !b.title[lang].toLowerCase().includes(q) &&
          !b.author.toLowerCase().includes(q) &&
          !b.tags.some((tg) => tg.toLowerCase().includes(q))
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'title') return a.title[lang].localeCompare(b.title[lang]);
        if (sortBy === 'pages') return b.pages - a.pages;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [ebooks, category, langFilter, query, sortBy, lang]);

  const categoryLabels: Record<EBook['category'], string> = {
    diagnostics: t.ebooks.catDiagnostics,
    maintenance: t.ebooks.catMaintenance,
    electrical: t.ebooks.catElectrical,
    reference: t.ebooks.catReference,
  };

  const readCount = progressState?.readEbookIds.length ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Breadcrumbs items={[{ label: t.nav.home, to: '/' }, { label: t.nav.ebooks }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {t.ebooks.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{t.ebooks.subtitle}</p>
        </div>
        {user && (
          <div className="w-full md:w-64">
            <ProgressBar
              value={ebooks.length > 0 ? (readCount / ebooks.length) * 100 : 0}
              label={`${t.ebooks.readingProgress} (${readCount}/${ebooks.length})`}
            />
          </div>
        )}
      </div>

      {/* Filters Toolbar */}
      <Card padding="p-4" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        <div className="lg:col-span-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.common.search}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="lg:col-span-3">
          <Select value={category} onChange={(e) => setCategory(e.target.value)} aria-label={t.common.filter}>
            <option value="all">{t.ebooks.categoryAll}</option>
            <option value="diagnostics">{t.ebooks.catDiagnostics}</option>
            <option value="maintenance">{t.ebooks.catMaintenance}</option>
            <option value="electrical">{t.ebooks.catElectrical}</option>
            <option value="reference">{t.ebooks.catReference}</option>
          </Select>
        </div>
        <div className="lg:col-span-2">
          <Select value={langFilter} onChange={(e) => setLangFilter(e.target.value as Language | 'all')} aria-label="Language">
            <option value="all">{t.ebooks.langAll}</option>
            <option value="uz">UZ</option>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </Select>
        </div>
        <div className="lg:col-span-2">
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'newest' | 'title' | 'pages')} aria-label="Sort">
            <option value="newest">{t.ebooks.sortNewest}</option>
            <option value="title">{t.ebooks.sortTitle}</option>
            <option value="pages">{t.ebooks.sortPages}</option>
          </Select>
        </div>
        <div className="lg:col-span-1 flex justify-end gap-1">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            aria-label={t.ebooks.gridView}
            className={`p-2 rounded-lg border cursor-pointer ${
              viewMode === 'grid'
                ? 'border-orange-600 bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-amber-400'
                : 'border-slate-200 dark:border-slate-700 text-slate-500'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            aria-label={t.ebooks.listView}
            className={`p-2 rounded-lg border cursor-pointer ${
              viewMode === 'list'
                ? 'border-orange-600 bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-amber-400'
                : 'border-slate-200 dark:border-slate-700 text-slate-500'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState title={t.common.noData} icon={<BookOpen className="w-8 h-8" />} />
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filtered.map((book) => {
            const isBookmarked = progressState?.bookmarkedEbookIds.includes(book.id) ?? false;
            const isRead = progressState?.readEbookIds.includes(book.id) ?? false;
            const pct = progressState?.ebookProgress[book.id] ?? 0;

            return (
              <Card
                key={book.id}
                padding="p-5"
                className={viewMode === 'list' ? 'flex flex-col sm:flex-row gap-5' : 'flex flex-col justify-between gap-4'}
              >
                <div className={viewMode === 'list' ? 'flex flex-col sm:flex-row gap-5 flex-1' : 'space-y-4'}>
                  <div
                    className={`rounded-lg overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0 ${
                      viewMode === 'list' ? 'w-full sm:w-32 h-44' : 'w-full h-48'
                    }`}
                  >
                    <img
                      src={book.coverUrl || '/src/assets/images/ebook_cover_diagnostics_1794929842391.jpg'}
                      alt={book.title[lang]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-1.5">
                      <span className="font-medium text-orange-600 dark:text-amber-400">
                        {categoryLabels[book.category]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{book.pages} {t.common.pages}</span>
                      <span aria-hidden="true">·</span>
                      <span>{book.sizeLabel}</span>
                    </div>
                    <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {book.title[lang]}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {book.author} · {book.tags.join(' · ')}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                      {book.summary[lang]}
                    </p>
                    {user && pct > 0 && <ProgressBar value={pct} showPercent />}
                  </div>
                </div>

                <div className={`flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 ${viewMode === 'list' ? 'sm:border-t-0 sm:pt-0 sm:flex-col sm:justify-center sm:w-44 shrink-0' : ''}`}>
                  <Button size="sm" variant="primary" onClick={() => openPdfModal(book)} className="flex-1 sm:w-full">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t.ebooks.readPdf}</span>
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => downloadEbookPdf(book, lang)} className="flex-1 sm:w-full">
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.ebooks.downloadPdf}</span>
                  </Button>
                  <div className="flex items-center gap-2 w-full justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => toggleBookmark(book.id)}
                      className={`inline-flex items-center gap-1 text-xs font-medium cursor-pointer ${
                        isBookmarked ? 'text-orange-600 dark:text-amber-400' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
                      <span>{isBookmarked ? t.ebooks.bookmarked : t.ebooks.bookmark}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleMarkRead(book.id)}
                      className={`inline-flex items-center gap-1 text-xs font-medium cursor-pointer ${
                        isRead ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isRead ? t.ebooks.readDone : t.ebooks.markRead}</span>
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Built-in PDF Viewer Modal */}
      <Modal
        open={Boolean(activeBook)}
        onClose={closePdfModal}
        title={activeBook ? activeBook.title[lang] : ''}
        size="xl"
      >
        {activeBook && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {activeBook.author} · {activeBook.pages} {t.common.pages} · {activeBook.sizeLabel}
              </p>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => toggleMarkRead(activeBook.id)}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.ebooks.markRead}</span>
                </Button>
                <Button size="sm" variant="primary" onClick={() => downloadEbookPdf(activeBook, lang)}>
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.ebooks.downloadPdf}</span>
                </Button>
              </div>
            </div>

            {pdfBlobUrl && (
              <div className="w-full h-[55vh] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950">
                <iframe
                  title={activeBook.title[lang]}
                  src={pdfBlobUrl}
                  className="w-full h-full"
                />
              </div>
            )}

            {/* Structured HTML Chapters fallback/preview below PDF frame */}
            <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              {(activeBook.chapters[lang] || activeBook.chapters.en).map((ch, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                    {idx + 1}. {ch.heading}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {ch.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

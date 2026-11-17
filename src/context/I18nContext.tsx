import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { TranslationDictionary, translations } from '../data/translations';
import { STORAGE_KEYS } from '../services/storageService';
import { Language } from '../types';

interface I18nContextValue {
  lang: Language;
  setLang: (next: Language) => void;
  t: TranslationDictionary;
  formatDate: (iso: string) => string;
  formatNumber: (num: number) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const LOCALE_MAP: Record<Language, string> = {
  uz: 'uz-UZ',
  ru: 'ru-RU',
  en: 'en-US',
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    if (saved === 'uz' || saved === 'ru' || saved === 'en') return saved;
    return 'uz';
  });

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEYS.LANG, next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  const formatDate = useCallback(
    (iso: string) => {
      try {
        return new Intl.DateTimeFormat(LOCALE_MAP[lang], {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(new Date(iso));
      } catch {
        return iso.slice(0, 10);
      }
    },
    [lang]
  );

  const formatNumber = useCallback(
    (num: number) => {
      try {
        return new Intl.NumberFormat(LOCALE_MAP[lang]).format(num);
      } catch {
        return String(num);
      }
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t, formatDate, formatNumber }}>
      {children}
    </I18nContext.Provider>
  );
};

export function useT(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useT must be used inside I18nProvider');
  return ctx;
}

export function usePageMeta(pageTitle?: string, pageDesc?: string): void {
  const { t, lang } = useT();
  useEffect(() => {
    const fullTitle = pageTitle ? `${pageTitle} · ${t.meta.siteName}` : `${t.meta.siteName} — ${t.home.heroTitle}`;
    document.title = fullTitle;
    const desc = pageDesc || t.meta.defaultDesc;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);
  }, [pageTitle, pageDesc, t, lang]);
}

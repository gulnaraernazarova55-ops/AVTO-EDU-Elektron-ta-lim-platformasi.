import React, { useState } from 'react';
import { Input, TextArea } from './ui';
import { Language, LocalizedText } from '../types';

export const EMPTY_LOC = (): LocalizedText => ({ uz: '', ru: '', en: '' });

export const LocalizedTabsBar: React.FC<{
  activeLang: Language;
  onChange: (l: Language) => void;
}> = ({ activeLang, onChange }) => (
  <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
    {(['uz', 'ru', 'en'] as Language[]).map((code) => (
      <button
        key={code}
        type="button"
        onClick={() => onChange(code)}
        className={`px-2.5 py-1 text-xs font-semibold rounded-md cursor-pointer ${
          activeLang === code
            ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-amber-400 shadow-xs'
            : 'text-slate-600 dark:text-slate-400'
        }`}
      >
        {code.toUpperCase()}
      </button>
    ))}
  </div>
);

export const LocalizedInput: React.FC<{
  label: string;
  value: LocalizedText;
  onChange: (next: LocalizedText) => void;
  activeLang: Language;
  multiline?: boolean;
}> = ({ label, value, onChange, activeLang, multiline = false }) => {
  const fullLabel = `${label} (${activeLang.toUpperCase()})`;
  if (multiline) {
    return (
      <TextArea
        label={fullLabel}
        rows={3}
        value={value[activeLang]}
        onChange={(e) => onChange({ ...value, [activeLang]: e.target.value })}
      />
    );
  }
  return (
    <Input
      label={fullLabel}
      value={value[activeLang]}
      onChange={(e) => onChange({ ...value, [activeLang]: e.target.value })}
    />
  );
};

export const useLangTab = () => {
  const [editLang, setEditLang] = useState<Language>('uz');
  return { editLang, setEditLang };
};

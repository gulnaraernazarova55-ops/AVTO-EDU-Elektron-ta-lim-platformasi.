import React, { useEffect } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Brand SVG gear + piston logo
export const BrandLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
    <svg
      width="32"
      height="32"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="64" height="64" rx="14" className="fill-slate-900 dark:fill-slate-800" />
      <circle
        cx="32"
        cy="32"
        r="21"
        stroke="#EA580C"
        strokeWidth="3.5"
        strokeDasharray="6 4"
      />
      <rect x="24" y="16" width="16" height="12" rx="2.5" fill="#F8FAFC" />
      <rect x="26.5" y="19.5" width="11" height="2" rx="1" fill="#64748B" />
      <rect x="26.5" y="23" width="11" height="2" rx="1" fill="#64748B" />
      <rect x="30" y="28" width="4" height="13" rx="1.5" fill="#EA580C" />
      <circle cx="32" cy="43" r="5" stroke="#F8FAFC" strokeWidth="2.5" fill="#0F172A" />
      <circle cx="32" cy="43" r="1.8" fill="#F59E0B" />
    </svg>
    <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
      AVTO <span className="text-orange-600 dark:text-amber-500">EDU</span>
    </span>
  </span>
);

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  children,
  disabled,
  type = 'button',
  ...rest
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap shrink-0 cursor-pointer';

  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs',
    secondary:
      'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white',
    outline:
      'border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800',
    ghost:
      'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const sizes: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs min-h-[34px]',
    md: 'px-4 py-2 text-sm min-h-[40px]',
    lg: 'px-6 py-2.5 text-base min-h-[44px]',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  padding?: string;
}> = ({ children, className = '', padding = 'p-6' }) => (
  <div
    className={`rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${padding} ${className}`}
  >
    {children}
  </div>
);

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, size = 'md', children }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const sizeMap = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
    full: 'max-w-7xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`w-full ${sizeMap[size]} rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden my-auto`}
      >
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white truncate">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 max-h-[82vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export interface TabOption<T extends string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
}

export function Tabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  className = '',
}: {
  tabs: TabOption<T>[];
  activeTab: T;
  onChange: (id: T) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={`flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 overflow-x-auto ${className}`}
    >
      {tabs.map((tab) => {
        const active = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              active
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', id, ...rest }) => {
  const inputId = id || (label ? `inp_${label.toLowerCase().replace(/\s+/g, '_')}` : undefined);
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
          error ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
        } ${className}`}
        {...rest}
      />
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, className = '', id, ...rest }) => {
  const inputId = id || (label ? `txt_${label.toLowerCase().replace(/\s+/g, '_')}` : undefined);
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
          error ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
        } ${className}`}
        {...rest}
      />
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ label, error, className = '', children, id, ...rest }) => {
  const selId = id || (label ? `sel_${label.toLowerCase().replace(/\s+/g, '_')}` : undefined);
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={selId} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <select
        id={selId}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
          error ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
        } ${className}`}
        {...rest}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

export const ProgressBar: React.FC<{
  value: number;
  label?: string;
  showPercent?: boolean;
  className?: string;
}> = ({ value, label, showPercent = true, className = '' }) => {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={`space-y-1.5 ${className}`}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
          <span>{label}</span>
          {showPercent && <span className="font-mono tabular-nums text-slate-900 dark:text-slate-200">{clamped}%</span>}
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-orange-600 dark:bg-amber-500 transition-all duration-300"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

export const Badge: React.FC<{
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'accent';
  children: React.ReactNode;
  className?: string;
}> = ({ variant = 'neutral', children, className = '' }) => {
  const map = {
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
    warning: 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    danger: 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300',
    accent: 'bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 ${map[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export function Table<T>({
  columns,
  rows,
  keyExtractor,
  emptyMessage,
}: {
  columns: { key: string; header: string; align?: 'left' | 'right'; render: (row: T) => React.ReactNode }[];
  rows: T[];
  keyExtractor: (row: T) => string;
  emptyMessage: string;
}) {
  if (rows.length === 0) {
    return <EmptyState title={emptyMessage} />;
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 whitespace-nowrap ${col.align === 'right' ? 'text-right' : 'text-left'}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {rows.map((row) => (
            <tr key={keyExtractor(row)} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 text-slate-700 dark:text-slate-200 ${col.align === 'right' ? 'text-right tabular-nums' : ''}`}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const EmptyState: React.FC<{
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}> = ({ title, description, icon, action }) => (
  <div className="flex flex-col items-center justify-center text-center py-12 px-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40">
    {icon && <div className="mb-3 text-slate-400 dark:text-slate-500">{icon}</div>}
    <p className="font-display text-base font-semibold text-slate-800 dark:text-slate-200">{title}</p>
    {description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-md">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export const Breadcrumbs: React.FC<{
  items: { label: string; to?: string }[];
}> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4 overflow-x-auto">
    {items.map((item, idx) => (
      <React.Fragment key={`${item.label}_${idx}`}>
        {idx > 0 && <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />}
        {item.to ? (
          <Link to={item.to} className="hover:text-slate-900 dark:hover:text-white whitespace-nowrap transition-colors">
            {item.label}
          </Link>
        ) : (
          <span className="font-medium text-slate-800 dark:text-slate-200 truncate">{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </nav>
);

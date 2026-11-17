import React, { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { generateId } from '../utils/crypto';

type ToastVariant = 'success' | 'error' | 'info';

interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = 'success') => {
      const id = generateId('toast');
      setToasts((prev) => [...prev, { id, message, variant }]);
      setTimeout(() => removeToast(id), 3800);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg backdrop-blur-sm transition-all ${
              toast.variant === 'success'
                ? 'bg-white dark:bg-slate-900 border-emerald-500/40 text-slate-900 dark:text-slate-100'
                : toast.variant === 'error'
                ? 'bg-white dark:bg-slate-900 border-red-500/40 text-slate-900 dark:text-slate-100'
                : 'bg-white dark:bg-slate-900 border-amber-500/40 text-slate-900 dark:text-slate-100'
            }`}
          >
            {toast.variant === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
            {toast.variant === 'error' && <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />}
            {toast.variant === 'info' && <Info className="w-4 h-4 text-amber-500 shrink-0" />}
            <span className="flex-1">{toast.message}</span>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              aria-label="Close"
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-0.5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}

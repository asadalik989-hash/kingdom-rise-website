import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { ToastItem, ToastType } from '../../types/componentStates';

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
  showSuccess: (title: string, message?: string) => string;
  showError: (title: string, message?: string) => string;
  showInfo: (title: string, message?: string) => string;
  showWarning: (title: string, message?: string) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const newToast: ToastItem = { ...toast, id };
      setToasts((prev) => [...prev, newToast]);

      const duration = toast.duration !== undefined ? toast.duration : 4500;
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast]
  );

  const showSuccess = useCallback(
    (title: string, message?: string) => {
      return addToast({ type: 'success', title, message });
    },
    [addToast]
  );

  const showError = useCallback(
    (title: string, message?: string) => {
      return addToast({ type: 'error', title, message, duration: 6000 });
    },
    [addToast]
  );

  const showInfo = useCallback(
    (title: string, message?: string) => {
      return addToast({ type: 'info', title, message });
    },
    [addToast]
  );

  const showWarning = useCallback(
    (title: string, message?: string) => {
      return addToast({ type: 'warning', title, message, duration: 5000 });
    },
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        showSuccess,
        showError,
        showInfo,
        showWarning,
      }}
    >
      {children}

      {/* Floating Toasts Viewport */}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((toast) => {
          const icons = {
            success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
            error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
            warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
            info: <Info className="w-5 h-5 text-[#0052CC] shrink-0" />,
          };

          const borderColors = {
            success: 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/95 dark:bg-emerald-950/90',
            error: 'border-rose-200 dark:border-rose-900 bg-rose-50/95 dark:bg-rose-950/90',
            warning: 'border-amber-200 dark:border-amber-900 bg-amber-50/95 dark:bg-amber-950/90',
            info: 'border-blue-200 dark:border-blue-900 bg-blue-50/95 dark:bg-blue-950/90',
          };

          return (
            <div
              key={toast.id}
              role="status"
              className={`
                pointer-events-auto p-4 rounded-xl border shadow-lg backdrop-blur-md transition-all transform animate-in slide-in-from-bottom-5 duration-200
                ${borderColors[toast.type]}
              `}
            >
              <div className="flex items-start gap-3">
                {icons[toast.type]}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                    {toast.title}
                  </h4>
                  {toast.message && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {toast.message}
                    </p>
                  )}
                  {toast.action && (
                    <button
                      type="button"
                      onClick={() => {
                        toast.action?.onClick();
                        removeToast(toast.id);
                      }}
                      className="mt-2 text-xs font-bold text-[#0052CC] hover:underline"
                    >
                      {toast.action.label}
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  aria-label="Dismiss alert"
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

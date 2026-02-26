import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

type ToastType = 'success' | 'error';

type ToastState = {
  message: string;
  type: ToastType;
} | null;

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>(null);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    setToast({ message, type });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toast={toast} onDismiss={() => setToast(null)} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toast, onDismiss }: { toast: ToastState; onDismiss: () => void }) {
  if (!toast) return null;

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    timeoutRef.current = setTimeout(onDismiss, 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [toast.message, onDismiss]);

  return (
    <div
      className="fixed bottom-8 right-8 z-50 animate-fade-in"
      role="status"
      aria-live="polite"
    >
      <div
        className={`px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 ${
          toast.type === 'success' ? 'bg-primary text-white' : 'bg-red-500 text-white'
        }`}
      >
        <i className={`${toast.type === 'success' ? 'ri-check-line' : 'ri-error-warning-line'} text-2xl`} />
        <span className="font-medium">{toast.message}</span>
      </div>
    </div>
  );
}

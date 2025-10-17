'use client';

import { useEffect } from 'react';
import { useToast } from '../../lib/ToastContext';
import { Toast as ToastType } from '../../lib/toast-types';

const icons = {
  success: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const styles = {
  success: {
    container: 'bg-white border-green-200',
    icon: 'bg-green-100 text-green-600',
    title: 'text-green-900',
    message: 'text-green-700',
  },
  error: {
    container: 'bg-white border-red-200',
    icon: 'bg-red-100 text-red-600',
    title: 'text-red-900',
    message: 'text-red-700',
  },
  warning: {
    container: 'bg-white border-orange-200',
    icon: 'bg-orange-100 text-orange-600',
    title: 'text-orange-900',
    message: 'text-orange-700',
  },
  info: {
    container: 'bg-white border-blue-200',
    icon: 'bg-blue-100 text-blue-600',
    title: 'text-blue-900',
    message: 'text-blue-700',
  },
};

interface ToastItemProps {
  toast: ToastType;
}

function ToastItem({ toast }: ToastItemProps) {
  const { removeToast } = useToast();
  const style = styles[toast.type];

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, removeToast]);

  return (
    <div
      className={`
        ${style.container}
        pointer-events-auto w-full max-w-sm
        rounded-xl border-2 shadow-lg
        animate-in slide-in-from-right
        duration-300
      `}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={`${style.icon} rounded-lg p-2 flex-shrink-0`}>
            {icons[toast.type]}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`${style.title} font-semibold text-sm`}>
              {toast.title}
            </p>
            {toast.message && (
              <p className={`${style.message} text-sm mt-1`}>
                {toast.message}
              </p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-neutral-400 hover:text-neutral-600 transition-colors flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-0 right-0 z-50 p-4 space-y-3 pointer-events-none"
      style={{ maxWidth: '100vw' }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

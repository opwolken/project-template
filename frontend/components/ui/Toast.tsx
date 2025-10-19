'use client';

import { useEffect, useState } from 'react';
import { useToast } from '../../lib/ToastContext';
import { Toast as ToastType } from '../../lib/toast-types';
import { colors, shadows } from '../../lib/design-system';
import { Check, X, AlertTriangle, Info as InfoIcon } from 'lucide-react';

const icons = {
  success: <Check className="w-5 h-5" />,
  error: <X className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  info: <InfoIcon className="w-5 h-5" />,
};

const colorSchemes = {
  success: {
    background: colors.surface,
    iconBg: colors.accent.lighter,
    iconColor: colors.accent.primary,
    title: colors.text.primary,
    message: colors.text.secondary,
    progressBar: colors.accent.primary,
  },
  error: {
    background: colors.surface,
    iconBg: '#FEE2E2',
    iconColor: '#991B1B',
    title: colors.text.primary,
    message: colors.text.secondary,
    progressBar: '#991B1B',
  },
  warning: {
    background: colors.surface,
    iconBg: '#FED7AA',
    iconColor: '#9A3412',
    title: colors.text.primary,
    message: colors.text.secondary,
    progressBar: '#9A3412',
  },
  info: {
    background: colors.surface,
    iconBg: '#DBEAFE',
    iconColor: '#1E40AF',
    title: colors.text.primary,
    message: colors.text.secondary,
    progressBar: '#1E40AF',
  },
};

interface ToastItemProps {
  toast: ToastType;
}

function ToastItem({ toast }: ToastItemProps) {
  const { removeToast } = useToast();
  const scheme = colorSchemes[toast.type];
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const duration = toast.duration; // Capture for closure
      const startTime = Date.now();
      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, duration);

      // Update progress bar
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);
      }, 16); // ~60fps

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [toast.id, toast.duration, removeToast]);

  return (
    <div
      className="pointer-events-auto w-full max-w-sm animate-in slide-in-from-right duration-300 relative overflow-hidden"
      style={{
        backgroundColor: scheme.background,
        borderRadius: '4px',
        boxShadow: shadows.elevated,
      }}
    >
      {/* Main Content */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div 
            className="flex-shrink-0 p-2"
            style={{ 
              backgroundColor: scheme.iconBg,
              color: scheme.iconColor,
              borderRadius: '4px',
            }}
          >
            {icons[toast.type]}
          </div>
          <div className="flex-1 min-w-0">
            <p 
              className="font-semibold text-sm leading-tight"
              style={{ color: scheme.title }}
            >
              {toast.title}
            </p>
            {toast.message && (
              <p 
                className="text-sm mt-1 leading-snug"
                style={{ color: scheme.message }}
              >
                {toast.message}
              </p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 transition-opacity hover:opacity-60"
            style={{ 
              color: colors.text.tertiary,
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Progress Bar */}
      {toast.duration && toast.duration > 0 && (
        <div 
          className="absolute bottom-0 left-0 h-0.5 transition-all ease-linear"
          style={{
            width: `${progress}%`,
            backgroundColor: scheme.progressBar,
          }}
        />
      )}
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

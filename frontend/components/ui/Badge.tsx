import { ReactNode } from 'react';
import { colors, borderRadius } from '@/lib/design-system';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'accent';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles = {
  default: {
    backgroundColor: colors.surfaceHover,
    color: colors.text.secondary,
    border: `1px solid ${colors.border}`,
  },
  accent: {
    backgroundColor: colors.accent.light,
    color: colors.accent.primary,
    border: `1px solid ${colors.accent.secondary}`,
  },
  success: {
    backgroundColor: '#F0FDF4',
    color: colors.success,
    border: `1px solid #BBF7D0`,
  },
  warning: {
    backgroundColor: '#FFFBEB',
    color: colors.warning,
    border: `1px solid #FED7AA`,
  },
  danger: {
    backgroundColor: '#FEF2F2',
    color: colors.error,
    border: `1px solid #FECACA`,
  },
  info: {
    backgroundColor: '#EFF6FF',
    color: colors.info,
    border: `1px solid #BFDBFE`,
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export default function Badge({ 
  children, 
  variant = 'default',
  size = 'sm',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center font-medium
        ${sizeClasses[size]}
        ${className}
      `}
      style={{
        ...variantStyles[variant],
        borderRadius: borderRadius.sm,
      }}
    >
      {children}
    </span>
  );
}

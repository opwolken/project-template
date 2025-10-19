import { ReactNode } from 'react';
import { colors, borderRadius } from '@/lib/design-system';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'accent';
  size?: 'sm' | 'md';
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles = {
  default: {
    backgroundColor: colors.surfaceHover,
    color: colors.text.secondary,
  },
  accent: {
    backgroundColor: colors.accent.light,
    color: colors.accent.primary,
  },
  success: {
    backgroundColor: '#E8F5E9',
    color: colors.success,
  },
  warning: {
    backgroundColor: '#FFF8E1',
    color: colors.warning,
  },
  danger: {
    backgroundColor: '#FFEBEE',
    color: colors.error,
  },
  info: {
    backgroundColor: '#E3F2FD',
    color: colors.info,
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
  style,
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
        ...style,
      }}
    >
      {children}
    </span>
  );
}

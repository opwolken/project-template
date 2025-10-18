import { ButtonHTMLAttributes, ReactNode } from 'react';
import { colors, shadows } from '@/lib/design-system';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const variantStyles = {
  primary: {
    backgroundColor: colors.accent.primary,
    color: colors.text.inverse,
    ':hover': { backgroundColor: colors.accent.hover },
  },
  secondary: {
    backgroundColor: colors.surface,
    color: colors.text.primary,
    border: `1px solid ${colors.border}`,
    ':hover': { backgroundColor: colors.surfaceHover },
  },
  outline: {
    backgroundColor: 'transparent',
    color: colors.accent.primary,
    border: `1px solid ${colors.accent.primary}`,
    ':hover': { backgroundColor: colors.accent.light },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: colors.text.secondary,
    ':hover': { backgroundColor: colors.surfaceHover },
  },
  danger: {
    backgroundColor: colors.error,
    color: colors.text.inverse,
    ':hover': { backgroundColor: '#7F1D1D' },
  },
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyle = {
    boxShadow: shadows.card,
  };

  return (
    <button
      className={`
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        font-medium rounded-lg
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${className}
      `}
      style={{
        ...baseStyle,
        backgroundColor: variant === 'primary' ? colors.accent.primary : 
                        variant === 'secondary' ? colors.surface :
                        variant === 'danger' ? colors.error : 'transparent',
        color: variant === 'primary' || variant === 'danger' ? colors.text.inverse : 
               variant === 'outline' ? colors.accent.primary :
               colors.text.primary,
        border: variant === 'secondary' ? `1px solid ${colors.border}` :
                variant === 'outline' ? `1px solid ${colors.accent.primary}` : 'none',
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

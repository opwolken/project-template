import { ButtonHTMLAttributes, ReactNode } from 'react';
import { colors, shadows } from '@/lib/design-system';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

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
  style,
  ...props
}: ButtonProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.accent.primary,
          color: colors.text.inverse,
          boxShadow: shadows.card,
        };
      case 'secondary':
        return {
          backgroundColor: colors.surface,
          color: colors.text.primary,
          boxShadow: shadows.card,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: colors.accent.primary,
          boxShadow: `inset 0 0 0 1.5px ${colors.accent.primary}`,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: colors.text.secondary,
          boxShadow: 'none',
        };
      case 'danger':
        return {
          backgroundColor: colors.error,
          color: colors.text.inverse,
          boxShadow: shadows.card,
        };
    }
  };

  const getHoverStyle = () => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: colors.accent.hover };
      case 'secondary':
        return { backgroundColor: colors.surfaceHover };
      case 'outline':
        return { backgroundColor: colors.accent.lighter };
      case 'ghost':
        return { backgroundColor: colors.surfaceHover };
      case 'danger':
        return { backgroundColor: '#7F1D1D' };
    }
  };

  return (
    <button
      className={`
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        font-medium rounded
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${className}
      `}
      style={{
        ...getVariantStyle(),
        ...style,
      }}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (disabled) return;
        const hoverStyle = getHoverStyle();
        Object.assign(e.currentTarget.style, hoverStyle);
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        const baseStyle = getVariantStyle();
        Object.assign(e.currentTarget.style, baseStyle);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

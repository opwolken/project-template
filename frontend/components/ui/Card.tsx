import { ReactNode } from 'react';
import { colors, shadows, borderRadius, spacing } from '@/lib/design-system';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingMap = {
  none: '0',
  sm: spacing.md,
  md: spacing.lg,
  lg: spacing.xl,
};

export default function Card({ 
  children, 
  className = '',
  hover = false,
  padding = 'md',
}: CardProps) {
  return (
    <div
      className={`
        transition-all duration-200
        ${hover ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        border: `1px solid ${colors.border}`,
        padding: paddingMap[padding],
        boxShadow: shadows.card,
        ...(hover && {
          ':hover': {
            boxShadow: shadows.soft,
            borderColor: colors.borderHover,
          }
        })
      }}
    >
      {children}
    </div>
  );
}

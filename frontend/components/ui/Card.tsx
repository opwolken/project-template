import { ReactNode } from 'react';
import { colors, shadows, borderRadius, spacing } from '@/lib/design-system';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
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
  style,
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
        borderRadius: borderRadius.sm,
        padding: paddingMap[padding],
        boxShadow: shadows.card,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.boxShadow = shadows.soft;
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.boxShadow = shadows.card;
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {children}
    </div>
  );
}

import { ReactNode } from 'react';
import { spacing } from '@/lib/design-system';

interface ContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[1400px]',
  full: 'max-w-full',
};

const paddingMap = {
  none: '0',
  sm: spacing.lg,      // 24px
  md: spacing['2xl'],  // 48px  
  lg: spacing['3xl'],  // 64px
};

export default function Container({ 
  children, 
  size = 'lg',
  padding = 'md',
  className = '' 
}: ContainerProps) {
  return (
    <div 
      className={`${sizeClasses[size]} mx-auto px-6 lg:px-8 ${className}`}
      style={{
        paddingTop: paddingMap[padding],
        paddingBottom: paddingMap[padding],
      }}
    >
      {children}
    </div>
  );
}

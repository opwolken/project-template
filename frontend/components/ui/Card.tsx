import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
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
        bg-white rounded-2xl border border-neutral-200
        ${paddingClasses[padding]}
        ${hover ? 'hover:shadow-lg hover:border-neutral-300 transition-all duration-200' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

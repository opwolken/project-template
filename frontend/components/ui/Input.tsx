import { InputHTMLAttributes, forwardRef } from 'react';
import { colors, borderRadius, spacing } from '@/lib/design-system';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label 
            className="block text-sm font-medium mb-2"
            style={{ color: colors.text.secondary }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-2.5 
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          style={{
            backgroundColor: colors.surface,
            border: `1px solid ${error ? colors.error : colors.border}`,
            borderRadius: borderRadius.md,
            color: colors.text.primary,
          }}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm" style={{ color: colors.error }}>
            {error}
          </p>
        )}
        {helpText && !error && (
          <p className="mt-1.5 text-sm" style={{ color: colors.text.tertiary }}>
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

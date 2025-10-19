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
            transition-all duration-300
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          style={{
            backgroundColor: colors.surface,
            boxShadow: error ? `inset 0 0 0 2px ${colors.error}` : `inset 0 0 0 1.5px ${colors.border}`,
            borderRadius: borderRadius.sm,
            color: colors.text.primary,
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = error 
              ? `inset 0 0 0 2px ${colors.error}` 
              : `inset 0 0 0 2px ${colors.accent.primary}`;
            e.currentTarget.style.backgroundColor = colors.surface;
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = error 
              ? `inset 0 0 0 2px ${colors.error}` 
              : `inset 0 0 0 1.5px ${colors.border}`;
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

import { colors, borderRadius, spacing, shadows, transitions } from '@/lib/design-system';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  required?: boolean;
}

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder = 'Selecteer...',
  disabled = false,
  error,
  helpText,
  required = false,
}: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: colors.text.secondary }}
        >
          {label}
          {required && <span style={{ color: colors.error }}> *</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full appearance-none"
          style={{
            padding: `${spacing.sm} ${spacing.md}`,
            paddingRight: '2.5rem',
            backgroundColor: colors.surface,
            border: `1px solid ${error ? colors.error : colors.border}`,
            borderRadius: borderRadius.md,
            color: colors.text.primary,
            fontSize: '0.875rem',
            transition: transitions.normal,
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
          }}
          onFocus={(e) => {
            e.target.style.borderColor = error ? colors.error : colors.accent.primary;
            e.target.style.outline = 'none';
            e.target.style.boxShadow = `0 0 0 3px ${error ? colors.error + '15' : colors.accent.light}`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? colors.error : colors.border;
            e.target.style.boxShadow = 'none';
          }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div
          className="absolute right-3 top-1/2 pointer-events-none"
          style={{
            transform: 'translateY(-50%)',
            color: colors.text.tertiary,
          }}
        >
          <ChevronDown size={16} />
        </div>
      </div>

      {error && (
        <p
          className="text-xs mt-1"
          style={{ color: colors.error }}
        >
          {error}
        </p>
      )}

      {helpText && !error && (
        <p
          className="text-xs mt-1"
          style={{ color: colors.text.tertiary }}
        >
          {helpText}
        </p>
      )}
    </div>
  );
}

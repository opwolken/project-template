import { colors, borderRadius, spacing, transitions } from '@/lib/design-system';

interface TextareaProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
}

export default function Textarea({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  helpText,
  required = false,
  rows = 4,
  maxLength,
}: TextareaProps) {
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
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        className="w-full resize-y"
        style={{
          padding: spacing.md,
          backgroundColor: colors.surface,
          border: `1px solid ${error ? colors.error : colors.border}`,
          borderRadius: borderRadius.md,
          color: colors.text.primary,
          fontSize: '0.875rem',
          lineHeight: '1.5',
          transition: transitions.normal,
          fontFamily: 'inherit',
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
      />

      <div className="flex items-center justify-between mt-1">
        <div className="flex-1">
          {error && (
            <p className="text-xs" style={{ color: colors.error }}>
              {error}
            </p>
          )}

          {helpText && !error && (
            <p className="text-xs" style={{ color: colors.text.tertiary }}>
              {helpText}
            </p>
          )}
        </div>

        {maxLength && (
          <p
            className="text-xs ml-2"
            style={{ color: colors.text.tertiary }}
          >
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}

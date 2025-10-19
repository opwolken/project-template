import { colors, borderRadius, spacing, transitions } from '@/lib/design-system';
import { X } from 'lucide-react';
import { useState } from 'react';

interface TagInputProps {
  label?: string;
  value: string[];
  onChange: (value: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  required?: boolean;
  maxTags?: number;
}

export default function TagInput({
  label,
  value = [],
  onChange,
  suggestions = [],
  placeholder = 'Type en druk op Enter...',
  disabled = false,
  error,
  helpText,
  required = false,
  maxTags,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      !value.includes(suggestion) &&
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
  );

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !value.includes(trimmedTag)) {
      if (!maxTags || value.length < maxTags) {
        onChange([...value, trimmedTag]);
        setInputValue('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

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
        <div
          className="w-full min-h-[42px] flex flex-wrap gap-2 items-center"
          style={{
            padding: spacing.sm,
            backgroundColor: colors.surface,
            border: `1px solid ${error ? colors.error : colors.border}`,
            borderRadius: borderRadius.md,
            transition: transitions.normal,
          }}
        >
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium"
              style={{
                backgroundColor: colors.accent.light,
                color: colors.text.primary,
                borderRadius: borderRadius.sm,
              }}
            >
              {tag}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: colors.text.secondary }}
                >
                  <X size={12} />
                </button>
              )}
            </span>
          ))}

          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={value.length === 0 ? placeholder : ''}
            disabled={disabled || (maxTags ? value.length >= maxTags : false)}
            className="flex-1 min-w-[120px] outline-none"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: colors.text.primary,
              fontSize: '0.875rem',
            }}
          />
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div
            className="absolute z-10 w-full mt-1 max-h-48 overflow-auto"
            style={{
              backgroundColor: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: borderRadius.md,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => addTag(suggestion)}
                className="w-full text-left px-3 py-2 text-sm hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: colors.surface,
                  color: colors.text.primary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.surfaceHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.surface;
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {maxTags && (
        <p
          className="text-xs mt-1"
          style={{ color: colors.text.tertiary }}
        >
          {value.length}/{maxTags} tags
        </p>
      )}

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

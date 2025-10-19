'use client';

import { useState } from 'react';
import { colors, spacing, borderRadius, transitions } from '@/lib/design-system';
import Button from '@/components/ui/Button';
import { X, SlidersHorizontal } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface RecipeFiltersProps {
  filterGroups: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, values: string[]) => void;
  onClearAll: () => void;
}

export default function RecipeFilters({
  filterGroups,
  activeFilters,
  onFilterChange,
  onClearAll,
}: RecipeFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalActiveFilters = Object.values(activeFilters).flat().length;

  const toggleFilter = (groupId: string, value: string) => {
    const current = activeFilters[groupId] || [];
    const newValues = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    
    onFilterChange(groupId, newValues);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3
          className="font-serif font-semibold text-lg"
          style={{ color: colors.text.primary }}
        >
          Filters
        </h3>
        {totalActiveFilters > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
          >
            <X size={14} className="mr-1" />
            Wis alles
          </Button>
        )}
      </div>

      {/* Filter Groups */}
      {filterGroups.map((group) => (
        <div key={group.id}>
          <h4
            className="font-medium text-sm mb-3"
            style={{ color: colors.text.secondary }}
          >
            {group.label}
          </h4>
          
          <div className="flex flex-wrap gap-2">
            {group.options.map((option) => {
              const isActive = (activeFilters[group.id] || []).includes(option.value);
              
              return (
                <button
                  key={option.value}
                  onClick={() => toggleFilter(group.id, option.value)}
                  className="text-sm px-3 py-1.5 rounded transition-all"
                  style={{
                    backgroundColor: isActive ? colors.accent.primary : colors.surface,
                    color: isActive ? colors.text.inverse : colors.text.primary,
                    border: `1px solid ${isActive ? colors.accent.primary : colors.border}`,
                    transition: transitions.normal,
                  }}
                >
                  {option.label}
                  {option.count !== undefined && (
                    <span
                      className="ml-1"
                      style={{
                        opacity: 0.7,
                        fontSize: '0.75rem',
                      }}
                    >
                      ({option.count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          fullWidth
          onClick={() => setMobileOpen(true)}
        >
          <SlidersHorizontal size={16} className="mr-2" />
          Filters
          {totalActiveFilters > 0 && (
            <span
              className="ml-2 px-2 py-0.5 rounded text-xs font-semibold"
              style={{
                backgroundColor: colors.accent.primary,
                color: colors.text.inverse,
              }}
            >
              {totalActiveFilters}
            </span>
          )}
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div
          className="sticky top-24 p-6 rounded"
          style={{
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border}`,
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto',
          }}
        >
          <FilterContent />
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-sm p-6 overflow-y-auto"
            style={{ backgroundColor: colors.background }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2
                className="font-serif font-bold text-xl"
                style={{ color: colors.text.primary }}
              >
                Filters
              </h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2"
                style={{ color: colors.text.secondary }}
              >
                <X size={24} />
              </button>
            </div>

            <FilterContent />

            <div className="mt-6 sticky bottom-0 py-4" style={{ backgroundColor: colors.background }}>
              <Button
                variant="primary"
                fullWidth
                onClick={() => setMobileOpen(false)}
              >
                Toon resultaten
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

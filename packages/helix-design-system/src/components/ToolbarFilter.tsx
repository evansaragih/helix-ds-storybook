import { forwardRef, useState } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterGroup {
  key: string;
  label: string;
  options: FilterOption[];
  multiple?: boolean;
}

export interface ToolbarFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled search value */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filters?: FilterGroup[];
  activeFilters?: Record<string, string | string[]>;
  onFilterChange?: (key: string, value: string | string[]) => void;
  onClearAll?: () => void;
  actions?: React.ReactNode;
  totalResults?: number;
}

export const ToolbarFilter = forwardRef<HTMLDivElement, ToolbarFilterProps>(({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search…',
  filters = [],
  activeFilters = {},
  onFilterChange,
  onClearAll,
  actions,
  totalResults,
  style,
  ...props
}, ref) => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const hasActiveFilters = Object.values(activeFilters).some(v =>
    Array.isArray(v) ? v.length > 0 : Boolean(v)
  );

  const getActiveCount = (key: string) => {
    const v = activeFilters[key];
    return Array.isArray(v) ? v.length : (v ? 1 : 0);
  };

  const toggleOption = (groupKey: string, optionValue: string, multiple: boolean) => {
    if (multiple) {
      const current = (activeFilters[groupKey] as string[]) ?? [];
      const next = current.includes(optionValue)
        ? current.filter(v => v !== optionValue)
        : [...current, optionValue];
      onFilterChange?.(groupKey, next);
    } else {
      const current = activeFilters[groupKey] as string ?? '';
      onFilterChange?.(groupKey, current === optionValue ? '' : optionValue);
    }
  };

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
        ...style,
      }}
      {...props}
    >
      {/* Search */}
      {onSearchChange !== undefined && (
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <Search
            size={14}
            style={{
              position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--color-text-tertiary, #828282)', pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            value={searchValue}
            onChange={e => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            style={{
              height: 36,
              paddingLeft: 32,
              paddingRight: searchValue ? 28 : 12,
              border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
              borderRadius: 8,
              fontFamily: 'Rubik, sans-serif',
              fontSize: 13,
              color: 'var(--color-text-primary, #14141E)',
              outline: 'none',
              backgroundColor: '#FFFFFF',
              width: 200,
              boxSizing: 'border-box',
            }}
          />
          {searchValue && (
            <button
              onClick={() => onSearchChange('')}
              style={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                padding: 0, border: 'none', background: 'none', cursor: 'pointer',
                color: 'var(--color-text-tertiary, #828282)',
                display: 'flex', alignItems: 'center',
              }}
            >
              <X size={12} />
            </button>
          )}
        </div>
      )}

      {/* Filter dropdowns */}
      {filters.map(group => {
        const count = getActiveCount(group.key);
        const isOpen = openFilter === group.key;

        return (
          <div key={group.key} style={{ position: 'relative' }}>
            <button
              onClick={() => setOpenFilter(isOpen ? null : group.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                height: 36, paddingLeft: 10, paddingRight: 10,
                border: `1px solid ${count > 0 ? 'var(--color-brand-primary, #F57E20)' : 'var(--color-stroke-subtle, #EEEEEE)'}`,
                borderRadius: 8,
                backgroundColor: count > 0 ? 'var(--color-brand-primary-ghost-hover, #FEF2E9)' : '#FFFFFF',
                cursor: 'pointer',
                fontFamily: 'Rubik, sans-serif',
                fontSize: 13,
                color: count > 0 ? 'var(--color-brand-primary, #F57E20)' : 'var(--color-text-primary, #14141E)',
                whiteSpace: 'nowrap',
              }}
            >
              <Filter size={14} />
              {group.label}
              {count > 0 && (
                <span style={{
                  minWidth: 18, height: 18, borderRadius: 9,
                  backgroundColor: 'var(--color-brand-primary, #F57E20)',
                  color: '#FFFFFF',
                  fontFamily: 'Rubik, sans-serif', fontSize: 11, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 5px',
                }}>
                  {count}
                </span>
              )}
              <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {isOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 50,
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
                borderRadius: 10,
                boxShadow: '0px 8px 24px rgba(0,0,0,0.10)',
                minWidth: 180, overflow: 'hidden',
              }}>
                {group.options.map(opt => {
                  const current = activeFilters[group.key];
                  const isActive = Array.isArray(current)
                    ? current.includes(opt.value)
                    : current === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => toggleOption(group.key, opt.value, group.multiple ?? false)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        width: '100%', padding: '9px 14px',
                        border: 'none', backgroundColor: 'transparent',
                        cursor: 'pointer',
                        fontFamily: 'Rubik, sans-serif', fontSize: 13,
                        color: isActive ? 'var(--color-brand-primary, #F57E20)' : 'var(--color-text-primary, #14141E)',
                        textAlign: 'left',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F7F7F7'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      {group.multiple && (
                        <span style={{
                          width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                          border: `1.5px solid ${isActive ? 'var(--color-brand-primary, #F57E20)' : '#D7D7D7'}`,
                          backgroundColor: isActive ? 'var(--color-brand-primary, #F57E20)' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {isActive && <X size={10} color="#FFFFFF" strokeWidth={3} />}
                        </span>
                      )}
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Clear all */}
      {hasActiveFilters && onClearAll && (
        <button
          onClick={onClearAll}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            height: 36, padding: '0 10px',
            border: 'none', backgroundColor: 'transparent',
            cursor: 'pointer',
            fontFamily: 'Rubik, sans-serif', fontSize: 13,
            color: 'var(--color-text-tertiary, #828282)',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-text-primary, #14141E)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-tertiary, #828282)'; }}
        >
          <X size={14} />
          Clear all
        </button>
      )}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Results count */}
      {totalResults !== undefined && (
        <span style={{
          fontFamily: 'Rubik, sans-serif', fontSize: 13,
          color: 'var(--color-text-tertiary, #828282)', whiteSpace: 'nowrap',
        }}>
          {totalResults} result{totalResults !== 1 ? 's' : ''}
        </span>
      )}

      {/* Custom actions */}
      {actions}
    </div>
  );
});

ToolbarFilter.displayName = 'ToolbarFilter';

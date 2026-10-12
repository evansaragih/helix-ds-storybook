import { forwardRef } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from './Button';
import { IconButton } from './IconButton';
import { Checkbox } from './Checkbox';
import { ContentContainer } from './ContentContainer';
import { Select } from './Select';
import type { SelectOption } from './Select';

/* ─── Filter Section Header ─────────────────────────────────────────── */
export interface FilterSectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  /** Shows the round add button (Figma Add Button) */
  onAdd?: () => void;
  addLabel?: string;
}

/** A compact section title with a trailing add button, used above a group of filters in a side panel. For a page or data-view header use Section Header. */
export const FilterSectionHeader = forwardRef<HTMLDivElement, FilterSectionHeaderProps>(({ title, onAdd, addLabel = 'Add', style, ...props }, ref) => (
  <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 8, ...style }} {...props}>
    <span style={{ flex: 1, fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 16, lineHeight: '24px', color: 'var(--color-text-tertiary, #828282)' }}>{title}</span>
    {onAdd && <IconButton aria-label={addLabel} hierarchy="primary" shape="pill" size="sm" icon={<Plus size={16} />} onClick={onAdd} />}
  </div>
));
FilterSectionHeader.displayName = 'FilterSectionHeader';

/* ─── Filter Group Card ─────────────────────────────────────────────── */
export interface FilterValueOption {
  value: string;
  label: string;
}

export interface FilterGroupCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Columns that can be filtered — shown in the card's Select */
  columns: SelectOption[];
  column?: string;
  onColumnChange?: (column: string) => void;
  /** The values of the chosen column, listed as checkboxes */
  values: FilterValueOption[];
  selected: string[];
  onSelectedChange: (selected: string[]) => void;
  /** Shows the remove button next to the column Select */
  onRemove?: () => void;
}

/** One repeatable filter block for a side filter panel: a column Select with a remove button, All / None quick links, and a checkbox list of values. */
export const FilterGroupCard = forwardRef<HTMLDivElement, FilterGroupCardProps>(({
  columns, column, onColumnChange, values, selected, onSelectedChange, onRemove, style, ...props
}, ref) => (
  <ContentContainer ref={ref} contentSurface="default" divided={false} style={{ boxShadow: 'none', ...style }} {...props}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}><Select options={columns} value={column} onValueChange={onColumnChange} placeholder="Select column" /></div>
        {onRemove && <IconButton aria-label="Remove filter" hierarchy="secondary" appearance="ghost" size="sm" icon={<X size={14} />} onClick={onRemove} />}
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button hierarchy="primary" appearance="link" size="sm" onClick={() => onSelectedChange(values.map((v) => v.value))}>All</Button>
        <Button hierarchy="secondary" appearance="link" size="sm" onClick={() => onSelectedChange([])}>None</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {values.map((v) => (
          <Checkbox
            key={v.value}
            size="sm"
            label={v.label}
            checked={selected.includes(v.value)}
            onChange={(c) => onSelectedChange(c ? [...selected, v.value] : selected.filter((x) => x !== v.value))}
          />
        ))}
      </div>
    </div>
  </ContentContainer>
));
FilterGroupCard.displayName = 'FilterGroupCard';

/* ─── Side Filter Panel ─────────────────────────────────────────────── */
export interface SideFilterPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  filterTitle?: string;
  onAddFilter?: () => void;
  /** The FilterGroupCards */
  children?: React.ReactNode;
  sortTitle?: string;
  onAddSort?: () => void;
  sortFields?: SelectOption[];
  sortField?: string;
  onSortFieldChange?: (field: string) => void;
  sortDirection?: 'asc' | 'desc';
  onSortDirectionChange?: (direction: 'asc' | 'desc') => void;
}

/** A vertical filter panel for a list or table: an add-able Filter section of stacked Filter Group Cards, then a Sort section with a field Select and a direction Select. */
export const SideFilterPanel = forwardRef<HTMLDivElement, SideFilterPanelProps>(({
  filterTitle = 'Filter by', onAddFilter, children,
  sortTitle = 'Sort by', onAddSort, sortFields, sortField, onSortFieldChange, sortDirection, onSortDirectionChange,
  style, ...props
}, ref) => (
  <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 16, boxSizing: 'border-box', width: 352, padding: 16, backgroundColor: 'var(--color-container-primary, #FFFFFF)', ...style }} {...props}>
    <FilterSectionHeader title={filterTitle} onAdd={onAddFilter} addLabel="Add filter" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>
    {sortFields && (
      <>
        <FilterSectionHeader title={sortTitle} onAdd={onAddSort} addLabel="Add sort" />
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}><Select options={sortFields} value={sortField} onValueChange={onSortFieldChange} placeholder="Field" /></div>
          <div style={{ flex: 1 }}>
            <Select
              options={[{ value: 'asc', label: 'Ascending' }, { value: 'desc', label: 'Descending' }]}
              value={sortDirection}
              onValueChange={(v) => onSortDirectionChange?.(v as 'asc' | 'desc')}
              placeholder="Direction"
            />
          </div>
        </div>
      </>
    )}
  </div>
));
SideFilterPanel.displayName = 'SideFilterPanel';

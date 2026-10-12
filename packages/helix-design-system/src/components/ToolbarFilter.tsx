import { forwardRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { DropdownMenu } from './DropdownMenu';
import { Tag } from './Tag';
import { Button } from './Button';

export interface ToolbarFilterOption {
  value: string;
  label: string;
}

export interface ToolbarFilterChip {
  id: string;
  /** The chip text, e.g. "Sort by date" or "Status" */
  label: string;
  options: ToolbarFilterOption[];
  /** Selected option value(s). The chip shows as selected while it has a value. */
  value?: string | string[];
  onValueChange?: (value: string) => void;
}

export interface ToolbarFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sort chips, shown first */
  sort?: ToolbarFilterChip[];
  /** Filter chips, after the divider */
  filters?: ToolbarFilterChip[];
  /** Shows the Reset link (Figma Reset Link) */
  onReset?: () => void;
  resetLabel?: string;
}

const chipValue = (c: ToolbarFilterChip) => (Array.isArray(c.value) ? c.value : c.value ? [c.value] : []);

function Chip({ chip }: { chip: ToolbarFilterChip }) {
  const selected = chipValue(chip);
  return (
    <DropdownMenu
      trigger={<Tag size="md" color="neutral" label={chip.label} selected={selected.length > 0} trailingIcon={<ChevronDown size={12} />} style={{ cursor: 'pointer' }} />}
      items={chip.options.map((o) => ({
        label: o.label,
        icon: selected.includes(o.value) ? <Check size={16} /> : undefined,
        onSelect: () => chip.onValueChange?.(o.value),
      }))}
    />
  );
}

/** A row of sort and filter chips — each opens a menu of options — with a Reset link. Place it under a Section Header above a list or table. */
export const ToolbarFilter = forwardRef<HTMLDivElement, ToolbarFilterProps>(({
  sort = [],
  filters = [],
  onReset,
  resetLabel = 'Reset',
  style,
  ...props
}, ref) => (
  <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 40, ...style }} {...props}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
      {sort.map((c) => <Chip key={c.id} chip={c} />)}
      {sort.length > 0 && filters.length > 0 && <span aria-hidden="true" style={{ width: 1, height: 32, flexShrink: 0, borderRadius: 16, backgroundColor: 'var(--color-stroke-subtle, #EEEEEE)' }} />}
      {filters.map((c) => <Chip key={c.id} chip={c} />)}
    </div>
    {onReset && <Button hierarchy="primary" appearance="link" size="sm" onClick={onReset}>{resetLabel}</Button>}
  </div>
));

ToolbarFilter.displayName = 'ToolbarFilter';

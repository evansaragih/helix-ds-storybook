import { forwardRef, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { DropdownMenu } from './DropdownMenu';

export interface PickerPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Padding of the white body. Date pickers use 12 (Figma slot padding Spacing/12); Time Picker uses 0 */
  padding?: number;
}

const RING = 'inset 0 0 0 1px var(--color-stroke-subtle, #EEEEEE)';

/** The panel shell shared by the input pickers (Date, Time, Month, Quarter, Week): a Popover-style gray frame around a white body. Compose it inside a Popover under an Input for a complete field. */
export const PickerPanel = forwardRef<HTMLDivElement, PickerPanelProps>(({ padding = 12, style, children, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      display: 'inline-block', boxSizing: 'border-box', padding: 4, borderRadius: 12,
      backgroundColor: 'var(--color-container-secondary, #F7F7F7)',
      boxShadow: `${RING}, 0 1px 3px rgba(89,89,90,0.15), 0 1px 2px rgba(89,89,90,0.15)`,
      ...style,
    }}
    {...props}
  >
    <div style={{ boxSizing: 'border-box', padding, borderRadius: 8, backgroundColor: 'var(--color-container-primary, #FFFFFF)', boxShadow: RING, overflow: 'hidden' }}>
      {children}
    </div>
  </div>
));

PickerPanel.displayName = 'PickerPanel';

export interface PickerNavProps {
  dir: -1 | 1;
  /** Accessible name, e.g. "Previous year" */
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

/** The 29px chevron button at the edges of a picker header (Figma Icon Button inside _month-header). */
export function PickerNav({ dir, label, onClick, disabled }: PickerNavProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 29, height: 29, padding: 0, borderRadius: 5.33,
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
        backgroundColor: 'var(--color-container-primary, #FFFFFF)', color: 'var(--color-text-secondary, #49494A)',
      }}
    >
      {dir === -1 ? <ChevronLeft size={13} /> : <ChevronRight size={13} />}
    </button>
  );
}

export interface PickerCellProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Main text, e.g. "Jun" */
  label: string;
  /** Second line (Figma Show Months), e.g. "Jan–Mar" */
  sub?: string;
  selected?: boolean;
  height?: number;
}

/** A tile of a Month or Quarter body (Figma _period-cell): Default, Hover, Selected, Disabled. */
export const PickerCell = forwardRef<HTMLButtonElement, PickerCellProps>(({ label, sub, selected = false, height = 44, disabled, style, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-pressed={selected}
    disabled={disabled}
    className="helix-pcell"
    style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, height, boxSizing: 'border-box', padding: '0 10px',
      border: 'none', borderRadius: 6, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-family-body)', letterSpacing: '-0.01px',
      backgroundColor: selected ? 'var(--color-brand-primary, #F57E20)' : 'transparent',
      color: selected ? '#FAFAFA' : disabled ? 'var(--color-text-muted, #9F9F9F)' : 'var(--color-text-secondary, #49494A)',
      ...style,
    }}
    {...props}
  >
    <span style={{ fontSize: 13, lineHeight: '19.2px' }}>{label}</span>
    {sub && <span style={{ fontSize: 13, lineHeight: '19.2px' }}>{sub}</span>}
  </button>
));
PickerCell.displayName = 'PickerCell';

/** Hover and focus rules for PickerCell, rendered once inside a picker panel. Hover is the brand tint (16%), so it follows the brand. */
export const PICKER_CELL_CSS = '.helix-pcell:hover:not(:disabled):not([aria-pressed="true"]){background-color:var(--color-brand-primary-ghost-focus,rgba(245,126,32,0.16))!important}.helix-pcell:focus-visible{outline:2px solid var(--color-brand-primary,#F57E20);outline-offset:-2px}';

export interface PickerYearHeaderProps {
  year: number;
  onYearChange: (year: number) => void;
}

/** Figma _month-header with the month dropdown hidden: previous year, a year dropdown (±10 years), next year. Shared by Month and Quarter Picker. */
export function PickerYearHeader({ year, onYearChange }: PickerYearHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36 }}>
      <PickerNav dir={-1} label="Previous year" onClick={() => onYearChange(year - 1)} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <DropdownMenu
          trigger={<Button size="sm" hierarchy="secondary" appearance="ghost" trailingIcon={<ChevronDown size={14} />} style={{ width: '100%' }}>{String(year)}</Button>}
          items={Array.from({ length: 21 }, (_, i) => year - 10 + i).map((y) => ({ label: String(y), onSelect: () => onYearChange(y) }))}
        />
      </div>
      <PickerNav dir={1} label="Next year" onClick={() => onYearChange(year + 1)} />
    </div>
  );
}

export interface PickerMonthHeaderProps {
  /** The month shown (any day in it) */
  month: Date;
  onMonthChange: (month: Date) => void;
  /** Short names for the trigger (12) and long names for the menu (12) */
  shortNames: string[];
  longNames: string[];
}

/** Figma _month-header with both dropdowns: previous month, month and year dropdowns centred, next month. Used by Week Picker. */
export function PickerMonthHeader({ month, onMonthChange, shortNames, longNames }: PickerMonthHeaderProps) {
  const y = month.getFullYear();
  const m = month.getMonth();
  const trigger = (text: string) => <Button size="sm" hierarchy="secondary" appearance="ghost" trailingIcon={<ChevronDown size={14} />} style={{ minWidth: 84 }}>{text}</Button>;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36 }}>
      <PickerNav dir={-1} label="Previous month" onClick={() => onMonthChange(new Date(y, m - 1, 1))} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <DropdownMenu trigger={trigger(shortNames[m])} items={longNames.map((n, i) => ({ label: n, onSelect: () => onMonthChange(new Date(y, i, 1)) }))} />
        <DropdownMenu trigger={trigger(String(y))} items={Array.from({ length: 21 }, (_, i) => y - 10 + i).map((yy) => ({ label: String(yy), onSelect: () => onMonthChange(new Date(yy, m, 1)) }))} />
      </div>
      <PickerNav dir={1} label="Next month" onClick={() => onMonthChange(new Date(y, m + 1, 1))} />
    </div>
  );
}

export interface PickerGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** CSS selector of the focusable items inside the grid, e.g. ".helix-pcell" */
  itemSelector: string;
  /** Items per row: ArrowUp / ArrowDown move by this many (1 for a list) */
  cols: number;
  /** PageUp (-1) / PageDown (1), e.g. previous / next year */
  onPage?: (dir: -1 | 1) => void;
}

/** Keyboard navigation for a grid or list of picker items, with a roving tab stop: Tab reaches the selected item (or the first enabled one), arrow keys move between items and skip disabled ones, Home / End jump to the first / last, PageUp / PageDown call onPage. Enter and Space select, as the items are buttons. */
export const PickerGrid = forwardRef<HTMLDivElement, PickerGridProps>(({ itemSelector, cols, onPage, onKeyDown, onFocus, children, ...props }, ref) => {
  const inner = useRef<HTMLDivElement | null>(null);
  const all = () => Array.from(inner.current?.querySelectorAll<HTMLElement>(itemSelector) ?? []);
  const enabled = (el: HTMLElement) => !(el as HTMLButtonElement).disabled;

  // roving tab stop: the selected item, else the first enabled one
  useEffect(() => {
    const items = all();
    const stop = items.find((el) => enabled(el) && (el.getAttribute('aria-pressed') === 'true' || el.getAttribute('aria-selected') === 'true')) ?? items.find(enabled);
    items.forEach((el) => { el.tabIndex = el === stop ? 0 : -1; });
  });

  return (
    <div
      ref={(el) => {
        inner.current = el;
        if (typeof ref === 'function') ref(el); else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      onFocus={(e) => {
        all().forEach((el) => { el.tabIndex = el === e.target ? 0 : -1; });
        onFocus?.(e);
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        const items = all();
        const i = items.indexOf(e.target as HTMLElement);
        if (i < 0) return;
        const to = (step: number) => {
          let j = i + step;
          while (j >= 0 && j < items.length && !enabled(items[j])) j += Math.sign(step);
          if (j >= 0 && j < items.length) items[j].focus();
        };
        switch (e.key) {
          case 'ArrowRight': e.preventDefault(); to(1); break;
          case 'ArrowLeft': e.preventDefault(); to(-1); break;
          case 'ArrowDown': e.preventDefault(); to(cols); break;
          case 'ArrowUp': e.preventDefault(); to(-cols); break;
          case 'Home': e.preventDefault(); items.find(enabled)?.focus(); break;
          case 'End': e.preventDefault(); [...items].reverse().find(enabled)?.focus(); break;
          case 'PageUp':
          case 'PageDown':
            if (!onPage) break;
            e.preventDefault();
            onPage(e.key === 'PageUp' ? -1 : 1);
            // the page can have fewer items (a 4-week month) or disabled ones: if the focused item is gone, land on the nearest enabled one
            requestAnimationFrame(() => {
              const next = all();
              if (document.activeElement && next.includes(document.activeElement as HTMLElement) && enabled(document.activeElement as HTMLElement)) return;
              const ok = next.filter(enabled);
              ok[Math.min(i, ok.length - 1)]?.focus();
            });
            break;
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
});
PickerGrid.displayName = 'PickerGrid';

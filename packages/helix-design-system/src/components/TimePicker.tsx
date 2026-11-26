import { forwardRef, useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { PickerPanel } from './PickerPanel';

export interface TimePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Selected time (only the time of day is used) */
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (value: Date) => void;
  /** Figma Show Seconds — a Seconds column (default on, as in Figma) */
  showSeconds?: boolean;
  /** Figma Show AM/PM — 12-hour clock with an AM/PM column (default off) */
  showAmPm?: boolean;
  /** Called with the chosen time when Set is pressed. Now fills in the current time. */
  onSet?: (value: Date) => void;
}

const CELL = 36;
const COL_H = 268;
const BRAND = 'var(--color-brand-primary, #F57E20)';
const pad2 = (n: number) => String(n).padStart(2, '0');

/** One scroll column of 36px cells (Figma Hours / Minutes / Seconds / AM-PM): 44 wide, 8px above the first cell. */
function Column({ label, items, selected, onSelect }: { label: string; items: { value: number; text: string }[]; selected: number; onSelect: (v: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // centre the selection on mount, afterwards only keep it in view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const i = items.findIndex((it) => it.value === selected);
    if (i < 0) return;
    const top = 8 + i * CELL;
    if (first.current) { el.scrollTop = Math.max(0, top - COL_H / 2 + CELL / 2); first.current = false; return; }
    if (top < el.scrollTop) el.scrollTop = top - 8;
    else if (top + CELL > el.scrollTop + COL_H) el.scrollTop = top + CELL - COL_H + 8;
  }, [selected, items]);

  // ArrowUp / ArrowDown step through the column and select as they go (like a native select), Home / End / PageUp / PageDown jump,
  // ArrowLeft / ArrowRight hop to the selected cell of the neighbouring column. Tab reaches the selected cell of each column.
  const focusSelected = (col?: Element | null) => requestAnimationFrame(() => col?.querySelector<HTMLElement>('[aria-selected="true"]')?.focus());
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const i = items.findIndex((it) => it.value === selected);
    const jump = (to: number) => {
      e.preventDefault();
      const j = Math.min(items.length - 1, Math.max(0, to));
      if (j !== i) onSelect(items[j].value);
      focusSelected(ref.current);
    };
    switch (e.key) {
      case 'ArrowDown': jump(i + 1); break;
      case 'ArrowUp': jump(i - 1); break;
      case 'PageDown': jump(i + 5); break;
      case 'PageUp': jump(i - 5); break;
      case 'Home': jump(0); break;
      case 'End': jump(items.length - 1); break;
      case 'ArrowLeft':
      case 'ArrowRight': {
        const cols = Array.from(ref.current?.parentElement?.querySelectorAll('[role="listbox"]') ?? []);
        const at = cols.indexOf(ref.current as Element);
        const next = cols[at + (e.key === 'ArrowRight' ? 1 : -1)];
        if (next) { e.preventDefault(); focusSelected(next); }
        break;
      }
    }
  };

  return (
    <div
      ref={ref}
      role="listbox"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="helix-time-col"
      style={{ width: 44, height: COL_H, boxSizing: 'border-box', padding: '8px 4px', overflowY: 'auto', flexShrink: 0, display: 'flex', flexDirection: 'column' }}
    >
      {items.map((it) => {
        const on = it.value === selected;
        return (
          <button
            key={it.value}
            type="button"
            role="option"
            aria-selected={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onSelect(it.value)}
            className="helix-time-cell"
            style={{
              width: CELL, height: CELL, flexShrink: 0, border: 'none', borderRadius: 6, cursor: 'pointer',
              fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px',
              backgroundColor: on ? BRAND : 'transparent', color: on ? '#FAFAFA' : 'var(--color-text-secondary, #49494A)',
            }}
          >
            {it.text}
          </button>
        );
      })}
    </div>
  );
}

/** A time panel with scroll columns for hours, minutes, optional seconds and AM/PM, and a Now / Set action row. Compose it in a Popover under an Input for a time field. */
export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(({
  value: controlled,
  defaultValue = null,
  onChange,
  showSeconds = true,
  showAmPm = false,
  onSet,
  style,
  ...props
}, ref) => {
  const [internal, setInternal] = useState<Date | null>(defaultValue);
  const value = controlled !== undefined ? controlled : internal;

  const h24 = value?.getHours() ?? 0;
  const pm = h24 >= 12;
  const shownHour = showAmPm ? h24 % 12 || 12 : h24;

  const commit = (next: Date) => {
    if (controlled === undefined) setInternal(next);
    onChange?.(next);
  };
  const setParts = (h: number, m: number, s: number) => {
    const next = new Date(value ?? new Date());
    next.setHours(h, m, s, 0);
    commit(next);
  };
  const m = value?.getMinutes() ?? 0;
  const s = value?.getSeconds() ?? 0;
  const from12 = (h12: number, isPm: boolean) => (h12 % 12) + (isPm ? 12 : 0);

  const hours = Array.from({ length: showAmPm ? 12 : 24 }, (_, i) => { const v = showAmPm ? i + 1 : i; return { value: v, text: pad2(v) }; });
  const sixty = Array.from({ length: 60 }, (_, i) => ({ value: i, text: pad2(i) }));
  const periods = [{ value: 0, text: 'AM' }, { value: 1, text: 'PM' }];

  const Divider = () => <span aria-hidden="true" style={{ width: 1, alignSelf: 'stretch', backgroundColor: 'var(--color-stroke-subtle, #EEEEEE)', flexShrink: 0 }} />;
  const columns = [
    <Column key="h" label="Hours" items={hours} selected={shownHour} onSelect={(v) => setParts(showAmPm ? from12(v, pm) : v, m, s)} />,
    <Column key="m" label="Minutes" items={sixty} selected={m} onSelect={(v) => setParts(h24, v, s)} />,
    ...(showSeconds ? [<Column key="s" label="Seconds" items={sixty} selected={s} onSelect={(v) => setParts(h24, m, v)} />] : []),
    ...(showAmPm ? [<Column key="p" label="AM/PM" items={periods} selected={pm ? 1 : 0} onSelect={(v) => setParts(from12(shownHour, v === 1), m, s)} />] : []),
  ];

  const now = () => commit(new Date());

  return (
    <PickerPanel ref={ref} role="group" aria-label="Time picker" padding={0} style={style} {...props}>
      <style>{'.helix-time-col{scrollbar-width:none}.helix-time-col::-webkit-scrollbar{display:none}.helix-time-cell:hover:not([aria-selected="true"]){background-color:var(--color-container-tertiary,#EEEEEE)!important}.helix-time-cell:focus-visible{outline:2px solid var(--color-brand-primary,#F57E20);outline-offset:-2px}'}</style>
      {/* Figma Time (134 wide with three columns; never narrower, so Now / Set fit) */}
      <div style={{ display: 'flex', minWidth: 134 }}>
        {columns.map((c, i) => (i === 0 ? c : <span key={i} style={{ display: 'contents' }}><Divider />{c}</span>))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, boxSizing: 'border-box', padding: 8, borderTop: '1px solid var(--color-stroke-subtle, #EEEEEE)' }}>
        <Button size="sm" hierarchy="secondary" appearance="ghost" onClick={now}>Now</Button>
        <Button size="sm" hierarchy="primary" appearance="solid" onClick={() => onSet?.(value ?? new Date())}>Set</Button>
      </div>
    </PickerPanel>
  );
});

TimePicker.displayName = 'TimePicker';

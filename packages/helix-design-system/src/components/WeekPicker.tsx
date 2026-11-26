import { forwardRef, useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import type { DateRange } from './DatePicker';
import { PickerGrid, PickerMonthHeader, PickerPanel } from './PickerPanel';

export interface WeekPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Selected week as a date range (start to end, both days included) */
  value?: DateRange | null;
  defaultValue?: DateRange | null;
  /** Called with the chosen week: `start` is its first day, `end` its last (the last week of a month can be shorter than 7 days) */
  onChange?: (value: { start: Date; end: Date }) => void;
  /** Month shown first (defaults to the selected week's month, or this month) */
  defaultMonth?: Date;
  /** Month names follow this locale; the default matches Figma (Jan, Mei, Agu, Okt, Des ...) */
  locale?: string;
  /** Weeks that can't be picked */
  isDisabled?: (week: { start: Date; end: Date }) => boolean;
}

const sameDay = (a?: Date, b?: Date) => !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const CSS = '.helix-weekrow:hover:not(:disabled):not([aria-selected="true"]){background-color:var(--color-status-brand-bg,#FEF2E9)!important}.helix-weekrow:focus-visible{outline:2px solid var(--color-brand-primary,#F57E20);outline-offset:-2px}';

/** A week panel: a month and year header and a list of the weeks in that month, each labelled with its date range (W1 (1 - 7 Jan 2026) ...). Weeks are 7-day blocks counted from the 1st, so the last one can be shorter. Use it when the value you need is one week as a date range; for a calendar that selects a whole row use DatePicker mode="week". Compose it in a Popover under an Input. */
export const WeekPicker = forwardRef<HTMLDivElement, WeekPickerProps>(({
  value: controlled,
  defaultValue = null,
  onChange,
  defaultMonth,
  locale = 'id-ID',
  isDisabled,
  style,
  ...props
}, ref) => {
  const [internal, setInternal] = useState<DateRange | null>(defaultValue);
  const value = controlled !== undefined ? controlled : internal;
  const [month, setMonth] = useState(() => {
    const d = defaultMonth ?? value?.start ?? new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const shortNames = useMemo(() => Array.from({ length: 12 }, (_, i) => new Intl.DateTimeFormat(locale, { month: 'short' }).format(new Date(2000, i, 1)).replace('.', '')), [locale]);
  const longNames = useMemo(() => Array.from({ length: 12 }, (_, i) => new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(2000, i, 1))), [locale]);

  const y = month.getFullYear();
  const m = month.getMonth();
  const weeks = useMemo(() => {
    const last = new Date(y, m + 1, 0).getDate();
    const out: { n: number; start: Date; end: Date }[] = [];
    for (let s = 1, n = 1; s <= last; s += 7, n++) out.push({ n, start: new Date(y, m, s), end: new Date(y, m, Math.min(s + 6, last)) });
    return out;
  }, [y, m]);

  const pick = (w: { start: Date; end: Date }) => {
    if (isDisabled?.(w)) return;
    const next = { start: w.start, end: w.end };
    if (controlled === undefined) setInternal(next);
    onChange?.(next);
  };

  return (
    <PickerPanel ref={ref} role="group" aria-label="Week picker" style={style} {...props}>
      <style>{CSS}</style>
      <div style={{ width: 252 }}>
        <PickerMonthHeader month={month} onMonthChange={setMonth} shortNames={shortNames} longNames={longNames} />
        {/* Figma Week List Body: 36px rows, 2px apart, 8px above and below */}
        <PickerGrid itemSelector=".helix-weekrow" cols={1} onPage={(d) => setMonth(new Date(y, m + d, 1))} role="listbox" aria-label="Weeks" style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 0' }}>
          {weeks.map((w) => {
            const selected = sameDay(w.start, value?.start) && sameDay(w.end, value?.end);
            const disabled = isDisabled?.(w);
            const label = `W${w.n} (${w.start.getDate()} - ${w.end.getDate()} ${shortNames[m]} ${y})`;
            return (
              <button
                key={w.n}
                type="button"
                role="option"
                aria-selected={selected}
                disabled={disabled}
                onClick={() => pick(w)}
                className="helix-weekrow"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, width: '100%', minHeight: 36, boxSizing: 'border-box', padding: '8px 12px',
                  border: 'none', borderRadius: 6, textAlign: 'left', cursor: disabled ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px',
                  backgroundColor: selected ? 'var(--color-status-brand-bg, #FEF2E9)' : 'var(--color-container-primary, #FFFFFF)',
                  color: selected ? 'var(--color-brand-primary, #F57E20)' : disabled ? 'var(--color-text-muted, #9F9F9F)' : 'var(--color-text-secondary, #49494A)',
                }}
              >
                <span style={{ flex: 1, minWidth: 0 }}>{label}</span>
                {selected && <Check size={16} aria-hidden="true" style={{ flexShrink: 0 }} />}
              </button>
            );
          })}
        </PickerGrid>
      </div>
    </PickerPanel>
  );
});

WeekPicker.displayName = 'WeekPicker';

import { forwardRef, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { DropdownMenu } from './DropdownMenu';
import { Tag } from './Tag';

/** Figma Mode — Single, Range, Date and Time, Time */
export type DatePickerMode = 'single' | 'range' | 'date-time' | 'time';

export interface DateRange {
  start?: Date;
  end?: Date;
}

export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  mode?: DatePickerMode;
  /** Selected date for single and date-time modes; the time part is used by date-time and time */
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (value: Date) => void;
  /** Selected range for range mode */
  range?: DateRange;
  defaultRange?: DateRange;
  onRangeChange?: (range: DateRange) => void;
  /** Month shown first (defaults to the selected date or today) */
  defaultMonth?: Date;
  /** First day of the week, 0 = Sunday (default) */
  weekStartsOn?: 0 | 1;
  locale?: string;
  /** Dates that can't be picked */
  isDisabled?: (date: Date) => boolean;
}

const sameDay = (a?: Date | null, b?: Date | null) => !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const BRAND = 'var(--color-brand-primary, #F57E20)';
const SUBTLE = 'var(--color-status-brand-bg, #FEF2E9)';

function Nav({ dir, onClick }: { dir: -1 | 1; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={dir === -1 ? 'Previous month' : 'Next month'}
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, padding: 0, borderRadius: 5.33, cursor: 'pointer', border: '1px solid var(--color-stroke-subtle, #EEEEEE)', backgroundColor: 'var(--color-container-secondary, #F7F7F7)', color: 'var(--color-text-secondary, #49494A)' }}
    >
      {dir === -1 ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
    </button>
  );
}

function TimeColumn({ label, count, value, onChange }: { label: string; count: number; value: number; onChange: (v: number) => void }) {
  return (
    <div role="listbox" aria-label={label} style={{ display: 'flex', flexDirection: 'column', gap: 2, height: 256, overflowY: 'auto', padding: 2, width: 56 }}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="option"
          aria-selected={i === value}
          onClick={() => onChange(i)}
          style={{
            flexShrink: 0, height: 32, border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'var(--font-family-body)', fontSize: 13,
            backgroundColor: i === value ? BRAND : 'transparent', color: i === value ? '#FFFFFF' : 'var(--color-text-primary, #14141E)',
          }}
        >
          {String(i).padStart(2, '0')}
        </button>
      ))}
    </div>
  );
}

/** A calendar panel for picking a single date, a date range, a date and time, or just a time. Compose it in a Popover under an Input for a date field. */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(({
  mode = 'single',
  value: controlled,
  defaultValue = null,
  onChange,
  range: controlledRange,
  defaultRange = {},
  onRangeChange,
  defaultMonth,
  weekStartsOn = 0,
  locale = 'en-US',
  isDisabled,
  style,
  ...props
}, ref) => {
  const [internal, setInternal] = useState<Date | null>(defaultValue);
  const [internalRange, setInternalRange] = useState<DateRange>(defaultRange);
  const value = controlled !== undefined ? controlled : internal;
  const range = controlledRange ?? internalRange;
  const [month, setMonth] = useState(() => startOfDay(defaultMonth ?? value ?? range.start ?? new Date()));
  const [hover, setHover] = useState<Date | null>(null);
  const today = useMemo(() => new Date(), []);

  const monthNames = useMemo(() => Array.from({ length: 12 }, (_, i) => new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(2000, i, 1))), [locale]);
  const weekdays = useMemo(() => Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(new Date(2023, 0, 1 + ((i + weekStartsOn) % 7)))), [locale, weekStartsOn]);

  const cells = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const lead = (first.getDay() - weekStartsOn + 7) % 7;
    return Array.from({ length: 42 }, (_, i) => new Date(month.getFullYear(), month.getMonth(), 1 - lead + i)).filter((_, i, a) => i < 35 || a[35].getMonth() === month.getMonth());
  }, [month, weekStartsOn]);

  const setValue = (d: Date) => {
    const next = new Date(d); if (value) next.setHours(value.getHours(), value.getMinutes());
    if (controlled === undefined) setInternal(next);
    onChange?.(next);
  };
  const setRange = (r: DateRange) => { if (controlledRange === undefined) setInternalRange(r); onRangeChange?.(r); };

  const pick = (d: Date) => {
    if (isDisabled?.(d)) return;
    if (mode === 'range') {
      if (!range.start || range.end) setRange({ start: d });
      else setRange(d < range.start ? { start: d, end: range.start } : { start: range.start, end: d });
    } else setValue(d);
    if (d.getMonth() !== month.getMonth()) setMonth(startOfDay(d));
  };

  const setTime = (h?: number, m?: number) => {
    const base = value ?? new Date();
    const next = new Date(base); next.setHours(h ?? base.getHours(), m ?? base.getMinutes(), 0, 0);
    if (controlled === undefined) setInternal(next);
    onChange?.(next);
  };

  const rangeEnd = range.end ?? (range.start && hover && hover > range.start ? hover : undefined);

  const calendar = (
    <div style={{ width: 252 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 24 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <DropdownMenu
            trigger={<Tag size="sm" color="transparent" label={monthNames[month.getMonth()].slice(0, 3)} trailingIcon={<ChevronDown size={10} />} style={{ cursor: 'pointer' }} />}
            items={monthNames.map((n, i) => ({ label: n, onSelect: () => setMonth(new Date(month.getFullYear(), i, 1)) }))}
          />
          <DropdownMenu
            trigger={<Tag size="sm" color="transparent" label={String(month.getFullYear())} trailingIcon={<ChevronDown size={10} />} style={{ cursor: 'pointer' }} />}
            items={Array.from({ length: 21 }, (_, i) => month.getFullYear() - 10 + i).map((y) => ({ label: String(y), onSelect: () => setMonth(new Date(y, month.getMonth(), 1)) }))}
          />
        </div>
        <Nav dir={-1} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} />
        <Nav dir={1} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 36px)', marginTop: 16, height: 20 }}>
        {weekdays.map((w) => <span key={w} style={{ textAlign: 'center', fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 12, lineHeight: '20px', color: 'var(--color-text-tertiary, #828282)' }}>{w.slice(0, 2)}</span>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 36px)', gridAutoRows: 36, rowGap: 8, marginTop: 8 }} onMouseLeave={() => setHover(null)}>
        {cells.map((d) => {
          const outside = d.getMonth() !== month.getMonth();
          const disabled = isDisabled?.(d);
          const isStart = mode === 'range' && sameDay(d, range.start);
          const isEnd = mode === 'range' && sameDay(d, range.end ?? undefined);
          const inRange = mode === 'range' && range.start && rangeEnd && d > range.start && d < rangeEnd;
          const selected = mode === 'range' ? isStart || isEnd : sameDay(d, value);
          const isToday = sameDay(d, today);
          return (
            <div key={d.toISOString()} style={{ backgroundColor: inRange || ((isStart || isEnd) && range.start && rangeEnd && !sameDay(range.start, rangeEnd)) ? SUBTLE : 'transparent', borderRadius: isStart ? '8px 0 0 8px' : isEnd || (isStart === false && sameDay(d, rangeEnd)) ? '0 8px 8px 0' : 0 }}>
              <button
                type="button"
                disabled={disabled}
                aria-pressed={selected}
                aria-current={isToday ? 'date' : undefined}
                aria-label={d.toDateString()}
                onClick={() => pick(d)}
                onMouseEnter={() => setHover(d)}
                className="helix-day"
                style={{
                  width: 36, height: 36, border: 'none', borderRadius: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
                  fontFamily: 'var(--font-family-body)', fontSize: 13, position: 'relative',
                  backgroundColor: selected ? BRAND : 'transparent', color: selected ? '#FAFAFA' : outside ? 'var(--color-text-tertiary, #828282)' : 'var(--color-text-primary, #14141E)',
                }}
              >
                {d.getDate()}
                {isToday && !selected && <span aria-hidden="true" style={{ position: 'absolute', left: '50%', bottom: 5, width: 4, height: 4, marginLeft: -2, borderRadius: '50%', backgroundColor: BRAND }} />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  const time = (
    <div style={{ display: 'flex', gap: 8 }}>
      <TimeColumn label="Hours" count={24} value={value?.getHours() ?? 0} onChange={(h) => setTime(h, undefined)} />
      <TimeColumn label="Minutes" count={60} value={value?.getMinutes() ?? 0} onChange={(m) => setTime(undefined, m)} />
    </div>
  );

  const timeRow = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 12, marginTop: 12, borderTop: '1px solid var(--color-stroke-subtle, #EEEEEE)', fontFamily: 'var(--font-family-body)', fontSize: 13, color: 'var(--color-text-secondary, #49494A)' }}>
      <span style={{ flex: 1 }}>Time</span>
      {(['h', 'm'] as const).map((k, i) => (
        <span key={k} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {i === 1 && <span>:</span>}
          <input
            aria-label={k === 'h' ? 'Hours' : 'Minutes'}
            inputMode="numeric"
            value={String((k === 'h' ? value?.getHours() : value?.getMinutes()) ?? 0).padStart(2, '0')}
            onChange={(e) => { const n = Number(e.target.value.replace(/\D/g, '').slice(-2)); if (k === 'h') setTime(Math.min(n, 23), undefined); else setTime(undefined, Math.min(n, 59)); }}
            style={{ width: 40, height: 28, boxSizing: 'border-box', textAlign: 'center', borderRadius: 6, border: '1px solid var(--color-stroke-subtle, #EEEEEE)', fontFamily: 'var(--font-family-body)', fontSize: 13, outline: 'none' }}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Date picker"
      style={{ display: 'inline-block', boxSizing: 'border-box', padding: 12, borderRadius: 12, backgroundColor: 'var(--color-container-primary, #FFFFFF)', border: '1px solid var(--color-stroke-subtle, #EEEEEE)', boxShadow: '0 1px 2px rgba(89,89,90,0.15)', ...style }}
      {...props}
    >
      <style>{'.helix-day:hover:not(:disabled):not([aria-pressed="true"]){background-color:var(--color-container-tertiary,#EEEEEE)!important}.helix-day:focus-visible{outline:2px solid var(--color-brand-primary,#F57E20);outline-offset:-2px}'}</style>
      {mode === 'time' ? time : mode === 'date-time' ? <>{calendar}{timeRow}</> : calendar}
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

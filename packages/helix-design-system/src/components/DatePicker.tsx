import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronsUpDown } from 'lucide-react';
import { Button } from './Button';
import { DropdownMenu } from './DropdownMenu';
import { Input } from './Input';
import { PickerNav, PickerPanel } from './PickerPanel';
import { Select } from './Select';
import { TimePicker } from './TimePicker';

/** Figma Mode — Single, Range, Week, Date and Time. `time` is kept for compatibility and renders a TimePicker (Figma split Time into its own component). */
export type DatePickerMode = 'single' | 'range' | 'week' | 'date-time' | 'time';

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
  /** Figma Time Input — how the time of Date and Time is entered: Spinner fields (type or arrow keys) or Dropdown selects */
  timeInput?: 'spinner' | 'dropdown';
  /** Figma Show Seconds — a seconds field after minutes (default on, as in Figma) */
  showSeconds?: boolean;
  /** Figma Show AM/PM — 12-hour clock with an AM/PM field (default off) */
  showAmPm?: boolean;
  /** Date and Time: called with the chosen date and time when Set is pressed. Now fills in the current moment. */
  onSet?: (value: Date) => void;
  /** Range only (Figma Range with Time Input): a Start time and an End time under the calendars, plus Now / Set. The range then carries times. */
  showTime?: boolean;
  /** Range with time: called with the chosen range when Set is pressed. Now sets both ends to the current moment. */
  onRangeSet?: (range: DateRange) => void;
  /** Figma Show Week Number — a W column with the ISO week number of each row (shown on Week in Figma) */
  showWeekNumbers?: boolean;
  locale?: string;
  /** Dates that can't be picked */
  isDisabled?: (date: Date) => boolean;
}

const sameDay = (a?: Date | null, b?: Date | null) => !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
/** ISO 8601 week number (Monday-based, week 1 holds the first Thursday). */
const isoWeek = (d: Date) => {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil(((t.getTime() - y0.getTime()) / 86400000 + 1) / 7);
};
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const BRAND = 'var(--color-brand-primary, #F57E20)';
const SUBTLE = 'var(--color-status-brand-bg, #FEF2E9)';

const Nav = ({ dir, onClick }: { dir: -1 | 1; onClick: () => void }) => (
  <PickerNav dir={dir} label={dir === -1 ? 'Previous month' : 'Next month'} onClick={onClick} />
);

/** A calendar panel for picking a single date, a date range, a week, or a date and time. Compose it in a Popover under an Input for a date field. For time only use TimePicker. */
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
  showWeekNumbers = false,
  timeInput = 'spinner',
  showSeconds = true,
  showAmPm = false,
  onSet,
  showTime = false,
  onRangeSet,
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
  /* Range with time: the time of day of each end, remembered while a range is being re-picked (start 00:00:00, end 23:59:59 until edited). */
  type HMS = [number, number, number];
  const [draftT, setDraftT] = useState<{ start: HMS; end: HMS }>({ start: [0, 0, 0], end: [23, 59, 59] });
  const today = useMemo(() => new Date(), []);

  const monthNames = useMemo(() => Array.from({ length: 12 }, (_, i) => new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(2000, i, 1))), [locale]);
  const weekdays = useMemo(() => Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(new Date(2023, 0, 1 + ((i + weekStartsOn) % 7)))), [locale, weekStartsOn]);

  const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1);
  /** The days shown for a month: 5 weeks, or 6 when the month needs them. */
  const buildCells = (m: Date) => {
    const first = new Date(m.getFullYear(), m.getMonth(), 1);
    const lead = (first.getDay() - weekStartsOn + 7) % 7;
    return Array.from({ length: 42 }, (_, i) => new Date(m.getFullYear(), m.getMonth(), 1 - lead + i)).filter((_, i, a) => i < 35 || a[35].getMonth() === m.getMonth());
  };

  /* Keyboard: a roving tab stop plus arrow-key movement across the days (Figma has no spec for this; it follows the WAI-ARIA date picker pattern).
     Arrows move a day / a week, Home / End the start / end of the week, PageUp / PageDown a month (Shift: a year). Disabled days are skipped. */
  const panelRef = useRef<HTMLDivElement | null>(null);
  const setPanelRef = (el: HTMLDivElement | null) => {
    panelRef.current = el;
    if (typeof ref === 'function') ref(el); else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };
  const [focusDay, setFocusDay] = useState<Date | null>(null);
  const pendingFocus = useRef<string | null>(null);
  const dayKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const leftFirst = new Date(month.getFullYear(), month.getMonth(), 1);
  const visibleMonths = mode === 'range' ? [leftFirst, addMonths(leftFirst, 1)] : [leftFirst];
  const isVisible = (d: Date) => visibleMonths.some((v) => v.getFullYear() === d.getFullYear() && v.getMonth() === d.getMonth());
  const inMonth = (d: Date) => d.getMonth() === month.getMonth() && d.getFullYear() === month.getFullYear();

  useEffect(() => {
    const key = pendingFocus.current;
    if (!key) return;
    pendingFocus.current = null;
    const root = panelRef.current;
    (root?.querySelector<HTMLElement>(`[data-date="${key}"][data-outside="false"]`) ?? root?.querySelector<HTMLElement>(`[data-date="${key}"]`))?.focus();
  });

  const shiftMonths = (d: Date, k: number) => {
    const t = new Date(d.getFullYear(), d.getMonth() + k, 1);
    return new Date(t.getFullYear(), t.getMonth(), Math.min(d.getDate(), new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate()));
  };
  const goToDay = (n: Date) => {
    setFocusDay(n);
    pendingFocus.current = dayKey(n);
    if (!isVisible(n)) setMonth(mode === 'range' && n > leftFirst ? addMonths(n, -1) : new Date(n.getFullYear(), n.getMonth(), 1));
  };
  const onDayKeyDown = (e: React.KeyboardEvent, d: Date) => {
    const lead = (d.getDay() - weekStartsOn + 7) % 7;
    const add = (days: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
    let n: Date; let dir = 1;
    switch (e.key) {
      case 'ArrowLeft': n = add(-1); dir = -1; break;
      case 'ArrowRight': n = add(1); break;
      case 'ArrowUp': n = add(-7); dir = -1; break;
      case 'ArrowDown': n = add(7); break;
      case 'Home': n = add(-lead); dir = -1; break;
      case 'End': n = add(6 - lead); break;
      case 'PageUp': n = shiftMonths(d, e.shiftKey ? -12 : -1); dir = -1; break;
      case 'PageDown': n = shiftMonths(d, e.shiftKey ? 12 : 1); break;
      default: return;
    }
    e.preventDefault();
    let guard = 0;
    while (isDisabled?.(n) && guard++ < 366) n = new Date(n.getFullYear(), n.getMonth(), n.getDate() + dir);
    if (!isDisabled?.(n)) goToDay(n);
  };

  const setValue = (d: Date) => {
    const next = new Date(d); if (value) next.setHours(value.getHours(), value.getMinutes());
    if (controlled === undefined) setInternal(next);
    onChange?.(next);
  };
  const setRange = (r: DateRange) => { if (controlledRange === undefined) setInternalRange(r); onRangeChange?.(r); };

  const hmsOf = (d?: Date): HMS | undefined => (d ? [d.getHours(), d.getMinutes(), d.getSeconds()] : undefined);
  const startT: HMS = hmsOf(range.start) ?? draftT.start;
  const endT: HMS = hmsOf(range.end) ?? draftT.end;
  const at = (d: Date, t: HMS) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), t[0], t[1], t[2], 0);
  const setRangeTime = (which: 'start' | 'end', t: HMS) => {
    setDraftT((p) => ({ ...p, [which]: t }));
    const d = range[which];
    if (d) setRange({ ...range, [which]: at(d, t) });
  };

  const pick = (d: Date) => {
    if (isDisabled?.(d)) return;
    if (mode === 'week') {
      const start = new Date(d.getFullYear(), d.getMonth(), d.getDate() - ((d.getDay() - weekStartsOn + 7) % 7));
      setRange({ start, end: new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6) });
    } else if (mode === 'range') {
      const S = (x: Date) => (showTime ? at(x, startT) : x);
      const E = (x: Date) => (showTime ? at(x, endT) : x);
      if (!range.start || range.end) setRange({ start: S(d) });
      else {
        const rs = startOfDay(range.start);
        setRange(d < rs ? { start: S(d), end: E(rs) } : { start: range.start, end: E(d) });
      }
      if (showTime) setDraftT({ start: startT, end: endT });
    } else setValue(d);
    if (mode !== 'range' && mode !== 'week' && d.getMonth() !== month.getMonth()) setMonth(startOfDay(d));
  };

  const setTime = (h?: number, m?: number, sec?: number) => {
    const base = value ?? new Date();
    const next = new Date(base); next.setHours(h ?? base.getHours(), m ?? base.getMinutes(), sec ?? base.getSeconds(), 0);
    if (controlled === undefined) setInternal(next);
    onChange?.(next);
  };

  const rangeLike = mode === 'range' || mode === 'week';
  const tabDay: Date | null = [focusDay, rangeLike ? range.start : value, today].find((c) => c && isVisible(c) && !isDisabled?.(c)) as Date | undefined
    ?? buildCells(leftFirst).find((c) => inMonth(c) && !isDisabled?.(c)) ?? null;
  const rangeEnd = range.end ?? (mode === 'range' && range.start && hover && hover > startOfDay(range.start) ? hover : undefined);

  const renderMonth = (m: Date, pane: 'single' | 'start' | 'end') => {
    // the End pane shows the month after `month`, so picking in it moves `month` one back
    const weeks = buildCells(m);
    const weekText = { fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px', color: 'var(--color-text-tertiary, #828282)' } as const;
    const goTo = (d: Date) => setMonth(pane === 'end' ? addMonths(d, -1) : d);
    return (
    <div key={pane} style={{ width: showWeekNumbers ? 288 : 252 }}>
      {/* Figma _month-header (252 x 36). Single: prev left, next right, dropdowns centred.
          Range: the Start pane carries only prev, the End pane only next, dropdowns sit beside them. */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36 }}>
        {pane !== 'end' && <Nav dir={-1} onClick={() => setMonth(addMonths(month, -1))} />}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: pane === 'single' ? 'center' : 'flex-start', gap: pane === 'single' ? 10 : 28 }}>
          <DropdownMenu
            trigger={<Button size="sm" hierarchy="secondary" appearance="ghost" trailingIcon={<ChevronDown size={14} />} style={{ minWidth: 84 }}>{monthNames[m.getMonth()]}</Button>}
            items={monthNames.map((n, i) => ({ label: n, onSelect: () => goTo(new Date(m.getFullYear(), i, 1)) }))}
          />
          <DropdownMenu
            trigger={<Button size="sm" hierarchy="secondary" appearance="ghost" trailingIcon={<ChevronDown size={14} />} style={{ minWidth: 84 }}>{String(m.getFullYear())}</Button>}
            items={Array.from({ length: 21 }, (_, i) => m.getFullYear() - 10 + i).map((y) => ({ label: String(y), onSelect: () => goTo(new Date(y, m.getMonth(), 1)) }))}
          />
        </div>
        {pane !== 'start' && <Nav dir={1} onClick={() => setMonth(addMonths(month, 1))} />}
      </div>
      <div style={{ display: 'flex' }}>
        {showWeekNumbers && (
          <div style={{ width: 36, flexShrink: 0 }}>
            <div style={{ height: 20, marginTop: 16, textAlign: 'center', ...weekText }}>W</div>
            <div style={{ display: 'grid', gridAutoRows: 36, rowGap: 8, marginTop: 8 }}>
              {Array.from({ length: weeks.length / 7 }, (_, r) => (
                <span key={r} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...weekText }}>{`W${isoWeek(weeks[r * 7])}`}</span>
              ))}
            </div>
          </div>
        )}
        <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 36px)', marginTop: 16, height: 20 }}>
          {weekdays.map((w) => <span key={w} style={{ textAlign: 'center', fontFamily: 'var(--font-family-body)', fontWeight: 400, fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px', color: 'var(--color-text-tertiary, #828282)' }}>{w.slice(0, 2)}</span>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 36px)', gridAutoRows: 36, rowGap: 8, marginTop: 8 }} onMouseLeave={() => setHover(null)}>
          {weeks.map((d) => {
            const outside = d.getMonth() !== m.getMonth();
            const disabled = isDisabled?.(d);
            const isStart = rangeLike && sameDay(d, range.start);
            const isEnd = rangeLike && sameDay(d, range.end ?? undefined);
            const inRange = rangeLike && range.start && rangeEnd && d > startOfDay(range.start) && d < startOfDay(rangeEnd);
            const selected = rangeLike ? isStart || isEnd : sameDay(d, value);
            const isToday = sameDay(d, today);
            return (
              <div key={d.toISOString()} style={{ backgroundColor: inRange || ((isStart || isEnd) && range.start && rangeEnd && !sameDay(range.start, rangeEnd)) ? SUBTLE : 'transparent', borderRadius: isStart ? '6px 0 0 6px' : isEnd || (isStart === false && sameDay(d, rangeEnd)) ? '0 6px 6px 0' : 0 }}>
                <button
                  type="button"
                  disabled={disabled}
                  aria-pressed={selected}
                  aria-current={isToday ? 'date' : undefined}
                  aria-label={d.toDateString()}
                  data-date={dayKey(d)}
                  data-outside={String(outside)}
                  tabIndex={!outside && tabDay && sameDay(d, tabDay) ? 0 : -1}
                  onClick={() => pick(d)}
                  onFocus={() => setFocusDay(d)}
                  onKeyDown={(e) => onDayKeyDown(e, d)}
                  onMouseEnter={() => setHover(d)}
                  className="helix-day"
                  style={{
                    width: 36, height: 36, border: 'none', borderRadius: 6, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
                    fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px', position: 'relative',
                    /* Figma _day: Default #49494A, Outside #9F9F9F, Selected brand + #FAFAFA, Today = subtle brand cell + #14141E */
                    backgroundColor: selected ? BRAND : isToday ? SUBTLE : 'transparent',
                    color: selected ? '#FAFAFA' : outside ? 'var(--color-text-muted, #9F9F9F)' : isToday ? 'var(--color-text-primary, #14141E)' : 'var(--color-text-secondary, #49494A)',
                  }}
                >
                  {d.getDate()}
                </button>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
  };

  const calendar = renderMonth(month, 'single');
  /* Figma Mode=Range: Start month | End month, 16px apart (_picker-base 520 wide) */
  const rangeCalendars = (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
      {renderMonth(month, 'start')}
      {renderMonth(addMonths(month, 1), 'end')}
    </div>
  );

  /* Time fields (Figma Action row): Hours : Minutes [: Seconds] [AM/PM], as Spinner Inputs or Dropdown Selects. Shared by Date and Time and by Range with time. */
  const LINE = '1px solid var(--color-stroke-subtle, #EEEEEE)';
  const pad2 = (n: number) => String(n).padStart(2, '0');
  // Select triggers are wider than Input fields: with seconds + AM/PM + dropdown the row needs 36px more than the 252px calendar
  const wideTime = timeInput === 'dropdown' && showSeconds && showAmPm;
  type Seg = { key: string; label: string; min: number; max: number; value: number; set: (n: number) => void };

  const timeFields = (t: HMS, onT: (t: HMS) => void, prefix = '') => {
    const [h24, mi, se] = t;
    const isPm = h24 >= 12;
    const shown = showAmPm ? h24 % 12 || 12 : h24;
    const from12 = (h12: number, p: boolean) => (h12 % 12) + (p ? 12 : 0);
    const segs: Seg[] = [
      { key: 'h', label: `${prefix}Hours`, min: showAmPm ? 1 : 0, max: showAmPm ? 12 : 23, value: shown, set: (n) => onT([showAmPm ? from12(n, isPm) : n, mi, se]) },
      { key: 'm', label: `${prefix}Minutes`, min: 0, max: 59, value: mi, set: (n) => onT([h24, n, se]) },
      ...(showSeconds ? [{ key: 's', label: `${prefix}Seconds`, min: 0, max: 59, value: se, set: (n: number) => onT([h24, mi, n]) }] : []),
    ];
    const step = (g: Seg, dir: 1 | -1) => g.set(g.value + dir > g.max ? g.min : g.value + dir < g.min ? g.max : g.value + dir);
    const setPm = (p: boolean) => onT([from12(shown, p), mi, se]);

    const spinnerField = (g: Seg) => (
      <Input
        key={g.key}
        aria-label={g.label}
        inputMode="numeric"
        value={pad2(g.value)}
        onChange={(e) => { const n = Number(e.target.value.replace(/\D/g, '').slice(-2)); g.set(Math.min(Math.max(n, g.min), g.max)); }}
        onKeyDown={(e) => { if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); step(g, e.key === 'ArrowUp' ? 1 : -1); } }}
        // with seconds AND AM/PM the fields are ~52px wide: drop the icon so two digits fit (arrow keys still work)
        trailing={showSeconds && showAmPm ? undefined : <ChevronsUpDown size={14} aria-hidden="true" />}
        style={{ flex: 1, minWidth: 0 }}
      />
    );
    const selectField = (g: Seg) => (
      <Select
        key={g.key}
        options={Array.from({ length: g.max - g.min + 1 }, (_, i) => ({ value: String(g.min + i), label: pad2(g.min + i) }))}
        value={String(g.value)}
        onValueChange={(v) => g.set(Number(v))}
        style={{ flex: 1, minWidth: 0 }}
      />
    );
    const ampmField = timeInput === 'dropdown' ? (
      <Select
        options={[{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }]}
        value={isPm ? 'PM' : 'AM'}
        onValueChange={(v) => setPm(v === 'PM')}
        style={{ width: 64, flexShrink: 0 }}
      />
    ) : (
      <Input
        aria-label={`${prefix}AM/PM`}
        readOnly
        value={isPm ? 'PM' : 'AM'}
        onClick={() => setPm(!isPm)}
        onKeyDown={(e) => { if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); setPm(!isPm); } }}
        trailing={<ChevronsUpDown size={14} aria-hidden="true" />}
        style={{ width: 64, flexShrink: 0, cursor: 'pointer' }}
      />
    );
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: showSeconds && showAmPm ? 2 : 4 }}>
        {segs.map((g, i) => (
          <span key={g.key} style={{ display: 'contents' }}>
            {i > 0 && <span aria-hidden="true" style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, color: 'var(--color-text-tertiary, #828282)' }}>:</span>}
            {timeInput === 'dropdown' ? selectField(g) : spinnerField(g)}
          </span>
        ))}
        {showAmPm && <span style={{ marginLeft: 4, display: 'contents' }}>{ampmField}</span>}
      </div>
    );
  };

  // Date and Time: one time row under the calendar
  const dtT: HMS = [value?.getHours() ?? 0, value?.getMinutes() ?? 0, value?.getSeconds() ?? 0];
  const timeRow = (
    <div style={{ boxSizing: 'border-box', marginTop: 16, padding: '12px 0', borderTop: LINE }}>
      {timeFields(dtT, (t) => setTime(t[0], t[1], t[2]))}
    </div>
  );

  // Range with time (Figma Time Range): Start time | End time under both calendars, 16px apart
  const groupW = wideTime ? 288 : 252;
  const labelText = { fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '20px', letterSpacing: '-0.01px', color: 'var(--color-text-secondary, #49494A)' } as const;
  const timeRange = (
    <div style={{ display: 'grid', gridTemplateColumns: `${groupW}px ${groupW}px`, gap: 16, boxSizing: 'border-box', padding: '12px 0', borderTop: LINE }}>
      {(['start', 'end'] as const).map((k) => (
        <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={labelText}>{k === 'start' ? 'Start time' : 'End time'}</span>
          {timeFields(k === 'start' ? startT : endT, (t) => setRangeTime(k, t), k === 'start' ? 'Start ' : 'End ')}
        </div>
      ))}
    </div>
  );

  // Set Action (Now / Set): Date and Time and Range with time
  const actionRow = (onNow: () => void, onSetClick: () => void) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, boxSizing: 'border-box', padding: 8, borderTop: LINE }}>
      <Button size="sm" hierarchy="secondary" appearance="ghost" onClick={onNow}>Now</Button>
      <Button size="sm" hierarchy="primary" appearance="solid" onClick={onSetClick}>Set</Button>
    </div>
  );
  const setNow = () => {
    const now = new Date();
    if (controlled === undefined) setInternal(now);
    onChange?.(now);
    setMonth(startOfDay(now));
  };
  const setRow = actionRow(setNow, () => onSet?.(value ?? new Date()));
  const rangeNow = () => {
    const now = new Date();
    setRange({ start: now, end: now });
    setDraftT({ start: [now.getHours(), now.getMinutes(), now.getSeconds()], end: [now.getHours(), now.getMinutes(), now.getSeconds()] });
    setMonth(startOfDay(now));
  };
  const rangeSetRow = actionRow(rangeNow, () => onRangeSet?.(range));

  // Figma moved Time out of Date Picker; keep the old mode working by rendering the new component
  if (mode === 'time') {
    return <TimePicker ref={ref} value={controlled} defaultValue={defaultValue} onChange={onChange} showSeconds={showSeconds} showAmPm={showAmPm} onSet={onSet} style={style} {...props} />;
  }

  return (
    <PickerPanel ref={setPanelRef} role="group" aria-label="Date picker" style={style} {...props}>
      <style>{'.helix-day:hover:not(:disabled):not([aria-pressed="true"]){background-color:var(--color-container-tertiary,#EEEEEE)!important}.helix-day:focus-visible{outline:2px solid var(--color-brand-primary,#F57E20);outline-offset:-2px}'}</style>
        {mode === 'date-time' ? <div style={{ width: wideTime ? 288 : 252 }}><div style={{ width: 252, margin: '0 auto' }}>{calendar}</div>{timeRow}{setRow}</div> : mode === 'range' ? (showTime ? <div style={{ width: 2 * groupW + 16 }}><div style={{ width: 520, margin: '0 auto' }}>{rangeCalendars}</div>{timeRange}{rangeSetRow}</div> : rangeCalendars) : calendar}
    </PickerPanel>
  );
});

DatePicker.displayName = 'DatePicker';

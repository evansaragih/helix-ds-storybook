import { forwardRef, useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

export type DatePickerMode = 'date' | 'range' | 'month' | 'year';

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  onRangeChange?: (start: Date | null, end: Date | null) => void;
  mode?: DatePickerMode;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  label?: string;
  error?: string;
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function formatDate(d: Date | null | undefined): string {
  if (!d) return '';
  return `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function inRange(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  return date >= start && date <= end;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(({
  value,
  onChange,
  rangeStart,
  rangeEnd,
  onRangeChange,
  mode = 'date',
  placeholder,
  disabled = false,
  minDate,
  maxDate,
  label,
  error,
}, ref) => {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => value ?? rangeStart ?? new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const displayValue = mode === 'range'
    ? (rangeStart || rangeEnd ? `${formatDate(rangeStart)} – ${formatDate(rangeEnd)}` : '')
    : formatDate(value);

  const prevMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleDayClick = (day: number) => {
    const selected = new Date(year, month, day);
    if (mode === 'range') {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        onRangeChange?.(selected, null);
      } else {
        const start = rangeStart < selected ? rangeStart : selected;
        const end   = rangeStart < selected ? selected : rangeStart;
        onRangeChange?.(start, end);
        setOpen(false);
      }
    } else {
      onChange?.(selected);
      setOpen(false);
    }
  };

  const isDisabledDay = (day: number) => {
    const d = new Date(year, month, day);
    return (minDate && d < minDate) || (maxDate && d > maxDate);
  };

  return (
    <div ref={(el) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
    }} style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', gap: 4 }}>
      {label && (
        <label style={{
          fontFamily: 'Rubik, sans-serif', fontWeight: 500, fontSize: 13,
          color: 'var(--color-text-primary, #14141E)', lineHeight: '19.2px',
        }}>
          {label}
        </label>
      )}

      {/* Input trigger */}
      <div
        onClick={() => { if (!disabled) setOpen(v => !v); }}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          height: 40, padding: '0 12px',
          border: `1px solid ${error ? 'var(--color-destructive, #DC2626)' : open ? 'var(--color-brand-primary, #F57E20)' : 'var(--color-stroke-subtle, #EEEEEE)'}`,
          borderRadius: 8,
          backgroundColor: disabled ? 'var(--color-container-secondary, #F7F7F7)' : '#FFFFFF',
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: open ? '3px solid var(--color-brand-primary-ring, rgba(245,126,32,0.2))' : 'none',
          minWidth: 200,
          boxSizing: 'border-box',
          transition: 'border-color 0.15s',
        }}
      >
        <Calendar size={16} color="var(--color-text-tertiary, #828282)" style={{ flexShrink: 0 }} />
        <span style={{
          flex: 1,
          fontFamily: 'Rubik, sans-serif', fontSize: 13,
          color: displayValue ? 'var(--color-text-primary, #14141E)' : 'var(--color-text-tertiary, #828282)',
        }}>
          {displayValue || (placeholder ?? (mode === 'range' ? 'Select date range' : 'Select date'))}
        </span>
        {displayValue && !disabled && (
          <button
            onClick={e => {
              e.stopPropagation();
              if (mode === 'range') onRangeChange?.(null, null);
              else onChange?.(null);
            }}
            style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--color-text-tertiary, #828282)' }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {error && (
        <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: 12, color: 'var(--color-destructive, #DC2626)', lineHeight: '18px' }}>
          {error}
        </span>
      )}

      {/* Calendar dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 300,
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
          borderRadius: 'var(--radius-md, 6px)',
          boxShadow: '0px 8px 24px rgba(0,0,0,0.10)',
          padding: 12,
          minWidth: 280,
        }}>
          {/* Month navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <button onClick={prevMonth} style={{ padding: 4, border: 'none', background: 'none', cursor: 'pointer', borderRadius: 6, display: 'flex', alignItems: 'center', color: 'var(--color-text-secondary, #49494A)' }}>
              <ChevronLeft size={16} />
            </button>
            <span style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 400, fontSize: 13, letterSpacing: '-0.01px', color: 'var(--color-text-primary, #14141E)' }}>
              {MONTHS[month]} {year}
            </span>
            <button onClick={nextMonth} style={{ padding: 4, border: 'none', background: 'none', cursor: 'pointer', borderRadius: 6, display: 'flex', alignItems: 'center', color: 'var(--color-text-secondary, #49494A)' }}>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 4 }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', fontFamily: 'Rubik, sans-serif', fontWeight: 400, fontSize: 13, letterSpacing: '-0.01px', color: 'var(--color-text-tertiary, #828282)', padding: '4px 0' }}>
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = new Date(year, month, day);
              const isSelected = value && isSameDay(date, value);
              const isRangeStart = rangeStart && isSameDay(date, rangeStart);
              const isRangeEnd = rangeEnd && isSameDay(date, rangeEnd);
              const isInRange = inRange(date, rangeStart ?? null, rangeEnd ?? null);
              const isDis = isDisabledDay(day);
              const isActive = isSelected || isRangeStart || isRangeEnd;
              const today = isSameDay(date, new Date());

              return (
                <button
                  key={day}
                  onClick={() => { if (!isDis) handleDayClick(day); }}
                  style={{
                    width: '100%', aspectRatio: '1',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: 'none',
                    borderRadius: 'var(--radius-md, 6px)',
                    backgroundColor: isActive
                      ? 'var(--color-brand-primary, #F57E20)'
                      : (isInRange || (today && !isActive)) ? 'var(--color-status-brand-bg, #FEF2E9)' : 'transparent',
                    color: isActive ? '#FFFFFF' : isDis ? '#D7D7D7' : 'var(--color-text-primary, #14141E)',
                    cursor: isDis ? 'not-allowed' : 'pointer',
                    fontFamily: 'Rubik, sans-serif',
                    fontSize: 13,
                    fontWeight: 400,
                    letterSpacing: '-0.01px',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={e => { if (!isActive && !isDis) e.currentTarget.style.backgroundColor = 'var(--color-status-brand-bg, #FEF2E9)'; }}
                  onMouseLeave={e => { if (!isActive && !isInRange && !today) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

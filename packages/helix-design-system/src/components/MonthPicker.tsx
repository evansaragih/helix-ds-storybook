import { forwardRef, useMemo, useState } from 'react';
import { PICKER_CELL_CSS, PickerCell, PickerGrid, PickerPanel, PickerYearHeader } from './PickerPanel';

export interface MonthPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Selected month (any day in it; reported back as the 1st) */
  value?: Date | null;
  defaultValue?: Date | null;
  /** Called with the 1st of the chosen month */
  onChange?: (value: Date) => void;
  /** Year shown first (defaults to the selected month's year, or this year) */
  defaultYear?: number;
  /** Month names follow this locale; the default matches Figma (Jan Feb Mar Apr Mei Jun Jul Agu Sep Okt Nov Des) */
  locale?: string;
  /** Months that can't be picked (Figma _period-cell State=Disabled). Receives the 1st of the month. */
  isDisabled?: (month: Date) => boolean;
}

const sameMonth = (a?: Date | null, b?: Date | null) => !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

/** A month panel: a year header with chevrons and a 3x4 grid of months. Compose it in a Popover under an Input for a month field. For a quarter use QuarterPicker, for a day or week use DatePicker. */
export const MonthPicker = forwardRef<HTMLDivElement, MonthPickerProps>(({
  value: controlled,
  defaultValue = null,
  onChange,
  defaultYear,
  locale = 'id-ID',
  isDisabled,
  style,
  ...props
}, ref) => {
  const [internal, setInternal] = useState<Date | null>(defaultValue);
  const value = controlled !== undefined ? controlled : internal;
  const [year, setYear] = useState(() => defaultYear ?? value?.getFullYear() ?? new Date().getFullYear());

  const short = useMemo(() => Array.from({ length: 12 }, (_, i) => new Intl.DateTimeFormat(locale, { month: 'short' }).format(new Date(2000, i, 1)).replace('.', '')), [locale]);
  const long = useMemo(() => Array.from({ length: 12 }, (_, i) => new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(2000, i, 1))), [locale]);

  const pick = (i: number) => {
    const next = new Date(year, i, 1);
    if (isDisabled?.(next)) return;
    if (controlled === undefined) setInternal(next);
    onChange?.(next);
  };

  return (
    <PickerPanel ref={ref} role="group" aria-label="Month picker" style={style} {...props}>
      <style>{PICKER_CELL_CSS}</style>
      <div style={{ width: 252 }}>
        <PickerYearHeader year={year} onYearChange={setYear} />
        {/* Figma Month Body: 4 rows of 3 tiles, 8px gaps, 8px above and below */}
        <PickerGrid itemSelector=".helix-pcell" cols={3} onPage={(d) => setYear(year + d)} role="group" aria-label="Months" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: 44, gap: 8, padding: '8px 0' }}>
          {short.map((label, i) => {
            const month = new Date(year, i, 1);
            return (
              <PickerCell
                key={i}
                label={label}
                aria-label={`${long[i]} ${year}`}
                selected={sameMonth(month, value)}
                disabled={isDisabled?.(month)}
                onClick={() => pick(i)}
              />
            );
          })}
        </PickerGrid>
      </div>
    </PickerPanel>
  );
});

MonthPicker.displayName = 'MonthPicker';

import { forwardRef, useMemo, useState } from 'react';
import { PICKER_CELL_CSS, PickerCell, PickerGrid, PickerPanel, PickerYearHeader } from './PickerPanel';

export interface QuarterPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Selected quarter (any day in it; reported back as the 1st day of the quarter) */
  value?: Date | null;
  defaultValue?: Date | null;
  /** Called with the 1st day of the quarter: Jan 1, Apr 1, Jul 1 or Oct 1 */
  onChange?: (value: Date) => void;
  /** Year shown first (defaults to the selected quarter's year, or this year) */
  defaultYear?: number;
  /** Month names in the tiles follow this locale; the default matches Figma (Jan–Mar, Apr–Jun, Jul–Sep, Okt–Des) */
  locale?: string;
  /** Quarters that can't be picked (Figma _period-cell State=Disabled). Receives the 1st day of the quarter. */
  isDisabled?: (quarterStart: Date) => boolean;
}

const quarterOf = (d: Date) => Math.floor(d.getMonth() / 3);
const sameQuarter = (a?: Date | null, b?: Date | null) => !!a && !!b && a.getFullYear() === b.getFullYear() && quarterOf(a) === quarterOf(b);

/** A quarter panel: a year header with chevrons and four tiles, Q1 to Q4, each with its months. Compose it in a Popover under an Input for a quarter field. */
export const QuarterPicker = forwardRef<HTMLDivElement, QuarterPickerProps>(({
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

  const pick = (q: number) => {
    const next = new Date(year, q * 3, 1);
    if (isDisabled?.(next)) return;
    if (controlled === undefined) setInternal(next);
    onChange?.(next);
  };

  return (
    <PickerPanel ref={ref} role="group" aria-label="Quarter picker" style={style} {...props}>
      <style>{PICKER_CELL_CSS}</style>
      <div style={{ width: 252 }}>
        <PickerYearHeader year={year} onYearChange={setYear} />
        {/* Figma Quarter Body: 2 rows of 2 tiles (64 high), 8px gaps, 8px above and below */}
        <PickerGrid itemSelector=".helix-pcell" cols={2} onPage={(d) => setYear(year + d)} role="group" aria-label="Quarters" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridAutoRows: 64, gap: 8, padding: '8px 0' }}>
          {[0, 1, 2, 3].map((q) => {
            const start = new Date(year, q * 3, 1);
            const months = `${short[q * 3]}–${short[q * 3 + 2]}`;
            return (
              <PickerCell
                key={q}
                label={`Q${q + 1}`}
                sub={months}
                height={64}
                aria-label={`Q${q + 1} ${year} (${months})`}
                selected={sameQuarter(start, value)}
                disabled={isDisabled?.(start)}
                onClick={() => pick(q)}
              />
            );
          })}
        </PickerGrid>
      </div>
    </PickerPanel>
  );
});

QuarterPicker.displayName = 'QuarterPicker';

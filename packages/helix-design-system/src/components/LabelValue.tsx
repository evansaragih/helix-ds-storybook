import { forwardRef } from 'react';

export type LabelValueLayout = 'vertical' | 'horizontal';
export type LabelValueSize = 'sm' | 'md' | 'lg';

export interface LabelValueProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  label: React.ReactNode;
  value: React.ReactNode;
  layout?: LabelValueLayout;
  size?: LabelValueSize;
  /** Optional node after the label (e.g. an info icon) */
  labelSuffix?: React.ReactNode;
  /** Optional node after the value (e.g. a copy button or badge) */
  valueSuffix?: React.ReactNode;
}

const FONT: Record<LabelValueSize, { size: number; line: string }> = {
  sm: { size: 13, line: '19.2px' },
  md: { size: 16, line: '24px' },
  lg: { size: 20, line: '30px' },
};

/** A read-only label/value display row for static data — replaces disabled inputs. For editable data use Input. */
export const LabelValue = forwardRef<HTMLDivElement, LabelValueProps>(({
  label,
  value,
  layout = 'vertical',
  size = 'md',
  labelSuffix,
  valueSuffix,
  style,
  ...props
}, ref) => {
  const f = FONT[size];
  const text: React.CSSProperties = {
    margin: 0,
    fontFamily: 'var(--font-family-body)',
    fontSize: f.size,
    lineHeight: f.line,
    letterSpacing: '-0.01px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
  };

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: layout === 'vertical' ? 'column' : 'row',
        alignItems: layout === 'vertical' ? 'flex-start' : 'center',
        gap: layout === 'vertical' ? (size === 'sm' ? 0 : 4) : 8,
        ...style,
      }}
      {...props}
    >
      <p style={{ ...text, fontWeight: 500, color: 'var(--color-brand-secondary, #58595B)' }}>{label}{labelSuffix}</p>
      <p style={{ ...text, fontWeight: 400, color: 'var(--color-text-primary, #14141E)' }}>{value}{valueSuffix}</p>
    </div>
  );
});

LabelValue.displayName = 'LabelValue';

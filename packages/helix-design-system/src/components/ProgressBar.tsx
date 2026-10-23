import { forwardRef } from 'react';
import { Badge } from './Badge';

/** Figma Type — how the percentage and label are shown */
export type ProgressBarType = 'base' | 'title-label' | 'trailing-label' | 'top-floating-label' | 'bottom-floating-label' | 'within';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress from 0 to 100 (Figma Value) */
  value: number;
  type?: ProgressBarType;
  /** Left text for title-label (Figma Label) */
  label?: React.ReactNode;
  /** Right text for title-label (Figma Supporting Text); defaults to the percentage */
  supportingText?: React.ReactNode;
}

const clamp = (v: number) => Math.min(Math.max(v, 0), 100);
const text: React.CSSProperties = { fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '20px', letterSpacing: '-0.01px', color: 'var(--color-text-primary, #14141E)' };

/** A horizontal track showing determinate completion. Use for upload or download progress and form completion; for an unknown wait use Spinner. */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(({
  value,
  type = 'base',
  label,
  supportingText,
  style,
  ...props
}, ref) => {
  const pct = clamp(value);
  const label$ = `${Math.round(pct)}%`;

  const track = (within = false) => (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      style={{ position: 'relative', flex: 1, minWidth: 0, height: within ? 16 : 8, borderRadius: 9999, overflow: 'hidden', backgroundColor: 'var(--color-container-tertiary, #EEEEEE)' }}
    >
      <div style={{ width: `${pct}%`, height: '100%', borderRadius: 9999, backgroundColor: 'var(--color-brand-primary, #F57E20)', transition: 'width var(--motion-duration-slow) var(--motion-easing-standard)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 4, boxSizing: 'border-box' }}>
        {within && pct >= 12 && <span style={{ fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 8, lineHeight: '12px', color: '#FFFFFF' }}>{label$}</span>}
      </div>
    </div>
  );

  const floating = (
    <div aria-hidden="true" style={{ position: 'relative', height: 20 }}>
      <div style={{ position: 'absolute', left: `${pct}%`, transform: `translateX(-${pct}%)` }}>
        <Badge size="sm" color="neutral" appearance="outline" label={label$} />
      </div>
    </div>
  );

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', ...style }} {...props}>
      {type === 'title-label' && (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <span style={text}>{label}</span>
          <span style={text}>{supportingText ?? label$}</span>
        </div>
      )}
      {type === 'top-floating-label' && floating}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {track(type === 'within')}
        {type === 'trailing-label' && <span style={{ ...text, minWidth: 42, textAlign: 'right' }}>{label$}</span>}
      </div>
      {type === 'bottom-floating-label' && floating}
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

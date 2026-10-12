import { forwardRef } from 'react';

/** Figma Size — XXS 40 · XS 64 · SM 88 · MD 112 · LG 144 */
export type ProgressCircleSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
/** Figma Thickness */
export type ProgressCircleThickness = 'thick' | 'thin';

export interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress from 0 to 100 (Figma Value) */
  value: number;
  size?: ProgressCircleSize;
  thickness?: ProgressCircleThickness;
  /** Show the center label (Figma Label=True) — the caption and percentage, or `children` */
  label?: boolean;
  /** Small caption above the percentage (Figma Supporting Text) */
  supportingText?: string;
  /** Replaces the default center content (Figma Label Slot) — an icon, Icon Tile or custom node */
  children?: React.ReactNode;
}

const DIAMETER: Record<ProgressCircleSize, number> = { xxs: 40, xs: 64, sm: 88, md: 112, lg: 144 };

/** A circular ring showing determinate completion. Use where a compact circle fits better than a bar, such as a small upload status. For a full-width read use Progress Bar. */
export const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(({
  value,
  size = 'md',
  thickness = 'thick',
  label = true,
  supportingText,
  children,
  style,
  ...props
}, ref) => {
  const d = DIAMETER[size];
  const pct = Math.min(Math.max(value, 0), 100);
  // Figma ring widths: thick ≈ 10px at 112, thin ≈ 3px at 64 — scaled with the diameter
  const w = thickness === 'thick' ? d * 0.0893 : d * 0.047;
  const r = (d - w) / 2;
  const c = 2 * Math.PI * r;
  const inner = d * 0.64;
  const showLabel = label && size !== 'xxs';
  const xxsText = size === 'xxs' && label;

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      style={{ position: 'relative', display: 'inline-flex', width: d, height: d, flexShrink: 0, alignItems: 'center', justifyContent: 'center', ...style }}
      {...props}
    >
      {thickness === 'thick' && size !== 'xxs' && <span aria-hidden="true" style={{ position: 'absolute', width: inner, height: inner, borderRadius: '50%', backgroundColor: 'var(--color-status-brand-bg, #FEF2E9)' }} />}
      <svg width={d} height={d} viewBox={`0 0 ${d} ${d}`} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }} aria-hidden="true">
        <circle cx={d / 2} cy={d / 2} r={r} fill="none" stroke="var(--color-container-tertiary, #EEEEEE)" strokeWidth={w} />
        <circle cx={d / 2} cy={d / 2} r={r} fill="none" stroke="var(--color-brand-primary, #F57E20)" strokeWidth={w} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} style={{ transition: 'stroke-dashoffset 0.3s ease' }} />
      </svg>
      {(showLabel || children) && (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, textAlign: 'center', fontFamily: 'var(--font-family-body)' }}>
          {children ?? (
            <>
              {supportingText && <span style={{ fontWeight: 500, fontSize: 8, lineHeight: '12px', color: 'var(--color-text-secondary, #49494A)' }}>{supportingText}</span>}
              <span style={{ fontWeight: 500, fontSize: Math.max(10, Math.round(d * 0.18)), lineHeight: 1.2, color: 'var(--color-brand-primary, #F57E20)' }}>{Math.round(pct)}%</span>
            </>
          )}
        </div>
      )}
      {xxsText && !children && <span style={{ position: 'relative', fontWeight: 500, fontSize: 9, color: 'var(--color-brand-primary, #F57E20)', fontFamily: 'var(--font-family-body)' }}>{Math.round(pct)}%</span>}
    </div>
  );
});

ProgressCircle.displayName = 'ProgressCircle';

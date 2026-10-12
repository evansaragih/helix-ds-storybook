import { forwardRef } from 'react';

/** Figma Brand — the arc color. Neutral is white, for dark surfaces. */
export type SpinnerBrand = 'nusantics' | 'cekolam' | 'causa' | 'neutral';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  brand?: SpinnerBrand;
  /** Diameter in px (Figma is 48) */
  size?: number;
  /** Accessible name (default "Loading") */
  label?: string;
}

const COLOR: Record<SpinnerBrand, string> = {
  nusantics: '#F57E20',
  cekolam: '#EB7323',
  causa: '#434F6A',
  neutral: '#FFFFFF',
};

/** An indeterminate loading ring: a 270° arc that fades from the brand color to transparent, spinning. Use for a wait of unknown length; when you know the progress use Progress Bar. */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(({
  brand = 'nusantics',
  size = 48,
  label = 'Loading',
  style,
  ...props
}, ref) => {
  const color = COLOR[brand];
  // Figma: inner radius 0.85 → ring is 7.5% of the diameter; never thinner than 2px
  const ring = Math.max(2, size * 0.075);

  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      style={{ position: 'relative', display: 'inline-block', width: size, height: size, flexShrink: 0, animation: 'spinner-spin 0.9s linear infinite', ...style }}
      {...props}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: `conic-gradient(from 0deg, transparent 0deg, ${color} 270deg, transparent 270deg)`,
          WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${ring}px), #000 calc(100% - ${ring}px))`,
          mask: `radial-gradient(farthest-side, transparent calc(100% - ${ring}px), #000 calc(100% - ${ring}px))`,
        }}
      />
      {/* rounded head of the arc */}
      <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: `calc(50% - ${ring / 2}px)`, width: ring, height: ring, borderRadius: '50%', backgroundColor: color }} />
    </span>
  );
});

Spinner.displayName = 'Spinner';

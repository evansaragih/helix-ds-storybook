import { forwardRef } from 'react';

export type DotColor = 'brand' | 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'on-primary';
export type DotSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface DotProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: DotColor;
  size?: DotSize;
  /** White ring around the dot, for sitting on top of an Avatar or icon */
  ring?: boolean;
}

const SIZES: Record<DotSize, number> = { xs: 4, sm: 6, md: 8, lg: 10, xl: 12, '2xl': 16 };

const COLORS: Record<DotColor, string> = {
  brand:        'var(--color-brand-primary, #F57E20)',
  neutral:      'var(--color-icon-on-surface-neutral, #3A3A3B)',
  info:         'var(--color-text-info, #014CC5)',
  success:      'var(--color-text-success, #12843C)',
  warning:      'var(--color-text-warning, #A66800)',
  error:        'var(--color-icon-error, #EF4444)',
  'on-primary': 'var(--color-text-on-primary, #FFFFFF)',
};

/** A small filled circle indicating status or presence — e.g. on an Avatar or inside a Badge/Tag. Use Badge when the marker needs a text label. */
export const Dot = forwardRef<HTMLSpanElement, DotProps>(({
  color = 'brand',
  size = 'md',
  ring = false,
  style,
  ...props
}, ref) => (
  <span
    ref={ref}
    style={{
      display: 'inline-block',
      width: SIZES[size],
      height: SIZES[size],
      flexShrink: 0,
      borderRadius: '50%',
      backgroundColor: COLORS[color],
      boxShadow: ring ? '0 0 0 1.5px var(--color-stroke-white, #FFFFFF)' : undefined,
      ...style,
    }}
    {...props}
  />
));

Dot.displayName = 'Dot';

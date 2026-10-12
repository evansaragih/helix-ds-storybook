import { forwardRef } from 'react';

export type IconTileSize = 'xs' | 'sm' | 'md' | 'lg';
export type IconTileColor = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'destructive' | 'info' | 'neutral';
export type IconTileAppearance = 'solid' | 'subtle';
export type IconTileShape = 'square' | 'circle';

export interface IconTileProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon node — sized automatically */
  icon: React.ReactNode;
  size?: IconTileSize;
  color?: IconTileColor;
  appearance?: IconTileAppearance;
  shape?: IconTileShape;
}

const SIZES: Record<IconTileSize, { box: number; icon: number }> = {
  xs: { box: 26, icon: 14 },
  sm: { box: 38, icon: 20 },
  md: { box: 48, icon: 24 },
  lg: { box: 58, icon: 28 },
};

/* Solid = bold surface + white icon; Subtle = tinted surface + matching icon color */
const COLORS: Record<IconTileColor, { solid: string; subtle: string; subtleIcon: string }> = {
  primary:     { solid: 'var(--color-brand-primary, #F57E20)',        subtle: 'var(--color-status-brand-bg, #FEF2E9)',   subtleIcon: 'var(--color-brand-primary, #F57E20)' },
  secondary:   { solid: 'var(--color-brand-secondary, #58595B)',      subtle: 'var(--color-container-secondary, #F7F7F7)', subtleIcon: 'var(--color-brand-secondary, #58595B)' },
  tertiary:    { solid: 'var(--color-brand-tertiary, #476142)',       subtle: 'var(--color-container-secondary, #F7F7F7)', subtleIcon: 'var(--color-brand-tertiary, #476142)' },
  success:     { solid: 'var(--color-stroke-success, #22C55E)',       subtle: 'var(--color-status-success-bg, #E9F9EF)', subtleIcon: 'var(--color-text-success, #12843C)' },
  warning:     { solid: 'var(--primitive-yellow-50, #F59E0B)',        subtle: 'var(--color-status-warning-bg, #FEF5E7)', subtleIcon: 'var(--color-text-warning, #A66800)' },
  destructive: { solid: 'var(--color-destructive, #DC2626)',          subtle: 'var(--color-status-error-bg, #FEE2E2)',   subtleIcon: 'var(--color-destructive, #DC2626)' },
  info:        { solid: 'var(--color-stroke-info, #3B82F6)',          subtle: 'var(--color-status-info-bg, #EBF2FE)',    subtleIcon: 'var(--color-text-info, #014CC5)' },
  neutral:     { solid: 'var(--color-container-secondary, #F7F7F7)', subtle: 'var(--color-container-secondary, #F7F7F7)', subtleIcon: 'var(--color-text-secondary, #49494A)' },
};

/** A tile with a centered icon on a colored background. Use as a decorative or status icon container (list-item leading visual, modal featured icon). For a clickable icon use IconButton. */
export const IconTile = forwardRef<HTMLDivElement, IconTileProps>(({
  icon,
  size = 'md',
  color = 'primary',
  appearance = 'solid',
  shape = 'square',
  style,
  ...props
}, ref) => {
  const dim = SIZES[size];
  const c = COLORS[color];
  const solid = appearance === 'solid' && color !== 'neutral';

  return (
    <div
      ref={ref}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: dim.box,
        height: dim.box,
        borderRadius: shape === 'circle' ? 9999 : 8,
        backgroundColor: solid ? c.solid : c.subtle,
        color: solid ? '#FFFFFF' : c.subtleIcon,
        boxShadow: solid ? 'inset 0 2px 0 0 rgba(255,255,255,0.4)' : undefined,
        ...style,
      }}
      {...props}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: dim.icon, height: dim.icon }}>
        {icon}
      </span>
    </div>
  );
});

IconTile.displayName = 'IconTile';

import { forwardRef } from 'react';
import { Badge, resolveBadgeStyle } from './Badge';
import type { BadgeColor, BadgeSize } from './Badge';

/** Figma Color — the Badge Group set offers these five */
export type BadgeGroupColor = Extract<BadgeColor, 'brand' | 'neutral' | 'error' | 'warning' | 'success'>;

export interface BadgeGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** The short badge text */
  badge: string;
  /** The supporting description next to the badge */
  children: React.ReactNode;
  color?: BadgeGroupColor;
  /** md nests an sm Badge; lg nests an md Badge */
  size?: 'md' | 'lg';
  /** Badge before or after the text */
  position?: 'leading' | 'trailing';
  /** Show a status dot inside the badge (Figma Icon=Dot) */
  dot?: boolean;
}

/** A Badge paired with a supporting description in one pill — for announcements and feature callouts. */
export const BadgeGroup = forwardRef<HTMLDivElement, BadgeGroupProps>(({
  badge,
  children,
  color = 'brand',
  size = 'md',
  position = 'leading',
  dot = false,
  style,
  ...props
}, ref) => {
  const v = resolveBadgeStyle(color, 'subtle');
  const inner: BadgeSize = size === 'md' ? 'sm' : 'md';
  const leading = position === 'leading';

  const pill = <Badge color={color} appearance="subtle" size={inner} label={badge} status={dot} />;

  return (
    <div
      ref={ref}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: leading ? '4px 12px 4px 4px' : '4px 4px 4px 12px',
        borderRadius: 9999,
        backgroundColor: v.bg,
        color: v.text,
        fontFamily: 'var(--font-family-body)',
        fontSize: size === 'md' ? 10 : 13,
        lineHeight: size === 'md' ? '16px' : '19.2px',
        ...style,
      }}
      {...props}
    >
      {leading && pill}
      <span>{children}</span>
      {!leading && pill}
    </div>
  );
});

BadgeGroup.displayName = 'BadgeGroup';

import { forwardRef } from 'react';

/** Figma Color */
export type BadgeColor = 'brand' | 'info' | 'success' | 'warning' | 'error' | 'neutral';
/** Figma Appearance */
export type BadgeAppearance = 'solid' | 'outline' | 'subtle';
/** Figma Size */
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  color?: BadgeColor;
  appearance?: BadgeAppearance;
  size?: BadgeSize;
  /** Badge text */
  label: string;
  /** Leading icon — sized automatically */
  leadingIcon?: React.ReactNode;
  /** Trailing icon — sized automatically */
  trailingIcon?: React.ReactNode;
  /** Leading avatar image URL (Figma Leading Avatar) */
  leadingAvatar?: string;
  /** Show the leading status dot (Figma Status) */
  status?: boolean;
  /** Show a leading spinner (Figma Leading Loading) */
  loading?: boolean;
}

/* ─── Figma sizes (Badge component set, Size=xs|sm|md|lg) ──────────── */
interface SizeConfig { fontSize: number; lineHeight: string; fontWeight: number; px: number; py: number; icon: number; dot: number; gap: number }

const SIZES: Record<BadgeSize, SizeConfig> = {
  xs: { fontSize: 8,  lineHeight: '12px',   fontWeight: 500, px: 6.4, py: 1.6, icon: 8,  dot: 3, gap: 3 },
  sm: { fontSize: 10, lineHeight: '15.6px', fontWeight: 400, px: 8,   py: 2,   icon: 10, dot: 4, gap: 4 },
  md: { fontSize: 13, lineHeight: '19.2px', fontWeight: 400, px: 8,   py: 3,   icon: 12, dot: 5, gap: 4 },
  lg: { fontSize: 16, lineHeight: '24px',   fontWeight: 400, px: 8,   py: 4,   icon: 16, dot: 6, gap: 6 },
};

/* ─── Figma Color × Appearance ─────────────────────────────────────── */
interface ColorTokens { solid: string; solidText: string; subtle: string; text: string; stroke: string }

const COLORS: Record<BadgeColor, ColorTokens> = {
  brand:   { solid: 'var(--color-brand-primary, #F57E20)',        solidText: 'var(--color-text-on-primary, #FFFFFF)', subtle: 'var(--color-status-brand-bg, #FEF2E9)',     text: 'var(--color-brand-primary, #F57E20)',  stroke: 'var(--color-brand-primary, #F57E20)' },
  info:    { solid: 'var(--color-stroke-info, #3B82F6)',          solidText: 'var(--color-text-on-primary, #FFFFFF)', subtle: 'var(--color-status-info-bg, #EBF2FE)',      text: 'var(--color-text-info, #014CC5)',      stroke: 'var(--color-stroke-info, #3B82F6)' },
  success: { solid: 'var(--color-stroke-success, #22C55E)',       solidText: 'var(--color-text-on-primary, #FFFFFF)', subtle: 'var(--color-status-success-bg, #E9F9EF)',   text: 'var(--color-text-success, #12843C)',   stroke: 'var(--color-stroke-success, #22C55E)' },
  warning: { solid: 'var(--primitive-yellow-50, #F59E0B)',        solidText: 'var(--color-text-on-primary, #FFFFFF)', subtle: 'var(--color-status-warning-bg, #FEF5E7)',   text: 'var(--color-text-warning, #A66800)',   stroke: 'var(--primitive-yellow-50, #F59E0B)' },
  error:   { solid: 'var(--color-destructive, #DC2626)',          solidText: 'var(--color-text-on-primary, #FFFFFF)', subtle: 'var(--color-status-error-bg, #FEE2E2)',     text: 'var(--color-destructive, #DC2626)',    stroke: 'var(--primitive-red-70, #991B1B)' },
  neutral: { solid: 'var(--color-container-secondary, #F7F7F7)', solidText: 'var(--color-text-secondary, #49494A)',  subtle: 'var(--color-container-secondary, #F7F7F7)', text: 'var(--color-text-secondary, #49494A)', stroke: 'var(--color-stroke-subtle, #EEEEEE)' },
};

export function resolveBadgeStyle(color: BadgeColor, appearance: BadgeAppearance): { bg: string; text: string; border?: string } {
  const c = COLORS[color];
  if (appearance === 'solid') return { bg: c.solid, text: c.solidText };
  if (appearance === 'outline') return { bg: c.subtle, text: c.text, border: `0.5px solid ${c.stroke}` };
  return { bg: c.subtle, text: c.text };
}

function Spinner({ size }: { size: number }) {
  return (
    <span style={{
      width: size, height: size, flexShrink: 0, borderRadius: '50%',
      border: '1.5px solid currentColor', borderTopColor: 'transparent', animation: 'badge-spin 0.75s linear infinite',
    }} />
  );
}

/** Status / label badge. Use for compact status, category or count indicators. For clickable filter chips use Tag. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
  color = 'brand',
  appearance = 'subtle',
  size = 'sm',
  label,
  leadingIcon,
  trailingIcon,
  leadingAvatar,
  status = false,
  loading = false,
  style,
  ...props
}, ref) => {
  const v = resolveBadgeStyle(color, appearance);
  const s = SIZES[size];
  const slot: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: s.icon, height: s.icon, flexShrink: 0 };

  return (
    <span
      ref={ref}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: s.gap,
        padding: `${s.py}px ${s.px}px`,
        borderRadius: 9999,
        boxSizing: 'border-box',
        backgroundColor: v.bg,
        border: v.border ?? 'none',
        color: v.text,
        fontFamily: 'var(--font-family-body)',
        fontWeight: s.fontWeight,
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        letterSpacing: '-0.01px',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        ...style,
      }}
      {...props}
    >
      {loading && <Spinner size={s.icon} />}
      {!loading && leadingAvatar && <img src={leadingAvatar} alt="" style={{ width: s.icon, height: s.icon, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />}
      {!loading && !leadingAvatar && status && <span style={{ width: s.dot, height: s.dot, borderRadius: '50%', backgroundColor: 'currentColor', flexShrink: 0 }} />}
      {!loading && !leadingAvatar && !status && leadingIcon && <span style={slot}>{leadingIcon}</span>}
      {label}
      {trailingIcon && <span style={slot}>{trailingIcon}</span>}
    </span>
  );
});

Badge.displayName = 'Badge';

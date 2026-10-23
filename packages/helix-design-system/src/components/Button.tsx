import { forwardRef, useState } from 'react';

/** Figma Hierarchy */
export type ButtonHierarchy = 'primary' | 'secondary' | 'tertiary' | 'destructive';
/** Figma Appearance */
export type ButtonAppearance = 'solid' | 'outline' | 'subtle' | 'ghost' | 'link';
/** Figma Size */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
/** Figma Underline — only used by appearance 'link' */
export type ButtonUnderline = 'always' | 'on-hover' | 'none';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hierarchy?: ButtonHierarchy;
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  underline?: ButtonUnderline;
  /** Figma State=Loading — shows a spinner and blocks interaction at full opacity */
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

/* ─── Figma sizes (Button component set, Size=xs|sm|md|lg) ─────────── */
interface SizeConfig { height: number; px: number; fontSize: number; lineHeight: string; iconSize: number; gap: number; radius: number }

const SIZES: Record<ButtonSize, SizeConfig> = {
  xs: { height: 24, px: 6,  fontSize: 10, lineHeight: '15.6px', iconSize: 12, gap: 4, radius: 4 },
  sm: { height: 36, px: 12, fontSize: 13, lineHeight: '19.2px', iconSize: 14, gap: 6, radius: 6 },
  md: { height: 44, px: 16, fontSize: 16, lineHeight: '24px',   iconSize: 16, gap: 8, radius: 8 },
  lg: { height: 52, px: 20, fontSize: 20, lineHeight: '30px',   iconSize: 20, gap: 8, radius: 8 },
};

/* ─── Figma Hierarchy × Appearance → resting / hover / focus styles ──
 * Disabled keeps the resting style at 50% opacity, as in Figma.
 * Tertiary exists as Solid and Outline only in Figma; other appearances use Outline. */
export interface ButtonStyle {
  bg: string;
  border: string;
  borderHover?: string;
  color: string;
  colorHover?: string;
  bgHover: string;
  shadow?: string;
  ring?: string;
  backdropBlur?: boolean;
}

const solidShadow = (tint: string, pct = 15) =>
  `inset 0px 2px 0px 0px rgba(255,255,255,0.4), 0px 4px 4px 0px color-mix(in srgb, ${tint} ${pct}%, transparent)`;

const RING = {
  primary: 'var(--color-brand-primary-ring, rgba(245,126,32,0.7))',
  secondary: 'var(--color-brand-secondary-ring, rgba(88,89,91,0.7))',
  destructive: 'rgba(220,38,38,0.7)',
  neutral: '#D7D7D7',
};
const DESTRUCTIVE = 'var(--color-destructive, #DC2626)';
const DESTRUCTIVE_HOVER = 'var(--color-destructive-hover, #B91C1C)';
const DESTRUCTIVE_PRESSED = 'var(--color-destructive-pressed, #991B1B)';

export function resolveButtonStyle(hierarchy: ButtonHierarchy, appearance: ButtonAppearance): ButtonStyle {
  const tertiaryOutline = hierarchy === 'tertiary' && appearance !== 'solid';
  const a: ButtonAppearance = tertiaryOutline ? 'outline' : appearance;
  const h = tertiaryOutline ? 'tertiaryOutline' : hierarchy;

  const text = {
    primary: 'var(--color-brand-primary)',
    secondary: 'var(--color-text-secondary, #49494A)',
    tertiaryOutline: 'var(--color-brand-secondary)',
    tertiary: '#FFFFFF',
    destructive: DESTRUCTIVE,
  }[h];

  if (a === 'solid') {
    if (h === 'secondary') {
      return { bg: 'var(--color-container-primary, #FFFFFF)', border: 'var(--color-stroke-subtle, #EEEEEE)', color: 'var(--color-text-tertiary, #828282)',
        shadow: solidShadow('#000000', 5), bgHover: 'var(--color-container-tertiary, #EEEEEE)', ring: RING.neutral };
    }
    const solid = {
      primary:     { bg: 'var(--color-brand-primary)',   hover: 'var(--color-brand-primary-hover)',   border: 'var(--color-brand-primary-pressed, #B35001)',   tint: 'var(--color-shadow-brand-primary)',   ring: RING.primary },
      tertiary:    { bg: 'var(--color-brand-secondary)', hover: 'var(--color-brand-secondary-hover)', border: 'var(--color-brand-secondary-pressed, #393A3B)', tint: 'var(--color-shadow-brand-secondary)', ring: RING.secondary },
      destructive: { bg: DESTRUCTIVE,                    hover: DESTRUCTIVE_HOVER,                    border: DESTRUCTIVE_PRESSED,                            tint: '#DC2626',                             ring: RING.destructive },
    }[h as 'primary' | 'tertiary' | 'destructive'];
    return { bg: solid.bg, border: solid.border, color: '#FFFFFF', shadow: solidShadow(solid.tint), bgHover: solid.hover, ring: solid.ring };
  }

  if (a === 'outline') {
    const o = {
      primary:         { border: 'var(--color-brand-primary)',                    hover: 'var(--color-brand-primary-hover)',                ring: RING.primary },
      secondary:       { border: 'var(--color-stroke-subtle, #EEEEEE)',           hover: undefined,                                         ring: RING.neutral },
      tertiaryOutline: { border: 'var(--color-brand-secondary)',                  hover: 'var(--color-brand-secondary-pressed, #393A3B)',  ring: RING.secondary },
      destructive:     { border: DESTRUCTIVE,                                     hover: DESTRUCTIVE_HOVER,                                ring: RING.destructive },
    }[h as 'primary' | 'secondary' | 'tertiaryOutline' | 'destructive'];
    return { bg: 'transparent', border: o.border, borderHover: o.hover, color: text, bgHover: 'transparent', ring: o.ring };
  }

  if (a === 'subtle') {
    if (h === 'secondary') {
      // Frosted surface for use over imagery / dark backgrounds
      return { bg: 'rgba(255,255,255,0.5)', border: 'transparent', color: '#FFFFFF', bgHover: 'rgba(255,255,255,0.5)', backdropBlur: true, ring: RING.neutral };
    }
    const t = h === 'primary'
      ? { bg: 'var(--color-status-brand-bg, #FEF2E9)', hover: '#FFE1C9', ring: RING.primary }
      : { bg: 'var(--color-status-error-bg, #FEE2E2)', hover: 'var(--primitive-red-5, #FECACA)', ring: RING.destructive };
    return { bg: t.bg, border: 'transparent', color: text, bgHover: t.hover, ring: t.ring };
  }

  // ghost + link: text only
  const ring = { primary: 'var(--color-brand-primary-hover)', secondary: '#828282', destructive: DESTRUCTIVE_PRESSED }[h as 'primary' | 'secondary' | 'destructive'];
  return {
    bg: 'transparent', border: 'transparent',
    color: a === 'link' && h === 'secondary' ? 'var(--color-text-tertiary, #828282)' : text,
    colorHover: h === 'primary' ? 'var(--color-brand-primary-hover)' : undefined,
    bgHover: 'transparent',
    ring: a === 'ghost' ? ring : undefined,
  };
}

function Spinner({ size }: { size: number }) {
  return (
    <span style={{
      display: 'inline-block', width: size, height: size, flexShrink: 0, borderRadius: '50%',
      border: '1.5px solid currentColor', borderTopColor: 'transparent', animation: 'badge-spin 0.75s linear infinite',
    }} />
  );
}

/** Core action button. Use for the primary action in a view, supporting actions, or a destructive / irreversible action (Hierarchy). For an icon-only action use IconButton. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  hierarchy = 'primary',
  appearance = 'solid',
  size = 'sm',
  underline = 'always',
  loading = false,
  leadingIcon,
  trailingIcon,
  disabled,
  children,
  style,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const s = SIZES[size];
  const v = resolveButtonStyle(hierarchy, appearance);
  const isLink = appearance === 'link';
  const blocked = disabled || loading;

  const active = !blocked && hovered;
  const bg = active ? v.bgHover : v.bg;
  const border = active && v.borderHover ? v.borderHover : v.border;
  const color = active && v.colorHover ? v.colorHover : v.color;
  const boxShadow = blocked ? 'none' : focused && v.ring ? `0 0 0 3px ${v.ring}` : v.shadow ?? 'none';

  return (
    <button
      ref={ref}
      disabled={blocked}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: isLink ? 'auto' : s.height,
        paddingLeft: isLink ? 0 : s.px,
        paddingRight: isLink ? 0 : s.px,
        border: isLink ? 'none' : `1px solid ${border}`,
        borderRadius: s.radius,
        backgroundColor: bg,
        boxShadow,
        cursor: blocked ? 'not-allowed' : 'pointer',
        gap: s.gap,
        fontFamily: 'var(--font-family-body)',
        fontWeight: 400,
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        letterSpacing: '-0.01px',
        color,
        textDecoration: isLink && (underline === 'always' || (underline === 'on-hover' && hovered)) ? 'underline' : 'none',
        whiteSpace: 'nowrap',
        opacity: disabled ? 0.5 : 1,
        backdropFilter: v.backdropBlur ? 'blur(2px)' : undefined,
        userSelect: 'none',
        outline: 'none',
        transition: 'background-color var(--motion-duration-fast) var(--motion-easing-standard), border-color var(--motion-duration-fast) var(--motion-easing-standard), box-shadow var(--motion-duration-fast) var(--motion-easing-standard)',
        ...style,
      }}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
      onFocus={(e) => { setFocused(true); onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); onBlur?.(e); }}
      {...props}
    >
      {loading
        ? <Spinner size={s.iconSize} />
        : leadingIcon && <span style={{ display: 'flex', alignItems: 'center', width: s.iconSize, height: s.iconSize, flexShrink: 0 }}>{leadingIcon}</span>}
      {children && <span style={{ color: 'inherit' }}>{children}</span>}
      {!loading && trailingIcon && <span style={{ display: 'flex', alignItems: 'center', width: s.iconSize, height: s.iconSize, flexShrink: 0 }}>{trailingIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

import { forwardRef, useState } from 'react';

export type ButtonVariant =
  | 'primary' | 'secondary' | 'tertiary'
  | 'destructive' | 'neutral' | 'invert'
  | 'ghost-neutral' | 'ghost-brand'
  | 'primary-outline' | 'secondary-outline' | 'tertiary-outline'
  | 'primary-subtle' | 'neutral-subtle';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** Pill shape (border-radius: 9999px) */
  pill?: boolean;
}

interface SizeConfig {
  height: string;
  px: number;
  py: number;
  fontSize: number;
  lineHeight: string;
  iconSize: number;
  gap: number;
  radius: number;
}

const SIZES: Record<ButtonSize, SizeConfig> = {
  xs: { height: '24px', px: 6,  py: 4,  fontSize: 11, lineHeight: '15.6px', iconSize: 12, gap: 4,  radius: 6 },
  sm: { height: '36px', px: 11, py: 8,  fontSize: 13, lineHeight: '19.2px', iconSize: 14, gap: 6,  radius: 8 },
  md: { height: '48px', px: 16, py: 12, fontSize: 16, lineHeight: '24px',   iconSize: 16, gap: 8,  radius: 8 },
  lg: { height: '58px', px: 20, py: 12, fontSize: 20, lineHeight: '30px',   iconSize: 20, gap: 8,  radius: 10 },
};

type VariantState = 'default' | 'hover' | 'focus';

interface VariantStyles {
  bg: string;
  border: string;
  color: string;
  shadow?: string;
  innerBorder?: boolean;
  bgHover: string;
  bgFocus: string;
  ring?: string;
  /** Text color swapped in on hover/focus (defaults to `color`) */
  colorHover?: string;
  /** Frosted-glass surface (e.g. for buttons placed over images) */
  backdropBlur?: boolean;
  /** Disabled state dims the resting style via opacity instead of swapping to the shared disabled tokens */
  subtleDisabled?: boolean;
}

const VARIANTS: Record<ButtonVariant, VariantStyles> = {
  primary: {
    bg: 'var(--color-brand-primary)',
    border: 'var(--color-brand-primary)',
    color: '#FFFFFF',
    shadow: '0px 0.5px 4px 0px var(--color-shadow-brand-primary)',
    innerBorder: true,
    bgHover: 'var(--color-brand-primary-hover)',
    bgFocus: 'var(--color-brand-primary)',
    ring: 'var(--color-brand-primary-ring)',
  },
  secondary: {
    bg: 'var(--color-brand-secondary)',
    border: 'var(--color-brand-secondary)',
    color: '#FFFFFF',
    shadow: '0px 0.5px 4px 0px var(--color-shadow-brand-secondary)',
    innerBorder: true,
    bgHover: 'var(--color-brand-secondary-hover)',
    bgFocus: 'var(--color-brand-secondary)',
    ring: 'var(--color-brand-secondary-ring)',
  },
  tertiary: {
    bg: 'var(--color-brand-tertiary)',
    border: 'var(--color-brand-tertiary)',
    color: '#FFFFFF',
    shadow: '0px 0.5px 4px 0px var(--color-shadow-brand-tertiary)',
    innerBorder: true,
    bgHover: 'var(--color-brand-tertiary-hover)',
    bgFocus: 'var(--color-brand-tertiary)',
    ring: 'var(--color-brand-tertiary-ring)',
  },
  destructive: {
    bg: '#DC2626',
    border: '#DC2626',
    color: '#FFFFFF',
    innerBorder: true,
    bgHover: '#B91C1C',
    bgFocus: '#DC2626',
    ring: 'rgba(220,38,38,0.7)',
  },
  neutral: {
    bg: 'var(--color-btn-neutral)',
    border: 'var(--color-btn-neutral-border)',
    color: 'var(--color-btn-neutral-text)',
    bgHover: 'var(--color-btn-neutral-hover)',
    bgFocus: 'var(--color-btn-neutral)',
    ring: '#D7D7D7',
  },
  invert: {
    bg: 'var(--color-btn-invert)',
    border: 'var(--color-btn-invert-border)',
    color: '#FFFFFF',
    innerBorder: true,
    bgHover: 'var(--color-btn-invert-hover)',
    bgFocus: 'var(--color-btn-invert)',
    ring: '#D7D7D7',
  },
  'ghost-neutral': {
    bg: 'transparent',
    border: 'transparent',
    color: 'var(--color-text-primary)',
    bgHover: '#F7F7F7',
    bgFocus: '#EEEEEE',
    ring: '#D7D7D7',
  },
  'ghost-brand': {
    bg: 'transparent',
    border: 'transparent',
    color: 'var(--color-brand-primary)',
    bgHover: 'var(--color-brand-primary-ghost-hover)',
    bgFocus: 'var(--color-brand-primary-ghost-focus)',
    ring: 'var(--color-brand-primary-ring)',
  },
  'primary-outline': {
    bg: 'transparent',
    border: 'var(--color-brand-primary)',
    color: 'var(--color-brand-primary)',
    bgHover: 'var(--color-brand-primary-ghost-hover)',
    bgFocus: 'var(--color-brand-primary-ghost-focus)',
    ring: 'var(--color-brand-primary-ring)',
  },
  'secondary-outline': {
    bg: 'transparent',
    border: 'var(--color-brand-secondary)',
    color: 'var(--color-brand-secondary)',
    bgHover: 'var(--color-brand-secondary-ghost-hover)',
    bgFocus: 'var(--color-brand-secondary-ghost-focus)',
    ring: 'var(--color-brand-secondary-ring)',
  },
  'tertiary-outline': {
    bg: 'transparent',
    border: 'var(--color-brand-tertiary)',
    color: 'var(--color-brand-tertiary)',
    bgHover: 'var(--color-brand-tertiary-ghost-hover)',
    bgFocus: 'var(--color-brand-tertiary-ghost-focus)',
    ring: 'var(--color-brand-tertiary-ring)',
  },
  'primary-subtle': {
    bg: 'var(--color-status-brand-bg)',
    border: 'transparent',
    color: 'var(--color-brand-primary)',
    bgHover: '#EADFD6',
    bgFocus: 'var(--color-status-brand-bg)',
    ring: 'var(--color-brand-primary-ring)',
    subtleDisabled: true,
  },
  'neutral-subtle': {
    bg: 'rgba(255,255,255,0.1)',
    border: 'rgba(255,255,255,1)',
    color: 'var(--color-text-secondary)',
    colorHover: 'var(--color-text-primary)',
    bgHover: 'rgba(255,255,255,0.3)',
    bgFocus: 'rgba(255,255,255,0.1)',
    backdropBlur: true,
    ring: '#D7D7D7',
    subtleDisabled: true,
  },
};

function Spinner({ size }: { size: number }) {
  return (
    <span style={{
      display: 'inline-block',
      width: size, height: size, flexShrink: 0,
      borderRadius: '50%',
      border: '1.5px solid currentColor',
      borderTopColor: 'transparent',
      animation: 'badge-spin 0.75s linear infinite',
    }} />
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'sm',
  loading = false,
  leadingIcon,
  trailingIcon,
  pill = false,
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
  const v = VARIANTS[variant];

  const isDisabled = disabled || loading;

  const getVS = (): VariantState => {
    if (focused) return 'focus';
    if (hovered) return 'hover';
    return 'default';
  };
  const vs = getVS();

  const bg = isDisabled ? (v.subtleDisabled ? v.bg : 'var(--color-btn-disabled-bg)') :
    vs === 'hover' ? v.bgHover :
    vs === 'focus' ? v.bgFocus :
    v.bg;

  const borderColor = isDisabled ? (v.subtleDisabled ? v.border : 'var(--color-btn-disabled-bg)') : v.border;
  const textColor = isDisabled
    ? (v.subtleDisabled ? v.color : 'var(--color-btn-disabled-text)')
    : (vs === 'hover' || vs === 'focus') ? (v.colorHover ?? v.color) : v.color;

  const boxShadow = isDisabled ? 'none' :
    focused && v.ring ? `0 0 0 3px ${v.ring}` :
    v.shadow ?? 'none';

  const radius = pill ? 9999 : s.radius;

  const outerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: s.height,
    paddingLeft: s.px,
    paddingRight: s.px,
    border: `1px solid ${borderColor}`,
    borderRadius: radius,
    backgroundColor: bg,
    boxShadow,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    gap: s.gap,
    fontFamily: 'var(--font-family-body)',
    fontWeight: 400,
    fontSize: s.fontSize,
    lineHeight: s.lineHeight,
    color: textColor,
    letterSpacing: '-0.01px',
    whiteSpace: 'nowrap',
    opacity: isDisabled && v.subtleDisabled ? 0.5 : 1,
    backdropFilter: v.backdropBlur ? 'blur(2px)' : undefined,
    userSelect: 'none',
    outline: 'none',
    transition: 'background-color 0.15s, box-shadow 0.15s',
    ...style,
  };

  // Inner highlight border for solid brand/destructive/invert buttons
  if (v.innerBorder && !isDisabled) {
    outerStyle.boxShadow = (outerStyle.boxShadow && outerStyle.boxShadow !== 'none')
      ? `${outerStyle.boxShadow}, inset 0 0 0 1px rgba(255,255,255,0.2)`
      : 'inset 0 0 0 1px rgba(255,255,255,0.2)';
  }

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      style={outerStyle}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
      onFocus={(e) => { setFocused(true); onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); onBlur?.(e); }}
      {...props}
    >
      {loading ? (
        <Spinner size={s.iconSize} />
      ) : (
        leadingIcon && (
          <span style={{ display: 'flex', alignItems: 'center', width: s.iconSize, height: s.iconSize, flexShrink: 0 }}>
            {leadingIcon}
          </span>
        )
      )}
      {children && (
        <span style={{ color: 'inherit' }}>{children}</span>
      )}
      {!loading && trailingIcon && (
        <span style={{ display: 'flex', alignItems: 'center', width: s.iconSize, height: s.iconSize, flexShrink: 0 }}>
          {trailingIcon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

import { forwardRef } from 'react';
import { X } from 'lucide-react';

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'destructive'
  | 'ghost'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'red'
  | 'brand-subtle'
  | 'gray';

export type BadgeSize = 'sm' | 'md' | 'lg' | 'xl';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color / semantic variant */
  variant?: BadgeVariant;
  /** Size — sm (10px) · md (13px) · lg (16px) · xl (20px) */
  size?: BadgeSize;
  /** Badge label text */
  label: string;
  /** Leading icon node — sized automatically */
  leadingIcon?: React.ReactNode;
  /** Trailing icon node — sized automatically */
  trailingIcon?: React.ReactNode;
  /** Show a small status dot */
  status?: boolean;
  /** Show a leading loading spinner */
  loading?: boolean;
  /** Render a close (×) button and call this when clicked */
  onClose?: (e: React.MouseEvent) => void;
}

/* ─── Variant → token map ──────────────────────────────────────── */
interface VariantTokens {
  bg: string;
  text: string;
  border?: string;
}

const VARIANTS: Record<BadgeVariant, VariantTokens> = {
  default: {
    bg:   'var(--color-brand-primary, #F57E20)',
    text: 'var(--color-text-on-primary, #FFFFFF)',
  },
  secondary: {
    bg:     'var(--color-container-secondary, #F7F7F7)',
    text:   'var(--color-text-primary, #14141E)',
    border: '1px solid var(--color-brand-secondary, #58595B)',
  },
  outline: {
    bg:     'transparent',
    text:   'var(--color-text-primary, #14141E)',
    border: '0.5px solid var(--color-stroke-default, #D7D7D7)',
  },
  destructive: {
    bg:   'var(--color-status-error-bg, #FEE2E2)',
    text: 'var(--color-destructive, #DC2626)',
  },
  ghost: {
    bg:   'transparent',
    text: 'var(--color-text-primary, #14141E)',
  },
  blue: {
    bg:   'var(--color-status-info-bg, #EBF2FE)',
    text: 'var(--color-text-info, #3B82F6)',
  },
  green: {
    bg:   'var(--color-status-success-bg, #E9F9EF)',
    text: 'var(--color-text-success, #12843C)',
  },
  yellow: {
    bg:   'var(--color-status-warning-bg, #FEF5E7)',
    text: 'var(--color-text-warning, #A66800)',
  },
  red: {
    bg:   'var(--color-status-error-bg, #FEE2E2)',
    text: 'var(--color-destructive, #DC2626)',
  },
  'brand-subtle': {
    bg:   'var(--color-status-brand-bg, #FEF2E9)',
    text: 'var(--color-brand-primary, #F57E20)',
  },
  gray: {
    bg:   'var(--color-bg-subtle, #EEEEEE)',
    text: 'var(--color-text-tertiary, #828282)',
  },
};

/* ─── Size → dimension map ─────────────────────────────────────── */
interface SizeDimensions {
  fontSize: number;
  lineHeight: string;
  fontWeight: number;
  iconSize: number;
  px: number;
  py: number;
  gap: number;
  dotSize: number;
  closeSize: number;
}

const SIZES: Record<BadgeSize, SizeDimensions> = {
  sm: { fontSize: 10, lineHeight: '15.6px', fontWeight: 400, iconSize: 10, px: 6,  py: 2, gap: 4, dotSize: 4,  closeSize: 10 },
  md: { fontSize: 13, lineHeight: '19.2px', fontWeight: 400, iconSize: 12, px: 8,  py: 2, gap: 4, dotSize: 5,  closeSize: 12 },
  lg: { fontSize: 16, lineHeight: '24px',   fontWeight: 400, iconSize: 16, px: 10, py: 4, gap: 6, dotSize: 6,  closeSize: 16 },
  xl: { fontSize: 20, lineHeight: '30px',   fontWeight: 500, iconSize: 20, px: 12, py: 6, gap: 8, dotSize: 6,  closeSize: 20 },
};

/* ─── Spinner ──────────────────────────────────────────────────── */
function Spinner({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size, height: size, flexShrink: 0,
        borderRadius: '50%',
        border: '1.5px solid currentColor',
        borderTopColor: 'transparent',
        animation: 'badge-spin 0.75s linear infinite',
      }}
    />
  );
}

/* ─── Badge ────────────────────────────────────────────────────── */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
  variant = 'default',
  size = 'sm',
  label,
  leadingIcon,
  trailingIcon,
  status = false,
  loading = false,
  onClose,
  style,
  className,
  ...props
}, ref) => {
  const v = VARIANTS[variant];
  const s = SIZES[size];

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: s.gap,
        paddingLeft: s.px,
        paddingRight: s.px,
        paddingTop: s.py,
        paddingBottom: s.py,
        borderRadius: 9999,
        backgroundColor: v.bg,
        border: v.border ?? 'none',
        color: v.text,
        boxSizing: 'border-box',
        flexShrink: 0,
        ...style,
      }}
      {...props}
    >
      {/* Leading spinner */}
      {loading && <Spinner size={s.iconSize} />}

      {/* Leading icon */}
      {!loading && leadingIcon && (
        <span style={{ display: 'flex', alignItems: 'center', width: s.iconSize, height: s.iconSize, flexShrink: 0 }}>
          {leadingIcon}
        </span>
      )}

      {/* Status dot */}
      {status && (
        <span style={{
          display: 'inline-block',
          width: s.dotSize, height: s.dotSize, flexShrink: 0,
          borderRadius: '50%',
          backgroundColor: 'currentColor',
        }} />
      )}

      {/* Label */}
      <span style={{
        fontFamily: 'Rubik, sans-serif',
        fontWeight: s.fontWeight,
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        letterSpacing: '-0.01px',
        whiteSpace: 'nowrap',
        color: 'inherit',
      }}>
        {label}
      </span>

      {/* Trailing icon */}
      {trailingIcon && (
        <span style={{ display: 'flex', alignItems: 'center', width: s.iconSize, height: s.iconSize, flexShrink: 0 }}>
          {trailingIcon}
        </span>
      )}

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: s.closeSize, height: s.closeSize, flexShrink: 0,
            padding: 0, border: 'none', cursor: 'pointer',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.5)',
            color: 'inherit',
          }}
        >
          <X size={s.closeSize * 0.57} strokeWidth={2} />
        </button>
      )}
    </span>
  );
});

Badge.displayName = 'Badge';

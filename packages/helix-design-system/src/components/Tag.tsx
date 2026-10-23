import { forwardRef, useState } from 'react';
import { X, Check } from 'lucide-react';
import { Badge } from './Badge';
import type { BadgeSize } from './Badge';

/** Figma Size */
export type TagSize = 'sm' | 'md' | 'lg';
/** Figma Color — neutral (outlined) · brand · transparent (no border or fill, e.g. in Breadcrumb) */
export type TagColor = 'neutral' | 'brand' | 'transparent';

export interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color' | 'onSelect'> {
  size?: TagSize;
  color?: TagColor;
  label: string;
  /** Figma State=Selected */
  selected?: boolean;
  /** Figma State=Disabled */
  disabled?: boolean;
  /** Leading icon (Figma Leading Icon). Only one leading slot shows: checkbox → avatar → dot → icon. */
  leadingIcon?: React.ReactNode;
  /** Leading avatar image URL (Figma Leading Avatar) */
  leadingAvatar?: string;
  /** Leading status dot (Figma Leading Dot) */
  leadingDot?: boolean;
  /** Leading checkbox (Figma Leading Checkbox) — checked while `selected` */
  leadingCheckbox?: boolean;
  /** Fires with the next selected state when the checkbox is clicked */
  onSelectedChange?: (selected: boolean) => void;
  /** Trailing count (Figma Trailing Count) */
  trailingCount?: number | string;
  /** Trailing icon (Figma Trailing Icon) */
  trailingIcon?: React.ReactNode;
  /** Trailing close × (Figma Trailing Icon Close) — called when it is clicked */
  onClose?: (e: React.MouseEvent) => void;
}

/* ─── Figma sizes (Tag component set, Size=sm|md|lg) ───────────────── */
interface SizeConfig { fontSize: number; lineHeight: string; px: number; py: number; gap: number; icon: number; avatar: number; dot: number; box: number; badge: BadgeSize }

const SIZES: Record<TagSize, SizeConfig> = {
  sm: { fontSize: 10, lineHeight: '15.6px', px: 8,  py: 2, gap: 4, icon: 10, avatar: 14, dot: 6, box: 12, badge: 'xs' },
  md: { fontSize: 13, lineHeight: '19.2px', px: 10, py: 4, gap: 6, icon: 12, avatar: 16, dot: 7, box: 14, badge: 'sm' },
  lg: { fontSize: 16, lineHeight: '24px',   px: 12, py: 4, gap: 6, icon: 14, avatar: 20, dot: 8, box: 16, badge: 'md' },
};

const MUTED = 'var(--color-text-tertiary, #828282)';
const BRAND = 'var(--color-brand-primary, #F57E20)';

/** Compact removable / selectable label chip. Use for filters, selections or category labels. For status or count indicators use Badge. */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(({
  size = 'md',
  color = 'neutral',
  label,
  selected = false,
  disabled = false,
  leadingIcon,
  leadingAvatar,
  leadingDot = false,
  leadingCheckbox = false,
  onSelectedChange,
  trailingCount,
  trailingIcon,
  onClose,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}, ref) => {
  const s = SIZES[size];
  const [hovered, setHovered] = useState(false);
  const hover = hovered && !disabled && !selected;

  // Figma State × Color
  let bg = 'transparent';
  let border = 'transparent';
  let text = MUTED;
  if (selected) {
    bg = 'var(--color-status-brand-bg, #FEF2E9)';
    text = BRAND;
    border = color === 'neutral' ? BRAND : 'transparent';
  } else if (color === 'neutral') {
    bg = hover ? 'var(--color-container-tertiary, #EEEEEE)' : 'var(--color-container-primary, #FFFFFF)';
    border = disabled ? 'var(--color-stroke-disabled, #D7D7D7)' : 'var(--color-stroke-subtle, #EEEEEE)';
  } else if (color === 'brand') {
    bg = hover ? '#FFE1C9' : 'var(--color-status-brand-bg, #FEF2E9)';
    text = hover ? 'var(--color-brand-primary-hover, #DF6505)' : BRAND;
  } else if (hover) {
    bg = 'var(--color-container-tertiary, #EEEEEE)';
  }

  const slot: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };

  return (
    <span
      ref={ref}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: s.gap,
        padding: `${s.py}px ${s.px}px`,
        borderRadius: 8,
        boxSizing: 'border-box',
        backgroundColor: bg,
        border: `1px solid ${border}`,
        color: text,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : onClick || leadingCheckbox ? 'pointer' : 'default',
        fontFamily: 'var(--font-family-body)',
        fontWeight: 400,
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        letterSpacing: '-0.01px',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        transition: 'background-color var(--motion-duration-fast) var(--motion-easing-standard), border-color var(--motion-duration-fast) var(--motion-easing-standard), color var(--motion-duration-fast) var(--motion-easing-standard)',
        ...style,
      }}
      {...props}
    >
      {leadingCheckbox ? (
        <span
          role="checkbox"
          aria-checked={selected}
          onClick={(e) => { if (disabled) return; e.stopPropagation(); onSelectedChange?.(!selected); }}
          style={{
            ...slot, width: s.box, height: s.box, borderRadius: 3, boxSizing: 'border-box',
            border: `1px solid ${selected ? BRAND : 'var(--color-stroke-default, #BABABA)'}`,
            backgroundColor: selected ? BRAND : 'transparent',
          }}
        >
          {selected && <Check size={s.box * 0.75} strokeWidth={3} color="#FFFFFF" />}
        </span>
      ) : leadingAvatar ? (
        <img src={leadingAvatar} alt="" style={{ width: s.avatar, height: s.avatar, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
      ) : leadingDot ? (
        <span style={{ width: s.dot, height: s.dot, borderRadius: '50%', backgroundColor: 'var(--color-text-success, #12843C)', flexShrink: 0 }} />
      ) : leadingIcon ? (
        <span style={{ ...slot, width: s.icon, height: s.icon }}>{leadingIcon}</span>
      ) : null}

      <span>{label}</span>

      {trailingCount !== undefined && <Badge size={s.badge} color="neutral" appearance="subtle" label={String(trailingCount)} />}
      {trailingIcon && <span style={{ ...slot, width: s.icon, height: s.icon }}>{trailingIcon}</span>}
      {onClose && (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          disabled={disabled}
          onClick={(e) => { e.stopPropagation(); onClose(e); }}
          style={{ ...slot, width: s.icon + 4, height: s.icon + 4, padding: 0, border: 'none', borderRadius: '50%', background: 'transparent', color: 'inherit', cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
          <X size={s.icon} />
        </button>
      )}
    </span>
  );
});

Tag.displayName = 'Tag';

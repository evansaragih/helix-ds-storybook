import { forwardRef, useState } from 'react';
import { X, Check } from 'lucide-react';
import { Badge } from './Badge';
import type { BadgeSize } from './Badge';

export type TagSize = 'sm' | 'md' | 'lg';

export interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onSelect'> {
  /** Size — sm (10px) · md (13px) · lg (16px) */
  size?: TagSize;
  /** Tag label text */
  label: string;
  /** Leading icon node — sized automatically. Mutually exclusive with `avatarSrc`. */
  leadingIcon?: React.ReactNode;
  /** Leading avatar image URL — sized automatically. Mutually exclusive with `leadingIcon`. */
  avatarSrc?: string;
  /** Show a leading status dot instead of an icon/avatar */
  status?: boolean;
  /** Status dot color token — defaults to success green */
  statusColor?: string;
  /** Render a selectable checkbox in place of an icon/avatar/dot */
  checkbox?: boolean;
  /** Checkbox checked state (only used when `checkbox` is true) */
  checked?: boolean;
  /** Fires with the next checked state when the checkbox is clicked */
  onCheckedChange?: (checked: boolean) => void;
  /** Trailing count — renders a small pill (e.g. 5) */
  count?: number | string;
  /** Render a trailing close (×) button and call this when clicked */
  onClose?: (e: React.MouseEvent) => void;
  /** Disabled — dims the tag and blocks interaction */
  disabled?: boolean;
}

interface SizeDimensions {
  fontSize: number;
  lineHeight: string;
  iconSize: number;
  avatarSize: number;
  dotSize: number;
  checkboxSize: number;
  closeSize: number;
  px: number;
  py: number;
  gap: number;
  countBadgeSize: BadgeSize;
}

const SIZES: Record<TagSize, SizeDimensions> = {
  sm: { fontSize: 10, lineHeight: '15.6px', iconSize: 10, avatarSize: 14, dotSize: 6, checkboxSize: 12, closeSize: 10, px: 8,  py: 3, gap: 4, countBadgeSize: 'sm' },
  md: { fontSize: 13, lineHeight: '19.2px', iconSize: 12, avatarSize: 16, dotSize: 7, checkboxSize: 14, closeSize: 12, px: 10, py: 4, gap: 6, countBadgeSize: 'sm' },
  lg: { fontSize: 16, lineHeight: '24px',   iconSize: 14, avatarSize: 20, dotSize: 8, checkboxSize: 16, closeSize: 14, px: 12, py: 5, gap: 6, countBadgeSize: 'md' },
};

/* ─── Tag ──────────────────────────────────────────────────────────
 * A neutral, outlined, interactive pill for filtering/selecting or
 * removing an item — e.g. active filters, selected categories,
 * multi-select input tokens.
 *
 * Differs from Badge (status/count indicator, filled semantic colors,
 * generally non-interactive) in both look and purpose: Tag is always
 * outlined + neutral, and is built around interaction affordances
 * (checkbox, close, count) rather than color-coded meaning.
 * ────────────────────────────────────────────────────────────────── */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(({
  size = 'md',
  label,
  leadingIcon,
  avatarSrc,
  status = false,
  statusColor = 'var(--color-text-success, #12843C)',
  checkbox = false,
  checked = false,
  onCheckedChange,
  count,
  onClose,
  disabled = false,
  style,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...props
}, ref) => {
  const s = SIZES[size];
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [closeHovered, setCloseHovered] = useState(false);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    onCheckedChange?.(!checked);
  };

  // Selected: checkbox checked promotes the Tag to the brand-tinted "Selected" preset
  // (same Colors/Surface/Selected token family used for active nav/list/tab chips in Figma).
  const selected = checkbox && checked;

  let bg: string;
  let borderColor: string;
  let textColor: string;
  if (disabled) {
    bg = 'var(--color-container-disabled, #D7D7D7)';
    borderColor = 'var(--color-stroke-disabled, #D7D7D7)';
    textColor = 'var(--color-text-muted, #9F9F9F)';
  } else if (selected) {
    bg = 'var(--color-status-brand-bg, #FEF2E9)';
    borderColor = 'var(--color-brand-primary, #F57E20)';
    textColor = 'var(--color-brand-primary, #F57E20)';
  } else {
    bg = pressed ? 'var(--color-container-tertiary, #EEEEEE)' :
      hovered ? 'var(--color-container-primary-hover, #EEEEEE)' :
      'var(--color-container-primary, #FFFFFF)';
    borderColor = pressed ? 'var(--color-stroke-strong, #9F9F9F)' :
      hovered ? 'var(--color-stroke-hover, #828282)' :
      'var(--color-stroke-default, #BABABA)';
    textColor = 'var(--color-text-primary, #14141E)';
  }

  return (
    <span
      ref={ref}
      className={className}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); setPressed(false); onMouseLeave?.(e); }}
      onMouseDown={(e) => { setPressed(true); onMouseDown?.(e); }}
      onMouseUp={(e) => { setPressed(false); onMouseUp?.(e); }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: s.gap,
        paddingLeft: s.px,
        paddingRight: s.px,
        paddingTop: s.py,
        paddingBottom: s.py,
        borderRadius: 9999,
        backgroundColor: bg,
        border: `1px solid ${borderColor}`,
        color: textColor,
        boxSizing: 'border-box',
        flexShrink: 0,
        cursor: disabled ? 'not-allowed' : onClick || checkbox ? 'pointer' : 'default',
        transition: 'background-color 0.15s, border-color 0.15s',
        ...style,
      }}
      {...props}
    >
      {/* Checkbox */}
      {checkbox && (
        <span
          onClick={handleCheckboxClick}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: s.checkboxSize, height: s.checkboxSize, flexShrink: 0,
            borderRadius: 3,
            border: `1px solid ${disabled ? 'var(--color-stroke-disabled, #D7D7D7)' : checked ? 'var(--color-brand-primary, #F57E20)' : 'var(--color-stroke-default, #BABABA)'}`,
            backgroundColor: disabled && checked ? 'var(--color-stroke-disabled, #D7D7D7)' : checked ? 'var(--color-brand-primary, #F57E20)' : 'transparent',
          }}
        >
          {checked && <Check size={s.checkboxSize * 0.75} strokeWidth={3} color="var(--color-text-on-primary, #FFFFFF)" />}
        </span>
      )}

      {/* Leading avatar */}
      {!checkbox && avatarSrc && (
        <span style={{
          display: 'flex', flexShrink: 0, overflow: 'hidden',
          width: s.avatarSize, height: s.avatarSize, borderRadius: '50%',
        }}>
          <img src={avatarSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </span>
      )}

      {/* Leading icon */}
      {!checkbox && !avatarSrc && leadingIcon && (
        <span style={{ display: 'flex', alignItems: 'center', width: s.iconSize, height: s.iconSize, flexShrink: 0 }}>
          {leadingIcon}
        </span>
      )}

      {/* Status dot */}
      {!checkbox && !avatarSrc && !leadingIcon && status && (
        <span style={{
          display: 'inline-block',
          width: s.dotSize, height: s.dotSize, flexShrink: 0,
          borderRadius: '50%',
          backgroundColor: statusColor,
        }} />
      )}

      {/* Label */}
      <span style={{
        fontFamily: 'var(--font-family-body)',
        fontWeight: 400,
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        letterSpacing: '-0.01px',
        whiteSpace: 'nowrap',
        color: 'inherit',
      }}>
        {label}
      </span>

      {/* Count — reuses Badge, since a numeric indicator is exactly Badge's job */}
      {count !== undefined && (
        <Badge size={s.countBadgeSize} variant="gray" label={String(count)} />
      )}

      {/* Close button — hovering the × itself (not the whole Tag) signals removal with an error tint */}
      {onClose && (
        <button
          onClick={(e) => { e.stopPropagation(); if (!disabled) onClose(e); }}
          onMouseEnter={(e) => { e.stopPropagation(); if (!disabled) setCloseHovered(true); }}
          onMouseLeave={(e) => { e.stopPropagation(); setCloseHovered(false); }}
          disabled={disabled}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: s.closeSize + 4, height: s.closeSize + 4, flexShrink: 0,
            padding: 0, border: 'none',
            borderRadius: '50%',
            backgroundColor: closeHovered && !disabled ? 'var(--color-status-error-bg, #FEE2E2)' : 'transparent',
            cursor: disabled ? 'not-allowed' : 'pointer',
            color: closeHovered && !disabled ? 'var(--color-icon-error, #EF4444)' : 'var(--color-text-tertiary, #828282)',
            transition: 'background-color 0.1s, color 0.1s',
          }}
        >
          <X size={s.closeSize} strokeWidth={2} />
        </button>
      )}
    </span>
  );
});

Tag.displayName = 'Tag';

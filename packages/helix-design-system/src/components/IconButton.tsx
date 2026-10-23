import { forwardRef, useState } from 'react';
import { resolveButtonStyle } from './Button';
import type { ButtonHierarchy, ButtonAppearance, ButtonSize } from './Button';

/** Figma Shape */
export type IconButtonShape = 'rounded' | 'pill';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hierarchy?: ButtonHierarchy;
  /** Link is not available on Icon Button */
  appearance?: Exclude<ButtonAppearance, 'link'>;
  /** xs 24 · sm 36 · md 44 · lg 52 */
  size?: ButtonSize;
  shape?: IconButtonShape;
  /** Figma Notification Badge — red count bubble on the top-right corner */
  notificationCount?: number | string;
  loading?: boolean;
  icon: React.ReactNode;
  'aria-label': string;
}

const BOX: Record<ButtonSize, number> = { xs: 24, sm: 36, md: 44, lg: 52 };
const ICON: Record<ButtonSize, number> = { xs: 12, sm: 14, md: 20, lg: 24 };
const BADGE: Record<ButtonSize, { box: number; font: number; weight: number }> = {
  xs: { box: 16, font: 8, weight: 500 }, sm: { box: 16, font: 8, weight: 500 },
  md: { box: 20, font: 10, weight: 400 }, lg: { box: 24, font: 10, weight: 400 },
};

/** A button that shows only an icon, no label. Use for compact actions in toolbars, headers or table rows. For actions that need a text label use Button. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({
  hierarchy = 'primary',
  appearance = 'solid',
  size = 'sm',
  shape = 'rounded',
  notificationCount,
  loading = false,
  icon,
  disabled,
  style,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const v = resolveButtonStyle(hierarchy, appearance);
  const box = BOX[size];
  const blocked = disabled || loading;
  const active = !blocked && hovered;

  return (
    <button
      ref={ref}
      disabled={blocked}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: box,
        height: box,
        flexShrink: 0,
        padding: 0,
        borderRadius: shape === 'pill' ? 9999 : size === 'xs' ? 6 : 8,
        border: `1px solid ${active && v.borderHover ? v.borderHover : v.border}`,
        backgroundColor: active ? v.bgHover : v.bg,
        color: active && v.colorHover ? v.colorHover : v.color,
        boxShadow: blocked ? 'none' : focused && v.ring ? `0 0 0 3px ${v.ring}` : v.shadow ?? 'none',
        opacity: disabled ? 0.5 : 1,
        backdropFilter: v.backdropBlur ? 'blur(2px)' : undefined,
        cursor: blocked ? 'not-allowed' : 'pointer',
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
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: ICON[size], height: ICON[size] }}>
        {loading
          ? <span style={{ width: ICON[size], height: ICON[size], borderRadius: '50%', border: '1.5px solid currentColor', borderTopColor: 'transparent', animation: 'badge-spin 0.75s linear infinite' }} />
          : icon}
      </span>
      {notificationCount !== undefined && (
        <span style={{
          position: 'absolute', top: -BADGE[size].box / 2, right: -BADGE[size].box * 0.6,
          display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
          minWidth: BADGE[size].box, height: BADGE[size].box, padding: '0 4px', borderRadius: 9999,
          backgroundColor: DESTRUCTIVE_BG, border: '1px solid #FFFFFF', color: '#FFFFFF',
          fontFamily: 'var(--font-family-body)', fontSize: BADGE[size].font, fontWeight: BADGE[size].weight, lineHeight: 1,
        }}>
          {notificationCount}
        </span>
      )}
    </button>
  );
});

const DESTRUCTIVE_BG = 'var(--color-destructive, #DC2626)';

IconButton.displayName = 'IconButton';

import { forwardRef, useState } from 'react';
import type { ButtonVariant } from './Button';

export type IconButtonVariant = ButtonVariant | 'transparent';
export type IconButtonShape = 'square' | 'circle';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  /** 'square' = "Buttons / Icon", 'circle' = "Buttons / Icon Pill" */
  shape?: IconButtonShape;
  icon: React.ReactNode;
  'aria-label': string;
}

type VariantState = 'default' | 'hover' | 'focus';

interface VariantStyles {
  bg: string;
  border: string;
  color: string;
  bgHover: string;
  bgFocus: string;
  ring?: string;
}

const VARIANTS: Record<IconButtonVariant, VariantStyles> = {
  primary: {
    bg: 'var(--color-brand-primary)', border: 'var(--color-brand-primary)', color: '#FFFFFF',
    bgHover: 'var(--color-brand-primary-hover)', bgFocus: 'var(--color-brand-primary)',
    ring: 'var(--color-brand-primary-ring)',
  },
  secondary: {
    bg: 'var(--color-brand-secondary)', border: 'var(--color-brand-secondary)', color: '#FFFFFF',
    bgHover: 'var(--color-brand-secondary-hover)', bgFocus: 'var(--color-brand-secondary)',
    ring: 'var(--color-brand-secondary-ring)',
  },
  tertiary: {
    bg: 'var(--color-brand-tertiary)', border: 'var(--color-brand-tertiary)', color: '#FFFFFF',
    bgHover: 'var(--color-brand-tertiary-hover)', bgFocus: 'var(--color-brand-tertiary)',
    ring: 'var(--color-brand-tertiary-ring)',
  },
  destructive: {
    bg: '#DC2626', border: '#DC2626', color: '#FFFFFF',
    bgHover: '#B91C1C', bgFocus: '#DC2626', ring: 'rgba(220,38,38,0.7)',
  },
  neutral: {
    bg: 'var(--color-btn-neutral)', border: 'var(--color-btn-neutral-border)', color: 'var(--color-btn-neutral-text)',
    bgHover: 'var(--color-btn-neutral-hover)', bgFocus: 'var(--color-btn-neutral)', ring: '#D7D7D7',
  },
  invert: {
    bg: 'var(--color-btn-invert)', border: 'var(--color-btn-invert-border)', color: '#FFFFFF',
    bgHover: 'var(--color-btn-invert-hover)', bgFocus: 'var(--color-btn-invert)', ring: '#D7D7D7',
  },
  'ghost-neutral': {
    bg: 'transparent', border: 'var(--color-stroke-neutral, #D7D7D7)', color: 'var(--color-text-primary)',
    bgHover: '#F7F7F7', bgFocus: '#EEEEEE', ring: '#D7D7D7',
  },
  'ghost-brand': {
    bg: 'transparent', border: 'transparent', color: 'var(--color-brand-primary)',
    bgHover: 'var(--color-brand-primary-ghost-hover)', bgFocus: 'var(--color-brand-primary-ghost-focus)',
    ring: 'var(--color-brand-primary-ring)',
  },
  'primary-outline': {
    bg: 'transparent', border: 'var(--color-brand-primary)', color: 'var(--color-brand-primary)',
    bgHover: 'var(--color-brand-primary-ghost-hover)', bgFocus: 'var(--color-brand-primary-ghost-focus)',
    ring: 'var(--color-brand-primary-ring)',
  },
  'secondary-outline': {
    bg: 'transparent', border: 'var(--color-brand-secondary)', color: 'var(--color-brand-secondary)',
    bgHover: 'var(--color-brand-secondary-ghost-hover)', bgFocus: 'var(--color-brand-secondary-ghost-focus)',
    ring: 'var(--color-brand-secondary-ring)',
  },
  'tertiary-outline': {
    bg: 'transparent', border: 'var(--color-brand-tertiary)', color: 'var(--color-brand-tertiary)',
    bgHover: 'var(--color-brand-tertiary-ghost-hover)', bgFocus: 'var(--color-brand-tertiary-ghost-focus)',
    ring: 'var(--color-brand-tertiary-ring)',
  },
  transparent: {
    bg: 'transparent', border: 'transparent', color: 'var(--color-text-secondary, #49494A)',
    bgHover: '#F7F7F7', bgFocus: '#EEEEEE', ring: '#D7D7D7',
  },
  'primary-subtle': {
    bg: 'var(--color-status-brand-bg)', border: 'transparent', color: 'var(--color-brand-primary)',
    bgHover: '#EADFD6', bgFocus: 'var(--color-status-brand-bg)', ring: 'var(--color-brand-primary-ring)',
  },
  'neutral-subtle': {
    bg: 'rgba(255,255,255,0.1)', border: 'rgba(255,255,255,1)', color: 'var(--color-text-secondary)',
    bgHover: 'rgba(255,255,255,0.3)', bgFocus: 'rgba(255,255,255,0.1)', ring: '#D7D7D7',
  },
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({
  variant = 'primary',
  shape = 'circle',
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
  const v = VARIANTS[variant];

  const getVS = (): VariantState => {
    if (focused) return 'focus';
    if (hovered) return 'hover';
    return 'default';
  };
  const vs = getVS();

  const bg = disabled ? 'var(--color-btn-disabled-bg)' :
    vs === 'hover' ? v.bgHover :
    vs === 'focus' ? v.bgFocus :
    v.bg;

  const borderColor = disabled ? 'var(--color-btn-disabled-bg)' : v.border;
  const color = disabled ? 'var(--color-btn-disabled-text)' : v.color;
  const boxShadow = !disabled && focused && v.ring ? `0 0 0 3px ${v.ring}` : 'none';

  return (
    <button
      ref={ref}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        flexShrink: 0,
        borderRadius: shape === 'circle' ? 9999 : 8,
        border: `1px solid ${borderColor}`,
        backgroundColor: bg,
        color,
        boxShadow,
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        transition: 'background-color 0.15s, box-shadow 0.15s',
        ...style,
      }}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
      onFocus={(e) => { setFocused(true); onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); onBlur?.(e); }}
      {...props}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16 }}>
        {icon}
      </span>
    </button>
  );
});

IconButton.displayName = 'IconButton';

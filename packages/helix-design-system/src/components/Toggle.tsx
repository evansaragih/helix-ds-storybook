import { forwardRef, useRef, useState } from 'react';

/** Figma Size — md 46px tall (36px segments, 4px padding) · sm 36px tall (30px segments, 2px padding) */
export type ToggleSize = 'sm' | 'md';
/** Figma Surface — light for white or grey backgrounds · dark for a photo or dark colour behind it */
export type ToggleSurface = 'light' | 'dark';

export interface ToggleOption {
  value: string;
  label: string;
  /** Figma Icon — a country flag or small glyph shown before the label (16px) */
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Exactly two options: the toggle is a fixed 2-way switch, not an open list */
  options: [ToggleOption, ToggleOption];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: ToggleSize;
  surface?: ToggleSurface;
  /** Stretch to the container width with equal-width segments (Figma Mobile Menu footer) */
  fullWidth?: boolean;
  /** Names the group for assistive tech, e.g. "Language" */
  'aria-label': string;
}

const BOX: Record<ToggleSize, { pad: number; gap: number; item: number }> = {
  md: { pad: 4, gap: 4, item: 36 },
  sm: { pad: 2, gap: 2, item: 30 },
};

const TRANSITION = [
  'background-color var(--motion-duration-fast) var(--motion-easing-standard)',
  'color var(--motion-duration-fast) var(--motion-easing-standard)',
  'box-shadow var(--motion-duration-fast) var(--motion-easing-standard)',
].join(', ');

// Figma Stroke/Focus-Ring-Neutral (#59595A at 70%) and the dark-surface glass tints (Surface/Transparent/10, Stroke/White/20, Surface/Transparent/20)
const RING_NEUTRAL = 'rgba(89,89,90,0.7)';
const GLASS = 'rgba(255,255,255,0.1)';
const GLASS_LINE = 'rgba(255,255,255,0.2)';
const GLASS_HOVER = 'rgba(255,255,255,0.2)';

/** A segmented switch between exactly two options, such as a language or a Monthly/Weekly view. For three or more options or page navigation use Tabs; for a single on/off setting use Switch. */
export const Toggle = forwardRef<HTMLDivElement, ToggleProps>(({
  options,
  value: controlled,
  defaultValue,
  onValueChange,
  size = 'md',
  surface = 'light',
  fullWidth = false,
  style,
  ...props
}, ref) => {
  const [internal, setInternal] = useState(defaultValue ?? options[0].value);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({});
  const value = controlled ?? internal;
  const b = BOX[size];
  const dark = surface === 'dark';

  const select = (option: ToggleOption, focus?: boolean) => {
    if (option.disabled) return;
    if (controlled === undefined) setInternal(option.value);
    onValueChange?.(option.value);
    if (focus) buttons.current[option.value]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = options[(index + step + options.length) % options.length];
    select(next, true);
  };

  return (
    <div
      ref={ref}
      role="radiogroup"
      style={{
        display: fullWidth ? 'flex' : 'inline-flex', alignItems: 'center', gap: b.gap, padding: b.pad, boxSizing: 'border-box',
        borderRadius: 6, border: `1px solid ${dark ? GLASS_LINE : 'var(--color-stroke-subtle, #EEEEEE)'}`,
        backgroundColor: dark ? GLASS : 'var(--color-container-secondary, #F7F7F7)',
        ...style,
      }}
      {...props}
    >
      {options.map((option, i) => {
        const selected = option.value === value;
        const hover = hovered === option.value && !selected && !option.disabled;
        let background = 'transparent';
        if (selected) background = 'var(--color-container-primary, #FFFFFF)';
        else if (hover) background = dark ? GLASS_HOVER : 'var(--color-container-tertiary, #EEEEEE)';
        const color = selected
          ? 'var(--color-text-brand-primary, #F57E20)'
          : dark ? 'var(--color-text-on-primary, #FFFFFF)' : 'var(--color-text-tertiary, #828282)';
        return (
          <button
            key={option.value}
            ref={(el) => { buttons.current[option.value] = el; }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            disabled={option.disabled}
            onClick={() => select(option)}
            onKeyDown={(e) => onKeyDown(e, i)}
            onMouseEnter={() => setHovered(option.value)}
            onMouseLeave={() => setHovered(null)}
            onFocus={(e) => setFocused(e.currentTarget.matches(':focus-visible') ? option.value : null)}
            onBlur={() => setFocused(null)}
            style={{
              display: 'inline-flex', flex: fullWidth ? 1 : undefined, alignItems: 'center', justifyContent: 'center', gap: 6, height: b.item, padding: '0 12px',
              boxSizing: 'border-box', border: 'none', borderRadius: 6, backgroundColor: background, color,
              fontFamily: 'var(--font-family-body)', fontSize: 13, fontWeight: 500, lineHeight: '19.2px', letterSpacing: '-0.13px', whiteSpace: 'nowrap',
              opacity: option.disabled ? 0.5 : 1, cursor: option.disabled ? 'not-allowed' : 'pointer', outline: 'none',
              boxShadow: focused === option.value ? `inset 0 0 0 1px ${dark ? 'var(--color-container-primary, #FFFFFF)' : RING_NEUTRAL}` : 'none',
              transition: TRANSITION,
            }}
          >
            {option.icon && <span style={{ display: 'inline-flex', flexShrink: 0, width: 16, height: 16 }} aria-hidden>{option.icon}</span>}
            {option.label}
          </button>
        );
      })}
    </div>
  );
});

Toggle.displayName = 'Toggle';

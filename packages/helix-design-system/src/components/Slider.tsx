import * as RadixSlider from '@radix-ui/react-slider';
import { forwardRef, useEffect, useId, useState } from 'react';

/** Figma Size — Default 8px track · Compact 4px track */
export type SliderSize = 'default' | 'compact';
/** When the value bubble shows: while hovering, focusing or dragging; always; or never */
export type SliderValueTooltip = 'interact' | 'always' | 'never';

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  /** Called when a drag or key press ends */
  onValueCommit?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: SliderSize;
  disabled?: boolean;
  /** The value bubble above the thumb (Figma Tooltip). Default 'interact'. */
  valueTooltip?: SliderValueTooltip;
  /** Format the number shown in the bubble */
  formatValue?: (value: number) => React.ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  style?: React.CSSProperties;
  className?: string;
}

const BRAND = 'var(--color-brand-primary, #F57E20)';
const PRESSED = 'var(--color-brand-primary-pressed, #B35001)';
const TRACK = 'var(--color-container-disabled, #D7D7D7)';
const NEUTRAL_SHADOW = 'rgba(89,89,90,0.15)';

/** A draggable track for picking a number in a range — a rounded track, a brand fill, a ring thumb and a value bubble. Use for continuous numeric input; for a few fixed options use Radio Group or Tabs. */
export const Slider = forwardRef<HTMLSpanElement, SliderProps>(({
  value: controlled,
  defaultValue = 0,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  size = 'default',
  disabled = false,
  valueTooltip = 'interact',
  formatValue,
  style,
  className,
  ...aria
}, ref) => {
  const [internal, setInternal] = useState(defaultValue);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);
  const scope = `helix-slider-${useId().replace(/:/g, '')}`;
  const value = controlled ?? internal;
  const trackH = size === 'compact' ? 4 : 8;

  // a drag can end outside the control, so the pressed state listens on the window
  useEffect(() => {
    if (!pressed) return;
    const up = () => setPressed(false);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => { window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); };
  }, [pressed]);

  const active = !disabled && (hovered || focused || pressed);
  const showBubble = !disabled && valueTooltip !== 'never' && (valueTooltip === 'always' || active);

  // Figma State: Default / Hover (brand ring) / Focused (outer ring) / Pressed (dark fill) / Disabled (grey)
  const thumb: React.CSSProperties = disabled
    ? { backgroundColor: '#9F9F9F', border: `2px solid ${TRACK}`, boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }
    : pressed
      ? { backgroundColor: PRESSED, border: `2px solid ${PRESSED}`, boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }
      : hovered
        ? { backgroundColor: '#FFFFFF', border: `2px solid ${BRAND}`, boxShadow: '0 0 0 2px rgba(245,126,32,0.15)' }
        : { backgroundColor: '#FFFFFF', border: `2px solid ${BRAND}`, boxShadow: '0 1px 3px rgba(0,0,0,0.15)' };

  return (
    <RadixSlider.Root
      ref={ref}
      className={className ? `${scope} ${className}` : scope}
      value={[value]}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      onValueChange={([v]) => { if (controlled === undefined) setInternal(v); onValueChange?.(v); }}
      onValueCommit={([v]) => onValueCommit?.(v)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerDown={() => !disabled && setPressed(true)}
      style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', height: 20, touchAction: 'none', userSelect: 'none', opacity: 1, cursor: disabled ? 'not-allowed' : 'pointer', ...style }}
    >
      <style>{`.${scope} [role="slider"]{outline:none}.${scope} [role="slider"]:focus-visible{outline:2px solid ${BRAND};outline-offset:2px}`}</style>
      <RadixSlider.Track style={{ position: 'relative', flexGrow: 1, height: trackH, borderRadius: 9999, backgroundColor: TRACK }}>
        <RadixSlider.Range style={{ position: 'absolute', height: '100%', borderRadius: 9999, backgroundColor: disabled ? TRACK : pressed ? PRESSED : BRAND }} />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        {...aria}
        onFocus={(e) => setFocused(e.currentTarget.matches(':focus-visible'))}
        onBlur={() => setFocused(false)}
        style={{ position: 'relative', display: 'block', width: 20, height: 20, boxSizing: 'border-box', borderRadius: 9999, transition: 'box-shadow var(--motion-duration-fast) var(--motion-easing-standard), background-color var(--motion-duration-fast) var(--motion-easing-standard), border-color var(--motion-duration-fast) var(--motion-easing-standard)', ...thumb }}
      >
        {showBubble && (
          <span aria-hidden="true" style={{ position: 'absolute', bottom: 'calc(100% + 9px)', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
            <span style={{
              padding: '8px 12px', borderRadius: 8, backgroundColor: '#FFFFFF', boxShadow: `0 1px 2px ${NEUTRAL_SHADOW}`, whiteSpace: 'nowrap',
              fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px', color: 'var(--color-text-primary, #14141E)',
            }}>{formatValue ? formatValue(value) : value}</span>
            <span style={{ width: 10, height: 6, backgroundColor: '#FFFFFF', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
          </span>
        )}
      </RadixSlider.Thumb>
    </RadixSlider.Root>
  );
});

Slider.displayName = 'Slider';

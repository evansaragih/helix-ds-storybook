import { forwardRef, useState } from 'react';

export type SwitchState = 'unchecked' | 'checked' | 'disabled' | 'invalid';

export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  helperText?: string;
  size?: 'sm' | 'md';
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(({
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  invalid = false,
  onCheckedChange,
  label,
  helperText,
  size = 'md',
  style,
  className,
  ...props
}, ref) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const [hovered, setHovered] = useState(false);

  const toggle = () => {
    if (disabled) return;
    const next = !checked;
    if (!isControlled) setInternalChecked(next);
    onCheckedChange?.(next);
  };

  const trackW = size === 'md' ? 44 : 28;
  const trackH = size === 'md' ? 24 : 16;
  const thumbSize = size === 'md' ? 18 : 12;
  const thumbOffset = size === 'md' ? 3 : 2;
  const thumbTravel = trackW - thumbSize - thumbOffset * 2;

  const trackBg = disabled
    ? 'var(--color-container-disabled, #D7D7D7)'
    : invalid
    ? 'var(--color-status-error-bg, #FEE2E2)'
    : checked
    ? 'var(--color-brand-primary, #F57E20)'
    : hovered
    ? 'var(--color-bg-subtle, #EEEEEE)'
    : 'var(--color-container-tertiary, #EEEEEE)';

  const trackBorder = invalid
    ? '1.5px solid var(--color-stroke-error, #DC2626)'
    : checked
    ? `1.5px solid var(--color-brand-primary, #F57E20)`
    : `1.5px solid var(--color-stroke-default, #D7D7D7)`;

  const thumbBg = disabled
    ? 'var(--color-text-muted, #9F9F9F)'
    : checked
    ? '#FFFFFF'
    : 'var(--color-text-tertiary, #828282)';

  return (
    <div style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 10, ...style }} className={className}>
      <button
        ref={ref}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        type="button"
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          width: trackW,
          height: trackH,
          borderRadius: 9999,
          backgroundColor: trackBg,
          border: trackBorder,
          padding: `0 ${thumbOffset}px`,
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          transition: 'background-color 0.2s, border-color 0.2s',
          flexShrink: 0,
        }}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <span style={{
          display: 'block',
          width: thumbSize,
          height: thumbSize,
          borderRadius: '50%',
          backgroundColor: thumbBg,
          transform: checked ? `translateX(${thumbTravel}px)` : 'translateX(0)',
          transition: 'transform 0.2s cubic-bezier(0.4,0,0.2,1), background-color 0.2s',
          flexShrink: 0,
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }} />
      </button>
      {(label || helperText) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: size === 'md' ? 2 : 1 }}>
          {label && (
            <span style={{
              fontFamily: 'var(--font-family-body)',
              fontWeight: 400,
              fontSize: 13,
              lineHeight: '19.2px',
              color: disabled ? 'var(--color-text-muted, #9F9F9F)' : 'var(--color-text-primary, #14141E)',
              letterSpacing: '-0.01px',
              cursor: disabled ? 'not-allowed' : 'pointer',
              userSelect: 'none',
            }} onClick={toggle}>
              {label}
            </span>
          )}
          {helperText && (
            <span style={{
              fontFamily: 'var(--font-family-body)',
              fontWeight: 400,
              fontSize: 12,
              lineHeight: '18px',
              color: invalid ? 'var(--color-text-error, #EF4444)' : 'var(--color-text-tertiary, #828282)',
              letterSpacing: '-0.01px',
            }}>
              {helperText}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

Switch.displayName = 'Switch';

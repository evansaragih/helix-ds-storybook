import { forwardRef, useId, useState } from 'react';

/** Figma Size — Small 28×16 · Medium 44×24 */
export type SwitchSize = 'sm' | 'md';

export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick' | 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: SwitchSize;
  disabled?: boolean;
  /** Figma State=Invalid */
  invalid?: boolean;
  /** Figma Content=Label */
  label?: string;
  /** Figma Content=Label+Description */
  supportingText?: string;
  /** Figma Show Feedback — message shown under the switch (use with `invalid`) */
  feedback?: string;
}

const TRACK: Record<SwitchSize, { w: number; h: number; thumb: number; pad: number }> = {
  sm: { w: 28, h: 16, thumb: 12, pad: 2 },
  md: { w: 44, h: 24, thumb: 20, pad: 2 },
};
const BRAND = 'var(--color-brand-primary, #F57E20)';

/** A toggle for a setting that takes effect immediately. For a choice submitted with a form use Checkbox. */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(({
  checked: controlled,
  defaultChecked = false,
  onCheckedChange,
  size = 'md',
  disabled = false,
  invalid = false,
  label,
  supportingText,
  feedback,
  style,
  className,
  ...props
}, ref) => {
  const [internal, setInternal] = useState(defaultChecked);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const labelId = useId();
  const checked = controlled ?? internal;
  const t = TRACK[size];

  // Figma State: Off / On / Hover / Focus / Disabled / Invalid
  let bg = checked ? BRAND : 'var(--color-stroke-disabled, #D7D7D7)';
  if (hovered && !disabled) bg = checked ? 'var(--color-brand-primary-hover, #DF6505)' : 'var(--color-container-tertiary, #EEEEEE)';
  if (invalid && !checked) bg = '#FFFFFF';

  const toggle = () => {
    if (disabled) return;
    if (controlled === undefined) setInternal(!checked);
    onCheckedChange?.(!checked);
  };

  return (
    <div className={className} style={{ display: 'inline-flex', flexDirection: 'column', gap: 6, ...style }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-invalid={invalid || undefined}
          aria-labelledby={label ? labelId : undefined}
          disabled={disabled}
          onClick={toggle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={(e) => setFocused(e.currentTarget.matches(':focus-visible'))}
          onBlur={() => setFocused(false)}
          style={{
            position: 'relative', flexShrink: 0, width: t.w, height: t.h, padding: 0, borderRadius: 9999, boxSizing: 'border-box',
            border: invalid ? '1px solid var(--primitive-red-70, #991B1B)' : 'none',
            backgroundColor: bg, opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'pointer',
            outline: 'none', boxShadow: focused ? `0 0 0 3px ${BRAND}` : undefined, transition: 'background-color 0.15s, box-shadow 0.15s',
          }}
          {...props}
        >
          <span style={{
            position: 'absolute', top: '50%', left: checked ? t.w - t.thumb - t.pad - (invalid ? 1 : 0) : t.pad - (invalid ? 1 : 0),
            width: t.thumb, height: t.thumb, borderRadius: '50%', backgroundColor: '#FFFFFF',
            transform: 'translateY(-50%)', boxShadow: '0 1px 2px rgba(0,0,0,0.2)', transition: 'left 0.15s',
          }} />
        </button>
        {(label || supportingText) && (
          <span style={{ display: 'flex', flexDirection: 'column', gap: 2, fontFamily: 'var(--font-family-body)', letterSpacing: '-0.01px', opacity: disabled ? 0.5 : 1 }}>
            {label && <span id={labelId} style={{ fontSize: size === 'sm' ? 13 : 16, lineHeight: size === 'sm' ? '19.2px' : '24px', color: 'var(--color-text-primary, #14141E)' }}>{label}</span>}
            {supportingText && <span style={{ fontSize: 13, lineHeight: '19.2px', color: 'var(--color-text-tertiary, #828282)' }}>{supportingText}</span>}
          </span>
        )}
      </div>
      {feedback && <span role={invalid ? 'alert' : undefined} style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', color: invalid ? 'var(--color-text-error, #DC2626)' : 'var(--color-text-tertiary, #828282)' }}>{feedback}</span>}
    </div>
  );
});

Switch.displayName = 'Switch';

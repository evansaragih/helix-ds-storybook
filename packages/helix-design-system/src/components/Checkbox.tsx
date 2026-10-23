import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { Check, Minus } from 'lucide-react';

/** Figma Size — sm 16 · md 20 */
export type CheckboxSize = 'sm' | 'md';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'checked' | 'type'> {
  /** Figma Checked — true / false / 'indeterminate' */
  checked?: boolean | 'indeterminate';
  onChange?: (checked: boolean) => void;
  /** Figma Label */
  label?: React.ReactNode;
  /** Figma Supporting Text */
  supportingText?: React.ReactNode;
  size?: CheckboxSize;
  /** Figma State=Invalid */
  invalid?: boolean;
}

const BOX: Record<CheckboxSize, { box: number; icon: number; font: number; line: string }> = {
  sm: { box: 16, icon: 12, font: 13, line: '19.2px' },
  md: { box: 20, icon: 14, font: 16, line: '24px' },
};

const BRAND = 'var(--color-brand-primary, #F57E20)';
const BRAND_HOVER = 'var(--color-brand-primary-hover, #DF6505)';

/** A labeled checkbox row (control + label + optional supporting text). Use for a single binary choice in a form or list. For a setting that takes effect immediately use Switch. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  checked: controlled,
  defaultChecked,
  onChange,
  label,
  supportingText,
  size = 'md',
  invalid = false,
  disabled = false,
  id,
  style,
  className,
  ...props
}, ref) => {
  const [internal, setInternal] = useState<boolean>(defaultChecked ?? false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const generated = useId();
  const inputId = id ?? generated;
  const inner = useRef<HTMLInputElement | null>(null);

  const value = controlled ?? internal;
  const indeterminate = value === 'indeterminate';
  const on = value === true || indeterminate;
  const d = BOX[size];

  useEffect(() => { if (inner.current) inner.current.indeterminate = indeterminate; }, [indeterminate]);

  // Figma State × Checked: Default / Hover / Focused / Disabled / Invalid
  let bg = on ? BRAND : 'var(--color-container-primary, #FFFFFF)';
  let border = on ? BRAND : 'var(--color-stroke-default, #BABABA)';
  if (disabled) { bg = 'var(--color-stroke-disabled, #D7D7D7)'; border = bg; }
  else if (invalid) { border = 'var(--primitive-red-70, #991B1B)'; }
  else if (hovered) { if (on) { bg = BRAND_HOVER; border = BRAND_HOVER; } else border = '#828282'; }
  const focusRing = focused && !disabled;

  return (
    <label
      htmlFor={inputId}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', ...style }}
    >
      <span style={{
        position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        width: d.box, height: d.box, borderRadius: 4, boxSizing: 'border-box',
        backgroundColor: bg,
        border: `${focusRing ? 2 : 1}px solid ${focusRing ? BRAND_HOVER : border}`,
        boxShadow: focusRing ? `0 0 0 3px ${BRAND}` : undefined,
        transition: 'background-color var(--motion-duration-fast) var(--motion-easing-standard), border-color var(--motion-duration-fast) var(--motion-easing-standard)',
      }}>
        {on && !disabled && (indeterminate ? <Minus size={d.icon} color="#FFFFFF" strokeWidth={3} /> : <Check size={d.icon} color="#FFFFFF" strokeWidth={3} />)}
        <input
          ref={(el) => { inner.current = el; if (typeof ref === 'function') ref(el); else if (ref) ref.current = el; }}
          id={inputId}
          type="checkbox"
          checked={value === true}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          onChange={(e) => { const next = indeterminate ? true : e.target.checked; if (controlled === undefined) setInternal(next); onChange?.(next); }}
          onFocus={(e) => { setFocused(e.currentTarget.matches(':focus-visible')); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          style={{ position: 'absolute', inset: 0, margin: 0, opacity: 0, cursor: 'inherit' }}
          {...props}
        />
      </span>
      {(label || supportingText) && (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2, fontFamily: 'var(--font-family-body)', fontSize: d.font, lineHeight: d.line, letterSpacing: '-0.01px', opacity: disabled ? 0.5 : 1 }}>
          {label && <span style={{ color: 'var(--color-text-primary, #14141E)' }}>{label}</span>}
          {supportingText && <span style={{ color: 'var(--color-text-tertiary, #828282)' }}>{supportingText}</span>}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

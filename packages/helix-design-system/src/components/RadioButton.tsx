import { forwardRef, useId, useState } from 'react';

/** Figma Size — sm 16 · md 20 */
export type RadioButtonSize = 'sm' | 'md';

export interface RadioButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Figma Label */
  label?: string;
  /** Figma Supporting text */
  supportingText?: string;
  size?: RadioButtonSize;
  /** Figma State=Invalid */
  invalid?: boolean;
}

const D: Record<RadioButtonSize, { box: number; dot: number; font: number; line: string }> = {
  sm: { box: 16, dot: 6, font: 13, line: '19.2px' },
  md: { box: 20, dot: 8, font: 16, line: '24px' },
};
const BRAND = 'var(--color-brand-primary, #F57E20)';
const BRAND_HOVER = 'var(--color-brand-primary-hover, #DF6505)';

/** A labeled radio button row (control + label + optional supporting text). Use for choosing exactly one option from a small set. */
export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(({
  label,
  supportingText,
  size = 'md',
  invalid = false,
  disabled,
  checked,
  id,
  style,
  className,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const generated = useId();
  const inputId = id ?? generated;
  const d = D[size];

  // Figma State × Checked
  let bg = 'var(--color-container-primary, #FFFFFF)';
  let border = checked ? BRAND : 'var(--color-stroke-default, #BABABA)';
  if (disabled) { bg = 'var(--color-stroke-disabled, #D7D7D7)'; border = bg; }
  else if (invalid) border = 'var(--primitive-red-70, #991B1B)';
  else if (hovered) border = checked ? BRAND_HOVER : '#828282';
  const ring = focused && !disabled;

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
        width: d.box, height: d.box, borderRadius: '50%', boxSizing: 'border-box',
        backgroundColor: bg, border: `${ring ? 2 : 1}px solid ${ring ? BRAND_HOVER : border}`,
        boxShadow: ring ? `0 0 0 3px ${BRAND}` : undefined, transition: 'border-color var(--motion-duration-fast) var(--motion-easing-standard)',
      }}>
        {checked && !disabled && <span style={{ width: d.dot, height: d.dot, borderRadius: '50%', backgroundColor: BRAND }} />}
        <input
          ref={ref}
          id={inputId}
          type="radio"
          checked={checked}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          onFocus={(e) => { setFocused(e.currentTarget.matches(':focus-visible')); onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          style={{ position: 'absolute', inset: 0, margin: 0, opacity: 0, cursor: 'inherit' }}
          {...props}
        />
      </span>
      {(label || supportingText) && (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2, fontFamily: 'var(--font-family-body)', letterSpacing: '-0.01px', opacity: disabled ? 0.5 : 1 }}>
          {label && <span style={{ fontSize: d.font, lineHeight: d.line, color: 'var(--color-text-primary, #14141E)' }}>{label}</span>}
          {supportingText && <span style={{ fontSize: 13, lineHeight: '19.2px', color: 'var(--color-text-tertiary, #828282)' }}>{supportingText}</span>}
        </span>
      )}
    </label>
  );
});

RadioButton.displayName = 'RadioButton';

/* ─── RadioGroup ───────────────────────────────────────────────────────
 * Not a separate Figma set — the minimal wrapper that makes a list of RadioButtons behave as one
 * single-choice group (shared name, controlled / uncontrolled value). */
export interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export function RadioGroup({ name, value, defaultValue, onChange, children, style, className }: RadioGroupProps) {
  const [internal, setInternal] = useState(defaultValue ?? '');
  const current = value !== undefined ? value : internal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setInternal(e.target.value);
    onChange?.(e.target.value);
  };

  const items = (Array.isArray(children) ? children : [children]).flat();
  return (
    <div role="radiogroup" style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }} className={className}>
      {items.map((child, i) => {
        if (!child) return null;
        const el = child as React.ReactElement<RadioButtonProps>;
        return el.props?.value !== undefined
          ? { ...el, key: el.key ?? i, props: { ...el.props, name, checked: current === el.props.value, onChange: handleChange } } as React.ReactElement
          : el;
      })}
    </div>
  );
}

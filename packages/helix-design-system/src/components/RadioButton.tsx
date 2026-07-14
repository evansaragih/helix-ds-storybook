import { forwardRef, useState } from 'react';

export interface RadioButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  helperText?: string;
  invalid?: boolean;
  size?: 'sm' | 'md';
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(({
  label,
  helperText,
  invalid = false,
  size = 'md',
  disabled,
  checked,
  defaultChecked,
  onChange,
  id,
  style,
  className,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const radioSize = size === 'md' ? 20 : 16;
  const dotSize = size === 'md' ? 8 : 6;
  const genId = id ?? `radio-${Math.random().toString(36).slice(2)}`;

  const getBorder = () => {
    if (disabled) return `2px solid var(--color-stroke-default, #D7D7D7)`;
    if (invalid) return `2px solid var(--color-stroke-error, #DC2626)`;
    if (checked) return `2px solid var(--color-brand-primary, #F57E20)`;
    if (focused) return `2px solid var(--color-brand-primary, #F57E20)`;
    if (hovered) return `2px solid var(--color-stroke-hover, #9F9F9F)`;
    return `2px solid var(--color-stroke-default, #D7D7D7)`;
  };

  const getBg = () => {
    if (disabled) return 'var(--color-container-disabled, #D7D7D7)';
    if (checked) return 'var(--color-brand-primary, #F57E20)';
    return '#FFFFFF';
  };

  const getBoxShadow = () => {
    if (disabled || !focused) return 'none';
    return `0 0 0 3px var(--color-brand-primary-ring, rgba(245,126,32,0.7))`;
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 8, ...style }} className={className}>
      {/* Hidden native input for a11y */}
      <input
        ref={ref}
        type="radio"
        id={genId}
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      {/* Custom radio visual */}
      <label
        htmlFor={genId}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'flex-start',
          gap: 8,
          cursor: disabled ? 'not-allowed' : 'pointer',
          userSelect: 'none',
        }}
      >
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: radioSize,
          height: radioSize,
          borderRadius: '50%',
          backgroundColor: getBg(),
          border: getBorder(),
          boxShadow: getBoxShadow(),
          flexShrink: 0,
          transition: 'background-color 0.15s, border-color 0.15s, box-shadow 0.15s',
          marginTop: size === 'md' ? 2 : 1,
        }}>
          {checked && (
            <span style={{
              display: 'block',
              width: dotSize,
              height: dotSize,
              borderRadius: '50%',
              backgroundColor: disabled ? 'var(--color-text-muted, #9F9F9F)' : '#FFFFFF',
            }} />
          )}
        </span>
        {(label || helperText) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {label && (
              <span style={{
                fontFamily: 'Rubik, sans-serif',
                fontWeight: 400,
                fontSize: size === 'md' ? 13 : 12,
                lineHeight: '19.2px',
                color: disabled ? 'var(--color-text-muted, #9F9F9F)' : 'var(--color-text-primary, #14141E)',
                letterSpacing: '-0.01px',
              }}>
                {label}
              </span>
            )}
            {helperText && (
              <span style={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: 12,
                lineHeight: '18px',
                color: invalid ? 'var(--color-text-error, #EF4444)' : 'var(--color-text-tertiary, #828282)',
              }}>
                {helperText}
              </span>
            )}
          </div>
        )}
      </label>
    </div>
  );
});

RadioButton.displayName = 'RadioButton';

/* ──────────────────────────────────────────────────────────────── */

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

  return (
    <div role="radiogroup" style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }} className={className}>
      {Array.isArray(children)
        ? children.map((child) => {
            if (!child) return null;
            const el = child as React.ReactElement<RadioButtonProps & { value?: string }>;
            return el.props?.value
              ? ({
                  ...el,
                  props: {
                    ...el.props,
                    name,
                    checked: current === el.props.value,
                    onChange: handleChange,
                  },
                } as React.ReactElement)
              : el;
          })
        : children}
    </div>
  );
}

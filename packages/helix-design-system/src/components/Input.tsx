import { forwardRef, useId, useState } from 'react';
import { FieldMessage } from './FieldMessage';

/** Figma Layout */
export type InputLayout = 'vertical' | 'horizontal';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Static label above (vertical) or beside (horizontal) the box; becomes the floating label when `floating` */
  label?: string;
  /** Show the required asterisk after the label (Figma Show Required) */
  required?: boolean;
  /** Hint text under the box (Figma Show Hint) */
  hint?: string;
  /** Error message under the box — also puts the input in the Error state */
  error?: string;
  /** Error state without a message */
  invalid?: boolean;
  /** Figma Floating — the label sits inside the box and shrinks when filled or focused */
  floating?: boolean;
  layout?: InputLayout;
  /** Leading slot — icon, text, flag or selector (Figma Show Leading) */
  leading?: React.ReactNode;
  leadingDivider?: boolean;
  /** Trailing slot — icon, text, button or selector (Figma Show Trailing) */
  trailing?: React.ReactNode;
  trailingDivider?: boolean;
}

const BRAND = 'var(--color-brand-primary, #F57E20)';

/** Border + fill for the Figma Input States: Default / Hovered / Focused / Error / Disabled. Shared by Input and TextArea. */
export function fieldBoxStyle(state: { hovered: boolean; focused: boolean; invalid: boolean; disabled: boolean }): React.CSSProperties {
  if (state.disabled) return { backgroundColor: 'var(--color-stroke-disabled, #D7D7D7)', border: '1px solid var(--color-stroke-disabled, #D7D7D7)' };
  const base: React.CSSProperties = { backgroundColor: 'var(--color-container-primary, #FFFFFF)', border: '1px solid var(--color-stroke-subtle, #EEEEEE)' };
  if (state.invalid) return { ...base, border: '1px solid var(--primitive-red-70, #991B1B)' };
  if (state.focused) return { ...base, border: `1px solid ${BRAND}`, boxShadow: '0 0 0 2px rgba(245,126,32,0.15)' };
  if (state.hovered) return { ...base, border: '1px solid #828282' };
  return base;
}

/** Placeholder color from Figma (Text/Muted); browsers default to a darker grey. Rendered once per field, scoped by class. */
export const placeholderCss = '.helix-field::placeholder{color:var(--color-text-muted,#9F9F9F);opacity:1}';

export const labelText: React.CSSProperties = {
  fontFamily: 'var(--font-family-body)', fontWeight: 400, fontSize: 13, lineHeight: '20px', letterSpacing: '-0.01px', color: 'var(--color-text-secondary, #49494A)',
};

/** Single-line text input with a label, optional leading / trailing content and a hint or error message. For multi-line text use TextArea. */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  required = false,
  hint,
  error,
  invalid = false,
  floating = false,
  layout = 'vertical',
  leading,
  leadingDivider = false,
  trailing,
  trailingDivider = false,
  disabled,
  value,
  defaultValue,
  placeholder,
  id,
  style,
  className,
  onFocus,
  onBlur,
  onChange,
  ...props
}, ref) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(Boolean(value ?? defaultValue));
  const generated = useId();
  const inputId = id ?? generated;
  const isInvalid = invalid || Boolean(error);
  const lifted = floating && (focused || filled || Boolean(value));

  const divider = <span aria-hidden="true" style={{ alignSelf: 'stretch', width: 1, backgroundColor: 'var(--color-stroke-subtle, #EEEEEE)' }} />;
  const slot: React.CSSProperties = { display: 'flex', alignItems: 'center', flexShrink: 0, color: 'var(--color-text-secondary, #49494A)' };

  const labelEl = label && (
    <label htmlFor={inputId} style={{ ...labelText, display: 'inline-flex', gap: 4 }}>
      {label}
      {required && <span aria-hidden="true" style={{ color: 'var(--color-destructive, #DC2626)' }}>*</span>}
    </label>
  );

  const box = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', display: 'flex', alignItems: 'center', gap: 8, boxSizing: 'border-box',
        height: floating ? 48 : 36, padding: '0 8px', borderRadius: 8,
        ...fieldBoxStyle({ hovered, focused, invalid: isInvalid, disabled: Boolean(disabled) }),
        ...(floating && !focused && !isInvalid && !disabled ? { boxShadow: '0 1px 2px rgba(89,89,90,0.15)' } : {}),
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
    >
      {leading && <><span style={slot}>{leading}</span>{leadingDivider && divider}</>}
      <div style={{ position: 'relative', flex: 1, minWidth: 0, height: '100%', display: 'flex', alignItems: 'center' }}>
        {floating && label && (
          <label htmlFor={inputId} style={{
            position: 'absolute', left: 0, top: lifted ? 6 : '50%', transform: lifted ? 'none' : 'translateY(-50%)',
            fontFamily: 'var(--font-family-body)', fontSize: lifted ? 10 : 13, lineHeight: lifted ? '15.6px' : '20px',
            color: 'var(--color-text-muted, #9F9F9F)', pointerEvents: 'none', transition: 'all 0.15s',
          }}>
            {label}{required && <span style={{ color: 'var(--color-destructive, #DC2626)' }}> *</span>}
          </label>
        )}
        <style>{placeholderCss}</style>
        <input
          ref={ref}
          className="helix-field"
          id={inputId}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          placeholder={floating ? (lifted ? placeholder : undefined) : placeholder}
          aria-invalid={isInvalid || undefined}
          onFocus={(e) => { setFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          onChange={(e) => { setFilled(e.target.value !== ''); onChange?.(e); }}
          style={{
            width: '100%', minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
            padding: floating ? '16px 0 0' : 0,
            fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '20px', letterSpacing: '-0.01px',
            color: 'var(--color-text-primary, #14141E)',
          }}
          {...props}
        />
      </div>
      {trailing && <>{trailingDivider && divider}<span style={slot}>{trailing}</span></>}
    </div>
  );

  const message = (error || hint) && <FieldMessage state={error ? 'error' : 'default'}>{error ?? hint}</FieldMessage>;
  const column = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 0 }}>
      {!floating && layout === 'vertical' && labelEl}
      {box}
      {message}
    </div>
  );

  return (
    <div className={className} style={{ display: layout === 'horizontal' && !floating ? 'flex' : 'block', gap: 12, ...style }}>
      {layout === 'horizontal' && !floating ? (
        <>
          <div style={{ width: 96, flexShrink: 0, minHeight: 36, display: 'flex', alignItems: 'center' }}>{labelEl}</div>
          {column}
        </>
      ) : column}
    </div>
  );
});

Input.displayName = 'Input';

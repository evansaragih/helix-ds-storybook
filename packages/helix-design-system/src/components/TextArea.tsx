import { forwardRef, useId, useState } from 'react';
import { FieldMessage } from './FieldMessage';
import { fieldBoxStyle, labelText, placeholderCss } from './Input';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  /** Show the required asterisk after the label */
  required?: boolean;
  hint?: string;
  /** Error message under the box — also puts the field in the Error state */
  error?: string;
  invalid?: boolean;
  /** Show the resize handle (Figma Show Resize, default true) */
  resizable?: boolean;
}

/** A multi-line text field for longer free-form input — descriptions, comments, notes. For a single line use Input. */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  required = false,
  hint,
  error,
  invalid = false,
  resizable = true,
  disabled,
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
  const isInvalid = invalid || Boolean(error);

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label htmlFor={inputId} style={{ ...labelText, display: 'inline-flex', gap: 4 }}>
          {label}{required && <span aria-hidden="true" style={{ color: 'var(--color-destructive, #DC2626)' }}>*</span>}
        </label>
      )}
      <style>{placeholderCss}</style>
      <textarea
        ref={ref}
        className="helix-field"
        id={inputId}
        disabled={disabled}
        aria-invalid={isInvalid || undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={(e) => { setFocused(true); onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); onBlur?.(e); }}
        style={{
          boxSizing: 'border-box', width: '100%', minHeight: 100, padding: '8px 12px', borderRadius: 8, outline: 'none',
          resize: resizable ? 'vertical' : 'none',
          fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '20px', letterSpacing: '-0.01px', color: 'var(--color-text-primary, #14141E)',
          transition: 'border-color var(--motion-duration-fast) var(--motion-easing-standard), box-shadow var(--motion-duration-fast) var(--motion-easing-standard)',
          ...fieldBoxStyle({ hovered, focused, invalid: isInvalid, disabled: Boolean(disabled) }),
        }}
        {...props}
      />
      {(error || hint) && <FieldMessage state={error ? 'error' : 'default'}>{error ?? hint}</FieldMessage>}
    </div>
  );
});

TextArea.displayName = 'TextArea';

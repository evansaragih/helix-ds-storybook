import { forwardRef, useRef, useState } from 'react';
import { FieldMessage } from './FieldMessage';
import { fieldBoxStyle, labelText, placeholderCss } from './Input';

/** Figma Layout — 4-digit, or 6-digit split into two groups of three */
export type VerificationCodeLayout = '4-digit' | '6-digit-split';

export interface VerificationCodeInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  layout?: VerificationCodeLayout;
  label?: string;
  hint?: string;
  /** Error message under the digits — also puts every digit box in the Error state */
  error?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Called once every digit is filled */
  onComplete?: (value: string) => void;
  disabled?: boolean;
}

/** A one-time-code entry: one box per digit with auto-advance, backspace and paste. */
export const VerificationCodeInput = forwardRef<HTMLDivElement, VerificationCodeInputProps>(({
  layout = '4-digit',
  label = 'Secure code',
  hint,
  error,
  value: controlled,
  defaultValue = '',
  onChange,
  onComplete,
  disabled = false,
  style,
  ...props
}, ref) => {
  const length = layout === '4-digit' ? 4 : 6;
  const [internal, setInternal] = useState(defaultValue);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const value = (controlled ?? internal).slice(0, length);

  const commit = (next: string) => {
    if (controlled === undefined) setInternal(next);
    onChange?.(next);
    if (next.length === length) onComplete?.(next);
  };

  const setDigit = (i: number, digit: string) => {
    const chars = value.padEnd(length, ' ').split('');
    chars[i] = digit || ' ';
    commit(chars.join('').replace(/\s+$/, ''));
  };

  const boxes = Array.from({ length }, (_, i) => (
    <>
      {layout === '6-digit-split' && i === 3 && <span key="dash" aria-hidden="true" style={{ fontFamily: 'var(--font-family-body)', fontSize: 16, color: 'var(--color-text-muted, #9F9F9F)' }}>–</span>}
      <input
        key={i}
        className="helix-field"
        ref={(el) => { refs.current[i] = el; }}
        inputMode="numeric"
        autoComplete={i === 0 ? 'one-time-code' : 'off'}
        maxLength={1}
        disabled={disabled}
        aria-label={`Digit ${i + 1} of ${length}`}
        aria-invalid={Boolean(error) || undefined}
        value={value[i] && value[i] !== ' ' ? value[i] : ''}
        placeholder="0"
        onFocus={(e) => { setFocusIndex(i); e.currentTarget.select(); }}
        onBlur={() => setFocusIndex(null)}
        onChange={(e) => {
          const d = e.target.value.replace(/\D/g, '').slice(-1);
          setDigit(i, d);
          if (d && i < length - 1) refs.current[i + 1]?.focus();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Backspace' && !value[i] && i > 0) refs.current[i - 1]?.focus();
          if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus();
          if (e.key === 'ArrowRight' && i < length - 1) refs.current[i + 1]?.focus();
        }}
        onPaste={(e) => {
          const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
          if (!text) return;
          e.preventDefault();
          commit(text);
          refs.current[Math.min(text.length, length - 1)]?.focus();
        }}
        style={{
          width: 48, height: 48, boxSizing: 'border-box', textAlign: 'center', outline: 'none', borderRadius: 8,
          fontFamily: 'var(--font-family-body)', fontSize: 20, lineHeight: '30px', color: 'var(--color-text-primary, #14141E)',
          transition: 'border-color var(--motion-duration-fast) var(--motion-easing-standard), box-shadow var(--motion-duration-fast) var(--motion-easing-standard)',
          ...fieldBoxStyle({ hovered: false, focused: focusIndex === i, invalid: Boolean(error), disabled }),
        }}
      />
    </>
  ));

  return (
    <div ref={ref} role="group" aria-label={label} style={{ display: 'inline-flex', flexDirection: 'column', gap: 8, ...style }} {...props}>
      <span style={{ ...labelText, color: 'var(--color-text-primary, #14141E)' }}>{label}</span>
      <style>{placeholderCss}</style>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{boxes}</div>
      {(error || hint) && <FieldMessage state={error ? 'error' : 'default'}>{error ?? hint}</FieldMessage>}
    </div>
  );
});

VerificationCodeInput.displayName = 'VerificationCodeInput';

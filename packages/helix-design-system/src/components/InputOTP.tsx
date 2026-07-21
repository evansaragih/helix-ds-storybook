import { useState, useRef } from 'react';
import { Minus } from 'lucide-react';

export interface InputOTPProps {
  variant?: 'Digits Only' | 'Alphanumeric';
  state?: 'Default' | 'Invalid' | 'Error' | 'Disabled';
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const InputOTP = ({
  variant = 'Digits Only',
  state = 'Default',
  label,
  value,
  onChange,
  disabled = false,
}: InputOTPProps) => {
  const isAlphanumeric = variant === 'Alphanumeric';
  const isDisabled = disabled || state === 'Disabled';
  const isInvalid = state === 'Invalid' || state === 'Error';

  const [internalValue, setInternalValue] = useState(value ?? '');
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const currentValue = value !== undefined ? value : internalValue;

  const baseBorderColor = isDisabled
    ? 'var(--color-stroke-subtle, #d7d7d7)'
    : isInvalid
    ? 'var(--color-destructive, #dc2626)'
    : 'var(--color-stroke-subtle, #d7d7d7)';

  const focusBorderColor = 'var(--color-brand-primary, #F57E20)';

  // Which group is currently focused
  const leftFocused  = !isDisabled && !isInvalid && focusedIndex !== null && focusedIndex <= 2;
  const rightFocused = !isDisabled && !isInvalid && focusedIndex !== null && focusedIndex >= 3;

  const groupBorder = (groupFocused: boolean) =>
    groupFocused ? focusBorderColor : baseBorderColor;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const raw = e.target.value;
    const char = isAlphanumeric
      ? raw.replace(/[^0-9a-zA-Z]/g, '').slice(-1).toUpperCase()
      : raw.replace(/[^0-9]/g, '').slice(-1);
    if (!char) return;

    const chars = currentValue.padEnd(6, '').split('');
    chars[index] = char;
    const next = chars.join('').replace(/\s+$/, '');
    onChange?.(next);
    setInternalValue(next);
    if (index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const chars = currentValue.padEnd(6, '').split('');
      if (chars[index]) {
        chars[index] = '';
      } else if (index > 0) {
        chars[index - 1] = '';
        inputRefs.current[index - 1]?.focus();
      }
      const next = chars.join('').replace(/\s+$/, '');
      onChange?.(next);
      setInternalValue(next);
    } else if (e.key === 'ArrowLeft'  && index > 0) { inputRefs.current[index - 1]?.focus(); }
      else if (e.key === 'ArrowRight' && index < 5) { inputRefs.current[index + 1]?.focus(); }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, startIndex: number) => {
    e.preventDefault();
    const raw = e.clipboardData.getData('text');
    const clean = (isAlphanumeric
      ? raw.replace(/[^0-9a-zA-Z]/g, '').toUpperCase()
      : raw.replace(/[^0-9]/g, '')).slice(0, 6 - startIndex);

    const chars = currentValue.padEnd(6, '').split('');
    clean.split('').forEach((c, i) => { chars[startIndex + i] = c; });
    const next = chars.join('').replace(/\s+$/, '');
    onChange?.(next);
    setInternalValue(next);
    inputRefs.current[Math.min(startIndex + clean.length, 5)]?.focus();
  };

  const renderCell = (
    index: number,
    isFirst: boolean,
    isLast: boolean,
    border: string,
  ) => {
    const val = currentValue[index] || '';

    return (
      <input
        key={index}
        ref={el => { inputRefs.current[index] = el; }}
        type="text"
        inputMode={isAlphanumeric ? 'text' : 'numeric'}
        maxLength={1}
        value={val}
        disabled={isDisabled}
        placeholder="0"
        onChange={e => handleChange(e, index)}
        onKeyDown={e => handleKeyDown(e, index)}
        onPaste={e => handlePaste(e, index)}
        onFocus={() => setFocusedIndex(index)}
        onBlur={() => setFocusedIndex(null)}
        style={{
          minWidth: 36,
          padding: '8px 11px',
          textAlign: 'center',
          fontFamily: 'var(--font-family-body)',
          fontSize: 13,
          lineHeight: '19.2px',
          fontWeight: 400,
          letterSpacing: '-0.01px',
          color: isDisabled ? 'var(--color-text-tertiary, #9f9f9f)' : 'var(--color-text-secondary, #49494a)',
          backgroundColor: isDisabled
            ? 'var(--color-bg-hover, #eeeeee)'
            : 'var(--color-container-secondary, #f7f7f7)',
          borderTop:    `1px solid ${border}`,
          borderBottom: `1px solid ${border}`,
          borderRight:  `1px solid ${border}`,
          borderLeft: isFirst ? `1px solid ${border}` : 'none',
          borderTopLeftRadius:     isFirst ? 8 : 0,
          borderBottomLeftRadius:  isFirst ? 8 : 0,
          borderTopRightRadius:    isLast  ? 8 : 0,
          borderBottomRightRadius: isLast  ? 8 : 0,
          outline: 'none',
          cursor: isDisabled ? 'not-allowed' : 'text',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s ease',
        }}
      />
    );
  };

  const renderGroup = (indices: number[], groupFocused: boolean) => {
    const border = groupBorder(groupFocused);
    return (
      <div style={{ display: 'flex' }}>
        {indices.map((idx, pos) =>
          renderCell(idx, pos === 0, pos === indices.length - 1, border)
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && (
        <span style={{
          fontFamily: 'var(--font-family-body)',
          fontWeight: 400,
          fontSize: 13,
          lineHeight: '19.2px',
          letterSpacing: '-0.01px',
          color: 'var(--color-text-primary, #14141e)',
        }}>
          {label}
        </span>
      )}

      {isAlphanumeric ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {renderGroup([0, 1, 2], leftFocused)}
          <Minus size={16} color={isDisabled ? '#9F9F9F' : '#49494a'} strokeWidth={2} />
          {renderGroup([3, 4, 5], rightFocused)}
        </div>
      ) : (
        renderGroup([0, 1, 2, 3, 4, 5], leftFocused || rightFocused)
      )}
    </div>
  );
};

InputOTP.displayName = 'InputOTP';

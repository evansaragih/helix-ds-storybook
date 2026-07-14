import { useState, useRef, useEffect, forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  /** Floating variant — label animates inside the box between a centered placeholder and a small caption */
  floating?: boolean;
  /** External label (default) or animated internal label (floating) */
  label?: string;
  required?: boolean;
  secondaryLabel?: React.ReactNode;
  leadingContent?: React.ReactNode;
  leadingDivider?: boolean;
  trailingContent?: React.ReactNode;
  trailingDivider?: boolean;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  showCharCount?: boolean;
}

interface SizeConfig {
  height: number;
  radius: number;
  slotHeight: number;
  fontSize: number;
  inputPx: number;
  labelGap: number;
  dividerColor: string;
}

const SIZE: Record<InputSize, SizeConfig> = {
  xs: { height: 32, radius: 6,  slotHeight: 28, fontSize: 13, inputPx: 10, labelGap: 8, dividerColor: 'var(--color-stroke-subtle, #d7d7d7)' },
  sm: { height: 38, radius: 6,  slotHeight: 28, fontSize: 13, inputPx: 12, labelGap: 8, dividerColor: 'var(--color-stroke-subtle, #d7d7d7)' },
  md: { height: 42, radius: 8,  slotHeight: 36, fontSize: 13, inputPx: 12, labelGap: 8, dividerColor: 'var(--color-stroke-subtle, #d7d7d7)' },
  lg: { height: 48, radius: 8,  slotHeight: 40, fontSize: 13, inputPx: 16, labelGap: 8, dividerColor: 'var(--color-stroke-default, #bababa)' },
};

const F = {
  height: 56,
  radius: 8,
  slotHeight: 40,
  inputPx: 16,
  inputPy: 8,
  valueFontSize: 16,
  captionFontSize: 10,
  inputHeight: 24,
  dividerColor: 'var(--color-stroke-default, #bababa)',
  labelGap: 8,
};

// Top position so the 16px (24px line-height) text is vertically centered in 56px
const FLOAT_RESTING_TOP = (F.height - F.inputHeight) / 2; // = 16

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  size = 'md',
  floating = false,
  label,
  required,
  secondaryLabel,
  leadingContent,
  leadingDivider = false,
  trailingContent,
  trailingDivider = false,
  helperText,
  error = false,
  errorText,
  showCharCount = false,
  disabled,
  placeholder,
  value,
  defaultValue,
  maxLength,
  onChange,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  className,
  style,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [charCount, setCharCount] = useState(
    (value?.toString() ?? defaultValue?.toString() ?? '').length
  );

  // Used only by floating variant to measure box width for the SVG trace
  const floatLabelRef = useRef<HTMLLabelElement>(null);
  const [boxWidth, setBoxWidth] = useState(0);

  useEffect(() => {
    if (!floating) return;
    const el = floatLabelRef.current;
    if (!el) return;
    setBoxWidth(el.offsetWidth);
    const ro = new ResizeObserver(() => setBoxWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [floating]);

  // Floating label is "active" when the field is focused or has a value
  const hasValue = value !== undefined ? String(value).length > 0 : charCount > 0;
  const isFloatingActive = isFocused || hasValue;

  const cfg = floating ? null : SIZE[size];
  const height    = floating ? F.height    : cfg!.height;
  const radius    = floating ? F.radius    : cfg!.radius;
  const inputPx   = floating ? F.inputPx   : cfg!.inputPx;
  const slotH     = floating ? F.slotHeight : cfg!.slotHeight;
  const divColor  = floating ? F.dividerColor : cfg!.dividerColor;
  const labelGap  = floating ? F.labelGap  : cfg!.labelGap;

  let borderColor = 'var(--color-stroke-subtle, #d7d7d7)';
  let bgColor = '#FFFFFF';

  if (disabled) {
    borderColor = 'var(--color-stroke-subtle, #eeeeee)';
    bgColor = '#F5F5F5';
  } else if (error) {
    borderColor = 'var(--color-destructive, #DC2626)';
  } else if (isFocused) {
    // Floating: SVG trace owns the border while focused — CSS border stays transparent
    borderColor = floating
      ? 'transparent'
      : 'var(--color-brand-primary, #F57E20)';
  } else if (isHovered) {
    borderColor = floating
      ? 'var(--color-input-border-hover, #9F9F9F)'
      : 'var(--color-stroke-default, #bababa)';
  }

  const supportingText = error && errorText ? errorText : helperText;

  const iconColor = disabled
    ? 'var(--color-text-disabled, #929292)'
    : 'var(--color-text-secondary, #828282)';

  const inputTextColor = disabled
    ? 'var(--color-text-disabled, #929292)'
    : 'var(--color-text-primary, #14141E)';

  const baseInputStyle: React.CSSProperties = {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontFamily: 'Rubik, sans-serif',
    color: inputTextColor,
    padding: 0,
    margin: 0,
  };

  const boxStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: `${height}px`,
    borderRadius: `${radius}px`,
    border: `1px solid ${borderColor}`,
    backgroundColor: bgColor,
    transition: 'border-color 0.15s ease',
    overflow: 'hidden',
    boxSizing: 'border-box',
    ...style,
  };

  const slotStyle = (): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: `${slotH}px`,
    paddingLeft: inputPx,
    paddingRight: inputPx,
    color: iconColor,
    flexShrink: 0,
  });

  const dividerEl = <div style={{ width: '1px', height: `${slotH}px`, backgroundColor: divColor, flexShrink: 0 }} />;

  /* ─── Floating variant ──────────────────────────────────── */
  if (floating) {
    // After a divider there's no slot padding, so add inputPx explicitly
    const labelLeft  = leadingDivider  ? F.inputPx : (leadingContent  ? 0 : F.inputPx);
    const labelRight = trailingDivider ? F.inputPx : (trailingContent ? 0 : F.inputPx);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: `${F.labelGap}px`, width: '100%' }} className={className}>
        {/* Wrap the entire box in <label> so clicking anywhere focuses the input */}
        <label
          ref={floatLabelRef}
          style={{ ...boxStyle, cursor: disabled ? 'not-allowed' : 'text', position: 'relative', overflow: 'visible' }}
          onMouseEnter={() => { if (!disabled) setIsHovered(true); }}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Leading slot */}
          {leadingContent && (
            <>
              <div style={slotStyle()}>{leadingContent}</div>
              {leadingDivider && dividerEl}
            </>
          )}

          {/* Main content area — position: relative so label/input can be absolute inside */}
          <div style={{ flex: 1, minWidth: 0, position: 'relative', height: '100%', alignSelf: 'stretch' }}>

            {/* Animated floating label */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: labelLeft,
                right: labelRight,
                pointerEvents: 'none',
                fontFamily: 'Rubik, sans-serif',
                fontWeight: 400,
                letterSpacing: '-0.01px',
                color: 'var(--colors/input/text/placeholder, #9f9f9f)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                // Animate between resting (centered, 16px) and active (top caption, 10px)
                transition: 'top 0.2s ease, font-size 0.2s ease, line-height 0.2s ease, opacity 0.15s ease',
                ...(isFloatingActive ? {
                  top: `${F.inputPy}px`,
                  fontSize: `${F.captionFontSize}px`,
                  lineHeight: '15.6px',
                } : {
                  top: `${FLOAT_RESTING_TOP}px`,
                  fontSize: `${F.valueFontSize}px`,
                  lineHeight: `${F.inputHeight}px`,
                }),
              }}
            >
              {label || placeholder || ''}
            </span>

            {/* Actual input — fades in when active, always focusable */}
            <input
              ref={ref}
              style={{
                ...baseInputStyle,
                position: 'absolute',
                bottom: `${F.inputPy}px`,
                left: labelLeft,
                right: labelRight,
                width: `calc(100% - ${labelLeft + labelRight}px)`,
                height: `${F.inputHeight}px`,
                fontSize: `${F.valueFontSize}px`,
                lineHeight: `${F.inputHeight}px`,
                // Fade in when active so it doesn't overlap the resting label
                opacity: isFloatingActive ? 1 : 0,
                transition: 'opacity 0.15s ease',
              }}
              disabled={disabled}
              placeholder=""
              value={value}
              defaultValue={defaultValue}
              maxLength={maxLength}
              onFocus={(e) => { setIsFocused(true); onFocus?.(e); }}
              onBlur={(e) => { setIsFocused(false); onBlur?.(e); }}
              onChange={(e) => { setCharCount(e.target.value.length); onChange?.(e); }}
              {...props}
            />
          </div>

          {/* Trailing slot */}
          {trailingContent && (
            <>
              {trailingDivider && dividerEl}
              <div style={slotStyle()}>{trailingContent}</div>
            </>
          )}

          {/* Tracing border SVG — draws around the perimeter on focus then fades */}
          {isFocused && boxWidth > 0 && (
            <svg
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: -1, left: -1,
                width: boxWidth + 2,
                height: F.height + 2,
                pointerEvents: 'none',
                overflow: 'visible',
                borderRadius: F.radius,
              }}
            >
              <rect
                x={1} y={1}
                width={boxWidth} height={F.height}
                rx={F.radius} ry={F.radius}
                fill="none"
                stroke="var(--color-brand-primary, #F57E20)"
                strokeWidth={2}
                style={{
                  strokeDasharray: 9999,
                  animation: 'trace-border 5s ease forwards',
                }}
              />
            </svg>
          )}
        </label>

        {/* Supporting row */}
        {(supportingText || (showCharCount && maxLength)) && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {error && <AlertCircle size={10} color="var(--color-destructive, #DC2626)" />}
              {supportingText && (
                <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: '10px', lineHeight: '15.6px', letterSpacing: '-0.01px', color: error ? 'var(--color-destructive, #DC2626)' : 'var(--color-text-tertiary, #828282)' }}>
                  {supportingText}
                </span>
              )}
            </div>
            {showCharCount && maxLength && (
              <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: '10px', lineHeight: '15.6px', color: 'var(--color-text-tertiary, #828282)', letterSpacing: '-0.01px' }}>
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  /* ─── Default (sized) variant ───────────────────────────── */
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: `${labelGap}px`, width: '100%' }} className={className}>
      {/* External label */}
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 400,
            fontSize: '13px',
            lineHeight: '19.2px',
            color: 'var(--color-text-primary, #14141E)',
            display: 'flex',
            gap: '4px',
          }}>
            {label}
            {required && <span style={{ color: 'var(--color-destructive, #DC2626)' }}>*</span>}
          </label>
          {secondaryLabel && (
            <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: 'var(--color-text-secondary, #828282)' }}>
              {secondaryLabel}
            </span>
          )}
        </div>
      )}

      {/* Input box */}
      <div
        style={boxStyle}
        onMouseEnter={() => { if (!disabled) setIsHovered(true); }}
        onMouseLeave={() => setIsHovered(false)}
      >
        {leadingContent && (
          <>
            <div style={slotStyle()}>{leadingContent}</div>
            {leadingDivider && dividerEl}
          </>
        )}

        <input
          ref={ref}
          style={{
            ...baseInputStyle,
            flex: 1,
            paddingLeft: leadingDivider ? inputPx : (leadingContent ? 0 : inputPx),
            paddingRight: trailingDivider ? inputPx : (trailingContent ? 0 : inputPx),
            fontSize: `${cfg!.fontSize}px`,
            lineHeight: '19.2px',
            height: '100%',
            boxSizing: 'border-box',
            width: '100%',
          }}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onFocus={(e) => { setIsFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setIsFocused(false); onBlur?.(e); }}
          onChange={(e) => { setCharCount(e.target.value.length); onChange?.(e); }}
          {...props}
        />

        {trailingContent && (
          <>
            {trailingDivider && dividerEl}
            <div style={slotStyle()}>{trailingContent}</div>
          </>
        )}
      </div>

      {/* Supporting row */}
      {(supportingText || (showCharCount && maxLength)) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {error && <AlertCircle size={10} color="var(--color-destructive, #DC2626)" />}
            {supportingText && (
              <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: '10px', lineHeight: '15.6px', letterSpacing: '-0.01px', color: error ? 'var(--color-destructive, #DC2626)' : 'var(--color-text-tertiary, #828282)' }}>
                {supportingText}
              </span>
            )}
          </div>
          {showCharCount && maxLength && (
            <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: '10px', lineHeight: '15.6px', color: 'var(--color-text-tertiary, #828282)', letterSpacing: '-0.01px' }}>
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

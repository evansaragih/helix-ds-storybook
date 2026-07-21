import { useState, useRef, useEffect, forwardRef, InputHTMLAttributes } from 'react';
import { Check, Minus } from 'lucide-react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  checked?: boolean | 'indeterminate';
  onChange?: (checked: boolean | 'indeterminate') => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  size?: 'Medium' | 'Small';
  align?: 'Left' | 'Right';
  invalid?: boolean;
  disabled?: boolean;
  simulateState?: 'Default' | 'Hover' | 'Focus'; // For documentation
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  checked = false,
  onChange,
  label,
  description,
  size = 'Medium',
  align = 'Left',
  invalid = false,
  disabled = false,
  simulateState = 'Default',
  className,
  style,
  ...props
}, ref) => {
  const [internalChecked, setInternalChecked] = useState<boolean | 'indeterminate'>(checked);
  const [isFocused, setIsFocused] = useState(simulateState === 'Focus');
  const [isHovered, setIsHovered] = useState(simulateState === 'Hover');

  const inputRef = useRef<HTMLInputElement>(null);
  const resolvedRef = (ref as React.MutableRefObject<HTMLInputElement>) || inputRef;

  const currentChecked = props.readOnly || onChange ? checked : internalChecked;

  useEffect(() => {
    if (resolvedRef.current) {
      resolvedRef.current.indeterminate = currentChecked === 'indeterminate';
    }
  }, [currentChecked, resolvedRef]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || props.readOnly) return;
    
    // If indeterminate, next state is usually checked (or unchecked depending on pattern, typically checked)
    const newChecked = currentChecked === 'indeterminate' ? true : e.target.checked;
    
    if (onChange) {
      onChange(newChecked);
    } else {
      setInternalChecked(newChecked);
    }
  };

  const isSmall = size === 'Small';
  const boxSize = isSmall ? 16 : 20;
  const iconSize = isSmall ? 14 : 14; // Figma: checkmark ~14px regardless of box size

  const effectiveState = simulateState !== 'Default' ? simulateState : (isFocused ? 'Focus' : (isHovered ? 'Hover' : 'Default'));

  // Colors based on Figma design
  let bgColor = 'transparent';
  let borderColor = 'var(--color-input-border-default, #D7D7D7)';
  let iconColor = '#FFFFFF';

  if (disabled) {
    // Figma: both the unchecked and checked disabled states use the same filled grey box
    bgColor = 'var(--color-input-bg-disabled, #D7D7D7)';
    borderColor = 'var(--color-input-bg-disabled, #D7D7D7)';
  } else if (invalid) {
    borderColor = 'var(--color-destructive, #DC2626)';
    if (currentChecked) {
      bgColor = 'var(--color-destructive, #DC2626)';
    }
  } else if (currentChecked) {
    bgColor = 'var(--color-brand-primary, #F57E20)';
    borderColor = 'var(--color-brand-primary, #F57E20)';
  } else if (effectiveState === 'Hover') {
    borderColor = '#9F9F9F';
    bgColor = 'rgba(0,0,0,0.02)';
  }

  const focusRing = effectiveState === 'Focus' 
    ? (invalid ? '0 0 0 3px rgba(220, 38, 38, 0.2)' : '0 0 0 3px rgba(245, 126, 32, 0.2)') 
    : 'none';

  const checkboxBox = (
    <div
      style={{
        position: 'relative',
        width: `${boxSize}px`,
        height: `${boxSize}px`,
        borderRadius: '4px',
        border: `1px solid ${borderColor}`,
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: focusRing,
        transition: 'all 0.2s ease',
        boxSizing: 'border-box',
        opacity: disabled ? 0.6 : 1
      }}
    >
      {currentChecked === true && <Check size={iconSize} color={iconColor} strokeWidth={3} />}
      {currentChecked === 'indeterminate' && <Minus size={iconSize} color={iconColor} strokeWidth={3} />}
      
      {/* Hidden native input for accessibility and forms */}
      <input
        type="checkbox"
        ref={resolvedRef}
        checked={currentChecked === true}
        onChange={handleChange}
        disabled={disabled}
        onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
        onMouseEnter={(e) => { setIsHovered(true); props.onMouseEnter?.(e); }}
        onMouseLeave={(e) => { setIsHovered(false); props.onMouseLeave?.(e); }}
        style={{
          position: 'absolute',
          opacity: 0,
          width: '100%',
          height: '100%',
          margin: 0,
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
        {...props}
      />
    </div>
  );

  const textContent = (label || description) && (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '2px', 
      flex: 1,
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer'
    }}>
      {label && (
        <label 
          style={{ 
            fontFamily: 'var(--font-family-body)', 
            fontWeight: 500, 
            fontSize: isSmall ? '13px' : '14px', 
            color: '#14141E',
            cursor: disabled ? 'not-allowed' : 'pointer',
            margin: 0,
            lineHeight: isSmall ? '16px' : '20px'
          }}
          onClick={(e) => {
            if (disabled) e.preventDefault();
          }}
        >
          {label}
        </label>
      )}
      {description && (
        <span style={{ 
          fontFamily: 'var(--font-family-body)', 
          fontSize: isSmall ? '12px' : '13px', 
          color: '#828282',
          lineHeight: '1.4'
        }}>
          {description}
        </span>
      )}
    </div>
  );

  if (!label && !description) {
    return (
      <div className={className} style={{ display: 'inline-flex', ...style }}>
        {checkboxBox}
      </div>
    );
  }

  return (
    <div 
      className={className} 
      style={{ 
        display: 'flex', 
        alignItems: align === 'Right' ? 'center' : 'flex-start', 
        gap: '12px',
        width: '100%',
        ...style 
      }}
    >
      {align === 'Left' && checkboxBox}
      {textContent}
      {align === 'Right' && checkboxBox}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

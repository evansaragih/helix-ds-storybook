import { useState, forwardRef } from 'react';

export interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: 'Default' | 'Destructive';
  /** Interactive state — Default is fully interactive (hover/focus handled internally) */
  state?: 'Default' | 'Hover' | 'Focus' | 'Pressed' | 'Disabled' | 'Selected';
  /** Primary label */
  label: string;
  /** Secondary supporting text shown below the label */
  supportingText?: string;
  /** Slot rendered to the left of the label */
  leadingContent?: React.ReactNode;
  /** Slot rendered to the right of the label area */
  trailingContent?: React.ReactNode;
  /** Keyboard shortcut displayed as a badge (e.g. "⌘K") */
  shortcut?: string;
  /** Show a right-pointing chevron to indicate a sub-menu */
  hasSubmenu?: boolean;
  /** Size variant */
  size?: 'Medium' | 'Small';
  /** Click handler — not called when disabled */
  onSelect?: () => void;
}

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(({
  variant = 'Default',
  state = 'Default',
  label,
  supportingText,
  leadingContent,
  trailingContent,
  shortcut,
  hasSubmenu = false,
  size = 'Medium',
  onSelect,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style,
  className,
  ...props
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const isDisabled = state === 'Disabled';
  const isDestructive = variant === 'Destructive';

  // Resolve effective visual state
  let effectiveState = state;
  if (state === 'Default') {
    if (isPressed) effectiveState = 'Pressed';
    else if (isFocused) effectiveState = 'Focus';
    else if (isHovered) effectiveState = 'Hover';
  }

  // Background
  let bg = 'transparent';
  if (effectiveState === 'Hover') bg = isDestructive ? 'var(--primitive-red-10, #FCA5A5)' : 'var(--color-status-brand-bg, #FEF2E9)';
  else if (effectiveState === 'Focus') bg = isDestructive ? 'var(--primitive-red-10, #FCA5A5)' : 'var(--color-status-brand-bg, #FEF2E9)';
  else if (effectiveState === 'Pressed') bg = 'var(--color-stroke-default, #D7D7D7)';
  else if (effectiveState === 'Selected') bg = isDestructive ? 'var(--primitive-red-0, #FEE2E2)' : 'var(--color-brand-primary, #F57E20)';

  // Label color
  let labelColor = 'var(--color-text-primary, #14141E)';
  if (isDisabled) labelColor = 'var(--color-text-muted, #9F9F9F)';
  else if (effectiveState === 'Selected' && !isDestructive) labelColor = 'var(--color-text-on-primary, #FFFFFF)';
  else if (isDestructive) labelColor = 'var(--color-text-error, #EF4444)';

  // Icon / trailing color
  let iconColor = 'var(--color-text-tertiary, #828282)';
  if (isDisabled) iconColor = 'var(--color-text-muted, #9F9F9F)';
  else if (effectiveState === 'Selected' && !isDestructive) iconColor = 'var(--color-text-on-primary, #FFFFFF)';
  else if (isDestructive) iconColor = 'var(--color-text-error, #EF4444)';

  // Supporting text color
  let supportingColor = 'var(--color-text-tertiary, #828282)';
  if (isDisabled) supportingColor = 'var(--color-text-muted, #9F9F9F)';

  const isSmall = size === 'Small';
  const itemHeight = supportingText ? 'auto' : (isSmall ? '32px' : '40px');
  const verticalPad = supportingText ? (isSmall ? '6px' : '8px') : '0';
  const fontSize = isSmall ? '13px' : '16px';
  const supportingFontSize = isSmall ? '11px' : '12px';
  const iconSize = isSmall ? '16px' : '20px';

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: supportingText ? 'flex-start' : 'center',
    gap: '10px',
    minHeight: itemHeight,
    paddingTop: verticalPad,
    paddingBottom: verticalPad,
    paddingLeft: isSmall ? '10px' : '12px',
    paddingRight: isSmall ? '10px' : '12px',
    borderRadius: '8px',
    backgroundColor: bg,
    cursor: isDisabled ? 'default' : 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.12s ease',
    outline: effectiveState === 'Focus' ? `2px solid var(--color-brand-primary, #F57E20)` : 'none',
    outlineOffset: '-2px',
    width: '100%',
    boxSizing: 'border-box',
    opacity: isDisabled ? 0.5 : 1,
    ...style,
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDisabled) return;
    onSelect?.();
    onClick?.(e);
  };

  return (
    <div
      ref={ref}
      role="menuitem"
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      style={containerStyle}
      className={className}
      onClick={handleClick}
      onMouseEnter={(e) => { if (!isDisabled) setIsHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setIsHovered(false); onMouseLeave?.(e); }}
      onMouseDown={() => { if (!isDisabled) setIsPressed(true); }}
      onMouseUp={() => setIsPressed(false)}
      onFocus={() => { if (!isDisabled) setIsFocused(true); }}
      onBlur={() => setIsFocused(false)}
      onKeyDown={(e) => {
        if (isDisabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.();
        }
      }}
      {...props}
    >
      {/* Leading icon */}
      {leadingContent && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          width: iconSize,
          height: iconSize,
          color: iconColor,
          marginTop: supportingText ? '1px' : undefined,
        }}>
          {leadingContent}
        </div>
      )}

      {/* Label + supporting text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          display: 'block',
          fontFamily: 'Rubik, sans-serif',
          fontSize,
          fontWeight: 400,
          lineHeight: '1.5',
          color: labelColor,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {label}
        </span>
        {supportingText && (
          <span style={{
            display: 'block',
            fontFamily: 'Rubik, sans-serif',
            fontSize: supportingFontSize,
            fontWeight: 400,
            lineHeight: '1.4',
            color: supportingColor,
            marginTop: '1px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {supportingText}
          </span>
        )}
      </div>

      {/* Shortcut badge */}
      {shortcut && !trailingContent && !hasSubmenu && (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '1px 6px',
          borderRadius: '4px',
          backgroundColor: 'var(--color-container-tertiary, #EEEEEE)',
          fontFamily: 'Rubik, sans-serif',
          fontSize: '11px',
          fontWeight: 400,
          color: 'var(--color-text-secondary, #49494A)',
          flexShrink: 0,
          whiteSpace: 'nowrap',
          letterSpacing: '0.02em',
        }}>
          {shortcut}
        </span>
      )}

      {/* Trailing content */}
      {trailingContent && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: iconColor,
        }}>
          {trailingContent}
        </div>
      )}

      {/* Submenu chevron */}
      {hasSubmenu && !trailingContent && (
        <svg
          width={iconSize} height={iconSize}
          viewBox="0 0 18 18" fill="none"
          style={{ flexShrink: 0, color: iconColor }}
          aria-hidden="true"
        >
          <path
            d="M7 5L11 9L7 13"
            stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
});

MenuItem.displayName = 'MenuItem';

import { forwardRef, useState } from 'react';

export interface ListItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  label?: React.ReactNode;
  /** Leading icon (Figma Show Leading) */
  leading?: React.ReactNode;
  /** Trailing text or node, e.g. a shortcut "⌘K" (Figma Trailing Content) */
  trailing?: React.ReactNode;
  /** Replaces the label (Figma Body Content slot) */
  body?: React.ReactNode;
  /** Figma State=Active — a solid brand row */
  active?: boolean;
  /** Figma State=Primary — brand-colored label */
  primary?: boolean;
  /** Figma State=Destructive */
  destructive?: boolean;
  disabled?: boolean;
}

/** A generic list or menu row shared by Dropdown, Sidebar and Navbar. Use for any navigable or actionable row; for a checkbox or radio group row use Group Item. */
export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(({
  label,
  leading,
  trailing,
  body,
  active = false,
  primary = false,
  destructive = false,
  disabled = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style,
  ...props
}, ref) => {
  const [hovered, setHovered] = useState(false);
  const hover = hovered && !disabled && !active;
  // a row that opens a menu or popover is a button even without its own onClick (Figma _popover-trigger Type=List Item)
  const interactive = Boolean(onClick) || props['aria-haspopup'] !== undefined;

  // Figma List Item State: Default / Hover / Active / Destructive / Destructive Hover / Disabled / Primary
  const bg = active ? 'var(--color-brand-primary, #F57E20)' : hover ? (destructive ? 'var(--primitive-red-5, #FECACA)' : 'var(--color-status-brand-bg, #FEF2E9)') : 'var(--color-container-primary, #FFFFFF)';
  const color = active ? '#FFFFFF' : disabled ? 'var(--color-text-muted, #9F9F9F)' : destructive ? 'var(--color-destructive, #DC2626)' : primary ? 'var(--color-brand-primary, #F57E20)' : 'var(--color-text-secondary, #49494A)';

  return (
    <div
      ref={ref}
      role={interactive ? 'button' : 'listitem'}
      tabIndex={interactive && !disabled ? 0 : undefined}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={onClick && !disabled ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e as unknown as React.MouseEvent<HTMLDivElement>); } } : undefined}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, minHeight: 36, boxSizing: 'border-box', padding: '8px 12px', borderRadius: 6,
        backgroundColor: bg, color, cursor: disabled ? 'not-allowed' : interactive ? 'pointer' : 'default',
        fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px', transition: 'background-color 0.15s',
        ...style,
      }}
      {...props}
    >
      {leading && <span style={{ display: 'flex', width: 16, height: 16, flexShrink: 0 }}>{leading}</span>}
      <span style={{ flex: 1, minWidth: 0 }}>{body ?? label}</span>
      {trailing && <span style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, color: active ? 'rgba(255,255,255,0.8)' : 'var(--color-text-tertiary, #828282)' }}>{trailing}</span>}
    </div>
  );
});

ListItem.displayName = 'ListItem';

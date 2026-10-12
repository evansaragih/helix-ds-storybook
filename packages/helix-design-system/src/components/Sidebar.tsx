import { createContext, forwardRef, useContext, useState } from 'react';

const SidebarContext = createContext(false);

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Icon-only (62px) rather than expanded (240px) */
  collapsed?: boolean;
  /** Top slot — usually the Logo, plus an optional environment Badge */
  header?: React.ReactNode;
  /** Pinned to the bottom — account / settings items or an Avatar */
  footer?: React.ReactNode;
  /** The navigation items (SidebarItem) */
  children: React.ReactNode;
}

/** Primary app navigation rail. Expanded shows icon + label; collapsed shows icons only. Compose with SidebarItem. */
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(({
  collapsed = false,
  header,
  footer,
  children,
  style,
  ...props
}, ref) => (
  <SidebarContext.Provider value={collapsed}>
    <nav
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: collapsed ? 62 : 240,
        height: '100%',
        boxSizing: 'border-box',
        backgroundColor: 'var(--color-container-primary, #FFFFFF)',
        transition: 'width 0.2s',
        ...style,
      }}
      {...props}
    >
      {header && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', gap: 8, padding: collapsed ? '20px 12px 12px' : '20px 16px 12px' }}>
          {collapsed ? (
            // Collapsed rail: the mark sits on a 38px tile (Figma Sidebar / State=Collapsed)
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: 8,
              backgroundColor: 'var(--color-container-secondary, #F7F7F7)',
              boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.4)',
            }}>{header}</div>
          ) : header}
        </div>
      )}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: collapsed ? 'center' : 'stretch', gap: collapsed ? 4 : 6, padding: 12, overflowY: 'auto' }}>
        {children}
      </div>
      {footer && <div style={{ display: 'flex', flexDirection: 'column', alignItems: collapsed ? 'center' : 'stretch', gap: collapsed ? 4 : 6, padding: 12 }}>{footer}</div>}
    </nav>
  </SidebarContext.Provider>
));

Sidebar.displayName = 'Sidebar';

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label: string;
  selected?: boolean;
  /** Trailing node, e.g. a Badge or count */
  trailing?: React.ReactNode;
}

/** A navigation item inside a Sidebar. Label is hidden when the Sidebar is collapsed (kept for accessibility). */
export const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(({
  icon,
  label,
  selected = false,
  trailing,
  disabled,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}, ref) => {
  const collapsed = useContext(SidebarContext);
  const [hovered, setHovered] = useState(false);

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      aria-current={selected ? 'page' : undefined}
      aria-label={collapsed ? label : undefined}
      title={collapsed ? label : undefined}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        gap: 8,
        flexShrink: 0,
        width: collapsed ? 36 : '100%',
        height: 36,
        boxSizing: 'border-box',
        padding: collapsed ? 10 : '8px 12px',
        border: 'none',
        borderRadius: 8,
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: selected ? 'var(--color-status-brand-bg, #FEF2E9)' : hovered && !disabled ? 'var(--color-container-tertiary, #EEEEEE)' : 'transparent',
        color: disabled ? 'var(--color-text-tertiary, #828282)' : selected ? 'var(--color-brand-primary, #F57E20)' : hovered ? 'var(--color-text-primary, #14141E)' : 'var(--color-text-secondary, #49494A)',
        boxShadow: disabled ? 'none'
          : selected ? '0 1px 4px 0 rgba(245,126,32,0.15), inset 0 1px 0 0 rgba(255,255,255,0.4)'
          : hovered ? '0 1px 4px 0 rgba(89,89,90,0.15), inset 0 1px 0 0 rgba(255,255,255,0.4)'
          : 'none',
        opacity: disabled ? 0.5 : 1,
        fontFamily: 'var(--font-family-body)',
        fontWeight: 500,
        fontSize: 13,
        lineHeight: '19.2px',
        letterSpacing: '-0.13px',
        textAlign: 'left',
        transition: 'background-color 0.15s, color 0.15s',
        ...style,
      }}
      {...props}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center', width: 16, height: 16, flexShrink: 0 }}>{icon}</span>}
      {!collapsed && <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>}
      {!collapsed && trailing}
    </button>
  );
});

SidebarItem.displayName = 'SidebarItem';

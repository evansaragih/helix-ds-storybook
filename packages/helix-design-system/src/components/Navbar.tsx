import { forwardRef } from 'react';

/** Figma State — onTop sits on the hero; onScroll is a solid Surface/Default (white) fill with no transparency or blur */
export type NavbarState = 'onTop' | 'onScroll';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  state?: NavbarState;
  /** Left slot — usually the Logo (Figma Left Content) */
  leftContent?: React.ReactNode;
  /** Right slot — NavLinks, a Select, Buttons (Figma Right Content) */
  rightContent?: React.ReactNode;
}

/** The marketing site header: a left slot for the logo and a right slot for links and actions, with a bottom border. For the dashboard top bar use Dashboard Navbar. */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(({ state = 'onTop', leftContent, rightContent, style, ...props }, ref) => (
  <header
    ref={ref}
    data-state={state}
    style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, width: '100%', height: 60, boxSizing: 'border-box', padding: '0 24px',
      backgroundColor: 'var(--color-container-primary, #FFFFFF)',
      borderBottom: '1px solid var(--color-stroke-subtle, #EEEEEE)',
      ...style,
    }}
    {...props}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>{leftContent}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>{rightContent}</div>
  </header>
));

Navbar.displayName = 'Navbar';

/* ─── NavLink (Figma _nav-link) ──────────────────────────────────────── */
export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  /** Figma State=Active — a solid brand pill */
  active?: boolean;
  /** Figma Surface — dark gives white link text for dark or colored backgrounds */
  surface?: 'light' | 'dark';
  /** Leading icon (Figma Leading=Icon) */
  icon?: React.ReactNode;
  /** Trailing icon (Figma Trailing=Icon) */
  trailingIcon?: React.ReactNode;
}

/** A navigation link: default text, brand-colored hover, and a solid brand pill when active. */
export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(({ label, active = false, surface = 'light', icon, trailingIcon, style, onMouseEnter, onMouseLeave, ...props }, ref) => {
  const rest = surface === 'dark' ? '#FFFFFF' : 'var(--color-text-secondary, #49494A)';
  const slot: React.CSSProperties = { display: 'flex', width: 16, height: 16, flexShrink: 0 };
  return (
    <a
      ref={ref}
      aria-current={active ? 'page' : undefined}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'var(--color-brand-primary, #F57E20)'; onMouseEnter?.(e); }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = rest; onMouseLeave?.(e); }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, height: 36, boxSizing: 'border-box', padding: '8px 12px', borderRadius: 6,
        fontFamily: 'var(--font-family-body)', fontWeight: 400, fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px', whiteSpace: 'nowrap',
        textDecoration: 'none', cursor: 'pointer', transition: 'color var(--motion-duration-fast) var(--motion-easing-standard)',
        color: active ? 'var(--color-text-on-primary, #FFFFFF)' : rest,
        backgroundColor: active ? 'var(--color-brand-primary, #F57E20)' : 'transparent',
        ...style,
      }}
      {...props}
    >
      {icon && <span style={slot}>{icon}</span>}
      {label}
      {trailingIcon && <span style={slot}>{trailingIcon}</span>}
    </a>
  );
});

NavLink.displayName = 'NavLink';

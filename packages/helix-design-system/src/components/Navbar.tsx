import { forwardRef, useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

/** Figma State — onTop sits on the hero; onScroll is a solid Surface/Default (white) fill with no transparency or blur */
export type NavbarState = 'onTop' | 'onScroll';

/** Figma Device — desktop is the full 60px bar with 24px side padding; mobile is the closed bar (logo + hamburger) with 16px side padding */
export type NavbarDevice = 'desktop' | 'mobile';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  state?: NavbarState;
  device?: NavbarDevice;
  /** Left slot — usually the Logo (Figma Left Content) */
  leftContent?: React.ReactNode;
  /** Right slot — NavLinks, a Select, Buttons (Figma Right Content) */
  rightContent?: React.ReactNode;
}

/** The marketing site header: a left slot for the logo and a right slot for links and actions. onTop is transparent over a hero; onScroll is solid white. Device=mobile is the closed bar, a hamburger IconButton in the right slot opens a MobileMenu. For the dashboard top bar use Dashboard Navbar. */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(({ state = 'onTop', device = 'desktop', leftContent, rightContent, style, ...props }, ref) => (
  <header
    ref={ref}
    data-state={state}
    data-device={device}
    style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: device === 'mobile' ? 8 : 20, width: '100%', height: 60, boxSizing: 'border-box', padding: device === 'mobile' ? '0 16px' : '0 24px',
      backgroundColor: state === 'onScroll' ? 'var(--color-container-primary, #FFFFFF)' : 'transparent',
      borderBottom: state === 'onScroll' ? '1px solid var(--color-stroke-subtle, #EEEEEE)' : '1px solid transparent',
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

/* ─── MobileMenu (Figma Mobile Menu) ─────────────────────────────────── */
export interface MobileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Logo in the header (Figma Header > Left Content) */
  logo?: React.ReactNode;
  /** Close button in the header, usually an IconButton with an X icon (Figma Header > Right Content) */
  closeButton?: React.ReactNode;
  /** Menu Items slot: MobileMenuItem rows */
  children?: React.ReactNode;
  /** Footer slot: language Toggle, Login and Contact Us buttons. A divider is drawn above it. */
  footer?: React.ReactNode;
  /** Figma Show Header */
  showHeader?: boolean;
  /** Figma Show Body */
  showBody?: boolean;
  /** Figma Show Footer */
  showFooter?: boolean;
}

/** The opened menu of a marketing page on a phone: header with a close button, a scrolling list of links, and a footer pinned to the bottom. Fills its container (Figma 375x832). For the dashboard use Sidebar; for a desktop side drawer use Sheet. */
export const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(({ logo, closeButton, children, footer, showHeader = true, showBody = true, showFooter = true, style, ...props }, ref) => (
  <div
    ref={ref}
    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', minHeight: 0, boxSizing: 'border-box', overflow: 'hidden', backgroundColor: 'var(--color-container-primary, #FFFFFF)', ...style }}
    {...props}
  >
    {showHeader && <Navbar state="onScroll" device="mobile" leftContent={logo} rightContent={closeButton} style={{ flexShrink: 0, borderBottom: 'none' }} />}
    {showBody && <nav aria-label="Main" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '8px 12px', boxSizing: 'border-box' }}>{children}</nav>}
    {showFooter && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0, padding: '16px 16px 32px', boxSizing: 'border-box', marginTop: showBody ? undefined : 'auto' }}>
        <div role="separator" style={{ height: 1, borderRadius: 16, backgroundColor: 'var(--color-stroke-subtle, #EEEEEE)' }} />
        {footer}
      </div>
    )}
  </div>
));

MobileMenu.displayName = 'MobileMenu';

export interface MobileMenuItemProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  label: string;
  /** Sub-links. Makes the row an expandable group (chevron on the right, sub-items indented 16px). */
  children?: React.ReactNode;
  /** Group starts open */
  defaultOpen?: boolean;
}

const row: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 8, width: '100%', boxSizing: 'border-box', minHeight: 36, padding: '14px 12px', borderRadius: 6,
  fontFamily: 'var(--font-family-body)', fontWeight: 400, fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px', textAlign: 'left',
  color: 'var(--color-text-secondary, #49494A)', textDecoration: 'none', background: 'transparent', border: 'none', cursor: 'pointer',
};

/** One row of a MobileMenu. A plain link, or an expandable group when given sub-links as children. */
export const MobileMenuItem = forwardRef<HTMLAnchorElement, MobileMenuItemProps>(({ label, children, defaultOpen = false, style, ...props }, ref) => {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  if (!children) return <a ref={ref} style={{ ...row, ...style }} {...props}>{label}</a>;
  return (
    <div>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)} style={{ ...row, padding: '12px 12px' }}>
        <span style={{ flex: 1 }}>{label}</span>
        <span aria-hidden style={{ display: 'inline-flex', width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
          <ChevronDown size={12} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--motion-duration-fast) var(--motion-easing-standard)' }} />
        </span>
      </button>
      {open && <div id={id} style={{ paddingLeft: 16 }}>{children}</div>}
    </div>
  );
});

MobileMenuItem.displayName = 'MobileMenuItem';

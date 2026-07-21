import { forwardRef } from 'react';
import { Bell, Search, Menu } from 'lucide-react';

export interface NavbarLink {
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  links?: NavbarLink[];
  actions?: React.ReactNode;
  /** Show a search button */
  showSearch?: boolean;
  /** Show notification bell */
  showNotifications?: boolean;
  /** Avatar/user section */
  user?: { name: string; avatar?: string; initials?: string };
  /** Sticky top positioning */
  sticky?: boolean;
  /** Transparent background (for hero sections) */
  transparent?: boolean;
  onMenuClick?: () => void;
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(({
  logo,
  links = [],
  actions,
  showSearch = false,
  showNotifications = false,
  user,
  sticky = false,
  transparent = false,
  onMenuClick,
  style,
  ...props
}, ref) => {
  return (
    <header
      ref={ref}
      style={{
        position: sticky ? 'sticky' : 'relative',
        top: sticky ? 0 : undefined,
        zIndex: sticky ? 100 : undefined,
        width: '100%',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        gap: 24,
        backgroundColor: transparent ? 'transparent' : '#FFFFFF',
        borderBottom: transparent ? 'none' : '1px solid var(--color-stroke-subtle, #EEEEEE)',
        boxSizing: 'border-box',
        ...style,
      }}
      {...props}
    >
      {/* Mobile menu button */}
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, borderRadius: 8,
            border: 'none', backgroundColor: 'transparent',
            cursor: 'pointer', color: 'var(--color-text-secondary, #49494A)',
            flexShrink: 0,
          }}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Logo */}
      {logo && (
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          {logo}
        </div>
      )}

      {/* Nav links */}
      {links.length > 0 && (
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href ?? '#'}
              onClick={link.onClick ? (e) => { e.preventDefault(); link.onClick!(); } : undefined}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                fontFamily: 'var(--font-family-body)',
                fontWeight: link.active ? 500 : 400,
                fontSize: 14,
                lineHeight: '21px',
                color: link.active ? 'var(--color-brand-primary, #F57E20)' : 'var(--color-text-secondary, #49494A)',
                backgroundColor: link.active ? 'var(--color-brand-primary-ghost-hover, #FEF2E9)' : 'transparent',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.15s, background-color 0.15s',
              }}
              onMouseEnter={e => {
                if (!link.active) {
                  e.currentTarget.style.color = 'var(--color-text-primary, #14141E)';
                  e.currentTarget.style.backgroundColor = 'var(--color-container-secondary, #F7F7F7)';
                }
              }}
              onMouseLeave={e => {
                if (!link.active) {
                  e.currentTarget.style.color = 'var(--color-text-secondary, #49494A)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}

      {/* Spacer when no nav links */}
      {links.length === 0 && <div style={{ flex: 1 }} />}

      {/* Right side actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {showSearch && (
          <button
            aria-label="Search"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36, borderRadius: 8,
              border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
              backgroundColor: 'transparent', cursor: 'pointer',
              color: 'var(--color-text-secondary, #49494A)',
            }}
          >
            <Search size={16} />
          </button>
        )}

        {showNotifications && (
          <button
            aria-label="Notifications"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36, borderRadius: 8,
              border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
              backgroundColor: 'transparent', cursor: 'pointer',
              color: 'var(--color-text-secondary, #49494A)',
              position: 'relative',
            }}
          >
            <Bell size={16} />
            <span style={{
              position: 'absolute', top: 6, right: 6,
              width: 8, height: 8, borderRadius: '50%',
              backgroundColor: 'var(--color-brand-primary, #F57E20)',
              border: '2px solid #FFFFFF',
            }} />
          </button>
        )}

        {actions}

        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 4 }}>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                backgroundColor: 'var(--color-brand-primary, #F57E20)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FFFFFF',
                fontFamily: 'var(--font-family-body)',
                fontWeight: 600,
                fontSize: 14,
              }}>
                {user.initials ?? user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{
                fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 13,
                lineHeight: '19.2px', color: 'var(--color-text-primary, #14141E)',
                letterSpacing: '-0.01px',
              }}>
                {user.name}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

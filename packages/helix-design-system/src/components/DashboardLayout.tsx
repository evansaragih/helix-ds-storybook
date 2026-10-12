import { forwardRef } from 'react';

export interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A Sidebar */
  sidebar?: React.ReactNode;
  /** A DashboardNavbar, pinned to the top of the content panel */
  navbar?: React.ReactNode;
  /** A DashboardFooter, pinned to the bottom of the content panel */
  footer?: React.ReactNode;
  /** The page content — scrolls between the navbar and footer */
  children: React.ReactNode;
}

/** The app shell for dashboard pages: a Sidebar beside a rounded content panel with a pinned navbar and footer and a scrolling body. */
export const DashboardLayout = forwardRef<HTMLDivElement, DashboardLayoutProps>(({
  sidebar,
  navbar,
  footer,
  children,
  style,
  ...props
}, ref) => (
  <div
    ref={ref}
    style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      minHeight: 0,
      backgroundColor: 'var(--color-container-primary, #FFFFFF)',
      ...style,
    }}
    {...props}
  >
    {sidebar}
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', padding: '8px 8px 8px 0', boxSizing: 'border-box' }}>
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 16,
        border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
        backgroundColor: 'var(--color-container-secondary, #F7F7F7)',
      }}>
        {navbar}
        <main style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24, padding: '12px 16px' }}>
          {children}
        </main>
        {footer}
      </div>
    </div>
  </div>
));

DashboardLayout.displayName = 'DashboardLayout';

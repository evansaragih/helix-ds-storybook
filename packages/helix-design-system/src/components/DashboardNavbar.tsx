import { forwardRef } from 'react';

export interface DashboardNavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Left slot — typically a sidebar-toggle IconButton, a divider and a Breadcrumb */
  leftContent?: React.ReactNode;
  /** Right slot — page actions (Buttons, filters) */
  rightContent?: React.ReactNode;
}

/** The top bar of a dashboard page: navigation context on the left, page actions on the right. Use Navbar for a marketing or app-wide header. */
export const DashboardNavbar = forwardRef<HTMLElement, DashboardNavbarProps>(({
  leftContent,
  rightContent,
  style,
  ...props
}, ref) => (
  <header
    ref={ref}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20,
      width: '100%',
      height: 60,
      boxSizing: 'border-box',
      padding: '12px 12px',
      backgroundColor: 'var(--color-container-secondary, #F7F7F7)',
      borderBottom: '1px solid var(--color-stroke-subtle, #EEEEEE)',
      ...style,
    }}
    {...props}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>{leftContent}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>{rightContent}</div>
  </header>
));

DashboardNavbar.displayName = 'DashboardNavbar';

export interface DashboardFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Left slot — e.g. a Back button */
  leftContent?: React.ReactNode;
  /** Right slot — e.g. Cancel and Save buttons */
  rightContent?: React.ReactNode;
}

/** The bottom action bar of a dashboard page: secondary action on the left, primary actions on the right. */
export const DashboardFooter = forwardRef<HTMLElement, DashboardFooterProps>(({
  leftContent,
  rightContent,
  style,
  ...props
}, ref) => (
  <footer
    ref={ref}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20,
      width: '100%',
      height: 60,
      boxSizing: 'border-box',
      padding: '12px 12px',
      backgroundColor: 'var(--color-container-primary, #FFFFFF)',
      borderTop: '1px solid var(--color-stroke-subtle, #EEEEEE)',
      ...style,
    }}
    {...props}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>{leftContent}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>{rightContent}</div>
  </footer>
));

DashboardFooter.displayName = 'DashboardFooter';

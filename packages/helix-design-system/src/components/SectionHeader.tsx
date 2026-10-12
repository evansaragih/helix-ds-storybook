import { forwardRef } from 'react';

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  /** Trailing slot in the title row — one action Button, or a small group */
  actions?: React.ReactNode;
  /** Toolbar row under the title — sort / filter chips, typically a ToolbarFilter */
  toolbar?: React.ReactNode;
}

/** A page or section header with a title, an optional action, and an optional toolbar row beneath. Use above a data view (list or table). */
export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(({
  title,
  actions,
  toolbar,
  style,
  ...props
}, ref) => (
  <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 16, ...style }} {...props}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <h2 style={{
        margin: 0,
        fontFamily: 'var(--font-family-heading, Rubik, sans-serif)',
        fontWeight: 700,
        fontSize: 25,
        lineHeight: '30px',
        letterSpacing: '-0.01em',
        color: 'var(--color-text-primary, #14141E)',
      }}>
        {title}
      </h2>
      {actions && <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>{actions}</div>}
    </div>
    {toolbar}
  </div>
));

SectionHeader.displayName = 'SectionHeader';

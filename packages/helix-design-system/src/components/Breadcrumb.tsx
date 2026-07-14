import { forwardRef } from 'react';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  /** Custom separator node (default: ChevronRight icon) */
  separator?: React.ReactNode;
  /** Size variant */
  size?: 'sm' | 'md';
}

const SIZES = {
  sm: { fontSize: 12, lineHeight: '18px', iconSize: 8 },
  md: { fontSize: 13, lineHeight: '19.2px', iconSize: 10 },
};

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(({
  items,
  separator,
  size = 'md',
  style,
  ...props
}, ref) => {
  const sz = SIZES[size];

  return (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: 4, ...style }}
      {...props}
    >
      <ol style={{ display: 'flex', alignItems: 'center', gap: 4, margin: 0, padding: 0, listStyle: 'none' }}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {isLast ? (
                <span
                  aria-current="page"
                  style={{
                    fontFamily: 'Rubik, sans-serif',
                    fontWeight: 400,
                    fontSize: sz.fontSize,
                    lineHeight: sz.lineHeight,
                    color: 'var(--color-text-primary, #14141E)',
                    letterSpacing: '-0.01px',
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href ?? '#'}
                  onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick!(); } : undefined}
                  style={{
                    fontFamily: 'Rubik, sans-serif',
                    fontWeight: 400,
                    fontSize: sz.fontSize,
                    lineHeight: sz.lineHeight,
                    color: 'var(--color-text-tertiary, #828282)',
                    textDecoration: 'none',
                    letterSpacing: '-0.01px',
                    cursor: 'pointer',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-brand-primary, #F57E20)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-tertiary, #828282)'; }}
                >
                  {item.label}
                </a>
              )}
              {!isLast && (
                <span style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-tertiary, #828282)', flexShrink: 0 }}>
                  {separator ?? <ChevronRight size={sz.iconSize} strokeWidth={1.5} />}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

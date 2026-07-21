import { forwardRef } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional header area */
  header?: React.ReactNode;
  /** Optional footer area */
  footer?: React.ReactNode;
  /** Shadow elevation */
  elevation?: 'none' | 'sm' | 'default' | 'md';
  /** Padding preset */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Border style */
  bordered?: boolean;
  /** Hover effect */
  hoverable?: boolean;
}

const PADDING = { none: 0, sm: 12, md: 16, lg: 24 };
const SHADOWS = {
  none: 'none',
  sm: 'var(--shadow-sm)',
  default: 'var(--shadow)',
  md: 'var(--shadow-md)',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  header,
  footer,
  elevation = 'sm',
  padding = 'md',
  bordered = false,
  hoverable = false,
  children,
  style,
  className,
  onMouseEnter,
  onMouseLeave,
  ...props
}, ref) => {
  const pad = PADDING[padding];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        backgroundColor: 'var(--color-container-primary, #FFFFFF)',
        borderRadius: 'var(--radius-lg, 8px)',
        border: bordered ? '1px solid var(--color-stroke-subtle, #EEEEEE)' : 'none',
        boxShadow: SHADOWS[elevation],
        overflow: 'hidden',
        transition: hoverable ? 'box-shadow 0.2s, transform 0.2s' : 'none',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (hoverable) {
          (e.currentTarget as HTMLDivElement).style.boxShadow = SHADOWS.default;
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)';
        }
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (hoverable) {
          (e.currentTarget as HTMLDivElement).style.boxShadow = SHADOWS[elevation];
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        }
        onMouseLeave?.(e);
      }}
      {...props}
    >
      {header && (
        <div style={{
          padding: `${pad}px ${pad}px ${pad / 2}px`,
          borderBottom: '1px solid var(--color-stroke-subtle, #EEEEEE)',
        }}>
          {header}
        </div>
      )}
      <div style={{ padding: pad }}>{children}</div>
      {footer && (
        <div style={{
          padding: `${pad / 2}px ${pad}px ${pad}px`,
          borderTop: '1px solid var(--color-stroke-subtle, #EEEEEE)',
          backgroundColor: 'var(--color-container-secondary, #F7F7F7)',
        }}>
          {footer}
        </div>
      )}
    </div>
  );
});

Card.displayName = 'Card';

/* ─── Card sub-components ──────────────────────────────────────── */

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, style, ...props }, ref) => (
    <div ref={ref} style={{ marginBottom: 12, ...style }} {...props}>{children}</div>
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ children, style, ...props }, ref) => (
    <h3 ref={ref as React.Ref<HTMLHeadingElement>} style={{
      margin: 0,
      fontFamily: 'var(--font-family-body)',
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '24px',
      color: 'var(--color-text-primary, #14141E)',
      letterSpacing: '-0.01px',
      ...style,
    }} {...props}>{children}</h3>
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ children, style, ...props }, ref) => (
    <p ref={ref} style={{
      margin: '4px 0 0',
      fontFamily: 'var(--font-family-body)',
      fontWeight: 400,
      fontSize: 13,
      lineHeight: '19.2px',
      color: 'var(--color-text-secondary, #49494A)',
      letterSpacing: '-0.01px',
      ...style,
    }} {...props}>{children}</p>
  )
);
CardDescription.displayName = 'CardDescription';

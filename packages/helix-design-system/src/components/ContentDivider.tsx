import { forwardRef } from 'react';

export type ContentDividerAppearance = 'sides' | 'top-bottom' | 'background';

export interface ContentDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** sides = line · content · line; top-bottom = line above and below; background = tinted band, no lines */
  appearance?: ContentDividerAppearance;
  /** Inline content — a string renders as a label; pass a node for a Button, IconButton, icon group or tab group */
  children: React.ReactNode;
  /** Render a string child as a smaller muted caption (e.g. "Today") instead of a label */
  caption?: boolean;
}

const line: React.CSSProperties = { flex: 1, height: 1, borderRadius: 16, backgroundColor: 'var(--color-stroke-subtle, #EEEEEE)' };

/** A divider with content embedded inline. Use for a section separator that also needs a label or inline action; use Divider for a plain unlabeled line. */
export const ContentDivider = forwardRef<HTMLDivElement, ContentDividerProps>(({
  appearance = 'sides',
  children,
  caption = false,
  style,
  ...props
}, ref) => {
  const content = typeof children === 'string' ? (
    <span style={{
      fontFamily: 'var(--font-family-body)',
      fontWeight: caption ? 400 : 500,
      fontSize: caption ? 13 : 16,
      lineHeight: caption ? '19.2px' : '24px',
      letterSpacing: '-0.01px',
      color: caption ? 'var(--color-text-muted, #9F9F9F)' : 'var(--color-text-primary, #14141E)',
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  ) : children;

  if (appearance === 'background') {
    return (
      <div ref={ref} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 0',
        borderRadius: 8, backgroundColor: 'var(--color-container-secondary, #F7F7F7)', ...style,
      }} {...props}>
        {content}
      </div>
    );
  }

  if (appearance === 'top-bottom') {
    return (
      <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, ...style }} {...props}>
        <div style={{ ...line, flex: 'none', width: '100%' }} />
        {content}
        <div style={{ ...line, flex: 'none', width: '100%' }} />
      </div>
    );
  }

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }} {...props}>
      <div style={line} />
      {content}
      <div style={line} />
    </div>
  );
});

ContentDivider.displayName = 'ContentDivider';

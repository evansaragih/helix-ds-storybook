import { forwardRef } from 'react';

/** Figma Rotation */
export type DividerOrientation = 'horizontal' | 'vertical';
/** Figma Type */
export type DividerType = 'line' | 'dash';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  type?: DividerType;
}

const COLOR = 'var(--color-stroke-subtle, #EEEEEE)';

/** A simple horizontal or vertical separator line. Use for splitting adjacent sections with no label; for a divider with an embedded label or action use Content Divider. */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(({ orientation = 'horizontal', type = 'line', style, ...props }, ref) => {
  const vertical = orientation === 'vertical';
  const line: React.CSSProperties = type === 'dash'
    ? { border: 'none', [vertical ? 'borderLeft' : 'borderTop']: `1px dashed ${COLOR}` }
    : { backgroundColor: COLOR };

  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      style={{
        flexShrink: 0, borderRadius: 16, boxSizing: 'border-box',
        ...(vertical ? { width: 1, alignSelf: 'stretch', minHeight: 32 } : { height: 1, width: '100%' }),
        ...line,
        ...style,
      }}
      {...props}
    />
  );
});

Divider.displayName = 'Divider';

import { Children, forwardRef } from 'react';

export type FooterActionsAlignment = 'fill' | 'right';

export interface FooterActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** fill = equal-width buttons across the container; right = hug-content buttons on the right */
  alignment?: FooterActionsAlignment;
  /** Optional leading slot (Checkbox, text link or Button). Only used with alignment 'right'. */
  leftContent?: React.ReactNode;
  /** The action Buttons — up to three, in the order they should appear */
  children: React.ReactNode;
}

/** The action row for a footer / bottom bar. Use inside a Dialog, Popover, Dropdown panel, Sheet or any overlay that needs an action bar. */
export const FooterActions = forwardRef<HTMLDivElement, FooterActionsProps>(({
  alignment = 'right',
  leftContent,
  children,
  style,
  ...props
}, ref) => {
  const fill = alignment === 'fill';
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: leftContent && !fill ? 'space-between' : fill ? 'stretch' : 'flex-end',
        gap: 12,
        ...style,
      }}
      {...props}
    >
      {!fill && leftContent}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...(fill ? { flex: 1 } : {}) }}>
        {fill
          ? Children.map(children, (child) => <div style={{ flex: 1, display: 'flex' }}>{child}</div>)
          : children}
      </div>
    </div>
  );
});

FooterActions.displayName = 'FooterActions';

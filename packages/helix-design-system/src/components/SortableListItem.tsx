import { forwardRef, useState } from 'react';
import { GripVertical } from 'lucide-react';

export interface SortableListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Row content — typically a ListItemCard or a short label */
  children: React.ReactNode;
  /** The row is being dragged (lifted look) */
  dragging?: boolean;
  disabled?: boolean;
  /** Spread onto the drag handle — wire your drag-and-drop library's handle props here (e.g. dnd-kit `listeners`) */
  handleProps?: React.HTMLAttributes<HTMLSpanElement>;
}

/** A reorderable list row: a drag handle plus the row content. Use where item order is user-controlled via drag; it only renders the row, so bring your own drag-and-drop logic. Use ListItemCard for a static row. */
export const SortableListItem = forwardRef<HTMLDivElement, SortableListItemProps>(({
  children,
  dragging = false,
  disabled = false,
  handleProps,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}, ref) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      aria-disabled={disabled || undefined}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        paddingRight: 8,
        borderRadius: 6,
        backgroundColor: hovered && !dragging && !disabled ? 'var(--color-container-secondary, #F7F7F7)' : 'var(--color-container-primary, #FFFFFF)',
        boxShadow: dragging ? 'var(--shadow-sm)' : undefined,
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      {...props}
    >
      <span
        aria-hidden={!handleProps}
        {...handleProps}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, flexShrink: 0,
          marginLeft: 0, color: 'var(--color-text-tertiary, #828282)',
          cursor: disabled ? 'not-allowed' : dragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          ...handleProps?.style,
        }}
      >
        <GripVertical size={16} />
      </span>
      <div style={{ flex: 1, minWidth: 0, padding: '8px 12px', fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', color: 'var(--color-text-primary, #14141E)' }}>
        {children}
      </div>
    </div>
  );
});

SortableListItem.displayName = 'SortableListItem';

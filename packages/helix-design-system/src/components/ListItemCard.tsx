import { forwardRef } from 'react';
import { Badge, type BadgeVariant } from './Badge';

export interface ListItemCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  /** Leading avatar/icon/thumbnail — rendered at a fixed 40x40 */
  leadingContent?: React.ReactNode;
  trailingBadgeLabel?: string;
  trailingBadgeVariant?: BadgeVariant;
  trailingContent?: React.ReactNode;
}

/** Matches Figma's "Item / Card" — the row unit used inside ListContainer's Card List layout. */
export const ListItemCard = forwardRef<HTMLDivElement, ListItemCardProps>(({
  title,
  description,
  leadingContent,
  trailingBadgeLabel,
  trailingBadgeVariant = 'blue',
  trailingContent,
  style,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        gap: 8,
        padding: '12px 12px 8px',
        borderRadius: 'var(--radius-lg, 8px)',
        border: '1px solid var(--color-stroke-subtle, #D7D7D7)',
        backgroundColor: 'var(--color-container-primary, #FFFFFF)',
        ...style,
      }}
      {...props}
    >
      {leadingContent && (
        <div style={{
          width: 40, height: 40, flexShrink: 0, borderRadius: 8, overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'var(--color-container-tertiary, #EEEEEE)',
        }}>
          {leadingContent}
        </div>
      )}
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', minWidth: 0, gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <p style={{
            margin: 0, fontFamily: 'var(--font-family-body)', fontWeight: 400,
            fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px',
            color: 'var(--color-text-primary, #14141E)',
          }}>
            {title}
          </p>
          {description && (
            <p style={{
              margin: 0, fontFamily: 'var(--font-family-body)', fontWeight: 400,
              fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px',
              color: 'var(--color-text-tertiary, #828282)',
            }}>
              {description}
            </p>
          )}
        </div>
        {(trailingBadgeLabel || trailingContent) && (
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {trailingContent ?? <Badge variant={trailingBadgeVariant} label={trailingBadgeLabel!} />}
          </div>
        )}
      </div>
    </div>
  );
});

ListItemCard.displayName = 'ListItemCard';

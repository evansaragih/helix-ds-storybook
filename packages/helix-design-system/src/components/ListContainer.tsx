import { forwardRef } from 'react';
import { SquareDashed, ListFilter } from 'lucide-react';
import { Badge, type BadgeVariant } from './Badge';
import { IconButton } from './IconButton';
import { Button } from './Button';
import { Pagination, type PaginationProps } from './Pagination';
import { ListItemCard, type ListItemCardProps } from './ListItemCard';

export type ListContainerLayout = 'card-list' | 'row-list' | 'data-table' | 'sortable-list';

export interface ListContainerItem extends Omit<ListItemCardProps, 'style' | 'id'> {
  id: string | number;
}

export interface ListContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  leadingIcon?: React.ReactNode;
  badgeLabel?: string;
  badgeVariant?: BadgeVariant;
  /** Full override of the header's content area */
  headerContent?: React.ReactNode;
  showActionButton?: boolean;
  actionIcon?: React.ReactNode;
  onActionClick?: () => void;
  /** Optional row rendered below the header — bring your own ToolbarFilter or filter pills */
  toolbarFilter?: React.ReactNode;
  /**
   * Which of Figma's four layouts this list represents. Purely descriptive when `children`
   * is passed — only drives rendering when `items` is used, which auto-renders as Card List.
   */
  layout?: ListContainerLayout;
  /** Auto-rendered as ListItemCard rows when no `children` is given (Card List layout) */
  items?: ListContainerItem[];
  showPagination?: boolean;
  paginationProps?: PaginationProps;
  showFooterActions?: boolean;
  onCancel?: () => void;
  onContinue?: () => void;
  cancelLabel?: string;
  continueLabel?: string;
}

export const ListContainer = forwardRef<HTMLDivElement, ListContainerProps>(({
  title,
  description,
  leadingIcon,
  badgeLabel,
  badgeVariant = 'blue',
  headerContent,
  showActionButton = true,
  actionIcon,
  onActionClick,
  toolbarFilter,
  layout = 'card-list',
  items,
  showPagination = true,
  paginationProps,
  showFooterActions = false,
  onCancel,
  onContinue,
  cancelLabel = 'Cancel',
  continueLabel = 'Continue',
  children,
  style,
  className,
  ...props
}, ref) => {
  const hasHeader = headerContent || title || description || badgeLabel;
  const hasFooter = (showPagination && paginationProps) || showFooterActions;
  const body = children ?? (items && (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      {items.map(({ id, ...item }) => <ListItemCard key={id} {...item} />)}
    </div>
  ));

  return (
    <div
      ref={ref}
      className={className}
      style={{
        backgroundColor: 'var(--color-container-primary, #FFFFFF)',
        borderRadius: 'var(--radius-lg, 8px)',
        boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.04), 0px 1px 3px 0px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      data-layout={layout}
      {...props}
    >
      {hasHeader && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 12,
          padding: '16px 16px 0',
        }}>
          <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 12, minWidth: 0, paddingBottom: 16 }}>
            {headerContent || (
              <>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 32, height: 32, flexShrink: 0,
                  borderRadius: 'var(--radius-lg, 8px)',
                  backgroundColor: 'var(--color-status-brand-bg, #FEF2E9)',
                  color: 'var(--color-brand-primary, #F57E20)',
                }}>
                  <span style={{ display: 'flex', width: 24, height: 24 }}>
                    {leadingIcon ?? <SquareDashed size={20} />}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 0 }}>
                  {title && (
                    <p style={{
                      margin: 0, fontFamily: 'var(--font-family-body)', fontWeight: 500,
                      fontSize: 16, lineHeight: '24px', letterSpacing: '-0.16px',
                      color: 'var(--color-text-primary, #14141E)',
                    }}>
                      {title}
                    </p>
                  )}
                  {description && (
                    <p style={{
                      margin: 0, fontFamily: 'var(--font-family-body)', fontWeight: 400,
                      fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px',
                      color: 'var(--color-text-secondary, #49494A)',
                    }}>
                      {description}
                    </p>
                  )}
                </div>
                {badgeLabel && <Badge variant={badgeVariant} label={badgeLabel} />}
              </>
            )}
          </div>
          {showActionButton && (
            <IconButton
              shape="square"
              variant="primary-outline"
              icon={actionIcon ?? <ListFilter size={14} />}
              onClick={onActionClick}
              aria-label="List actions"
              style={{ marginBottom: 16 }}
            />
          )}
        </div>
      )}

      {toolbarFilter && (
        <div style={{ padding: '0 16px 12px' }}>{toolbarFilter}</div>
      )}

      {body && (
        <div style={{ display: 'flex', flexDirection: 'column', padding: 16, width: '100%', boxSizing: 'border-box' }}>
          {body}
        </div>
      )}

      {hasFooter && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: showFooterActions ? 'flex-end' : 'stretch',
          gap: 8,
          padding: 12,
          borderTop: '1px solid var(--color-stroke-subtle, #D7D7D7)',
          backgroundColor: 'var(--color-container-secondary, #F7F7F7)',
        }}>
          {showPagination && paginationProps && (
            <div style={{ flex: 1 }}>
              <Pagination {...paginationProps} />
            </div>
          )}
          {showFooterActions && (
            <>
              <Button variant="ghost-neutral" size="sm" onClick={onCancel}>{cancelLabel}</Button>
              <Button variant="primary" size="sm" onClick={onContinue}>{continueLabel}</Button>
            </>
          )}
        </div>
      )}
    </div>
  );
});

ListContainer.displayName = 'ListContainer';

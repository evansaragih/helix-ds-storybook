import { forwardRef } from 'react';
import { SquareDashed, ListFilter } from 'lucide-react';
import { Badge, type BadgeVariant } from './Badge';
import { IconButton } from './IconButton';

export interface ContentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  /** Leading icon shown in a 32x32 brand-subtle tile. Defaults to a generic icon. */
  leadingIcon?: React.ReactNode;
  badgeLabel?: string;
  badgeVariant?: BadgeVariant;
  /** Full override of the header's content area — replaces icon/title/description/badge entirely */
  headerContent?: React.ReactNode;
  /** Show the header's trailing action icon button (default: a filter icon) */
  showActionButton?: boolean;
  actionIcon?: React.ReactNode;
  onActionClick?: () => void;
  /** Body padding preset */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const PADDING = { none: 0, sm: 12, md: 16, lg: 24 };

export const ContentContainer = forwardRef<HTMLDivElement, ContentContainerProps>(({
  title,
  description,
  leadingIcon,
  badgeLabel,
  badgeVariant = 'blue',
  headerContent,
  showActionButton = true,
  actionIcon,
  onActionClick,
  padding = 'md',
  children,
  style,
  className,
  ...props
}, ref) => {
  const pad = PADDING[padding];
  const hasHeader = headerContent || title || description || badgeLabel;

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
      {...props}
    >
      {hasHeader && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 8,
          padding: 16,
          borderBottom: '1px solid var(--color-stroke-subtle, #D7D7D7)',
        }}>
          <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 12, minWidth: 0 }}>
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
              aria-label="Container actions"
            />
          )}
        </div>
      )}
      {children && (
        <div style={{ padding: pad, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {children}
        </div>
      )}
    </div>
  );
});

ContentContainer.displayName = 'ContentContainer';

import { forwardRef } from 'react';
import { Inbox, Search, FolderOpen, ImageOff, FileX } from 'lucide-react';

export type EmptyStateVariant = 'default' | 'search' | 'folder' | 'image' | 'file';

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'outline';
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: EmptyStateVariant;
  /** Custom illustration or icon override */
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  /** Compact version with less padding */
  compact?: boolean;
}

const ICONS: Record<EmptyStateVariant, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  default: Inbox,
  search:  Search,
  folder:  FolderOpen,
  image:   ImageOff,
  file:    FileX,
};

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(({
  variant = 'default',
  icon,
  title,
  description,
  action,
  secondaryAction,
  compact = false,
  style,
  ...props
}, ref) => {
  const Icon = ICONS[variant];
  const padding = compact ? '32px 24px' : '64px 24px';

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding,
        width: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
      {...props}
    >
      {/* Icon container */}
      <div style={{
        width: compact ? 32 : 40,
        height: compact ? 32 : 40,
        borderRadius: 'var(--radius-lg, 8px)',
        backgroundColor: 'var(--color-status-brand-bg, #FEF2E9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        color: 'var(--color-brand-primary, #F57E20)',
      }}>
        {icon ?? <Icon size={compact ? 24 : 32} strokeWidth={1.5} />}
      </div>

      {/* Title */}
      <h3 style={{
        margin: '0 0 8px',
        fontFamily: 'Rubik, sans-serif',
        fontWeight: 500,
        fontSize: compact ? 14 : 16,
        lineHeight: compact ? '21px' : '24px',
        color: 'var(--color-text-primary, #14141E)',
        maxWidth: 320,
      }}>
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p style={{
          margin: 0,
          fontFamily: 'Rubik, sans-serif',
          fontWeight: 400,
          fontSize: 13,
          lineHeight: '19.2px',
          letterSpacing: '-0.01px',
          color: 'var(--color-text-secondary, #49494A)',
          maxWidth: 380,
        }}>
          {description}
        </p>
      )}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontFamily: 'Rubik, sans-serif',
                fontWeight: 400,
                fontSize: 14,
                color: 'var(--color-text-primary, #14141E)',
              }}
            >
              {secondaryAction.label}
            </button>
          )}
          {action && (
            <button
              onClick={action.onClick}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: action.variant === 'outline'
                  ? '1px solid var(--color-brand-primary, #F57E20)'
                  : 'none',
                backgroundColor: action.variant === 'outline'
                  ? 'transparent'
                  : 'var(--color-brand-primary, #F57E20)',
                cursor: 'pointer',
                fontFamily: 'Rubik, sans-serif',
                fontWeight: 400,
                fontSize: 14,
                color: action.variant === 'outline'
                  ? 'var(--color-brand-primary, #F57E20)'
                  : '#FFFFFF',
              }}
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';

import { forwardRef } from 'react';
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';
import { Badge } from './Badge';
import type { BadgeVariant } from './Badge';

export type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface AlertAction {
  label: string;
  onClick: () => void;
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title: string;
  description?: string;
  /** Override the default variant icon */
  icon?: React.ReactNode;
  /** Badge label rendered next to the title */
  badge?: string;
  /** Primary action button */
  action?: AlertAction;
  /** Secondary (ghost-style) action */
  secondaryAction?: AlertAction;
  /** Show a close button */
  onClose?: (e: React.MouseEvent) => void;
}

/* ─── Variant → token map ──────────────────────────────────────── */
interface VariantTokens {
  bg: string;
  border: string;
  iconColor: string;
  actionBg: string;
  actionText: string;
  badgeVariant: BadgeVariant;
  DefaultIcon: React.ComponentType<{ size?: number }>;
}

const VARIANTS: Record<AlertVariant, VariantTokens> = {
  default: {
    bg:          'var(--color-container-primary, #FFFFFF)',
    border:      'var(--color-stroke-subtle, #EEEEEE)',
    iconColor:   'var(--color-brand-primary, #F57E20)',
    actionBg:    'var(--color-brand-primary, #F57E20)',
    actionText:  'var(--color-text-on-primary, #FFFFFF)',
    badgeVariant: 'brand-subtle',
    DefaultIcon: Info,
  },
  info: {
    bg:          'var(--color-status-info-bg, #EBF2FE)',
    border:      'var(--color-stroke-info, #3B82F6)',
    iconColor:   'var(--color-text-info, #014CC5)',
    actionBg:    'var(--color-stroke-info, #3B82F6)',
    actionText:  '#FFFFFF',
    badgeVariant: 'blue',
    DefaultIcon: Info,
  },
  success: {
    bg:          'var(--color-status-success-bg, #E9F9EF)',
    border:      'var(--color-text-success, #12843C)',
    iconColor:   'var(--color-text-success, #12843C)',
    actionBg:    'var(--color-stroke-success, #22C55E)',
    actionText:  '#FFFFFF',
    badgeVariant: 'green',
    DefaultIcon: CheckCircle2,
  },
  warning: {
    bg:          'var(--color-status-warning-bg, #FEF5E7)',
    border:      'var(--primitive-yellow-50, #F59E0B)',
    iconColor:   'var(--color-text-warning, #A66800)',
    actionBg:    'var(--primitive-yellow-50, #F59E0B)',
    actionText:  '#FFFFFF',
    badgeVariant: 'yellow',
    DefaultIcon: AlertTriangle,
  },
  error: {
    bg:          'var(--color-status-error-bg, #FEE2E2)',
    border:      'var(--color-stroke-error, #DC2626)',
    iconColor:   'var(--color-destructive, #DC2626)',
    actionBg:    'var(--color-destructive, #DC2626)',
    actionText:  '#FFFFFF',
    badgeVariant: 'red',
    DefaultIcon: XCircle,
  },
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(({
  variant = 'default',
  title,
  description,
  icon,
  badge,
  action,
  secondaryAction,
  onClose,
  style,
  className,
  ...props
}, ref) => {
  const v = VARIANTS[variant];
  const IconEl = v.DefaultIcon;

  return (
    <div
      ref={ref}
      role="alert"
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: 16,
        borderRadius: 8,
        backgroundColor: v.bg,
        border: `1px solid ${v.border}`,
        boxSizing: 'border-box',
        width: '100%',
        ...style,
      }}
      {...props}
    >
      {/* Top row: icon + title + badge + close */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {/* Icon */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, width: 20, height: 20,
          color: v.iconColor,
          marginTop: 1,
        }}>
          {icon ?? <IconEl size={20} />}
        </div>

        {/* Title + description */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            margin: 0,
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 500,
            fontSize: 14,
            lineHeight: '21px',
            letterSpacing: '-0.01px',
            color: 'var(--color-text-primary, #14141E)',
          }}>
            {title}
          </p>
          {description && (
            <p style={{
              margin: '4px 0 0',
              fontFamily: 'Rubik, sans-serif',
              fontWeight: 400,
              fontSize: 13,
              lineHeight: '19.2px',
              letterSpacing: '-0.01px',
              color: 'var(--color-text-secondary, #49494A)',
            }}>
              {description}
            </p>
          )}
        </div>

        {/* Badge */}
        {badge && (
          <Badge
            variant={v.badgeVariant}
            label={badge}
            size="sm"
            style={{ flexShrink: 0, marginTop: 2 }}
          />
        )}

        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Dismiss"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, width: 20, height: 20, marginTop: 1,
              padding: 0, border: 'none', background: 'none',
              cursor: 'pointer', borderRadius: 4,
              color: 'var(--color-text-tertiary, #828282)',
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Action buttons */}
      {(action || secondaryAction) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 32 }}>
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              style={{
                padding: '5px 12px',
                borderRadius: 8,
                border: `1px solid ${v.border}`,
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontFamily: 'Rubik, sans-serif',
                fontWeight: 400,
                fontSize: 13,
                lineHeight: '19.2px',
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
                padding: '5px 12px',
                borderRadius: 8,
                border: 'none',
                backgroundColor: v.actionBg,
                cursor: 'pointer',
                fontFamily: 'Rubik, sans-serif',
                fontWeight: 400,
                fontSize: 13,
                lineHeight: '19.2px',
                color: v.actionText,
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

Alert.displayName = 'Alert';

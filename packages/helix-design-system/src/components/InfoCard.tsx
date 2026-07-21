import { forwardRef } from 'react';

export type InfoCardVariant = 'default' | 'brand' | 'success' | 'warning' | 'error' | 'info';

export interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: InfoCardVariant;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  action?: { label: string; onClick: () => void };
  /** Compact single-line card */
  compact?: boolean;
  /** Card is clickable */
  onClick?: () => void;
}

interface VariantTokens {
  bg: string;
  border: string;
  accent: string;
}

const VARIANTS: Record<InfoCardVariant, VariantTokens> = {
  default: { bg: '#FFFFFF',                                               border: 'var(--color-stroke-subtle, #EEEEEE)',  accent: 'var(--color-text-secondary, #49494A)' },
  brand:   { bg: 'var(--color-brand-primary-ghost-hover, #FEF2E9)',      border: 'var(--primitive-orange-10, #FCC9A3)',  accent: 'var(--color-brand-primary, #F57E20)' },
  success: { bg: 'var(--color-status-success-bg, #E9F9EF)',              border: 'var(--primitive-green-10, #AAEBBF)',   accent: 'var(--color-text-success, #12843C)' },
  warning: { bg: 'var(--color-status-warning-bg, #FEF5E7)',              border: 'var(--primitive-yellow-20, #FBDA8E)',  accent: 'var(--color-text-warning, #A66800)' },
  error:   { bg: 'var(--color-status-error-bg, #FEE2E2)',                border: 'var(--primitive-red-10, #FCA5A5)',     accent: 'var(--color-destructive, #DC2626)' },
  info:    { bg: 'var(--color-status-info-bg, #EBF2FE)',                 border: 'var(--primitive-blue-10, #BFDBFE)',   accent: 'var(--color-text-info, #014CC5)' },
};

export const InfoCard = forwardRef<HTMLDivElement, InfoCardProps>(({
  variant = 'default',
  title,
  description,
  icon,
  footer,
  action,
  compact = false,
  onClick,
  style,
  ...props
}, ref) => {
  const v = VARIANTS[variant];

  return (
    <div
      ref={ref}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{
        backgroundColor: v.bg,
        border: `1px solid ${v.border}`,
        borderRadius: 12,
        padding: compact ? '12px 16px' : '20px',
        display: 'flex',
        flexDirection: compact ? 'row' : 'column',
        alignItems: compact ? 'center' : 'flex-start',
        gap: compact ? 12 : 16,
        boxSizing: 'border-box',
        cursor: onClick ? 'pointer' : 'default',
        transition: onClick ? 'box-shadow 0.15s' : undefined,
        width: '100%',
        ...style,
      }}
      onMouseEnter={onClick ? e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'; } : undefined}
      onMouseLeave={onClick ? e => { e.currentTarget.style.boxShadow = 'none'; } : undefined}
      {...props}
    >
      {icon && (
        <div style={{
          color: v.accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          width: compact ? 20 : 40,
          height: compact ? 20 : 40,
          borderRadius: compact ? undefined : 10,
          backgroundColor: compact ? 'transparent' : `${v.border}`,
        }}>
          {icon}
        </div>
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <p style={{
            margin: '0 0 4px',
            fontFamily: 'var(--font-family-body)',
            fontWeight: 600,
            fontSize: compact ? 13 : 14,
            lineHeight: compact ? '19.2px' : '21px',
            color: 'var(--color-text-primary, #14141E)',
            letterSpacing: '-0.01px',
          }}>
            {title}
          </p>
        )}
        {description && (
          <p style={{
            margin: 0,
            fontFamily: 'var(--font-family-body)',
            fontWeight: 400,
            fontSize: compact ? 12 : 13,
            lineHeight: '1.6',
            color: 'var(--color-text-secondary, #49494A)',
          }}>
            {description}
          </p>
        )}
      </div>

      {action && (
        <button
          onClick={e => { e.stopPropagation(); action.onClick(); }}
          style={{
            flexShrink: 0,
            padding: compact ? '4px 10px' : '6px 12px',
            borderRadius: 6,
            border: `1px solid ${v.border}`,
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontFamily: 'var(--font-family-body)',
            fontWeight: 500,
            fontSize: 13,
            color: v.accent,
          }}
        >
          {action.label}
        </button>
      )}

      {footer && !compact && (
        <div style={{
          width: '100%',
          paddingTop: 12,
          borderTop: `1px solid ${v.border}`,
          marginTop: 4,
        }}>
          {footer}
        </div>
      )}
    </div>
  );
});

InfoCard.displayName = 'InfoCard';

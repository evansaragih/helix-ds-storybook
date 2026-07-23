import { forwardRef } from 'react';
import { TrendingUp, TrendingDown, Minus, MoreHorizontal, ArrowRight } from 'lucide-react';

export type MetricTrend = 'up' | 'down' | 'neutral';

export interface CardMetricFooterAction {
  label: string;
  onClick: () => void;
}

export interface CardMetricProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  unit?: string;
  trend?: MetricTrend;
  trendValue?: string;
  trendLabel?: string;
  icon?: React.ReactNode;
  /** Accent color on the icon area */
  accentColor?: string;
  description?: string;
  /** Overflow ("...") button in the header, e.g. for a context menu */
  onMoreClick?: () => void;
  /** Bordered slot below the value row — pass a chart component */
  chart?: React.ReactNode;
  /** "View details"-style link row at the bottom, separated by a dashed divider */
  footerAction?: CardMetricFooterAction;
  /** Decorative accent badge floating over the top-right corner */
  floatingIcon?: React.ReactNode;
}

const TREND_META = {
  up:      { color: 'var(--color-text-success, #12843C)', Icon: TrendingUp,   bg: '#E9F9EF' },
  down:    { color: 'var(--color-destructive, #DC2626)',  Icon: TrendingDown, bg: '#FEE2E2' },
  neutral: { color: 'var(--color-text-tertiary, #828282)', Icon: Minus,       bg: '#F7F7F7' },
};

export const CardMetric = forwardRef<HTMLDivElement, CardMetricProps>(({
  label,
  value,
  unit,
  trend,
  trendValue,
  trendLabel,
  icon,
  accentColor = 'var(--color-brand-primary, #F57E20)',
  description,
  onMoreClick,
  chart,
  footerAction,
  floatingIcon,
  style,
  ...props
}, ref) => {
  const tm = trend ? TREND_META[trend] : null;
  const TrendIcon = tm?.Icon;

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-container-secondary, #F7F7F7)',
        borderRadius: 8,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        boxSizing: 'border-box',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        ...style,
      }}
      {...props}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <p style={{
          margin: 0,
          flex: 1,
          fontFamily: 'var(--font-family-body)',
          fontWeight: 500,
          fontSize: 13,
          lineHeight: '19.2px',
          color: 'var(--color-text-secondary, #49494A)',
          letterSpacing: '-0.01px',
        }}>
          {label}
        </p>
        {icon && (
          <div style={{
            width: 36, height: 36, borderRadius: 8, flexShrink: 0,
            backgroundColor: `${accentColor}18`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: accentColor,
          }}>
            {icon}
          </div>
        )}
        {onMoreClick && (
          <button
            type="button"
            onClick={onMoreClick}
            aria-label="More options"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 24, height: 24, flexShrink: 0,
              border: 'none', borderRadius: 8, padding: 0,
              backgroundColor: 'transparent', cursor: 'pointer',
              color: 'var(--color-text-tertiary, #828282)',
            }}
          >
            <MoreHorizontal size={14} />
          </button>
        )}
      </div>

      {/* Value */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{
          fontFamily: 'var(--font-family-heading, Rubik, sans-serif)',
          fontWeight: 700,
          fontSize: 25,
          lineHeight: '30px',
          color: 'var(--color-text-primary, #14141E)',
          letterSpacing: '-0.01px',
        }}>
          {value}
        </span>
        {unit && (
          <span style={{
            fontFamily: 'var(--font-family-body)',
            fontWeight: 400,
            fontSize: 16,
            color: 'var(--color-text-secondary, #49494A)',
          }}>
            {unit}
          </span>
        )}
      </div>

      {/* Trend + description */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {tm && TrendIcon && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '2px 6px', borderRadius: 9999,
            backgroundColor: tm.bg,
          }}>
            <TrendIcon size={14} color={tm.color} />
            {trendValue && (
              <span style={{
                fontFamily: 'var(--font-family-body)',
                fontWeight: 400,
                fontSize: 10,
                color: tm.color,
              }}>
                {trendValue}
              </span>
            )}
          </div>
        )}
        {(trendLabel || description) && (
          <span style={{
            fontFamily: 'var(--font-family-body)',
            fontWeight: 400,
            fontSize: 13,
            color: 'var(--color-text-tertiary, #828282)',
            lineHeight: '19.2px',
          }}>
            {trendLabel ?? description}
          </span>
        )}
      </div>

      {chart && (
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '0.5px solid var(--color-stroke-subtle, #D7D7D7)',
          borderRadius: 12,
          height: 210,
          boxSizing: 'border-box',
        }}>
          {chart}
        </div>
      )}

      {footerAction && (
        <>
          <div style={{ borderTop: '1px dashed var(--color-stroke-subtle, #D7D7D7)' }} />
          <button
            type="button"
            onClick={footerAction.onClick}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', border: 'none', background: 'transparent', padding: 0,
              cursor: 'pointer',
              fontFamily: 'var(--font-family-body)',
              fontWeight: 400,
              fontSize: 13,
              lineHeight: '19.2px',
              color: 'var(--color-text-secondary, #49494A)',
              letterSpacing: '-0.01px',
            }}
          >
            {footerAction.label}
            <ArrowRight size={14} />
          </button>
        </>
      )}

      {floatingIcon && (
        <div style={{
          position: 'absolute',
          top: -9, right: -9,
          width: 64, height: 64,
          borderRadius: 9999,
          backgroundColor: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(2px)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          padding: 20,
          boxSizing: 'border-box',
          color: 'var(--color-text-tertiary, #828282)',
        }}>
          {floatingIcon}
        </div>
      )}
    </div>
  );
});

CardMetric.displayName = 'CardMetric';

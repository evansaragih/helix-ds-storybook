import { forwardRef } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export type MetricTrend = 'up' | 'down' | 'neutral';

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
  style,
  ...props
}, ref) => {
  const tm = trend ? TREND_META[trend] : null;
  const TrendIcon = tm?.Icon;

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: 'var(--color-container-secondary, #F7F7F7)',
        borderRadius: 8,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        boxSizing: 'border-box',
        boxShadow: 'var(--shadow-sm)',
        ...style,
      }}
      {...props}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <p style={{
          margin: 0,
          fontFamily: 'Rubik, sans-serif',
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
            fontFamily: 'Rubik, sans-serif',
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
                fontFamily: 'Rubik, sans-serif',
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
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 400,
            fontSize: 13,
            color: 'var(--color-text-tertiary, #828282)',
            lineHeight: '19.2px',
          }}>
            {trendLabel ?? description}
          </span>
        )}
      </div>
    </div>
  );
});

CardMetric.displayName = 'CardMetric';

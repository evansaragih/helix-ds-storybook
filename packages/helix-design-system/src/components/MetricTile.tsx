import { forwardRef } from 'react';
import { IconTile } from './IconTile';
import { Badge } from './Badge';
import type { BadgeColor } from './Badge';

export type MetricTileVariant = 'simple' | 'with-footer' | 'detailed';

export interface MetricTileProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** simple = header + value; with-footer = value + footer row; detailed = wide tile with extra content and footer */
  variant?: MetricTileVariant;
  /** Icon in the leading tile of the header */
  icon?: React.ReactNode;
  label: React.ReactNode;
  /** Trailing header slot — e.g. an IconButton opening a menu */
  headerAction?: React.ReactNode;
  value: React.ReactNode;
  /** Change indicator next to the value, e.g. { label: '+4.2%', color: 'success' } */
  delta?: { label: string; color?: BadgeColor };
  /** Small caption under the value, e.g. "vs February 2026" */
  comparison?: React.ReactNode;
  /** Sparkline or small chart shown to the right of the value */
  graph?: React.ReactNode;
  /** Content below the value row (detailed): a divider, comparison title and larger chart */
  children?: React.ReactNode;
  /** Footer row (with-footer) or grey footer band (detailed) */
  footer?: React.ReactNode;
}

/** A KPI tile: a labelled value with an optional change badge, comparison caption, graph and footer. Replaces the older CardMetric. */
export const MetricTile = forwardRef<HTMLDivElement, MetricTileProps>(({
  variant = 'simple',
  icon,
  label,
  headerAction,
  value,
  delta,
  comparison,
  graph,
  children,
  footer,
  style,
  ...props
}, ref) => {
  const detailed = variant === 'detailed';
  const border = '1px solid var(--color-stroke-subtle, #EEEEEE)';

  const header = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 12px 8px', ...(detailed ? { borderBottom: border } : {}) }}>
      {icon && <IconTile size="xs" icon={icon} />}
      <span style={{ flex: 1, fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 13, lineHeight: '19.2px', color: 'var(--color-text-secondary, #49494A)' }}>{label}</span>
      {headerAction}
    </div>
  );

  const valueRow = (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontFamily: 'var(--font-family-heading, Rubik, sans-serif)', fontWeight: 700, fontSize: 31, lineHeight: '38px', color: 'var(--color-text-primary, #14141E)' }}>{value}</span>
          {delta && <Badge size="xs" color={delta.color ?? 'success'} appearance="solid" label={delta.label} />}
        </div>
        {comparison && <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 10, lineHeight: '16px', color: 'var(--color-text-tertiary, #828282)' }}>{comparison}</span>}
      </div>
      {graph && <div style={{ flexShrink: 0 }}>{graph}</div>}
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        display: 'flex', flexDirection: 'column', boxSizing: 'border-box', borderRadius: 12, border,
        backgroundColor: detailed ? 'var(--color-container-primary, #FFFFFF)' : 'var(--color-container-secondary, #F7F7F7)',
        overflow: 'hidden',
        ...style,
      }}
      {...props}
    >
      {(variant === 'simple' || detailed) && header}
      <div style={{ padding: detailed ? 0 : 2, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 12, borderRadius: detailed ? 0 : 12, backgroundColor: 'var(--color-container-primary, #FFFFFF)' }}>
          {variant === 'with-footer' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {icon && <IconTile size="xs" icon={icon} />}
              <span style={{ flex: 1, fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 13, lineHeight: '19.2px', color: 'var(--color-text-secondary, #49494A)' }}>{label}</span>
              {headerAction}
            </div>
          )}
          {valueRow}
          {children}
        </div>
      </div>
      {footer && (
        <div style={{ padding: 12, ...(detailed ? { backgroundColor: 'var(--color-container-secondary, #F7F7F7)', borderTop: border } : {}) }}>
          {footer}
        </div>
      )}
    </div>
  );
});

MetricTile.displayName = 'MetricTile';

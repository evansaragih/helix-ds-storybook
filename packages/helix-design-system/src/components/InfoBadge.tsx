import { forwardRef } from 'react';
import { IconTile } from './IconTile';

export type InfoBadgeAppearance = 'snippet-card' | 'meta-badge' | 'info-pill' | 'reference-card';

export interface InfoBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  appearance?: InfoBadgeAppearance;
  icon?: React.ReactNode;
  label: React.ReactNode;
  value: React.ReactNode;
}

const TINT = 'var(--color-brand-primary-subtle-hover, #FFE1C9)';
const BORDER = '1px solid var(--color-stroke-subtle, #EEEEEE)';
const MUTED_BORDER = '1px solid rgba(255,255,255,0.2)';

const labelStyle: React.CSSProperties = { fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 16, lineHeight: '24px', color: 'var(--color-brand-secondary, #58595B)' };
const valueStyle: React.CSSProperties = { fontFamily: 'var(--font-family-body)', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: 'var(--color-text-primary, #14141E)' };

/** A compact label/value highlight with a leading icon — for IDs, references and metadata. Use LabelValue for plain read-only data. */
export const InfoBadge = forwardRef<HTMLDivElement, InfoBadgeProps>(({
  appearance = 'snippet-card',
  icon,
  label,
  value,
  style,
  ...props
}, ref) => {
  const tile = <IconTile size={appearance === 'snippet-card' ? 'md' : 'xs'} appearance="subtle" icon={icon} />;

  if (appearance === 'snippet-card') {
    return (
      <div ref={ref} style={{ display: 'inline-block', borderRadius: 12, border: BORDER, backgroundColor: '#FFFFFF', ...style }} {...props}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12 }}>
          {tile}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={labelStyle}>{label}</span>
            <span style={valueStyle}>{value}</span>
          </div>
        </div>
      </div>
    );
  }

  if (appearance === 'meta-badge') {
    return (
      <div ref={ref} style={{ display: 'inline-block', borderRadius: 12, border: MUTED_BORDER, ...style }} {...props}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12, backgroundColor: TINT }}>
          {tile}
          <span style={{ display: 'flex', gap: 8 }}><span style={labelStyle}>{label}</span><span style={valueStyle}>{value}</span></span>
        </div>
      </div>
    );
  }

  if (appearance === 'info-pill') {
    return (
      <div ref={ref} style={{ display: 'inline-block', borderRadius: 12, border: MUTED_BORDER, ...style }} {...props}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '2px 2px 2px 12px', borderRadius: 12, backgroundColor: TINT }}>
          {tile}
          <span style={labelStyle}>{label}</span>
          <span style={{ padding: '8px 12px', borderRadius: 12, backgroundColor: '#FFFFFF', ...valueStyle }}>{value}</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ display: 'inline-flex', flexDirection: 'column', borderRadius: 12, border: MUTED_BORDER, backgroundColor: 'var(--color-brand-primary, #F57E20)', ...style }} {...props}>
      <div style={{ padding: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12, backgroundColor: '#FFFFFF' }}>
          {tile}
          <span style={labelStyle}>{label}</span>
        </div>
      </div>
      <div style={{ padding: 12, ...valueStyle, color: 'var(--color-text-on-primary, #FFFFFF)' }}>{value}</div>
    </div>
  );
});

InfoBadge.displayName = 'InfoBadge';

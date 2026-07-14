import { forwardRef } from 'react';

export type ProgressLabelType = 'none' | 'title' | 'trailing' | 'top-floating' | 'bottom-floating' | 'within';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;       // 0–100
  max?: number;
  labelType?: ProgressLabelType;
  label?: string;      // used as title when labelType='title'
  color?: string;      // track fill color
  trackColor?: string; // background track color
  height?: number;     // track height in px
  animated?: boolean;
  showPercent?: boolean;
}

function clamp(v: number, min = 0, max = 100) {
  return Math.min(Math.max(v, min), max);
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(({
  value,
  max = 100,
  labelType = 'none',
  label,
  color = 'var(--color-brand-primary, #F57E20)',
  trackColor = 'var(--color-container-tertiary, #EEEEEE)',
  height = 8,
  animated = false,
  showPercent = true,
  style,
  className,
  ...props
}, ref) => {
  const pct = clamp((value / max) * 100);
  const pctStr = `${Math.round(pct)}%`;

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 400,
    fontSize: 13,
    lineHeight: '19.2px',
    color: 'var(--color-text-primary, #14141E)',
    letterSpacing: '-0.01px',
    whiteSpace: 'nowrap',
  };

  const track = (
    <div style={{
      width: '100%',
      height,
      borderRadius: 9999,
      backgroundColor: trackColor,
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{
        height: '100%',
        width: pctStr,
        borderRadius: 9999,
        backgroundColor: color,
        transition: animated ? 'width 0.4s ease' : 'none',
        position: 'relative',
      }}>
        {labelType === 'within' && pct > 8 && showPercent && (
          <span style={{
            ...labelStyle,
            position: 'absolute',
            right: 6,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 10,
            lineHeight: '15.6px',
            color: '#FFFFFF',
            fontWeight: 400,
          }}>
            {pctStr}
          </span>
        )}
      </div>
    </div>
  );

  if (labelType === 'none') {
    return (
      <div ref={ref} style={{ width: '100%', ...style }} className={className} {...props}>
        {track}
      </div>
    );
  }

  if (labelType === 'title') {
    return (
      <div ref={ref} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8, ...style }} className={className} {...props}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          {label && <span style={labelStyle}>{label}</span>}
          {showPercent && <span style={labelStyle}>{pctStr}</span>}
        </div>
        {track}
      </div>
    );
  }

  if (labelType === 'trailing') {
    return (
      <div ref={ref} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, ...style }} className={className} {...props}>
        <div style={{ flex: 1 }}>{track}</div>
        {showPercent && <span style={{ ...labelStyle, flexShrink: 0, textAlign: 'right', minWidth: 42 }}>{pctStr}</span>}
      </div>
    );
  }

  if (labelType === 'top-floating') {
    return (
      <div ref={ref} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8, ...style }} className={className} {...props}>
        {showPercent && (
          <div style={{ display: 'flex' }}>
            <span style={{
              fontFamily: 'Rubik, sans-serif',
              fontWeight: 400,
              fontSize: 10,
              lineHeight: '15.6px',
              color: 'var(--color-text-primary, #14141E)',
              letterSpacing: '-0.01px',
              whiteSpace: 'nowrap',
              padding: '2px 6px',
              borderRadius: 9999,
              border: '0.5px solid var(--color-stroke-subtle, #D7D7D7)',
              backgroundColor: 'var(--color-container-primary, #FFFFFF)',
            }}>
              {pctStr}
            </span>
          </div>
        )}
        {track}
      </div>
    );
  }

  if (labelType === 'bottom-floating') {
    return (
      <div ref={ref} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8, ...style }} className={className} {...props}>
        {track}
        {showPercent && (
          <div style={{ display: 'flex' }}>
            <span style={{
              fontFamily: 'Rubik, sans-serif',
              fontWeight: 400,
              fontSize: 10,
              lineHeight: '15.6px',
              color: 'var(--color-text-primary, #14141E)',
              letterSpacing: '-0.01px',
              whiteSpace: 'nowrap',
              padding: '2px 6px',
              borderRadius: 9999,
              border: '0.5px solid var(--color-stroke-subtle, #D7D7D7)',
              backgroundColor: 'var(--color-container-primary, #FFFFFF)',
            }}>
              {pctStr}
            </span>
          </div>
        )}
      </div>
    );
  }

  // within — rendered above in track
  return (
    <div ref={ref} style={{ width: '100%', ...style }} className={className} {...props}>
      {track}
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

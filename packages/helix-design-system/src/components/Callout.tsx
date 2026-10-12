import { forwardRef } from 'react';
import { CircleCheck, CircleAlert, Info, TriangleAlert } from 'lucide-react';
import { IconTile } from './IconTile';
import type { IconTileColor } from './IconTile';

export type CalloutType = 'error' | 'warning' | 'info' | 'success' | 'neutral';
export type CalloutSize = 'sm' | 'md';

export interface CalloutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  type?: CalloutType;
  size?: CalloutSize;
  /** Omit for a description-only callout */
  title?: React.ReactNode;
  /** Omit for a title-only callout */
  description?: React.ReactNode;
  /** Override the type's default icon */
  icon?: React.ReactNode;
  /** Trailing slot, e.g. an action Button */
  trailing?: React.ReactNode;
}

const TYPES: Record<CalloutType, { bg: string; tile: IconTileColor; Icon: React.ComponentType<{ size?: number | string }> }> = {
  error:   { bg: 'var(--color-status-error-bg, #FEE2E2)',   tile: 'destructive', Icon: CircleAlert },
  warning: { bg: 'var(--color-status-warning-bg, #FEF5E7)', tile: 'warning',     Icon: TriangleAlert },
  info:    { bg: 'var(--color-status-info-bg, #EBF2FE)',    tile: 'info',        Icon: Info },
  success: { bg: 'var(--color-status-success-bg, #E9F9EF)', tile: 'success',     Icon: CircleCheck },
  neutral: { bg: 'var(--color-stroke-disabled, #D7D7D7)',    tile: 'neutral',     Icon: Info },
};

const SIZES = {
  sm: { pad: 12, gap: 8,  rowGap: 2, tile: 'xs' as const, indent: 26, font: 13, line: '19.2px', iconPx: 14 },
  md: { pad: 16, gap: 12, rowGap: 4, tile: 'sm' as const, indent: 38, font: 16, line: '24px',   iconPx: 20 },
};

/** A static explainer box that stays part of the page content and never auto-dismisses. Use to explain why something is the way it is; use Alert for messages that need attention or dismissal. */
export const Callout = forwardRef<HTMLDivElement, CalloutProps>(({
  type = 'info',
  size = 'md',
  title,
  description,
  icon,
  trailing,
  style,
  ...props
}, ref) => {
  const t = TYPES[type];
  const s = SIZES[size];
  const IconEl = t.Icon;
  const text = (weight: number, color: string): React.CSSProperties => ({
    margin: 0, fontFamily: 'var(--font-family-body)', fontWeight: weight,
    fontSize: s.font, lineHeight: s.line, letterSpacing: '-0.01px', color,
  });

  return (
    <div
      ref={ref}
      role={type === 'error' ? 'alert' : 'note'}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: s.gap,
        padding: s.pad,
        borderRadius: 8,
        boxSizing: 'border-box',
        width: '100%',
        backgroundColor: t.bg,
        ...style,
      }}
      {...props}
    >
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: s.rowGap }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: s.gap }}>
          <IconTile size={s.tile} shape="circle" color={t.tile} icon={icon ?? <IconEl size={s.iconPx} />} />
          {title && <p style={text(500, 'var(--color-text-primary, #14141E)')}>{title}</p>}
        </div>
        {description && (
          <div style={{ display: 'flex', gap: s.gap }}>
            <span style={{ width: s.indent, flexShrink: 0 }} />
            <p style={text(400, 'var(--color-text-secondary, #49494A)')}>{description}</p>
          </div>
        )}
      </div>
      {trailing && <div style={{ flexShrink: 0 }}>{trailing}</div>}
    </div>
  );
});

Callout.displayName = 'Callout';

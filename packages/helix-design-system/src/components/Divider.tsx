import { forwardRef } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerType = 'line' | 'dash';
export type DividerLabelAlign = 'left' | 'center' | 'right';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  type?: DividerType;
  /** Optional label — only for horizontal dividers */
  label?: string;
  labelAlign?: DividerLabelAlign;
  color?: string;
  thickness?: number;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(({
  orientation = 'horizontal',
  type = 'line',
  label,
  labelAlign = 'center',
  color = 'var(--color-stroke-subtle, #D7D7D7)',
  thickness = 1,
  style,
  className,
  ...props
}, ref) => {
  const lineStyle: React.CSSProperties =
    type === 'dash'
      ? { borderStyle: 'dashed', borderColor: color }
      : { borderStyle: 'solid', borderColor: color };

  if (orientation === 'vertical') {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: 'inline-block',
          width: thickness,
          alignSelf: 'stretch',
          borderLeft: `${thickness}px ${lineStyle.borderStyle} ${lineStyle.borderColor}`,
          flexShrink: 0,
          ...style,
        }}
        role="separator"
        aria-orientation="vertical"
        {...props}
      />
    );
  }

  if (label) {
    const leftFlex = labelAlign === 'left' ? '0 0 16px' : labelAlign === 'right' ? '1' : '1';
    const rightFlex = labelAlign === 'right' ? '0 0 16px' : labelAlign === 'left' ? '1' : '1';
    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          ...style,
        }}
        role="separator"
        aria-orientation="horizontal"
        {...props}
      >
        <span style={{ flex: leftFlex, borderBottom: `${thickness}px ${lineStyle.borderStyle} ${lineStyle.borderColor}` }} />
        <span style={{
          fontFamily: 'var(--font-family-body)',
          fontSize: 12,
          lineHeight: '18px',
          color: 'var(--color-text-tertiary, #828282)',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {label}
        </span>
        <span style={{ flex: rightFlex, borderBottom: `${thickness}px ${lineStyle.borderStyle} ${lineStyle.borderColor}` }} />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        width: '100%',
        borderBottom: `${thickness}px ${lineStyle.borderStyle} ${lineStyle.borderColor}`,
        flexShrink: 0,
        ...style,
      }}
      role="separator"
      aria-orientation="horizontal"
      {...props}
    />
  );
});

Divider.displayName = 'Divider';

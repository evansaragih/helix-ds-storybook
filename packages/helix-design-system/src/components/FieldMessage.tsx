import { forwardRef } from 'react';
import { Info, CircleAlert } from 'lucide-react';

export type FieldMessageState = 'default' | 'error';
/** Figma Size — Medium 13px · Small 10px */
export type FieldMessageSize = 'md' | 'sm';

export interface FieldMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: FieldMessageState;
  size?: FieldMessageSize;
  /** Show the leading icon (Figma Show Icon, default true) */
  showIcon?: boolean;
  children: React.ReactNode;
}

/** A hint or error message shown under a form control. */
export const FieldMessage = forwardRef<HTMLDivElement, FieldMessageProps>(({
  state = 'default',
  size = 'md',
  showIcon = true,
  children,
  style,
  ...props
}, ref) => {
  const error = state === 'error';
  const icon = size === 'md' ? 14 : 12;
  return (
    <div
      ref={ref}
      role={error ? 'alert' : undefined}
      style={{
        display: 'flex', alignItems: 'center', gap: 4,
        fontFamily: 'var(--font-family-body)', fontSize: size === 'md' ? 13 : 10, lineHeight: size === 'md' ? '20px' : '15.6px',
        letterSpacing: '-0.01px',
        color: error ? 'var(--color-text-error, #DC2626)' : 'var(--color-text-muted, #9F9F9F)',
        ...style,
      }}
      {...props}
    >
      {showIcon && (
        <span style={{ display: 'flex', flexShrink: 0, color: error ? 'var(--color-icon-error, #EF4444)' : 'var(--color-icon-on-surface-neutral, #393A3B)' }}>
          {error ? <CircleAlert size={icon} /> : <Info size={icon} />}
        </span>
      )}
      <span>{children}</span>
    </div>
  );
});

FieldMessage.displayName = 'FieldMessage';

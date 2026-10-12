import { forwardRef } from 'react';
import { Info } from 'lucide-react';

export type FieldSize = 'sm' | 'md';

export interface FieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  heading: React.ReactNode;
  /** Muted description line under the heading */
  supportingText?: React.ReactNode;
  /** Show the required asterisk next to the heading */
  required?: boolean;
  /** Show an info icon next to the heading. Pass a node to supply a custom icon/tooltip trigger. */
  info?: boolean | React.ReactNode;
  /** Counter text on the right of the heading, e.g. "2 selected" */
  counter?: React.ReactNode;
  /** Action on the right of the heading, e.g. a text Button ("Clear") */
  trailingAction?: React.ReactNode;
  /** Error message shown under the items */
  error?: React.ReactNode;
  /** sm / md — scales the gap between heading and items. Nested controls take their own size. */
  size?: FieldSize;
  /** The group of form controls (Checkbox / RadioButton / Input / Switch) */
  children: React.ReactNode;
}

/** A heading plus a stack of form controls grouped under one scannable header, with optional supporting text, counter, trailing action and error message. */
export const Field = forwardRef<HTMLDivElement, FieldProps>(({
  heading,
  supportingText,
  required = false,
  info = false,
  counter,
  trailingAction,
  error,
  size = 'md',
  children,
  style,
  ...props
}, ref) => {
  const text = (size: number, line: string, weight: number, color: string): React.CSSProperties => ({
    margin: 0, fontFamily: 'var(--font-family-body)', fontWeight: weight, fontSize: size,
    lineHeight: line, letterSpacing: '-0.01px', color,
  });
  const muted = 'var(--color-text-muted, #9F9F9F)';
  const gap = size === 'sm' ? 8 : 12;

  return (
    <div ref={ref} role="group" style={{ display: 'flex', flexDirection: 'column', gap, ...style }} {...props}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <p style={text(16, '24px', 500, muted)}>{heading}</p>
            {required && <span aria-hidden="true" style={text(16, '24px', 500, 'var(--color-destructive, #DC2626)')}>*</span>}
            {info && (
              <span style={{ display: 'flex', alignItems: 'center', marginLeft: 4, color: muted }}>
                {info === true ? <Info size={14} /> : info}
              </span>
            )}
          </div>
          {(counter || trailingAction) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {counter && <p style={text(16, '24px', 500, muted)}>{counter}</p>}
              {trailingAction}
            </div>
          )}
        </div>
        {supportingText && <p style={text(13, '19.2px', 400, muted)}>{supportingText}</p>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap }}>{children}</div>
      {error && <p role="alert" style={text(13, '19.2px', 400, 'var(--color-text-error, #DC2626)')}>{error}</p>}
    </div>
  );
});

Field.displayName = 'Field';

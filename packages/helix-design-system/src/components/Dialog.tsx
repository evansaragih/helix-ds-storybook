import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { forwardRef } from 'react';

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /** sm=384px  md=480px  lg=600px */
  size?: 'sm' | 'md' | 'lg';
  showClose?: boolean;
}

const WIDTHS = { sm: 384, md: 480, lg: 600 };

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  size = 'md',
  showClose = true,
}, ref) => {
  return (
    <RadixDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && (
        <RadixDialog.Trigger asChild>
          {trigger}
        </RadixDialog.Trigger>
      )}
      <RadixDialog.Portal>
        {/* Overlay */}
        <RadixDialog.Overlay
          className="helix-dialog-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--color-overlay-black, rgba(0,0,0,0.5))',
            zIndex: 9998,
            backdropFilter: 'blur(2px)',
          }}
        />
        {/* Content — animation keyed off [data-state] lives in theme.css:
            Radix's Presence waits for a real CSS animation to finish before
            unmounting on close, which inline styles can't express since we
            don't control the data-state attribute Radix sets. */}
        <RadixDialog.Content
          ref={ref}
          className="helix-dialog-content"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: `min(${WIDTHS[size]}px, calc(100vw - 32px))`,
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg, 8px)',
            boxShadow: 'var(--shadow-md)',
            zIndex: 9999,
            outline: 'none',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          {(title || description || showClose) && (
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              padding: '20px 24px 16px',
              borderBottom: title || description
                ? '1px solid var(--color-stroke-subtle, #EEEEEE)'
                : 'none',
              gap: 12,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                {title && (
                  <RadixDialog.Title style={{
                    margin: 0,
                    fontFamily: 'Rubik, sans-serif',
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: '24px',
                    color: 'var(--color-text-primary, #14141E)',
                    letterSpacing: '-0.01px',
                  }}>
                    {title}
                  </RadixDialog.Title>
                )}
                {description && (
                  <RadixDialog.Description style={{
                    margin: title ? '4px 0 0' : 0,
                    fontFamily: 'Rubik, sans-serif',
                    fontWeight: 400,
                    fontSize: 13,
                    lineHeight: '19.2px',
                    color: 'var(--color-text-secondary, #49494A)',
                    letterSpacing: '-0.01px',
                  }}>
                    {description}
                  </RadixDialog.Description>
                )}
              </div>
              {showClose && (
                <RadixDialog.Close
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    color: 'var(--color-text-tertiary, #828282)',
                    flexShrink: 0,
                    outline: 'none',
                  }}
                >
                  <X size={14} strokeWidth={2} />
                </RadixDialog.Close>
              )}
            </div>
          )}

          {/* Body */}
          {children && (
            <div style={{ padding: '16px 24px' }}>
              {children}
            </div>
          )}

          {/* Footer */}
          {footer && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 8,
              padding: '12px 24px 20px',
              borderTop: '1px solid var(--color-stroke-subtle, #EEEEEE)',
            }}>
              {footer}
            </div>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
});

Dialog.displayName = 'Dialog';

import { forwardRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { MOTION_DURATION_SLOW } from './motion';

export type SheetSide = 'right' | 'left' | 'top' | 'bottom';

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  side?: SheetSide;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /** Width for left/right sheets, height for top/bottom */
  size?: number | string;
  closeOnOverlayClick?: boolean;
}

const SIDE_STYLES: Record<SheetSide, React.CSSProperties> = {
  right:  { right: 0, top: 0, bottom: 0, width: 384 },
  left:   { left: 0, top: 0, bottom: 0, width: 384 },
  top:    { top: 0, left: 0, right: 0, height: 320 },
  bottom: { bottom: 0, left: 0, right: 0, height: 320 },
};

const HIDDEN_TRANSFORM: Record<SheetSide, string> = {
  right:  'translateX(100%)',
  left:   'translateX(-100%)',
  top:    'translateY(-100%)',
  bottom: 'translateY(100%)',
};

const EASING = 'var(--motion-easing-decelerate, cubic-bezier(0.32, 0.72, 0, 1))';
const DURATION = MOTION_DURATION_SLOW;

export const Sheet = forwardRef<HTMLDivElement, SheetProps>(({
  open,
  onClose,
  side = 'right',
  title,
  description,
  children,
  footer,
  size,
  closeOnOverlayClick = true,
}, ref) => {
  const [isMounted, setIsMounted] = useState(open);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      // Two rAFs ensure the initial hidden transform is painted before we transition to visible
      requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)));
    } else {
      setIsVisible(false);
      const t = setTimeout(() => setIsMounted(false), DURATION);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!isMounted) return null;

  const sideStyle = { ...SIDE_STYLES[side] };
  if (size !== undefined) {
    if (side === 'left' || side === 'right') sideStyle.width = size;
    else sideStyle.height = size;
  }

  const borderRadius = 0;

  return (
    <div
      onClick={closeOnOverlayClick ? (e) => { if (e.target === e.currentTarget) onClose(); } : undefined}
      style={{
        position: 'fixed', inset: 0, zIndex: 900,
        backgroundColor: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(2px)',
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${DURATION}ms var(--motion-easing-standard, ease)`,
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'sheet-title' : undefined}
        style={{
          position: 'fixed',
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 24px 48px rgba(0,0,0,0.12)',
          borderRadius,
          display: 'flex',
          flexDirection: 'column',
          transform: isVisible ? 'translate(0, 0)' : HIDDEN_TRANSFORM[side],
          transition: `transform ${DURATION}ms ${EASING}`,
          willChange: 'transform',
          ...sideStyle,
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          padding: '24px 24px 16px',
          borderBottom: (children || footer) ? '1px solid var(--color-stroke-subtle, #EEEEEE)' : 'none',
          flexShrink: 0,
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {title && (
              <h2 id="sheet-title" style={{
                margin: 0,
                fontFamily: 'var(--font-family-heading, Rubik, sans-serif)',
                fontWeight: 500,
                fontSize: 16,
                lineHeight: '24px',
                color: 'var(--color-text-primary, #14141E)',
              }}>
                {title}
              </h2>
            )}
            {description && (
              <p style={{
                margin: title ? '4px 0 0' : 0,
                fontFamily: 'var(--font-family-body)',
                fontWeight: 400,
                fontSize: 13,
                lineHeight: '19.2px',
                color: 'var(--color-text-secondary, #49494A)',
              }}>
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32, flexShrink: 0,
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              color: 'var(--color-text-secondary, #49494A)',
              marginLeft: 12,
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        {children && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--color-stroke-subtle, #EEEEEE)',
            flexShrink: 0,
            display: 'flex',
            gap: 8,
            justifyContent: 'flex-end',
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
});

Sheet.displayName = 'Sheet';

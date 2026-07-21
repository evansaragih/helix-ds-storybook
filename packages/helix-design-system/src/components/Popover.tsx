import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { MOTION_DURATION_BASE } from './motion';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

export interface PopoverProps {
  /** The trigger element */
  trigger: React.ReactNode;
  /** Content rendered inside the popover */
  children: React.ReactNode;
  placement?: PopoverPlacement;
  /** Width of the popover panel */
  width?: number | string;
  /** Close when clicking outside */
  closeOnOutsideClick?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const OFFSET = 8;

function getPlacementStyle(placement: PopoverPlacement): React.CSSProperties {
  switch (placement) {
    case 'top':         return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: OFFSET };
    case 'top-start':   return { bottom: '100%', left: 0, marginBottom: OFFSET };
    case 'top-end':     return { bottom: '100%', right: 0, marginBottom: OFFSET };
    case 'bottom':      return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: OFFSET };
    case 'bottom-start':return { top: '100%', left: 0, marginTop: OFFSET };
    case 'bottom-end':  return { top: '100%', right: 0, marginTop: OFFSET };
    case 'left':        return { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: OFFSET };
    case 'right':       return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: OFFSET };
    default:            return { top: '100%', left: 0, marginTop: OFFSET };
  }
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(({
  trigger,
  children,
  placement = 'bottom-start',
  width = 300,
  closeOnOutsideClick = true,
  open: controlledOpen,
  onOpenChange,
}, ref) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)));
    } else {
      setIsVisible(false);
      const t = setTimeout(() => setIsMounted(false), MOTION_DURATION_BASE);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const setOpen = useCallback((v: boolean) => {
    if (!isControlled) setInternalOpen(v);
    onOpenChange?.(v);
  }, [isControlled, onOpenChange]);

  useEffect(() => {
    if (!closeOnOutsideClick || !isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, closeOnOutsideClick, setOpen]);

  const { transform: placementTransform, ...placementRest } = getPlacementStyle(placement);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <div onClick={() => setOpen(!isOpen)} style={{ cursor: 'pointer' }}>
        {trigger}
      </div>

      {isMounted && (
        <div
          ref={ref}
          role="dialog"
          style={{
            position: 'absolute',
            zIndex: 200,
            width,
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
            borderRadius: 'var(--radius-lg, 8px)',
            boxShadow: '0px 8px 24px rgba(0,0,0,0.10), 0px 2px 8px rgba(0,0,0,0.06)',
            overflow: 'hidden',
            opacity: isVisible ? 1 : 0,
            transform: [placementTransform, isVisible ? 'scale(1)' : 'scale(0.96)'].filter(Boolean).join(' '),
            transition: `opacity var(--motion-duration-base, ${MOTION_DURATION_BASE}ms) var(--motion-easing-standard, ease), transform var(--motion-duration-base, ${MOTION_DURATION_BASE}ms) var(--motion-easing-standard, ease)`,
            ...placementRest,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
});

Popover.displayName = 'Popover';

export interface PopoverHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export function PopoverHeader({ title, description, style, ...props }: PopoverHeaderProps) {
  return (
    <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--color-stroke-subtle, #EEEEEE)', ...style }} {...props}>
      <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 13, color: 'var(--color-text-primary, #14141E)', lineHeight: '19.2px' }}>
        {title}
      </p>
      {description && (
        <p style={{ margin: '2px 0 0', fontFamily: 'var(--font-family-body)', fontWeight: 400, fontSize: 12, color: 'var(--color-text-tertiary, #828282)', lineHeight: '18px' }}>
          {description}
        </p>
      )}
    </div>
  );
}

export function PopoverBody({ children, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div style={{ padding: '12px 16px', ...style }} {...props}>
      {children}
    </div>
  );
}

export function PopoverFooter({ children, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div style={{ padding: '12px 16px', borderTop: '1px solid var(--color-stroke-subtle, #EEEEEE)', display: 'flex', gap: 8, justifyContent: 'flex-end', ...style }} {...props}>
      {children}
    </div>
  );
}

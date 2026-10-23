import { forwardRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { playNotificationSound } from './notificationSound';
import { MOTION_DURATION_BASE } from './motion';

/** Figma Position */
export type ToastrPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface ToastrProps {
  open: boolean;
  /** Called on Escape. The page behind stays interactive, so wire your own dismiss / auto-close too. */
  onClose: () => void;
  position?: ToastrPosition;
  /** The toast — an Alert, usually layout 'compact' (Figma Toast Content slot) */
  children: React.ReactNode;
  /** Width of the toast in px (default 600, as in Figma) */
  width?: number;
  /** Play a soft chime each time the toast opens (default true) */
  sound?: boolean;
}

/** Exit delay before unmount = the --motion-duration-base token (JS mirror in motion.ts) */
const DURATION = MOTION_DURATION_BASE;

/** A toast pinned to a viewport corner that slides and fades in and out. There is no backdrop: the page behind stays clickable. Surfaces an Alert, usually layout 'compact'; for inline page messages use Alert directly. */
export const Toastr = forwardRef<HTMLDivElement, ToastrProps>(({ open, onClose, position = 'top-right', children, width = 600, sound = true }, ref) => {
  // `mounted` keeps the toast in the DOM through its exit; `shown` drives the transition
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      if (sound) playNotificationSound();
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));   // let the hidden state paint first
      return () => cancelAnimationFrame(raf);
    }
    setShown(false);
    const t = setTimeout(() => setMounted(false), DURATION);
    return () => clearTimeout(t);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps -- chime only on open, not when `sound` changes

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!mounted || typeof document === 'undefined') return null;

  const [vertical, horizontal] = position.split('-') as ['top' | 'bottom', 'left' | 'right'];
  const offset = vertical === 'top' ? -16 : 16;   // slides in from its own edge

  return createPortal(
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1200, padding: 24, boxSizing: 'border-box', display: 'flex', pointerEvents: 'none',
        alignItems: vertical === 'top' ? 'flex-start' : 'flex-end',
        justifyContent: horizontal === 'left' ? 'flex-start' : 'flex-end',
      }}
    >
      <style>{`@media (prefers-reduced-motion: reduce){.helix-toastr{transition:opacity var(--motion-duration-base) linear !important;transform:none !important}}`}</style>
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className="helix-toastr"
        style={{
          width, maxWidth: '100%', pointerEvents: 'auto', borderRadius: 8,
          boxShadow: '0 4px 8px rgba(89,89,90,0.15), 0 12px 24px rgba(89,89,90,0.15)',
          opacity: shown ? 1 : 0,
          transform: shown ? 'translateY(0)' : `translateY(${offset}px)`,
          transition: 'opacity var(--motion-duration-base) var(--motion-easing-decelerate), transform var(--motion-duration-base) var(--motion-easing-decelerate)',
        }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
});

Toastr.displayName = 'Toastr';

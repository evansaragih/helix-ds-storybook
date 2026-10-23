import * as RadixDialog from '@radix-ui/react-dialog';
import { forwardRef } from 'react';
import { ModalHeader, MODAL_BORDER } from './ModalHeader';
import type { ModalIconStatus, ModalHeaderLayout } from './ModalHeader';

/** Figma Side */
export type SheetSide = 'left' | 'right' | 'top' | 'bottom';

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  side?: SheetSide;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Pass an icon node to show the header icon tile */
  icon?: React.ReactNode;
  iconStatus?: ModalIconStatus;
  headerLayout?: ModalHeaderLayout;
  /** Buttons beside the title */
  headerAction?: React.ReactNode;
  showClose?: boolean;
  children?: React.ReactNode;
  /** Footer content — usually FooterActions; shown on a subtle band */
  footer?: React.ReactNode;
  /** Width for left / right sheets (default 384, as in Figma); max height for top / bottom */
  size?: number | string;
  /** Close when the dimmed backdrop is clicked (default true) */
  closeOnOverlayClick?: boolean;
}

const KEYFRAMES = `
@keyframes helix-sheet-left { from { transform: translateX(-100%) } to { transform: none } }
@keyframes helix-sheet-right { from { transform: translateX(100%) } to { transform: none } }
@keyframes helix-sheet-top { from { transform: translateY(-100%) } to { transform: none } }
@keyframes helix-sheet-bottom { from { transform: translateY(100%) } to { transform: none } }
@keyframes helix-sheet-fade { from { opacity: 0 } to { opacity: 1 } }
@media (prefers-reduced-motion: reduce) { .helix-sheet, .helix-sheet-overlay { animation: none !important } }
`;

/** An edge-anchored overlay panel — a left or right side panel, or a top or bottom bar — for secondary tasks, detail views and forms that slide in while the page stays visible behind. For a centered task use Dialog. */
export const Sheet = forwardRef<HTMLDivElement, SheetProps>(({
  open,
  onClose,
  side = 'right',
  title,
  description,
  icon,
  iconStatus = 'default',
  headerLayout = 'stacked-horizontal',
  headerAction,
  showClose = true,
  children,
  footer,
  size,
  closeOnOverlayClick = true,
}, ref) => {
  const horizontal = side === 'left' || side === 'right';
  const dim = size ?? (horizontal ? 384 : undefined);

  const position: React.CSSProperties = {
    left: { top: 0, bottom: 0, left: 0, width: dim },
    right: { top: 0, bottom: 0, right: 0, width: dim },
    top: { top: 0, left: 0, right: 0, maxHeight: dim ?? '80vh' },
    bottom: { bottom: 0, left: 0, right: 0, maxHeight: dim ?? '80vh' },
  }[side];

  return (
    <RadixDialog.Root open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <RadixDialog.Portal>
        <style>{KEYFRAMES}</style>
        <RadixDialog.Overlay className="helix-sheet-overlay" style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(20,20,30,0.7)', animation: 'helix-sheet-fade var(--motion-duration-base) var(--motion-easing-standard)' }} />
        <RadixDialog.Content
          ref={ref}
          className="helix-sheet"
          onInteractOutside={(e) => { if (!closeOnOverlayClick) e.preventDefault(); }}
          style={{
            position: 'fixed', zIndex: 1001, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', maxWidth: '100vw',
            backgroundColor: 'var(--color-container-primary, #FFFFFF)', border: MODAL_BORDER, boxShadow: '0 1px 2px rgba(89,89,90,0.15)',
            animation: `helix-sheet-${side} var(--motion-duration-slow) var(--motion-easing-decelerate)`, ...position,
          }}
        >
          <ModalHeader title={title ?? 'Panel'} description={description} icon={icon} iconStatus={iconStatus} layout={headerLayout} action={headerAction} showClose={showClose} />
          {children && <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 12 }}>{children}</div>}
          {footer && <div style={{ padding: 12, backgroundColor: 'var(--color-container-secondary, #F7F7F7)', borderTop: MODAL_BORDER }}>{footer}</div>}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
});

Sheet.displayName = 'Sheet';

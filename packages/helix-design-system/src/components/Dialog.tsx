import * as RadixDialog from '@radix-ui/react-dialog';
import { forwardRef } from 'react';
import { ModalHeader, MODAL_BORDER } from './ModalHeader';
import type { ModalIconStatus, ModalHeaderLayout } from './ModalHeader';

/** Figma Icon status (_modal-header) */
export type DialogIconStatus = ModalIconStatus;
/** Figma Layout (_modal-header) */
export type DialogHeaderLayout = ModalHeaderLayout;

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** The element that opens the dialog, rendered as-is (asChild) */
  trigger?: React.ReactNode;
  /** Figma Modal title */
  title?: React.ReactNode;
  /** Figma Description */
  description?: React.ReactNode;
  /** Figma Show Icon Tile — pass an icon node to show the tile */
  icon?: React.ReactNode;
  iconStatus?: DialogIconStatus;
  headerLayout?: DialogHeaderLayout;
  /** Figma Header Trailing Content — buttons beside the title */
  headerAction?: React.ReactNode;
  /** Show the close button in the header (default true) */
  showClose?: boolean;
  /** Body content — a form, list, table or any layout */
  children?: React.ReactNode;
  /** Footer content — usually FooterActions; shown on a subtle band */
  footer?: React.ReactNode;
  /** Width of the dialog in px (default 592, as in Figma) */
  width?: number;
}

/** The general-purpose modal shell: a header (icon, title, description) with a divider, a free-form body, and an optional footer for actions. For a confirm / cancel decision use Alert Dialog. */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  icon,
  iconStatus = 'default',
  headerLayout = 'stacked-horizontal',
  headerAction,
  showClose = true,
  children,
  footer,
  width = 592,
}, ref) => (
  <RadixDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
    {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="helix-dialog-overlay" style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(20,20,30,0.7)' }} />
      <RadixDialog.Content
        ref={ref}
        className="helix-dialog-content"
        style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1001,
          width, maxWidth: 'calc(100vw - 48px)', maxHeight: 'calc(100vh - 96px)', display: 'flex', flexDirection: 'column',
          boxSizing: 'border-box', borderRadius: 12, overflow: 'hidden', border: MODAL_BORDER,
          backgroundColor: 'var(--color-container-primary, #FFFFFF)', boxShadow: '0 1px 2px rgba(89,89,90,0.15)',
        }}
      >
        <ModalHeader title={title} description={description} icon={icon} iconStatus={iconStatus} layout={headerLayout} action={headerAction} showClose={showClose} />
        {children && <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 12 }}>{children}</div>}
        {footer && <div style={{ padding: 12, backgroundColor: 'var(--color-container-secondary, #F7F7F7)', borderTop: MODAL_BORDER }}>{footer}</div>}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
));

Dialog.displayName = 'Dialog';

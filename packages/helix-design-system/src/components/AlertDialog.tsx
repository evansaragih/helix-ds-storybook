import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { forwardRef } from 'react';
import { Info, Trash2, TriangleAlert, CircleCheck } from 'lucide-react';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { FooterActions } from './FooterActions';
import { IconTile } from './IconTile';
import { STATUS_TILE } from './ModalHeader';
import type { ModalIconStatus } from './ModalHeader';

/** Figma Icon status */
export type AlertDialogIconStatus = ModalIconStatus;
/** Figma Layout */
export type AlertDialogLayout = 'stacked-left' | 'horizontal' | 'stacked-centered';

export interface AlertDialogAction {
  label: string;
  onClick: () => void;
  loading?: boolean;
}

export interface AlertDialogCheckboxAction {
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  iconStatus?: AlertDialogIconStatus;
  layout?: AlertDialogLayout;
  /** Override the status icon */
  icon?: React.ReactNode;
  /** The confirming action — a destructive button when iconStatus is 'destructive' */
  confirmAction: AlertDialogAction;
  cancelAction?: AlertDialogAction;
  /** Optional checkbox on the left of the footer, e.g. "Don't show this again" (Figma Footer Actions → Left Content) */
  checkboxAction?: AlertDialogCheckboxAction;
}

const ICONS: Record<AlertDialogIconStatus, React.ReactNode> = {
  default: <Info size={24} />,
  success: <CircleCheck size={24} />,
  warning: <TriangleAlert size={24} />,
  destructive: <Trash2 size={24} />,
  info: <Info size={24} />,
};

const BORDER = '1px solid var(--color-stroke-subtle, #EEEEEE)';

/** A modal that interrupts the flow to confirm a decision or acknowledge something important. For general content use Dialog. */
export const AlertDialog = forwardRef<HTMLDivElement, AlertDialogProps>(({
  open,
  onClose,
  title,
  description,
  iconStatus = 'default',
  layout = 'stacked-left',
  icon,
  confirmAction,
  cancelAction,
  checkboxAction,
}, ref) => {
  const horizontal = layout === 'horizontal';
  const centered = layout === 'stacked-centered';

  return (
    <RadixAlertDialog.Root open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="helix-dialog-overlay" style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(20,20,30,0.7)' }} />
        <RadixAlertDialog.Content
          ref={ref}
          className="helix-dialog-content"
          style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1001,
            width: 592, maxWidth: 'calc(100vw - 48px)', boxSizing: 'border-box', borderRadius: 12, overflow: 'hidden', border: BORDER,
            backgroundColor: 'var(--color-container-primary, #FFFFFF)', boxShadow: '0 1px 2px rgba(89,89,90,0.15)',
          }}
        >
          <div style={{
            display: 'flex', gap: 20, padding: 24,
            flexDirection: horizontal ? 'row' : 'column',
            alignItems: centered ? 'center' : 'flex-start',
            textAlign: centered ? 'center' : 'left',
          }}>
            <IconTile
              size="md"
              appearance="subtle"
              color={STATUS_TILE[iconStatus]}
              shape={horizontal ? 'square' : 'circle'}
              icon={icon ?? ICONS[iconStatus]}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
              <RadixAlertDialog.Title style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 16, lineHeight: '24px', color: 'var(--color-text-primary, #14141E)' }}>{title}</RadixAlertDialog.Title>
              {description && <RadixAlertDialog.Description style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', color: 'var(--color-text-secondary, #49494A)' }}>{description}</RadixAlertDialog.Description>}
            </div>
          </div>
          <div style={{ padding: 12, backgroundColor: 'var(--color-container-secondary, #F7F7F7)', borderTop: BORDER }}>
            <FooterActions
              leftContent={checkboxAction && <Checkbox size="sm" checked={checkboxAction.checked} onChange={checkboxAction.onChange} label={checkboxAction.label} />}
            >
              {cancelAction && <Button size="sm" hierarchy="secondary" appearance="outline" loading={cancelAction.loading} onClick={cancelAction.onClick}>{cancelAction.label}</Button>}
              <Button size="sm" hierarchy={iconStatus === 'destructive' ? 'destructive' : 'primary'} loading={confirmAction.loading} onClick={confirmAction.onClick}>{confirmAction.label}</Button>
            </FooterActions>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
});

AlertDialog.displayName = 'AlertDialog';

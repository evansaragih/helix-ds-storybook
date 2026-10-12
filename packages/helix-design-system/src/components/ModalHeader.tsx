import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { IconTile } from './IconTile';
import type { IconTileColor } from './IconTile';

/** Figma Icon status (_modal-header) */
export type ModalIconStatus = 'default' | 'success' | 'warning' | 'destructive' | 'info';
/** Figma Layout (_modal-header) */
export type ModalHeaderLayout = 'stacked-horizontal' | 'stacked-left' | 'stacked-centered';

export const STATUS_TILE: Record<ModalIconStatus, IconTileColor> = {
  default: 'neutral', success: 'success', warning: 'warning', destructive: 'destructive', info: 'info',
};

export const MODAL_BORDER = '1px solid var(--color-stroke-subtle, #EEEEEE)';

export interface ModalHeaderProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  iconStatus?: ModalIconStatus;
  layout?: ModalHeaderLayout;
  action?: React.ReactNode;
  showClose?: boolean;
}

/** Figma _modal-header — the icon tile, title, description, trailing action and close button shared by Dialog and Sheet. Must render inside a Radix Dialog. */
export function ModalHeader({ title, description, icon, iconStatus = 'default', layout = 'stacked-horizontal', action, showClose = true }: ModalHeaderProps) {
  const centered = layout === 'stacked-centered';
  const stacked = layout !== 'stacked-horizontal';
  const tile = icon && <IconTile size="md" appearance="subtle" color={STATUS_TILE[iconStatus]} icon={icon} />;
  const text = (title || description) && (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, textAlign: centered ? 'center' : 'left' }}>
      {title && <RadixDialog.Title style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 16, lineHeight: '24px', color: 'var(--color-text-primary, #14141E)' }}>{title}</RadixDialog.Title>}
      {description && <RadixDialog.Description style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', color: 'var(--color-text-secondary, #49494A)' }}>{description}</RadixDialog.Description>}
    </div>
  );
  if (!tile && !text && !action && !showClose) return null;

  return (
    <div style={{ display: 'flex', alignItems: stacked ? 'flex-start' : 'center', gap: 8, padding: '12px 12px 8px', borderBottom: MODAL_BORDER, flexShrink: 0 }}>
      <style>{'.helix-modal-close:focus-visible{box-shadow:0 0 0 3px var(--color-brand-primary-ring,rgba(245,126,32,0.7))}'}</style>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', gap: 20, flexDirection: stacked ? 'column' : 'row', alignItems: centered ? 'center' : stacked ? 'flex-start' : 'center' }}>
        {tile}{text}
      </div>
      {action && <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>{action}</div>}
      {showClose && (
        <RadixDialog.Close
          aria-label="Close"
          className="helix-modal-close"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 26, height: 26, padding: 0, border: 'none', borderRadius: 8,
            backgroundColor: 'var(--color-container-secondary, #F7F7F7)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
            color: 'var(--color-text-secondary, #49494A)', cursor: 'pointer', outline: 'none',
          }}
        >
          <X size={14} />
        </RadixDialog.Close>
      )}
    </div>
  );
}

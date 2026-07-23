import { forwardRef, useEffect, useRef, useState } from 'react';
import { AlertTriangle, Trash2, Info } from 'lucide-react';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { MOTION_DURATION_BASE } from './motion';

export type AlertDialogVariant = 'default' | 'destructive' | 'info';

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
  variant?: AlertDialogVariant;
  title: string;
  description?: string;
  /** Custom icon — defaults to variant icon */
  icon?: React.ReactNode;
  confirmAction: AlertDialogAction;
  cancelAction?: AlertDialogAction;
  onClose: () => void;
  /** 'sm' condenses the layout */
  size?: 'sm' | 'md';
  /** Optional checkbox (e.g. "Don't show this again") shown left of the actions */
  checkboxAction?: AlertDialogCheckboxAction;
}

const VARIANT_META: Record<AlertDialogVariant, { iconBg: string; iconColor: string; Icon: React.ComponentType<{ size?: number }> }> = {
  default:     { iconBg: 'var(--color-brand-primary-ghost-hover, #FEF2E9)', iconColor: 'var(--color-brand-primary, #F57E20)', Icon: Info },
  destructive: { iconBg: '#FEE2E2', iconColor: 'var(--color-destructive, #DC2626)', Icon: Trash2 },
  info:        { iconBg: '#EBF2FE', iconColor: 'var(--color-text-info, #014CC5)', Icon: AlertTriangle },
};

export const AlertDialog = forwardRef<HTMLDivElement, AlertDialogProps>(({
  open,
  variant = 'default',
  title,
  description,
  icon,
  confirmAction,
  cancelAction,
  onClose,
  size = 'md',
  checkboxAction,
}, ref) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const vm = VARIANT_META[variant];
  const IconEl = vm.Icon;

  const [isMounted, setIsMounted] = useState(open);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)));
    } else {
      setIsVisible(false);
      const t = setTimeout(() => setIsMounted(false), MOTION_DURATION_BASE);
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

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(2px)',
        opacity: isVisible ? 1 : 0,
        transition: `opacity var(--motion-duration-base, ${MOTION_DURATION_BASE}ms) var(--motion-easing-standard, ease)`,
      }}
    >
      <div
        ref={ref}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-dialog-title"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 8,
          boxShadow: '0px 24px 48px rgba(0,0,0,0.12)',
          width: '100%',
          maxWidth: size === 'sm' ? 360 : 440,
          margin: '0 16px',
          overflow: 'hidden',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(8px)',
          transition: `opacity var(--motion-duration-base, ${MOTION_DURATION_BASE}ms) var(--motion-easing-standard, ease), transform var(--motion-duration-base, ${MOTION_DURATION_BASE}ms) var(--motion-easing-standard, ease)`,
        }}
      >
        <div style={{ padding: size === 'sm' ? '24px 24px 0' : '32px 32px 0' }}>
          {/* Icon */}
          <div style={{
            width: 40, height: 40, borderRadius: 8,
            backgroundColor: vm.iconBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 20,
          }}>
            <span style={{ color: vm.iconColor }}>
              {icon ?? <IconEl size={22} />}
            </span>
          </div>

          {/* Title */}
          <h2
            id="alert-dialog-title"
            style={{
              margin: '0 0 8px',
              fontFamily: 'var(--font-family-heading, Rubik, sans-serif)',
              fontWeight: 500,
              fontSize: 16,
              lineHeight: '24px',
              color: 'var(--color-text-primary, #14141E)',
            }}
          >
            {title}
          </h2>

          {description && (
            <p style={{
              margin: 0,
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

        {/* Actions */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          justifyContent: checkboxAction ? 'space-between' : 'flex-end',
          padding: size === 'sm' ? '20px 24px 24px' : '24px 32px 32px',
        }}>
          {checkboxAction && (
            <Checkbox
              size="Small"
              checked={checkboxAction.checked}
              onChange={(c) => checkboxAction.onChange(c === true)}
              label={checkboxAction.label}
            />
          )}
          <div style={{ display: 'flex', gap: 8, flexDirection: 'row-reverse' }}>
            <Button
              variant={variant === 'destructive' ? 'destructive' : 'primary'}
              size="sm"
              loading={confirmAction.loading}
              onClick={confirmAction.onClick}
            >
              {confirmAction.label}
            </Button>
            {cancelAction && (
              <Button
                variant="neutral"
                size="sm"
                onClick={cancelAction.onClick}
              >
                {cancelAction.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

AlertDialog.displayName = 'AlertDialog';

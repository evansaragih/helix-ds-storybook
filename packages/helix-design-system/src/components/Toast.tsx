import { forwardRef, useEffect, useCallback, useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { MOTION_DURATION_BASE } from './motion';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  onClose?: () => void;
  /** Auto-dismiss after ms (0 = no auto-dismiss) */
  duration?: number;
}

interface VariantTokens {
  bg: string;
  border: string;
  iconColor: string;
  Icon: React.ComponentType<{ size?: number }>;
}

const VARIANTS: Record<ToastVariant, VariantTokens> = {
  default: {
    bg: '#FFFFFF',
    border: 'var(--color-stroke-subtle, #EEEEEE)',
    iconColor: 'var(--color-brand-primary, #F57E20)',
    Icon: Info,
  },
  info: {
    bg: '#FFFFFF',
    border: 'var(--color-stroke-subtle, #EEEEEE)',
    iconColor: 'var(--color-text-info, #014CC5)',
    Icon: Info,
  },
  success: {
    bg: '#FFFFFF',
    border: 'var(--color-stroke-subtle, #EEEEEE)',
    iconColor: 'var(--color-text-success, #12843C)',
    Icon: CheckCircle2,
  },
  warning: {
    bg: '#FFFFFF',
    border: 'var(--color-stroke-subtle, #EEEEEE)',
    iconColor: 'var(--color-text-warning, #A66800)',
    Icon: AlertTriangle,
  },
  error: {
    bg: '#FFFFFF',
    border: 'var(--color-stroke-subtle, #EEEEEE)',
    iconColor: 'var(--color-destructive, #DC2626)',
    Icon: XCircle,
  },
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(({
  variant = 'default',
  title,
  description,
  action,
  onClose,
  duration = 4000,
  style,
  ...props
}, ref) => {
  const v = VARIANTS[variant];
  const { Icon } = v;

  // toast-in/toast-out are defined once in theme.css and shared by every
  // toast — animation (not transition) plays on mount automatically, no
  // rAF double-buffering needed. dismiss() plays the exit keyframe first
  // and only fires the real onClose once it's finished.
  const [isLeaving, setIsLeaving] = useState(false);

  const dismiss = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => onClose?.(), MOTION_DURATION_BASE);
  }, [onClose]);

  useEffect(() => {
    if (!duration || !onClose) return;
    const id = setTimeout(dismiss, duration);
    return () => clearTimeout(id);
  }, [duration, dismiss]);

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '14px 16px',
        backgroundColor: v.bg,
        border: `1px solid ${v.border}`,
        borderRadius: 12,
        boxShadow: '0px 8px 24px rgba(0,0,0,0.10), 0px 2px 8px rgba(0,0,0,0.06)',
        minWidth: 280,
        maxWidth: 400,
        width: '100%',
        boxSizing: 'border-box',
        animation: `${isLeaving ? 'toast-out' : 'toast-in'} var(--motion-duration-base, ${MOTION_DURATION_BASE}ms) var(--motion-easing-decelerate, cubic-bezier(0.32, 0.72, 0, 1)) forwards`,
        ...style,
      }}
      {...props}
    >
      <div style={{ color: v.iconColor, flexShrink: 0, marginTop: 1 }}>
        <Icon size={18} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          margin: 0,
          fontFamily: 'var(--font-family-body)',
          fontWeight: 500,
          fontSize: 14,
          lineHeight: '21px',
          color: 'var(--color-text-primary, #14141E)',
          letterSpacing: '-0.01px',
        }}>
          {title}
        </p>
        {description && (
          <p style={{
            margin: '2px 0 0',
            fontFamily: 'var(--font-family-body)',
            fontWeight: 400,
            fontSize: 13,
            lineHeight: '19.2px',
            color: 'var(--color-text-secondary, #49494A)',
            letterSpacing: '-0.01px',
          }}>
            {description}
          </p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            style={{
              marginTop: 8,
              padding: 0,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-family-body)',
              fontWeight: 500,
              fontSize: 13,
              color: v.iconColor,
              textDecoration: 'underline',
            }}
          >
            {action.label}
          </button>
        )}
      </div>

      {onClose && (
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 20, height: 20, flexShrink: 0, marginTop: 1,
            padding: 0, border: 'none', background: 'none',
            cursor: 'pointer', borderRadius: 4,
            color: 'var(--color-text-tertiary, #828282)',
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
});

Toast.displayName = 'Toast';

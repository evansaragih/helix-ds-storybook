import { forwardRef, useEffect } from 'react';
import { CircleCheck, X } from 'lucide-react';
// Figma specs these two literally (react-icons), not generic lucide placeholders — see node
// 855:23508-23512 ("Alert / Default|Info|Warning|Success|Error").
import { RiErrorWarningLine } from 'react-icons/ri';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { playNotificationSound } from './notificationSound';

/** Figma Status */
export type AlertStatus = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
/** Figma Layout */
export type AlertLayout = 'card' | 'compact' | 'card-buttons' | 'card-link';

export interface AlertAction {
  label: string;
  onClick: () => void;
}

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  status?: AlertStatus;
  layout?: AlertLayout;
  title: string;
  description?: string;
  /** Override the status icon */
  icon?: React.ReactNode;
  /** Primary action — a brand link, or the filled button in the Card w/ Buttons layout */
  action?: AlertAction;
  /** Secondary action — a muted link ("Dismiss"), or the outline button in the Card w/ Buttons layout */
  secondaryAction?: AlertAction;
  /** Shows the close × (not in the Compact layout, as in Figma) */
  onClose?: (e: React.MouseEvent) => void;
  /** Play a soft chime when the alert appears. Off by default so alerts rendered with the page stay quiet; turn it on for alerts that show up in response to something. */
  sound?: boolean;
}

/* Figma Icon Tile fills: Surface/Primary and the *-Bold surfaces — same hex as these tokens. */
const TILE_BG: Record<AlertStatus, string> = {
  default: 'transparent',
  primary: 'var(--color-brand-primary, #F57E20)',
  info:    'var(--color-stroke-info, #3B82F6)',
  success: 'var(--color-stroke-success, #22C55E)',
  warning: 'var(--primitive-yellow-50, #F59E0B)',
  error:   'var(--color-destructive, #DC2626)',
};

const ICONS: Record<AlertStatus, React.ComponentType<{ size?: number | string }>> = {
  default: CircleCheck,
  primary: CircleCheck,
  info:    RiErrorWarningLine,
  success: CircleCheck,
  warning: RiErrorWarningLine,
  error:   IoCloseCircleOutline,
};

const text = (color: string, weight: number): React.CSSProperties => ({
  margin: 0, fontFamily: 'var(--font-family-body)', fontWeight: weight, fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px', color,
});

function AlertLink({ onClick, color, children }: { onClick: () => void; color: string; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{ ...text(color, 400), padding: 0, border: 'none', background: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
      {children}
    </button>
  );
}

/* Figma action buttons: the filled one follows the status colour (brand for default / primary), with a darker 0.5px edge and a tinted lift shadow; the outline one is neutral. */
function AlertButton({ onClick, status, filled, fill, children }: { onClick: () => void; status: AlertStatus; filled: boolean; fill?: boolean; children: React.ReactNode }) {
  const bg = status === 'default' || status === 'primary' ? 'var(--color-brand-primary, #F57E20)' : TILE_BG[status];
  const edge = status === 'default' || status === 'primary' ? 'var(--color-stroke-primary-pressed, #B35001)' : `color-mix(in srgb, ${bg} 75%, #000)`;
  return (
    <button
      onClick={onClick}
      style={{
        ...text(filled ? '#FFFFFF' : 'var(--color-text-secondary, #49494A)', 400),
        width: fill ? '100%' : undefined, flexShrink: 0, minWidth: 36, height: 36, padding: '8px 12px', borderRadius: 6, cursor: 'pointer', whiteSpace: 'nowrap',
        border: filled ? `0.5px solid ${edge}` : '0.5px solid var(--color-stroke-subtle, #EEEEEE)',
        backgroundColor: filled ? bg : 'transparent',
        boxShadow: filled ? `0 1px 4px color-mix(in srgb, ${bg} 15%, transparent), inset 0 1px 0 rgba(255,255,255,0.4)` : 'none',
      }}
    >
      {children}
    </button>
  );
}

/** A message banner with a status icon tile — Card, Compact, Card w/ Buttons or Card w/ Link. Use for notices that stay in the page; for a transient notice that floats over the page use Toastr. Compact has no close ×; its actions are buttons. */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(({
  status = 'default',
  layout = 'card',
  title,
  description,
  icon,
  action,
  secondaryAction,
  onClose,
  sound = false,
  style,
  ...props
}, ref) => {
  useEffect(() => { if (sound) playNotificationSound(); }, []); // eslint-disable-line react-hooks/exhaustive-deps -- chime on appearing only
  const compact = layout === 'compact';
  const IconEl = ICONS[status];
  const iconColor = status === 'default' ? 'var(--color-text-secondary, #49494A)' : '#FFFFFF';
  const linkColor = status === 'error' ? 'var(--color-destructive, #DC2626)' : 'var(--color-brand-primary, #F57E20)';

  const tile = (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 38, height: 38, borderRadius: 9999, boxSizing: 'border-box',
      backgroundColor: TILE_BG[status], border: status === 'default' ? '1px solid var(--color-stroke-subtle, #EEEEEE)' : 'none', color: iconColor,
    }}>
      {icon ?? <IconEl size={20} />}
    </div>
  );

  const body = compact ? (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', gap: 6, whiteSpace: 'nowrap' }}>
      <p style={text('var(--color-text-primary, #14141E)', 500)}>{title}</p>
      {description && <p style={{ ...text('var(--color-text-secondary, #49494A)', 400), overflow: 'hidden', textOverflow: 'ellipsis' }}>{description}</p>}
    </div>
  ) : (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <p style={text('var(--color-text-primary, #14141E)', 500)}>{title}</p>
      {description && <p style={text('var(--color-text-secondary, #49494A)', 400)}>{description}</p>}
    </div>
  );

  const closeBtn = onClose && (
    <button
      onClick={onClose}
      aria-label="Dismiss"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 24, height: 24, padding: 0, border: 'none', borderRadius: 8, background: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary, #828282)' }}
    >
      <X size={12} />
    </button>
  );

  const links = (action || secondaryAction) && (
    <>
      {secondaryAction && <AlertLink onClick={secondaryAction.onClick} color="var(--color-text-tertiary, #828282)">{secondaryAction.label}</AlertLink>}
      {action && <AlertLink onClick={action.onClick} color={linkColor}>{action.label}</AlertLink>}
    </>
  );

  const shell: React.CSSProperties = {
    display: 'flex', boxSizing: 'border-box', width: '100%', borderRadius: 8,
    backgroundColor: 'var(--color-container-primary, #FFFFFF)', boxShadow: '0 4px 8px rgba(89,89,90,0.15), 0 12px 24px rgba(89,89,90,0.15)',   // Figma Shadow/Large
    ...(compact ? { borderBottom: '1px solid var(--color-stroke-subtle, #EEEEEE)' } : { border: '1px solid var(--color-stroke-subtle, #EEEEEE)' }),
    ...style,
  };

  return (
    <div
      ref={ref}
      role="alert"
      {...props}
      style={compact ? { ...shell, alignItems: 'center', gap: 12, padding: '12px 16px' } : { ...shell, flexDirection: 'column', gap: 12, padding: 16 }}
    >
      {compact ? (
        <>
          {tile}{body}
          {(action || secondaryAction) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              {secondaryAction && <AlertButton status={status} filled={false} onClick={secondaryAction.onClick}>{secondaryAction.label}</AlertButton>}
              {action && <AlertButton status={status} filled onClick={action.onClick}>{action.label}</AlertButton>}
            </div>
          )}
        </>
      ) : layout === 'card-link' ? (
        <>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>{tile}{body}</div>
            {closeBtn}
          </div>
          {links && <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>{links}</div>}
        </>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            {layout === 'card' && tile}{body}{closeBtn}
          </div>
          {layout === 'card-buttons' ? (
            (action || secondaryAction) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {action && <AlertButton fill status={status} filled onClick={action.onClick}>{action.label}</AlertButton>}
                {secondaryAction && <AlertButton fill status={status} filled={false} onClick={secondaryAction.onClick}>{secondaryAction.label}</AlertButton>}
              </div>
            )
          ) : (
            links && <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingLeft: 50 }}>{links}</div>
          )}
        </>
      )}
    </div>
  );
});

Alert.displayName = 'Alert';

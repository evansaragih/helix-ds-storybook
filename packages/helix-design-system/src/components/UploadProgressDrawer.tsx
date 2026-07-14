import { useEffect, useState } from 'react';
import { ChevronDown, XCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { MOTION_DURATION_SLOW } from './motion';

// Shared --motion-* tokens (theme.css) — same easing/duration Sheet.tsx uses,
// so every floating panel in the system enters/exits with the same motion.
const EASING = 'var(--motion-easing-decelerate, cubic-bezier(0.32, 0.72, 0, 1))';
const DURATION = MOTION_DURATION_SLOW;

export type UploadItemStatus = 'waiting' | 'uploading' | 'success' | 'failed';

export interface UploadDrawerFile {
  id: string;
  name: string;
  /** Formatted size, e.g. "891 MB" */
  sizeLabel: string;
  status: UploadItemStatus;
  /** 0-100, used when status is 'uploading' */
  progress?: number;
  /** e.g. "340.78 MB/s · ~2s" — shown instead of sizeLabel while uploading */
  speedLabel?: string;
  /** Shown instead of sizeLabel when status is 'failed' */
  errorReason?: string;
}

export interface UploadProgressDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  files: UploadDrawerFile[];
  /** Whether the drawer is visible at all */
  open: boolean;
  /** Collapsed (header + overall bar only) vs expanded (full file list) */
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onCancelAll?: () => void;
  onRemoveFile?: (id: string) => void;
  title?: string;
  /** Overall progress 0-100, drives the top bar */
  progress?: number;
  cancelLabel?: string;
}

function ProgressRing({ value }: { value: number }) {
  const size = 40;
  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, value)) / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--color-container-tertiary)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--color-brand-primary)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset var(--motion-duration-base, 200ms) var(--motion-easing-standard, ease)' }}
        />
      </svg>
      <span
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-family-body, Rubik, sans-serif)',
          fontWeight: 500,
          fontSize: 8,
          lineHeight: '12px',
          color: 'var(--color-text-primary)',
        }}
      >
        {Math.round(value)}%
      </span>
    </div>
  );
}

function DrawerRow({ file, onRemove }: { file: UploadDrawerFile; onRemove?: (id: string) => void }) {
  const isFailed = file.status === 'failed';
  const isSuccess = file.status === 'success';
  const isWaiting = file.status === 'waiting';
  const isUploading = file.status === 'uploading';
  const canRemove = (isWaiting || isUploading || isFailed) && onRemove;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        width: '100%',
        padding: '12px 12px 8px',
        borderBottom: '1px solid var(--color-stroke-subtle)',
        backgroundColor: isFailed ? 'var(--color-status-error-bg)' : isSuccess ? 'var(--color-status-success-bg)' : 'transparent',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'var(--font-family-body, Rubik, sans-serif)',
          fontSize: 13,
          lineHeight: '19.2px',
          letterSpacing: '-0.01px',
        }}
      >
        <span style={{ color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {file.name}
        </span>
        <span style={{ color: isFailed ? 'var(--color-text-error)' : 'var(--color-text-tertiary)' }}>
          {isFailed ? file.errorReason : isWaiting ? 'Waiting…' : isUploading ? (file.speedLabel ?? file.sizeLabel) : file.sizeLabel}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0, paddingBottom: 4 }}>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove!(file.id)}
            aria-label={`Remove ${file.name}`}
            style={{
              display: 'flex',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: 'var(--color-text-tertiary)',
            }}
          >
            <XCircle size={16} />
          </button>
        )}
        {(isWaiting || isUploading) && <ProgressRing value={isUploading ? (file.progress ?? 0) : 0} />}
        {isSuccess && <CheckCircle2 size={40} style={{ color: 'var(--color-text-success)' }} />}
        {isFailed && <AlertTriangle size={40} style={{ color: 'var(--color-destructive)' }} />}
      </div>
    </div>
  );
}

function DrawerSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 8 }}>
      <div
        style={{
          padding: '0 12px',
          fontFamily: 'var(--font-family-body, Rubik, sans-serif)',
          fontWeight: 500,
          fontSize: 13,
          lineHeight: '19.2px',
          letterSpacing: '-0.13px',
          color: 'var(--color-text-secondary)',
        }}
      >
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}

/**
 * Floating panel that tracks an in-progress batch upload (paired with `Dropzone`).
 * Self-positions fixed at the bottom-right (24px right / 16px bottom) so a single
 * instance can be mounted once near the app root and driven by upload state.
 */
export function UploadProgressDrawer({
  files,
  open,
  expanded = false,
  onExpandedChange,
  onCancelAll,
  onRemoveFile,
  title = 'Uploading files…',
  progress = 0,
  cancelLabel = 'Cancel all',
  style,
  className,
  ...props
}: UploadProgressDrawerProps) {
  const [isMounted, setIsMounted] = useState(open);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      // Two rAFs ensure the hidden (translateY+opacity:0) state is painted
      // first, so the browser has something to transition *from*.
      requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)));
    } else {
      setIsVisible(false);
      const t = setTimeout(() => setIsMounted(false), DURATION);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!isMounted) return null;

  const waitingFiles = files.filter((f) => f.status === 'waiting' || f.status === 'uploading');
  const failedFiles = files.filter((f) => f.status === 'failed');
  const successFiles = files.filter((f) => f.status === 'success');
  const total = files.length;
  const completed = successFiles.length + failedFiles.length;

  return (
    <div
      role="status"
      aria-live="polite"
      className={['helix-upload-drawer', className].filter(Boolean).join(' ')}
      style={{
        position: 'fixed',
        right: 24,
        bottom: 16,
        width: 420,
        maxHeight: 560,
        backgroundColor: 'var(--color-container-primary)',
        borderRadius: 'var(--radius-2xl)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        boxSizing: 'border-box',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity ${DURATION}ms ${EASING}, transform ${DURATION}ms ${EASING}, box-shadow var(--motion-duration-base, 200ms) var(--motion-easing-standard, ease)`,
        willChange: 'transform, opacity',
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          backgroundColor: 'var(--color-btn-invert)',
          height: 72,
          padding: '12px 12px 12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, overflow: 'hidden' }}>
          <span
            style={{
              fontFamily: 'var(--font-family-body, Rubik, sans-serif)',
              fontWeight: 500,
              fontSize: 16,
              lineHeight: '24px',
              letterSpacing: '-0.16px',
              color: '#FFFFFF',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-family-body, Rubik, sans-serif)',
              fontSize: 13,
              lineHeight: '19.2px',
              letterSpacing: '-0.01px',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            {completed}/{total} file
          </span>
        </div>
        <button
          type="button"
          onClick={() => onExpandedChange?.(!expanded)}
          aria-label={expanded ? 'Collapse upload panel' : 'Expand upload panel'}
          style={{
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            color: '#FFFFFF',
            flexShrink: 0,
          }}
        >
          <ChevronDown size={14} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform var(--motion-duration-fast, 160ms) var(--motion-easing-standard, ease)' }} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '8px 12px', flexShrink: 0, boxSizing: 'border-box' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <div
            style={{
              flex: 1,
              height: 10,
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-container-tertiary)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${Math.max(0, Math.min(100, progress))}%`,
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-brand-primary)',
                transition: 'width var(--motion-duration-base, 200ms) var(--motion-easing-standard, ease)',
              }}
            />
          </div>
          <span
            style={{
              width: 42,
              flexShrink: 0,
              textAlign: 'right',
              fontFamily: 'var(--font-family-body, Rubik, sans-serif)',
              fontSize: 13,
              lineHeight: '19.2px',
              letterSpacing: '-0.01px',
              color: 'var(--color-text-primary)',
            }}
          >
            {Math.round(progress)}%
          </span>
        </div>
        {onCancelAll && (
          <div
            style={{
              flexShrink: 0,
              overflow: 'hidden',
              maxWidth: expanded ? 90 : 0,
              opacity: expanded ? 1 : 0,
              transition: `max-width ${DURATION}ms ${EASING}, opacity 0.18s ease`,
            }}
          >
            <button
              type="button"
              onClick={onCancelAll}
              tabIndex={expanded ? 0 : -1}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontFamily: 'var(--font-family-body, Rubik, sans-serif)',
                fontSize: 13,
                lineHeight: '19.2px',
                letterSpacing: '-0.01px',
                color: 'var(--color-text-error)',
                whiteSpace: 'nowrap',
              }}
            >
              {cancelLabel}
            </button>
          </div>
        )}
      </div>

      {/* Grid-rows 0fr→1fr is what makes this animate smoothly to an unknown
          content height — a toggled max-height/conditional-unmount snaps instantly
          instead of transitioning, which is what read as "not smooth" before. */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: expanded ? '1fr' : '0fr',
          transition: `grid-template-rows ${DURATION}ms ${EASING}`,
          minHeight: 0,
        }}
      >
        <div style={{ overflow: 'hidden', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <div
            aria-hidden={!expanded}
            style={{
              overflowY: 'auto',
              opacity: expanded ? 1 : 0,
              transition: 'opacity var(--motion-duration-base, 200ms) var(--motion-easing-standard, ease) 100ms',
            }}
          >
            {waitingFiles.length > 0 && (
              <DrawerSection label={`Waiting (${waitingFiles.length})`}>
                {waitingFiles.map((f) => (
                  <DrawerRow key={f.id} file={f} onRemove={onRemoveFile} />
                ))}
              </DrawerSection>
            )}
            {failedFiles.length > 0 && (
              <DrawerSection label={`Failed (${failedFiles.length})`}>
                {failedFiles.map((f) => (
                  <DrawerRow key={f.id} file={f} onRemove={onRemoveFile} />
                ))}
              </DrawerSection>
            )}
            {successFiles.length > 0 && (
              <DrawerSection label={`Success (${successFiles.length})`}>
                {successFiles.map((f) => (
                  <DrawerRow key={f.id} file={f} onRemove={onRemoveFile} />
                ))}
              </DrawerSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

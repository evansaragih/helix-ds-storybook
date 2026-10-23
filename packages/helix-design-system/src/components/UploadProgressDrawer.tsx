import { forwardRef } from 'react';
import { ChevronDown, X, RotateCcw, TriangleAlert, Check } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './Button';
import { IconButton } from './IconButton';
import { ProgressBar } from './ProgressBar';
import { ProgressCircle } from './ProgressCircle';

export type UploadItemStatus = 'waiting' | 'uploading' | 'success' | 'failed';

export interface UploadDrawerFile {
  id: string;
  name: string;
  /** Formatted size, e.g. "891 MB" */
  sizeLabel: string;
  status: UploadItemStatus;
  /** 0-100, used when status is 'uploading' */
  progress?: number;
  /** e.g. "340.78 MB/s · ~2s" — shown after the size while uploading */
  speedLabel?: string;
  /** Shown instead of the size when status is 'failed' */
  errorReason?: string;
}

export interface UploadProgressDrawerLabels {
  title: string;
  waiting: string;
  failed: string;
  success: string;
  cancel: string;
  retry: string;
  /** Called with (done, total) to build the badge text */
  count: (done: number, total: number) => string;
}

export interface UploadProgressDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  files: UploadDrawerFile[];
  /** Whether the drawer is visible at all */
  open: boolean;
  /** Figma State=Open shows the file list; Close shows the header and the overall bar only */
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onCancelAll?: () => void;
  onRemoveFile?: (id: string) => void;
  onRetryFile?: (id: string) => void;
  /** Overall progress 0-100 */
  progress?: number;
  /** Override any of the default (Indonesian, as in Figma) texts */
  labels?: Partial<UploadProgressDrawerLabels>;
}

const DEFAULT_LABELS: UploadProgressDrawerLabels = {
  title: 'Mengunggah file…',
  waiting: 'Menunggu',
  failed: 'Gagal',
  success: 'Berhasil',
  cancel: 'Cancel',
  retry: 'Coba lagi',
  count: (done, total) => `${done}/${total} file`,
};

const SUBTLE_BORDER = 'var(--color-stroke-subtle, #EEEEEE)';
const meta = (c: string): React.CSSProperties => ({ fontFamily: 'var(--font-family-body)', fontSize: 11, lineHeight: '16px', letterSpacing: '-0.01px', color: c });
const name: React.CSSProperties = { fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px', color: 'var(--color-text-primary, #14141E)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };

function Row({ file, labels, onRemove, onRetry }: { file: UploadDrawerFile; labels: UploadProgressDrawerLabels; onRemove?: (id: string) => void; onRetry?: (id: string) => void }) {
  const failed = file.status === 'failed';
  const success = file.status === 'success';
  const sub = failed ? file.errorReason ?? file.sizeLabel : [file.sizeLabel, file.status === 'uploading' ? file.speedLabel : undefined].filter(Boolean).join(' • ');

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: failed || success ? 8 : 0, boxSizing: 'border-box',
      backgroundColor: failed ? 'var(--color-status-error-bg, #FEE2E2)' : success ? 'var(--color-status-success-bg, #E9F9EF)' : 'transparent',
      borderBottom: failed || success ? 'none' : `1px solid ${SUBTLE_BORDER}`,
    }}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <span style={name}>{file.name}</span>
        <span style={meta(failed ? 'var(--color-destructive, #DC2626)' : 'var(--color-text-tertiary, #828282)')}>{sub}</span>
      </div>
      {(file.status === 'waiting' || file.status === 'uploading') && (
        <>
          {onRemove && (
            <button type="button" aria-label={`Remove ${file.name}`} onClick={() => onRemove(file.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, padding: 0, border: 'none', borderRadius: '50%', backgroundColor: 'var(--color-stroke-strong, #9F9F9F)', color: '#FFFFFF', cursor: 'pointer' }}><X size={12} /></button>
          )}
          <ProgressCircle size="xxs" thickness="thin" value={file.progress ?? 0} />
        </>
      )}
      {failed && (
        <>
          <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', backgroundColor: 'var(--color-destructive, #DC2626)', color: '#FFFFFF' }}><TriangleAlert size={16} /></span>
          {onRetry && <IconButton aria-label={`${labels.retry}: ${file.name}`} hierarchy="secondary" shape="pill" size="md" icon={<RotateCcw size={18} />} onClick={() => onRetry(file.id)} />}
        </>
      )}
      {success && (
        <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', backgroundColor: 'var(--color-stroke-success, #22C55E)', color: '#FFFFFF' }}><Check size={20} /></span>
      )}
    </div>
  );
}

/** A collapsible drawer that tracks file uploads: a header with a file-count badge, an overall progress bar with Cancel, and — when expanded — the files grouped by status (waiting, failed, succeeded). */
export const UploadProgressDrawer = forwardRef<HTMLDivElement, UploadProgressDrawerProps>(({
  files,
  open,
  expanded = false,
  onExpandedChange,
  onCancelAll,
  onRemoveFile,
  onRetryFile,
  progress,
  labels: labelOverrides,
  style,
  ...props
}, ref) => {
  if (!open) return null;
  const labels = { ...DEFAULT_LABELS, ...labelOverrides };
  const total = files.length;
  const done = files.filter((f) => f.status === 'success' || f.status === 'failed').length;
  const overall = progress ?? (total === 0 ? 0 : Math.round(files.reduce((s, f) => s + (f.status === 'waiting' ? 0 : f.status === 'uploading' ? f.progress ?? 0 : 100), 0) / total));

  const groups: { key: string; title: string; items: UploadDrawerFile[] }[] = [
    { key: 'waiting', title: labels.waiting, items: files.filter((f) => f.status === 'waiting' || f.status === 'uploading') },
    { key: 'failed', title: labels.failed, items: files.filter((f) => f.status === 'failed') },
    { key: 'success', title: labels.success, items: files.filter((f) => f.status === 'success') },
  ].filter((g) => g.items.length > 0);

  const progressRow = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <ProgressBar value={overall} type="trailing-label" />
      {onCancelAll && <Button hierarchy="destructive" appearance="link" size="sm" onClick={onCancelAll}>{labels.cancel}</Button>}
    </div>
  );

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed', right: 24, bottom: 24, zIndex: 1100, width: 592, maxWidth: 'calc(100vw - 48px)', boxSizing: 'border-box', overflow: 'hidden',
        borderRadius: 12, border: '1px solid var(--color-brand-primary-subtle-hover, #FFE1C9)', boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        backgroundColor: expanded ? '#FFFFFF' : 'var(--color-status-brand-bg, #FEF2E9)', ...style,
      }}
      {...props}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 12px 8px', backgroundColor: 'var(--color-status-brand-bg, #FEF2E9)' }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 13, lineHeight: '19.2px', color: 'var(--color-text-secondary, #49494A)' }}>{labels.title}</span>
          <Badge size="md" color="brand" appearance="solid" label={labels.count(done, total)} />
        </div>
        <IconButton
          aria-label={expanded ? 'Collapse upload list' : 'Expand upload list'}
          aria-expanded={expanded}
          hierarchy="secondary"
          appearance="ghost"
          size="sm"
          icon={<ChevronDown size={16} style={{ transform: expanded ? 'rotate(180deg)' : undefined, transition: 'transform var(--motion-duration-base) var(--motion-easing-standard)' }} />}
          onClick={() => onExpandedChange?.(!expanded)}
        />
      </div>
      <div style={{ padding: expanded ? 12 : 2, ...(expanded ? {} : { paddingTop: 2 }) }}>
        <div style={{ padding: expanded ? 0 : 12, borderRadius: expanded ? 0 : 12, backgroundColor: '#FFFFFF' }}>{progressRow}</div>
      </div>
      {expanded && (
        <div style={{ maxHeight: 382, overflowY: 'auto', padding: 12, borderTop: `1px solid ${SUBTLE_BORDER}`, display: 'flex', flexDirection: 'column', gap: 12, backgroundColor: '#FFFFFF' }}>
          {groups.map((g) => (
            <div key={g.key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 13, lineHeight: '20px', textTransform: 'uppercase', color: 'var(--color-text-secondary, #49494A)', padding: '0 12px' }}>{g.title}</span>
              {g.items.map((f) => <Row key={f.id} file={f} labels={labels} onRemove={onRemoveFile} onRetry={onRetryFile} />)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

UploadProgressDrawer.displayName = 'UploadProgressDrawer';

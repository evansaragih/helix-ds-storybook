import { forwardRef, useId, useRef, useState } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';
import { Button } from './Button';
import { ContentContainer } from './ContentContainer';
import { FieldMessage } from './FieldMessage';

/** Figma Size — md is compact (40px icon); lg is roomy (56px icon, 64px vertical padding) */
export type DropzoneSize = 'md' | 'lg';
/** Figma Appearance — transparent is the bare drop target; container wraps it in a Content Container shell */
export type DropzoneAppearance = 'transparent' | 'container';

export interface DropzoneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'title'> {
  /** Accepted MIME types or extensions, e.g. "image/*,.pdf" */
  accept?: string;
  multiple?: boolean;
  /** Max file size in bytes — larger files are rejected */
  maxSize?: number;
  size?: DropzoneSize;
  appearance?: DropzoneAppearance;
  disabled?: boolean;
  /** Figma Label / Show Title */
  title?: React.ReactNode;
  /** Figma Supporting Text / Show Description, e.g. "PDF, CSV up to 10MB" */
  description?: React.ReactNode;
  /** Figma Show Footer — the "Browse" button (default true) */
  showBrowseButton?: boolean;
  /** Hint under the drop target */
  hint?: string;
  /** Error message under the drop target — also puts it in the Error state */
  error?: string;
  /** Called with the accepted files */
  onFilesChange?: (files: File[]) => void;
  /** Called with the files that were rejected (too large) */
  onFilesRejected?: (files: File[]) => void;
}

const formatBytes = (b: number) => (b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(1)} MB`);

const BRAND = 'var(--color-brand-primary, #F57E20)';

/** A drag-and-drop target for uploading one or more files, with a click-to-browse fallback. Use for primary file-upload actions; for a compact inline trigger use File Upload Field. */
export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(({
  accept,
  multiple = false,
  maxSize,
  size = 'md',
  appearance = 'transparent',
  disabled = false,
  title = 'Drag & drop files here, or click to browse',
  description,
  showBrowseButton = true,
  hint,
  error,
  onFilesChange,
  onFilesRejected,
  style,
  ...props
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [rejected, setRejected] = useState<string | undefined>();
  const id = useId();

  const handle = (list: FileList | File[]) => {
    const files = Array.from(list);
    const ok = maxSize ? files.filter((f) => f.size <= maxSize) : files;
    const bad = maxSize ? files.filter((f) => f.size > maxSize) : [];
    setRejected(bad.length ? `${bad.length === 1 ? `"${bad[0].name}"` : `${bad.length} files`} exceed${bad.length === 1 ? 's' : ''} the ${formatBytes(maxSize!)} limit.` : undefined);
    if (bad.length) onFilesRejected?.(bad);
    if (ok.length) onFilesChange?.(multiple ? ok : ok.slice(0, 1));
  };

  const message = error ?? rejected;
  const invalid = Boolean(message);
  const large = size === 'lg';

  // Figma State × fill / border: Default · Hover · Drag-Active · Disabled · Error
  let bg = 'var(--color-container-secondary, #F7F7F7)';
  let border = 'var(--color-stroke-default, #BABABA)';
  if (disabled) { bg = 'var(--color-stroke-disabled, #D7D7D7)'; border = bg; }
  else if (dragging) { bg = '#FFE1C9'; border = BRAND; }
  else if (invalid) { border = 'var(--primitive-red-70, #991B1B)'; }
  else if (hovered) { bg = 'var(--color-container-tertiary, #EEEEEE)'; border = '#828282'; }

  const open = () => { if (!disabled) inputRef.current?.click(); };

  const target = (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-label="Upload files"
      onClick={open}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
      onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
      onDrop={(e) => { e.preventDefault(); setDragging(false); if (!disabled && e.dataTransfer.files.length) handle(e.dataTransfer.files); }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxSizing: 'border-box', width: '100%',
        gap: large ? 16 : 12, padding: large ? '64px 32px' : 24, borderRadius: 8,
        backgroundColor: bg, border: `1.5px dashed ${border}`, cursor: disabled ? 'not-allowed' : 'pointer', outline: 'none',
        transition: 'background-color 0.15s, border-color 0.15s',
      }}
    >
      <IoMdCloudUpload size={large ? 56 : 40} style={{ color: 'var(--color-icon-on-surface-neutral, #393A3B)', opacity: disabled ? 0.5 : 1 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, opacity: disabled ? 0.5 : 1 }}>
        {title && <span style={{ fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 16, lineHeight: '24px', color: 'var(--color-text-primary, #14141E)' }}>{dragging ? 'Drop to upload' : title}</span>}
        {description && <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', color: 'var(--color-text-secondary, #49494A)' }}>{description}</span>}
      </div>
      {showBrowseButton && <Button size="sm" hierarchy="secondary" disabled={disabled} tabIndex={-1} onClick={(e) => { e.stopPropagation(); open(); }}>Browse</Button>}
      <input ref={inputRef} id={id} type="file" accept={accept} multiple={multiple} disabled={disabled} tabIndex={-1} style={{ display: 'none' }}
        onChange={(e) => { if (e.target.files?.length) { handle(e.target.files); e.target.value = ''; } }} />
    </div>
  );

  const note = (message || hint) && <FieldMessage state={message ? 'error' : 'default'}>{message ?? hint}</FieldMessage>;

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }} {...props}>
      {appearance === 'container' ? <ContentContainer surface="gray" contentSurface="default" divided={false} footer={note || undefined}>{target}</ContentContainer> : <>{target}{note}</>}
    </div>
  );
});

Dropzone.displayName = 'Dropzone';

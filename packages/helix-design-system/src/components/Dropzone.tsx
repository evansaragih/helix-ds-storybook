import { forwardRef, useRef, useState, useId } from 'react';
import { UploadCloud, X, FileText, AlertCircle } from 'lucide-react';

export interface DropzoneFile {
  file: File;
  id: string;
}

export interface DropzoneProps {
  /** Accepted MIME types or extensions, e.g. "image/*,.pdf" */
  accept?: string;
  multiple?: boolean;
  /** Max file size in bytes */
  maxSize?: number;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  label?: string;
  helperText?: string;
  /** Called whenever the accepted file list changes */
  onFilesChange?: (files: File[]) => void;
  style?: React.CSSProperties;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileRow({ df, onRemove, disabled }: { df: DropzoneFile; onRemove: () => void; disabled?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 12px',
        borderRadius: 8,
        border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
        backgroundColor: 'var(--color-container-primary, #FFFFFF)',
      }}
    >
      <FileText size={16} color="var(--color-brand-primary, #F57E20)" style={{ flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          margin: 0,
          fontFamily: 'var(--font-family-body)',
          fontWeight: 500,
          fontSize: 13,
          lineHeight: '19.2px',
          color: 'var(--color-text-primary, #14141E)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {df.file.name}
        </p>
        <p style={{
          margin: 0,
          fontFamily: 'var(--font-family-body)',
          fontWeight: 400,
          fontSize: 11,
          lineHeight: '16px',
          color: 'var(--color-text-tertiary, #828282)',
        }}>
          {formatBytes(df.file.size)}
        </p>
      </div>
      {!disabled && (
        <button
          type="button"
          onClick={onRemove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            borderRadius: 6,
            border: 'none',
            backgroundColor: hovered ? '#F5F5F5' : 'transparent',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background-color 0.15s',
            color: 'var(--color-text-tertiary, #828282)',
          }}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(({
  accept,
  multiple = false,
  maxSize,
  disabled = false,
  error = false,
  errorText,
  label,
  helperText,
  onFilesChange,
  style,
  className,
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<DropzoneFile[]>([]);
  const [sizeErrors, setSizeErrors] = useState<string[]>([]);
  const id = useId();

  const addFiles = (incoming: FileList | File[]) => {
    const list = Array.from(incoming);
    const rejected: string[] = [];
    const accepted: File[] = [];

    for (const f of list) {
      if (maxSize && f.size > maxSize) {
        rejected.push(`"${f.name}" exceeds the ${formatBytes(maxSize)} limit.`);
      } else {
        accepted.push(f);
      }
    }

    setSizeErrors(rejected);

    setFiles(prev => {
      const next = multiple
        ? [...prev, ...accepted.map(f => ({ file: f, id: `${f.name}-${f.lastModified}-${Math.random()}` }))]
        : accepted.slice(0, 1).map(f => ({ file: f, id: `${f.name}-${f.lastModified}-${Math.random()}` }));
      onFilesChange?.(next.map(d => d.file));
      return next;
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const next = prev.filter(f => f.id !== id);
      onFilesChange?.(next.map(d => d.file));
      return next;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
      e.target.value = '';
    }
  };

  const hasError = error || sizeErrors.length > 0;

  const zoneBorderColor = disabled
    ? 'var(--color-stroke-subtle, #EEEEEE)'
    : hasError
    ? 'var(--color-destructive, #DC2626)'
    : isDragOver
    ? 'var(--color-brand-primary, #F57E20)'
    : 'var(--color-stroke-default, #D7D7D7)';

  const zoneBg = disabled
    ? 'var(--color-container-secondary, #F7F7F7)'
    : isDragOver
    ? 'var(--color-status-brand-bg, #FEF2E9)'
    : '#FFFFFF';

  const acceptLabel = accept
    ? accept.split(',').map(s => s.trim().replace('image/', '').replace('.', '').toUpperCase()).join(', ')
    : null;

  return (
    <div ref={ref} className={className} style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {/* External label */}
      {label && (
        <label
          htmlFor={id}
          style={{
            fontFamily: 'var(--font-family-body)',
            fontWeight: 400,
            fontSize: 13,
            lineHeight: '19.2px',
            color: disabled ? 'var(--color-text-disabled, #929292)' : 'var(--color-text-primary, #14141E)',
            letterSpacing: '-0.01px',
          }}
        >
          {label}
        </label>
      )}

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload file"
        onClick={handleClick}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: 16,
          borderRadius: 'var(--radius-lg, 8px)',
          border: `1.5px dashed ${zoneBorderColor}`,
          backgroundColor: zoneBg,
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'border-color 0.2s, background-color 0.2s',
          outline: 'none',
          userSelect: 'none',
        }}
      >
        {/* Icon well */}
        <div style={{
          width: 56,
          height: 56,
          borderRadius: 'var(--radius-lg, 8px)',
          backgroundColor: isDragOver && !disabled ? 'var(--color-brand-primary, #F57E20)' : 'var(--color-container-secondary, #F7F7F7)',
          boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.04), 0px 4px 8px 0px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background-color 0.2s',
        }}>
          <UploadCloud
            size={24}
            color={disabled ? 'var(--color-text-disabled, #929292)' : isDragOver ? '#FFFFFF' : 'var(--color-text-secondary, #828282)'}
            style={{ transition: 'color 0.2s' }}
          />
        </div>

        {/* Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          <p style={{
            margin: 0,
            fontFamily: 'var(--font-family-body)',
            fontWeight: 500,
            fontSize: 13,
            lineHeight: '19.2px',
            color: disabled ? 'var(--color-text-disabled, #929292)' : 'var(--color-text-secondary, #49494A)',
          }}>
            {isDragOver ? 'Drop to upload' : 'Drag & drop your file here'}
          </p>
          <p style={{
            margin: 0,
            fontFamily: 'var(--font-family-body)',
            fontWeight: 400,
            fontSize: 10,
            lineHeight: '15.6px',
            color: 'var(--color-text-tertiary, #828282)',
          }}>
            {!isDragOver && (
              <>
                or{' '}
                <span style={{
                  color: disabled ? 'var(--color-text-disabled, #929292)' : 'var(--color-brand-primary, #F57E20)',
                  fontWeight: 500,
                }}>
                  click to browse
                </span>
              </>
            )}
            {(acceptLabel || maxSize) && (
              <>
                <br />
                {[acceptLabel, maxSize ? `Max ${formatBytes(maxSize)} per file` : null].filter(Boolean).join('  ·  ')}
              </>
            )}
          </p>
        </div>
      </div>

      {/* Hidden input */}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex={-1}
      />

      {/* File list */}
      {files.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 2 }}>
          {files.map(df => (
            <FileRow key={df.id} df={df} onRemove={() => removeFile(df.id)} disabled={disabled} />
          ))}
        </div>
      )}

      {/* Error / helper text */}
      {(hasError || helperText) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
          {hasError && <AlertCircle size={12} color="var(--color-destructive, #DC2626)" style={{ flexShrink: 0 }} />}
          <span style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: 12,
            lineHeight: '18px',
            letterSpacing: '-0.01px',
            color: hasError ? 'var(--color-destructive, #DC2626)' : 'var(--color-text-tertiary, #828282)',
          }}>
            {hasError ? (sizeErrors[0] ?? errorText) : helperText}
          </span>
        </div>
      )}
    </div>
  );
});

Dropzone.displayName = 'Dropzone';

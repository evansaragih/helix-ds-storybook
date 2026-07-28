import { forwardRef, useRef, useState, useId } from 'react';
import { X, FileText, AlertCircle } from 'lucide-react';
// The decorative illustration below is specced in Figma with react-icons glyphs specifically
// (IoMdCloudUpload / IoDocuments / IoDocumentText / IoDocumentAttach / BsFileEarmarkMedicalFill /
// BsFileEarmarkPdfFill / HiDocumentReport) — use those exact icons here instead of lucide
// substitutes, per node 2346:7574.
import { IoMdCloudUpload } from 'react-icons/io';
import { IoDocuments, IoDocumentText, IoDocumentAttach } from 'react-icons/io5';
import { BsFileEarmarkMedicalFill, BsFileEarmarkPdfFill } from 'react-icons/bs';
import { HiDocumentReport } from 'react-icons/hi';

export interface DropzoneFile {
  file: File;
  id: string;
}

export type DropzoneSize = 'md' | 'lg';

export interface DropzoneProps {
  /** Accepted MIME types or extensions, e.g. "image/*,.pdf" */
  accept?: string;
  multiple?: boolean;
  /** Max file size in bytes */
  maxSize?: number;
  /** 'md' = horizontal icon+text (default), 'lg' = taller, centered vertical layout */
  size?: DropzoneSize;
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

// Normalized 100×100 coordinate space (percent of the zone's own width/height), derived from
// Figma's unclipped reference instance (node 2346:7574) — the one showing all 6 file-type icon
// chips arranged tidily around the center, not the small Medium/Large frames that clip almost
// everything out. Rendered as an SVG with preserveAspectRatio="none", these percentages stretch
// to exactly fill the zone in both width and height, the same way Figma's Scale constraints do,
// while keeping the same tidy arrangement regardless of the zone's actual aspect ratio.
const RING_RADII_PCT = [
  6.9, 9.9, 12.6, 15.5, 18.5, 21.4, 24.3, 27.2, 30.1, 33, 35.9,
  38.8, 41.8, 44.7, 47.6, 50.5, 53.4, 56.3, 59.2, 62.1, 65,
];

const ICON_CHIPS = [
  { Icon: IoDocuments,             xPct: 28.8,  yPct: 40.1,  sizePct: 6.1, rotate: 14.73 },
  { Icon: IoDocumentText,          xPct: -32,   yPct: 13.3,  sizePct: 6.1, rotate: -15 },
  { Icon: IoDocumentAttach,        xPct: -26.1, yPct: 48,    sizePct: 7.0, rotate: -37.26 },
  { Icon: BsFileEarmarkMedicalFill, xPct: 25.5, yPct: -23.4, sizePct: 5.5, rotate: 5.38 },
  { Icon: BsFileEarmarkPdfFill,    xPct: 34.5,  yPct: 6.6,   sizePct: 6.2, rotate: 15.92 },
  { Icon: HiDocumentReport,        xPct: -26.2, yPct: -21.3, sizePct: 6.8, rotate: -29.1 },
];

/** Decorative background layer behind the drop zone content — faint concentric rings and 6
 * scattered file-type icon chips arranged around the center, matching Figma's unclipped
 * "Input / Upload-file" illustration (node 2346:7574). A normalized viewBox with
 * preserveAspectRatio="none" keeps the same tidy layout while stretching precisely with
 * the zone's actual rendered width and height. */
function DropzoneBackground({ active, disabled }: { active: boolean; disabled: boolean }) {
  const ringColor = disabled ? 'transparent' : active ? 'var(--color-brand-primary, #F57E20)' : 'var(--color-stroke-subtle, #EEEEEE)';
  const chipBg = active ? '#FFFFFF' : 'var(--color-container-secondary, #F7F7F7)';
  const chipColor = 'var(--color-text-tertiary, #828282)';
  const fadeColor = active ? '#FEF2E9' : '#FFFFFF';

  return (
    <svg
      viewBox="0 0 100 100"
      // xMidYMid slice: uniform scale (shapes stay undistorted — square chips stay square,
      // circles stay circular) sized to fully cover the zone, centered, cropping overflow —
      // like CSS background-size:cover. Scales precisely as the zone is resized either way.
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: 'inherit', pointerEvents: 'none' }}
    >
      <defs>
        <linearGradient id="dz-fade-l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={fadeColor} />
          <stop offset="100%" stopColor={fadeColor} stopOpacity={0} />
        </linearGradient>
        <linearGradient id="dz-fade-r" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={fadeColor} stopOpacity={0} />
          <stop offset="100%" stopColor={fadeColor} />
        </linearGradient>
        {/* Approximates Figma's two-layer chip shadow (0px 2px 4px rgba(0,0,0,.04), 0px 4px 8px rgba(0,0,0,.08)) */}
        <filter id="dz-chip-shadow" x="-75%" y="-75%" width="250%" height="250%">
          <feDropShadow dx="0" dy="0.35" stdDeviation="0.35" floodColor="#000000" floodOpacity="0.08" />
          <feDropShadow dx="0" dy="0.7" stdDeviation="0.7" floodColor="#000000" floodOpacity="0.1" />
        </filter>
      </defs>
      {RING_RADII_PCT.map((r) => (
        <circle key={r} cx={50} cy={50} r={r} fill="none" stroke={ringColor} strokeWidth={0.3} opacity={0.12} />
      ))}
      {ICON_CHIPS.map(({ Icon, xPct, yPct, sizePct, rotate }, i) => (
        <g key={i} transform={`translate(${50 + xPct}, ${50 + yPct}) rotate(${rotate})`}>
          <rect x={-sizePct / 2} y={-sizePct / 2} width={sizePct} height={sizePct} rx={sizePct * 0.104} fill={chipBg} filter="url(#dz-chip-shadow)" />
          {/* react-icons ignores width/height props and always sizes via `size` (defaults to
              "1em" otherwise) — must use `size` here, not width/height, or icons render at a
              stray ~16 user-units, which blows up hugely once the whole SVG is scaled up. */}
          <Icon size={sizePct * 0.63} color={chipColor} x={-sizePct * 0.315} y={-sizePct * 0.315} />
        </g>
      ))}
      <rect x={0} y={0} width={20} height={100} fill="url(#dz-fade-l)" />
      <rect x={80} y={0} width={20} height={100} fill="url(#dz-fade-r)" />
    </svg>
  );
}

export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(({
  accept,
  multiple = false,
  maxSize,
  size = 'md',
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

  const isLarge = size === 'lg';

  return (
    <div ref={ref} className={className} style={{ display: 'flex', flexDirection: 'column', gap: 6, height: '100%', ...style }}>
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
          position: 'relative',
          display: 'flex',
          flexDirection: isLarge ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: isLarge ? 'center' : 'left',
          gap: 16,
          width: '100%',
          flex: '1 1 auto',
          minHeight: 0,
          padding: 16,
          boxSizing: 'border-box',
          borderRadius: 'var(--radius-lg, 8px)',
          border: `1.5px dashed ${zoneBorderColor}`,
          backgroundColor: zoneBg,
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'border-color 0.2s, background-color 0.2s',
          outline: 'none',
          userSelect: 'none',
          overflow: 'hidden',
        }}
      >
        <DropzoneBackground active={isDragOver && !disabled} disabled={disabled} />

        {/* Icon well */}
        <div style={{
          position: 'relative',
          width: isLarge ? 92 : 56,
          height: isLarge ? 92 : 56,
          borderRadius: 'var(--radius-lg, 8px)',
          backgroundColor: isDragOver && !disabled ? 'var(--color-brand-primary, #F57E20)' : 'var(--color-container-secondary, #F7F7F7)',
          boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.04), 0px 4px 8px 0px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background-color 0.2s',
        }}>
          <IoMdCloudUpload
            size={isLarge ? 40 : 24}
            color={disabled ? 'var(--color-text-disabled, #929292)' : isDragOver ? '#FFFFFF' : 'var(--color-text-secondary, #828282)'}
            style={{ transition: 'color 0.2s' }}
          />
        </div>

        {/* Text */}
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: isLarge ? 8 : 2,
          minWidth: 0,
          flex: isLarge ? undefined : 1,
          width: isLarge ? '100%' : undefined,
          alignSelf: isLarge ? 'stretch' : undefined,
        }}>
          <p style={{
            margin: 0,
            fontFamily: isLarge ? 'var(--font-family-heading, Rubik, sans-serif)' : 'var(--font-family-body)',
            fontWeight: 500,
            fontSize: isLarge ? 20 : 13,
            lineHeight: isLarge ? '30px' : '19.2px',
            color: disabled ? 'var(--color-text-disabled, #929292)' : 'var(--color-text-secondary, #49494A)',
          }}>
            {isDragOver ? 'Drop to upload' : 'Drag & drop your file here'}
          </p>
          <p style={{
            margin: 0,
            fontFamily: 'var(--font-family-body)',
            fontWeight: 400,
            fontSize: isLarge ? 13 : 10,
            lineHeight: isLarge ? '19.2px' : '15.6px',
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

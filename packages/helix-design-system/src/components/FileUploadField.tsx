import { forwardRef, useRef, useState } from 'react';
import { Paperclip } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

export interface FileUploadFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label?: string;
  hint?: string;
  /** Error message — also puts the field in the Error state */
  error?: string;
  /** Figma Appearance=Floating — the label sits inside the box */
  floating?: boolean;
  accept?: string;
  disabled?: boolean;
  placeholder?: string;
  browseLabel?: string;
  /** Called with the chosen file (or undefined when cleared) */
  onFileChange?: (file: File | undefined) => void;
}

/** A compact field for choosing a single file by click, showing the chosen filename inline. For a primary drag-and-drop upload use Dropzone. */
export const FileUploadField = forwardRef<HTMLDivElement, FileUploadFieldProps>(({
  label,
  hint,
  error,
  floating,
  accept,
  disabled,
  placeholder = 'No file chosen',
  browseLabel = 'Browse',
  onFileChange,
  ...props
}, ref) => {
  const input = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');

  return (
    <div ref={ref} {...props}>
      <Input
        label={label}
        hint={hint}
        error={error}
        floating={floating}
        disabled={disabled}
        readOnly
        value={name}
        placeholder={placeholder}
        leading={<Paperclip size={16} />}
        trailing={<Button size="xs" hierarchy="secondary" disabled={disabled} onClick={() => input.current?.click()}>{browseLabel}</Button>}
        onClick={() => !disabled && input.current?.click()}
      />
      <input
        ref={input}
        type="file"
        accept={accept}
        disabled={disabled}
        tabIndex={-1}
        style={{ display: 'none' }}
        onChange={(e) => { const f = e.target.files?.[0]; setName(f?.name ?? ''); onFileChange?.(f); }}
      />
    </div>
  );
});

FileUploadField.displayName = 'FileUploadField';

import * as RadixSelect from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { forwardRef } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectGroup {
  label?: string;
  options: SelectOption[];
}

export interface SelectProps {
  options?: SelectOption[];
  groups?: SelectGroup[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  size?: SelectSize;
  label?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

interface SizeCfg {
  height: number;
  px: number;
  fontSize: number;
  radius: number;
}

const SIZES: Record<SelectSize, SizeCfg> = {
  sm: { height: 38, px: 12, fontSize: 13, radius: 6 },
  md: { height: 42, px: 12, fontSize: 13, radius: 8 },
  lg: { height: 48, px: 16, fontSize: 13, radius: 8 },
};

export const Select = forwardRef<HTMLButtonElement, SelectProps>(({
  options = [],
  groups = [],
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select…',
  disabled = false,
  invalid = false,
  size = 'md',
  label,
  helperText,
  errorText,
  required = false,
  style,
  className,
}, ref) => {
  const cfg = SIZES[size];
  const allGroups: SelectGroup[] =
    groups.length > 0 ? groups : options.length > 0 ? [{ options }] : [];

  const triggerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: cfg.height,
    paddingLeft: cfg.px,
    paddingRight: cfg.px,
    border: invalid
      ? '1px solid var(--color-stroke-error, #DC2626)'
      : '1px solid var(--color-input-border-default, #D7D7D7)',
    borderRadius: cfg.radius,
    backgroundColor: disabled
      ? 'var(--color-input-bg-disabled, #D7D7D7)'
      : 'var(--color-input-bg-default, #FFFFFF)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 400,
    fontSize: cfg.fontSize,
    lineHeight: '19.2px',
    color: 'var(--color-input-text-default, #14141E)',
    outline: 'none',
    gap: 8,
    boxSizing: 'border-box',
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    fontSize: 13,
    fontFamily: 'Rubik, sans-serif',
    color: 'var(--color-text-primary, #14141E)',
    cursor: 'pointer',
    outline: 'none',
    borderRadius: 6,
    userSelect: 'none',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, ...style }} className={className}>
      {label && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <label style={{
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 400,
            fontSize: 13,
            lineHeight: '19.2px',
            color: 'var(--color-text-primary, #14141E)',
            letterSpacing: '-0.01px',
          }}>
            {label}
          </label>
          {required && (
            <span style={{ fontSize: 12, color: 'var(--color-text-error, #EF4444)' }}>*</span>
          )}
        </div>
      )}
      <RadixSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <RadixSelect.Trigger ref={ref} style={triggerStyle} asChild={false}>
          <RadixSelect.Value placeholder={
            <span style={{ color: 'var(--color-input-text-placeholder, #9F9F9F)' }}>{placeholder}</span>
          } />
          <RadixSelect.Icon>
            <ChevronDown size={16} color="var(--color-text-tertiary, #828282)" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={4}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
              borderRadius: 10,
              boxShadow: 'var(--shadow)',
              padding: 4,
              zIndex: 9999,
              minWidth: 'var(--radix-select-trigger-width)',
              maxHeight: 320,
              overflow: 'auto',
            }}
          >
            <RadixSelect.ScrollUpButton style={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
              <ChevronUp size={14} />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport>
              {allGroups.map((group, gi) => (
                <RadixSelect.Group key={gi}>
                  {group.label && (
                    <RadixSelect.Label style={{
                      padding: '6px 12px 2px',
                      fontSize: 11,
                      fontFamily: 'Rubik, sans-serif',
                      fontWeight: 600,
                      color: 'var(--color-text-tertiary, #828282)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}>
                      {group.label}
                    </RadixSelect.Label>
                  )}
                  {group.options.map((opt) => (
                    <RadixSelect.Item
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.disabled}
                      className="hx-select-item"
                      style={itemStyle}
                    >
                      <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                      <RadixSelect.ItemIndicator>
                        <Check size={14} color="var(--color-brand-primary, #F57E20)" strokeWidth={2.5} />
                      </RadixSelect.ItemIndicator>
                    </RadixSelect.Item>
                  ))}
                </RadixSelect.Group>
              ))}
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton style={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
              <ChevronDown size={14} />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
      <style>{`
        .hx-select-item[data-highlighted] {
          background-color: var(--color-status-brand-bg, #FEF2E9);
          outline: none;
        }
        .hx-select-item[data-disabled] {
          color: var(--color-text-muted, #9F9F9F);
          cursor: not-allowed;
          opacity: 0.5;
        }
      `}</style>
      {(helperText || errorText) && (
        <p style={{
          margin: 0,
          fontFamily: 'Rubik, sans-serif',
          fontSize: 12,
          lineHeight: '18px',
          color: errorText
            ? 'var(--color-text-error, #EF4444)'
            : 'var(--color-text-tertiary, #828282)',
        }}>
          {errorText || helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

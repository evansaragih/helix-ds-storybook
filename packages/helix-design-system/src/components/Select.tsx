import * as RadixPopover from '@radix-ui/react-popover';
import { Check, ChevronDown, Search } from 'lucide-react';
import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { FieldMessage } from './FieldMessage';
import { fieldBoxStyle, labelText, placeholderCss } from './Input';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/** Figma Selection — single picks one item and closes; multi shows checkbox rows with search and Apply / Clear */
export type SelectSelection = 'single' | 'multi';

export interface SelectProps {
  options: SelectOption[];
  selection?: SelectSelection;
  /** Selected value (single) */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Selected values (multi) */
  values?: string[];
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;
  placeholder?: string;
  /** Static label — above the trigger, or beside it with layout 'horizontal' (Figma Trigger=Input+Label / Input Horizontal) */
  label?: string;
  required?: boolean;
  /** Label inside the trigger that shrinks when a value is chosen (Figma Trigger=Input-Floating) */
  floating?: boolean;
  layout?: 'vertical' | 'horizontal';
  hint?: string;
  /** Error message under the trigger — also puts the select in the Error state */
  error?: string;
  invalid?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const BRAND = 'var(--color-brand-primary, #F57E20)';

/** A form field: an Input-style trigger that opens a list of selectable options. Single selection closes on pick; multi selection adds search and Apply / Clear. For command menus use Dropdown. */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(({
  options,
  selection = 'single',
  value: controlledValue,
  defaultValue,
  onValueChange,
  values: controlledValues,
  defaultValues = [],
  onValuesChange,
  placeholder = 'Select',
  label,
  required = false,
  floating = false,
  layout = 'vertical',
  hint,
  error,
  invalid = false,
  disabled = false,
  style,
  className,
}, ref) => {
  const multi = selection === 'multi';
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [internalValues, setInternalValues] = useState<string[]>(defaultValues);
  const [draft, setDraft] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const isInvalid = invalid || Boolean(error);

  const value = controlledValue ?? internalValue;
  const values = controlledValues ?? internalValues;
  const selectedLabels = multi
    ? options.filter((o) => values.includes(o.value)).map((o) => o.label)
    : options.filter((o) => o.value === value).map((o) => o.label);
  const hasValue = selectedLabels.length > 0;
  const text = hasValue ? (multi && selectedLabels.length > 2 ? `${selectedLabels.length} selected` : selectedLabels.join(', ')) : '';
  const lifted = floating && (hasValue || open);

  useEffect(() => { if (open) { setDraft(values); setQuery(''); } }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const pickSingle = (v: string) => {
    if (controlledValue === undefined) setInternalValue(v);
    onValueChange?.(v);
    setOpen(false);
  };
  const apply = () => {
    if (controlledValues === undefined) setInternalValues(draft);
    onValuesChange?.(draft);
    setOpen(false);
  };

  const visible = options.filter((o) => !multi || o.label.toLowerCase().includes(query.toLowerCase()));

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const items = Array.from(listRef.current?.querySelectorAll<HTMLElement>('[data-option]:not([data-disabled])') ?? []);
    const i = items.indexOf(document.activeElement as HTMLElement);
    const next = e.key === 'ArrowDown' ? items[Math.min(i + 1, items.length - 1)] : items[Math.max(i - 1, 0)];
    if (next) { e.preventDefault(); next.focus(); }
  };

  const trigger = (
    <RadixPopover.Trigger asChild>
      <button
        ref={ref}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={isInvalid || undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative', display: 'flex', alignItems: 'center', gap: 8, width: '100%', textAlign: 'left', boxSizing: 'border-box',
          height: floating ? 48 : 36, padding: '0 8px', borderRadius: 8, cursor: disabled ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '20px', letterSpacing: '-0.01px',
          ...fieldBoxStyle({ hovered, focused: open, invalid: isInvalid, disabled }),
          ...(floating && !open && !isInvalid && !disabled ? { boxShadow: '0 1px 2px rgba(89,89,90,0.15)' } : {}),
        }}
      >
        {floating && label && (
          <span style={{
            position: 'absolute', left: 8, top: lifted ? 6 : '50%', transform: lifted ? 'none' : 'translateY(-50%)',
            fontSize: lifted ? 10 : 13, lineHeight: lifted ? '15.6px' : '20px', color: 'var(--color-text-muted, #9F9F9F)', transition: 'all var(--motion-duration-fast) var(--motion-easing-standard)', pointerEvents: 'none',
          }}>{label}</span>
        )}
        <span style={{
          flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          paddingTop: floating && lifted ? 16 : 0,
          color: hasValue ? 'var(--color-text-primary, #14141E)' : 'var(--color-text-muted, #9F9F9F)',
        }}>
          {hasValue ? text : floating ? '' : placeholder}
        </span>
        <ChevronDown size={16} style={{ flexShrink: 0, color: 'var(--color-text-secondary, #49494A)', transform: open ? 'rotate(180deg)' : undefined, transition: 'transform var(--motion-duration-fast) var(--motion-easing-standard)' }} />
      </button>
    </RadixPopover.Trigger>
  );

  const labelEl = label && !floating && (
    <label htmlFor={id} style={{ ...labelText, display: 'inline-flex', gap: 4 }}>
      {label}{required && <span aria-hidden="true" style={{ color: 'var(--color-destructive, #DC2626)' }}>*</span>}
    </label>
  );

  const optionStyle = (selected: boolean, disabledOpt?: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 8, width: '100%', minHeight: 36, boxSizing: 'border-box', padding: '8px 12px', border: 'none', borderRadius: 6, textAlign: 'left',
    background: selected && !multi ? 'var(--color-status-brand-bg, #FEF2E9)' : 'transparent', cursor: disabledOpt ? 'not-allowed' : 'pointer', opacity: disabledOpt ? 0.5 : 1,
    fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px',
    color: selected && !multi ? BRAND : 'var(--color-text-primary, #14141E)',
  });

  return (
    <div className={className} style={{ display: 'flex', flexDirection: layout === 'horizontal' && !floating ? 'row' : 'column', gap: layout === 'horizontal' ? 12 : 6, ...style }}>
      <style>{`${placeholderCss} .helix-option:hover:not([data-disabled]),.helix-option:focus-visible{background:var(--color-container-secondary,#F7F7F7)!important;outline:none}`}</style>
      {layout === 'horizontal' && !floating ? <div style={{ width: 96, flexShrink: 0, minHeight: 36, display: 'flex', alignItems: 'center' }}>{labelEl}</div> : labelEl}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <RadixPopover.Root open={open} onOpenChange={setOpen}>
          {trigger}
          <RadixPopover.Portal>
            <RadixPopover.Content
              className="helix-pop"
              align="start"
              sideOffset={8}
              onOpenAutoFocus={(e) => { if (!multi) { e.preventDefault(); (listRef.current?.querySelector('[data-option][aria-selected="true"],[data-option]') as HTMLElement | null)?.focus(); } }}
              style={{
                width: 'var(--radix-popover-trigger-width)', minWidth: 200, boxSizing: 'border-box', padding: 4, borderRadius: 12, zIndex: 1000,
                backgroundColor: 'var(--color-container-secondary, #F7F7F7)', border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
                boxShadow: '0 1px 3px rgba(89,89,90,0.15), 0 1px 2px rgba(89,89,90,0.15)',
              }}
            >
              {multi && (
                <div style={{ padding: '0 0 4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36, padding: '0 8px', borderRadius: 8, boxSizing: 'border-box', backgroundColor: '#FFFFFF', border: '1px solid var(--color-stroke-subtle, #EEEEEE)' }}>
                    <Search size={16} style={{ color: 'var(--color-text-tertiary, #828282)' }} />
                    <input
                      className="helix-field"
                      autoFocus
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search"
                      aria-label="Search options"
                      style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-family-body)', fontSize: 13 }}
                    />
                  </div>
                </div>
              )}
              <div
                ref={listRef}
                role="listbox"
                aria-multiselectable={multi || undefined}
                onKeyDown={onListKeyDown}
                style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 280, overflowY: 'auto', padding: 8, borderRadius: 8, backgroundColor: '#FFFFFF', border: '1px solid var(--color-stroke-subtle, #EEEEEE)' }}
              >
                {visible.length === 0 && <div style={{ ...optionStyle(false), cursor: 'default' }}>No results</div>}
                {visible.map((o) => {
                  const selected = multi ? draft.includes(o.value) : o.value === value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      role="option"
                      data-option=""
                      data-disabled={o.disabled ? '' : undefined}
                      aria-selected={selected}
                      className="helix-option"
                      disabled={o.disabled}
                      onClick={() => (multi ? setDraft((d) => (d.includes(o.value) ? d.filter((x) => x !== o.value) : [...d, o.value])) : pickSingle(o.value))}
                      style={optionStyle(selected, o.disabled)}
                    >
                      {multi && <span style={{ pointerEvents: 'none', display: 'flex' }}><Checkbox size="sm" checked={selected} readOnly tabIndex={-1} onChange={() => {}} aria-hidden /></span>}
                      <span style={{ flex: 1 }}>{o.label}</span>
                      {!multi && selected && <Check size={16} />}
                    </button>
                  );
                })}
              </div>
              {multi && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12, padding: '8px 4px 4px' }}>
                  <Button size="xs" hierarchy="secondary" appearance="outline" onClick={() => setDraft([])}>Clear</Button>
                  <Button size="xs" hierarchy="tertiary" onClick={apply}>Apply</Button>
                </div>
              )}
            </RadixPopover.Content>
          </RadixPopover.Portal>
        </RadixPopover.Root>
        {(error || hint) && <FieldMessage state={error ? 'error' : 'default'}>{error ?? hint}</FieldMessage>}
      </div>
    </div>
  );
});

Select.displayName = 'Select';

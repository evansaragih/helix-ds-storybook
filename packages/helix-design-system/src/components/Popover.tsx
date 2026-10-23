import * as RadixPopover from '@radix-ui/react-popover';
import { forwardRef } from 'react';
import { Search } from 'lucide-react';

export interface PopoverProps {
  /** The element that opens the popover (Button, Icon Button, Input, Tag), rendered as-is (asChild) */
  trigger: React.ReactElement;
  /** Body Item List — the main content, on a white inset */
  children: React.ReactNode;
  /** Header Content slot (Figma Header=True) — e.g. a PopoverListHeader */
  header?: React.ReactNode;
  /** Footer Content slot (Figma Footer=True) — e.g. FooterActions */
  footer?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  /** Panel width in px (default 240, as in Figma) */
  width?: number;
  /** Caps the body height and scrolls the rest (Figma Vertical Scrollbar) */
  maxHeight?: number;
}

const BORDER = '1px solid var(--color-stroke-subtle, #EEEEEE)';

/** The base floating panel: a trigger plus a shell with Header, Body and Footer slots. Use it to build a trigger-and-panel from scratch; for finished patterns use Dropdown (actions) or Select (form field). */
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(({
  trigger,
  children,
  header,
  footer,
  open,
  defaultOpen,
  onOpenChange,
  side = 'bottom',
  align = 'start',
  width = 240,
  maxHeight,
}, ref) => (
  <RadixPopover.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
    <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
    <RadixPopover.Portal>
      <RadixPopover.Content
        ref={ref}
        className="helix-pop"
        side={side}
        align={align}
        sideOffset={8}
        style={{
          width, boxSizing: 'border-box', padding: 4, borderRadius: 12, zIndex: 1000,
          backgroundColor: 'var(--color-container-secondary, #F7F7F7)', border: BORDER,
          boxShadow: '0 1px 3px rgba(89,89,90,0.15), 0 1px 2px rgba(89,89,90,0.15)',
        }}
      >
        {header}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 8, borderRadius: 8, backgroundColor: '#FFFFFF', border: BORDER, maxHeight, overflowY: maxHeight ? 'auto' : undefined }}>
          {children}
        </div>
        {footer}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  </RadixPopover.Root>
));

Popover.displayName = 'Popover';

/* ─── PopoverListHeader (Figma: popover-list-header) ───────────────── */
export interface PopoverListHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** text = muted caption · text-primary = brand caption · user = avatar + name + action · search = search field */
  type?: 'text' | 'text-primary' | 'user' | 'search';
  label?: React.ReactNode;
  supportingText?: React.ReactNode;
  /** Trailing control — an Icon Button (text types) or Button (user) */
  action?: React.ReactNode;
  /** Leading node for type 'user' — an Avatar */
  avatar?: React.ReactNode;
  /** Search value, placeholder and handler for type 'search' */
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
}

/** The header row of a Popover: a caption, a user block, or a search field. */
export const PopoverListHeader = forwardRef<HTMLDivElement, PopoverListHeaderProps>(({
  type = 'text',
  label,
  supportingText,
  action,
  avatar,
  searchValue,
  searchPlaceholder = 'Search',
  onSearchChange,
  style,
  ...props
}, ref) => {
  if (type === 'search') {
    return (
      <div ref={ref} style={{ paddingBottom: 4, ...style }} {...props}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36, padding: '0 8px', boxSizing: 'border-box', borderRadius: 8, backgroundColor: '#FFFFFF', border: BORDER }}>
          <Search size={16} style={{ color: 'var(--color-text-tertiary, #828282)', flexShrink: 0 }} />
          <input
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-family-body)', fontSize: 13 }}
          />
        </div>
      </div>
    );
  }

  if (type === 'user') {
    return (
      <div ref={ref} style={{ paddingBottom: 4, ...style }} {...props}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, padding: 12, borderRadius: 8, backgroundColor: '#FFFFFF', border: BORDER }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            {avatar}
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{ fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 13, lineHeight: '19.2px', color: 'var(--color-text-secondary, #49494A)' }}>{label}</span>
              {supportingText && <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', color: 'var(--color-text-tertiary, #828282)' }}>{supportingText}</span>}
            </div>
          </div>
          {action}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: type === 'text' ? '4px 10px' : '4px 6px 4px 12px', ...style }} {...props}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, minWidth: 0 }}>
        <span style={{ fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 13, lineHeight: '20px', color: type === 'text' ? 'var(--color-text-tertiary, #828282)' : 'var(--color-brand-primary, #F57E20)' }}>{label}</span>
        {supportingText && <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 12, lineHeight: '14px', color: 'var(--color-text-tertiary, #828282)' }}>{supportingText}</span>}
      </div>
      {action}
    </div>
  );
});

PopoverListHeader.displayName = 'PopoverListHeader';

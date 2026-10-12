import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import { forwardRef, useId } from 'react';

export interface DropdownMenuItem {
  /** Omit or 'item' for an action; 'divider' draws a separator */
  type?: 'item' | 'divider';
  label?: string;
  icon?: React.ReactNode;
  /** Keyboard shortcut hint on the right, e.g. "⌘K" */
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface DropdownMenuProps {
  /** The element that opens the menu — a Button, IconButton, Tag or ListItem (Figma _popover-trigger). Rendered as-is (asChild). */
  trigger: React.ReactElement;
  items: DropdownMenuItem[];
  /** Heading text, or a node such as an AvatarGroup, shown above the list */
  header?: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  /** Panel width in px (default 240) */
  width?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** An action menu opened from a Button, IconButton, Tag or ListItem trigger. Choosing an item runs it and closes the menu — nothing is filtered or multi-selected. Use Select for choosing a value. */
export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(({
  trigger,
  items,
  header,
  side = 'bottom',
  align = 'start',
  width = 240,
  open,
  onOpenChange,
}, ref) => {
  const scope = `helix-menu-${useId().replace(/:/g, '')}`;

  return (
    <RadixMenu.Root open={open} onOpenChange={onOpenChange}>
      <RadixMenu.Trigger asChild>{trigger}</RadixMenu.Trigger>
      <RadixMenu.Portal>
        <RadixMenu.Content
          ref={ref}
          className={scope}
          side={side}
          align={align}
          sideOffset={8}
          style={{
            width,
            boxSizing: 'border-box',
            padding: 4,
            borderRadius: 12,
            backgroundColor: 'var(--color-container-secondary, #F7F7F7)',
            border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
            boxShadow: 'var(--shadow-sm)',
            zIndex: 1000,
          }}
        >
          <style>{`
            .${scope} [role="menuitem"][data-highlighted] { background-color: var(--color-status-brand-bg, #FEF2E9); outline: none; }
            .${scope} [role="menuitem"][data-highlighted][data-destructive] { background-color: var(--primitive-red-5, #FECACA); }
            .${scope} [role="menuitem"][data-disabled] { opacity: 0.5; cursor: not-allowed; }
          `}</style>
          {header && (
            <div style={{ padding: '4px 10px', fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 13, lineHeight: '19.2px', color: 'var(--color-text-tertiary, #828282)' }}>
              {header}
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 8, borderRadius: 8, backgroundColor: 'var(--color-container-primary, #FFFFFF)' }}>
            {items.map((item, i) => item.type === 'divider' ? (
              <RadixMenu.Separator key={i} style={{ height: 1, borderRadius: 16, backgroundColor: 'var(--color-stroke-subtle, #EEEEEE)' }} />
            ) : (
              <RadixMenu.Item
                key={i}
                disabled={item.disabled}
                data-destructive={item.destructive ? '' : undefined}
                onSelect={item.onSelect}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, height: 36, boxSizing: 'border-box', padding: '8px 12px', borderRadius: 6,
                  cursor: 'pointer', outline: 'none',
                  fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px',
                  color: item.destructive ? 'var(--color-destructive, #DC2626)' : 'var(--color-text-primary, #14141E)',
                }}
              >
                {item.icon && <span style={{ display: 'flex', width: 16, height: 16, flexShrink: 0 }}>{item.icon}</span>}
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.shortcut && <span style={{ color: 'var(--color-text-tertiary, #828282)', fontSize: 11 }}>{item.shortcut}</span>}
              </RadixMenu.Item>
            ))}
          </div>
        </RadixMenu.Content>
      </RadixMenu.Portal>
    </RadixMenu.Root>
  );
});

DropdownMenu.displayName = 'DropdownMenu';

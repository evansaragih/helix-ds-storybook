import * as RadixTabs from '@radix-ui/react-tabs';
import { forwardRef } from 'react';

export type TabsStyle = 'primary' | 'line' | 'default';
export type TabsSize = 'sm' | 'md';
export type TabsType = 'default' | 'white';

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  tabStyle?: TabsStyle;
  size?: TabsSize;
  type?: TabsType;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  style?: React.CSSProperties;
  className?: string;
  /** Whether to render the content panels (set false to control externally) */
  renderContent?: boolean;
}

interface StyleConfig {
  listBg: string;
  listPadding: string;
  listRadius: string;
  listBorder: string;
  triggerActive: React.CSSProperties;
  triggerInactive: React.CSSProperties;
  triggerHover: React.CSSProperties;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(({
  items,
  tabStyle = 'primary',
  size = 'sm',
  type = 'default',
  defaultValue,
  value,
  onValueChange,
  style,
  className,
  renderContent = true,
}, ref) => {
  const defaultV = defaultValue ?? items.find(i => !i.disabled)?.id ?? '';

  const fontSize = size === 'md' ? 14 : 13;
  const lineH = size === 'md' ? '21px' : '19.2px';
  const py = size === 'md' ? 8 : 6;
  const px = size === 'md' ? 16 : 12;

  const isWhite = type === 'white';
  const brandColor = isWhite ? '#FFFFFF' : 'var(--color-brand-primary, #F57E20)';
  const inactiveColor = isWhite ? 'rgba(255,255,255,0.7)' : 'var(--color-text-tertiary, #828282)';
  const disabledColor = isWhite ? 'rgba(255,255,255,0.4)' : 'var(--color-text-muted, #9F9F9F)';
  // Primary (filled) style: selected tab is a solid pill — inverted from the "line" style's colored text.
  const primaryActiveBg = isWhite ? '#FFFFFF' : 'var(--color-brand-primary, #F57E20)';
  const primaryActiveText = isWhite ? 'var(--color-text-secondary, #49494A)' : '#FFFFFF';

  return (
    <RadixTabs.Root
      ref={ref}
      defaultValue={defaultV}
      value={value}
      onValueChange={onValueChange}
      style={{ display: 'flex', flexDirection: 'column', ...style }}
      className={className}
    >
      <RadixTabs.List
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: tabStyle === 'primary' ? '4px' : '0',
          borderRadius: tabStyle === 'primary' ? 8 : 0,
          backgroundColor: tabStyle === 'primary'
            ? (isWhite ? 'rgba(255,255,255,0.15)' : 'var(--color-container-tertiary, #EEEEEE)')
            : 'transparent',
          borderBottom: tabStyle === 'line'
            ? `2px solid ${isWhite ? 'rgba(255,255,255,0.2)' : 'var(--color-stroke-subtle, #EEEEEE)'}`
            : 'none',
          gap: tabStyle === 'primary' ? 0 : 0,
          flexShrink: 0,
        }}
      >
        {items.map((tab) => (
          <RadixTabs.Trigger
            key={tab.id}
            value={tab.id}
            disabled={tab.disabled}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              paddingTop: py,
              paddingBottom: tabStyle === 'line' ? py - 2 : py,
              paddingLeft: px,
              paddingRight: px,
              border: 'none',
              cursor: tab.disabled ? 'not-allowed' : 'pointer',
              fontFamily: 'Rubik, sans-serif',
              fontWeight: 500,
              fontSize,
              lineHeight: lineH,
              letterSpacing: '-0.01px',
              borderRadius: tabStyle === 'primary' ? 6 : 0,
              outline: 'none',
              position: 'relative',
              whiteSpace: 'nowrap',
              transition: 'color 0.15s, background-color 0.15s',
            }}
            // Data-state is used to toggle active/inactive styles
            // We can't use CSS here directly with inline styles, so we apply via data attribute check
            asChild={false}
          >
            {tab.icon && (
              <span style={{ display: 'flex', alignItems: 'center', width: 16, height: 16, flexShrink: 0 }}>
                {tab.icon}
              </span>
            )}
            {tab.label}
            {tab.badge !== undefined && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 18,
                height: 18,
                padding: '0 5px',
                borderRadius: 9999,
                fontSize: 10,
                fontWeight: 500,
                backgroundColor: brandColor,
                color: isWhite ? 'var(--color-brand-primary, #F57E20)' : '#FFFFFF',
              }}>
                {tab.badge}
              </span>
            )}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>

      {/* Inject active/inactive styles via a style tag pattern is not ideal;
          instead wrap content with Radix which applies data-state */}
      <style>{`
        [data-radix-tabs-trigger][data-state="active"] {
          color: ${tabStyle === 'primary' ? primaryActiveText : brandColor} !important;
          background-color: ${tabStyle === 'primary' ? primaryActiveBg : 'transparent'} !important;
          box-shadow: ${tabStyle === 'primary' ? '0 1px 1px rgba(0,0,0,0.05)' : 'none'} !important;
        }
        [data-radix-tabs-trigger][data-state="active"]::after {
          content: ${tabStyle === 'line' ? '""' : 'none'};
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: ${brandColor};
          border-radius: 2px 2px 0 0;
        }
        [data-radix-tabs-trigger][data-state="inactive"] {
          color: ${inactiveColor} !important;
          background-color: transparent !important;
        }
        [data-radix-tabs-trigger][data-state="inactive"]:hover:not([disabled]) {
          color: ${isWhite ? 'rgba(255,255,255,0.9)' : 'var(--color-text-secondary, #49494A)'} !important;
          background-color: ${tabStyle === 'primary' ? (isWhite ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)') : 'transparent'} !important;
        }
        [data-radix-tabs-trigger][disabled] {
          color: ${disabledColor} !important;
        }
      `}</style>

      {renderContent && items.map((tab) => (
        tab.content && (
          <RadixTabs.Content
            key={tab.id}
            value={tab.id}
            style={{
              paddingTop: 16,
              outline: 'none',
            }}
          >
            {tab.content}
          </RadixTabs.Content>
        )
      ))}
    </RadixTabs.Root>
  );
});

Tabs.displayName = 'Tabs';

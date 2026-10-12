import * as RadixTabs from '@radix-ui/react-tabs';
import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from './Badge';

/** Figma Appearance — horizontal: Line · Filled · Contained; vertical: Bordered · Filled · Contained */
export type TabsAppearance = 'line' | 'filled' | 'contained' | 'bordered';
/** Figma Size — Small · Medium · Large */
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsOrientation = 'horizontal' | 'vertical';

export interface TabItem {
  id: string;
  label: string;
  /** Figma Icon */
  icon?: React.ReactNode;
  /** Figma Badge — a count or short text */
  badge?: string | number;
  disabled?: boolean;
  /** Panel content, shown when the tab is selected */
  content?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  /** Defaults to 'line' (horizontal) or 'bordered' (vertical) */
  appearance?: TabsAppearance;
  orientation?: TabsOrientation;
  size?: TabsSize;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  /** Horizontal rows only: when the tabs are wider than the space, show Prev / Next buttons (Figma Nav Prev/Next) that scroll the row. They appear only on overflow and dim at either end. Default true. */
  showNavigation?: boolean;
  /** Render the content panels (set false to control content externally) */
  renderContent?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

/* Figma item sizes: horizontal height 36 / 44 / 52 (font 13 / 13 / 16); vertical height 36 / 40 / 46 (font 13 / 16 / 20) */
const H = { sm: { h: 36, py: 8, font: 13 }, md: { h: 44, py: 12, font: 13 }, lg: { h: 52, py: 12, font: 16 } } as const;
const V = { sm: { h: 36, font: 13 }, md: { h: 40, font: 16 }, lg: { h: 46, font: 20 } } as const;

const BRAND = 'var(--color-brand-primary, #F57E20)';
const SUBTLE = 'var(--color-status-brand-bg, #FEF2E9)';
const HOVER = 'var(--color-container-tertiary, #EEEEEE)';
const TRACK = 'var(--color-container-secondary, #F7F7F7)';
const LINE = 'var(--color-stroke-subtle, #EEEEEE)';

/** A set of tabs that switch between panels of content — horizontal (Line, Filled, Contained) or vertical (Bordered, Filled, Contained). */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(({
  items,
  appearance,
  orientation = 'horizontal',
  size = 'md',
  defaultValue,
  value,
  onValueChange,
  showNavigation = true,
  renderContent = true,
  style,
  className,
}, ref) => {
  const vertical = orientation === 'vertical';
  const look: TabsAppearance = appearance ?? (vertical ? 'bordered' : 'line');
  const listRef = useRef<HTMLDivElement>(null);
  const scope = `helix-tabs-${useId().replace(/:/g, '')}`;
  const [edge, setEdge] = useState({ overflow: false, start: true, end: true });
  const measure = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    setEdge({ overflow: el.scrollWidth > el.clientWidth + 1, start: el.scrollLeft <= 1, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 });
  }, []);
  const first = defaultValue ?? items.find((i) => !i.disabled)?.id ?? '';

  useEffect(() => {
    const el = listRef.current;
    if (!el || vertical || !showNavigation) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.addEventListener('scroll', measure, { passive: true });
    return () => { ro.disconnect(); el.removeEventListener('scroll', measure); };
  }, [vertical, showNavigation, items, measure]);

  // keep the selected tab in view when it changes, e.g. from the keyboard
  useEffect(() => {
    if (vertical || !showNavigation) return;
    listRef.current?.querySelector('[role="tab"][data-state="active"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [value, vertical, showNavigation]);

  const itemH = vertical ? V[size].h : H[size].h;
  const font = vertical ? V[size].font : H[size].font;
  const pill = look === 'filled' || look === 'contained';
  const radius = vertical ? 8 : 6;
  const selectedBg = look === 'contained' ? 'var(--color-container-primary, #FFFFFF)' : SUBTLE;

  const css = `
    .${scope} [role="tab"] { color: ${vertical ? 'var(--color-text-secondary, #49494A)' : 'var(--color-text-tertiary, #828282)'}; background: transparent; }
    .${scope} [role="tab"]:hover:not([disabled]):not([data-state="active"]) { background: ${look === 'line' ? 'transparent' : HOVER}; color: ${vertical ? 'var(--color-text-primary, #14141E)' : 'var(--color-text-tertiary, #828282)'}; ${look === 'line' ? `box-shadow: inset 0 -2px 0 ${LINE};` : ''} ${look === 'bordered' ? `box-shadow: none;` : ''} }
    .${scope} [role="tab"][data-state="active"] { color: ${BRAND}; background: ${look === 'line' ? 'transparent' : selectedBg}; ${look === 'line' ? `box-shadow: inset 0 -2px 0 ${BRAND};` : ''} ${look === 'contained' ? 'box-shadow: 0 1px 1px rgba(0,0,0,0.05);' : ''} }
    ${look === 'bordered' ? `.${scope} [role="tab"][data-state="active"] { border-left-color: ${BRAND} !important; }` : ''}
    .${scope} [role="tab"][disabled] { color: var(--color-text-tertiary, #828282); opacity: 0.5; cursor: not-allowed; }
    .${scope} [role="tab"]:focus-visible { outline: 2px solid ${BRAND}; outline-offset: -2px; }
  `;

  const nav = (dir: -1 | 1) => (
    <button
      type="button"
      aria-label={dir === -1 ? 'Scroll tabs back' : 'Scroll tabs forward'}
      disabled={dir === -1 ? edge.start : edge.end}
      onClick={() => { const el = listRef.current; if (el) el.scrollBy({ left: dir * Math.max(120, el.clientWidth * 0.6), behavior: 'smooth' }); }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: itemH, height: itemH, padding: 0, border: 'none', borderRadius: 8, background: 'transparent',
        color: 'var(--color-text-secondary, #49494A)', cursor: (dir === -1 ? edge.start : edge.end) ? 'default' : 'pointer', opacity: (dir === -1 ? edge.start : edge.end) ? 0.4 : 1, transition: 'opacity 0.15s',
      }}
    >
      {dir === -1 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  );

  const list = (
    <RadixTabs.List
      ref={listRef}
      style={{
        display: 'flex', flexDirection: vertical ? 'column' : 'row', gap: vertical ? 4 : 0, flex: vertical ? undefined : 1, minWidth: 0,
        overflowX: showNavigation && !vertical ? 'auto' : undefined, scrollBehavior: 'smooth', scrollbarWidth: 'none',
        ...(vertical ? { width: 240 } : {}),
        ...(vertical && pill ? { padding: 4, borderRadius: radius + 4, backgroundColor: TRACK, border: look === 'contained' ? `1px solid ${LINE}` : undefined } : {}),
      }}
    >
      {items.map((tab) => (
        <RadixTabs.Trigger
          key={tab.id}
          value={tab.id}
          disabled={tab.disabled}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: vertical ? 8 : 6, flexShrink: 0, boxSizing: 'border-box', height: itemH,
            padding: vertical ? '8px 12px' : `${H[size].py}px 12px`, border: 'none', borderLeft: look === 'bordered' ? '3px solid transparent' : 'none', borderRadius: look === 'line' ? 0 : radius,
            fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: font, lineHeight: 1.3, letterSpacing: '-0.01px', whiteSpace: 'nowrap',
            cursor: 'pointer', outline: 'none', transition: 'color 0.15s, background-color 0.15s, box-shadow 0.15s',
          }}
        >
          {tab.icon && <span style={{ display: 'flex', width: 16, height: 16, flexShrink: 0 }}>{tab.icon}</span>}
          {tab.label}
          {tab.badge !== undefined && <Badge size="xs" color="brand" appearance="solid" label={String(tab.badge)} />}
        </RadixTabs.Trigger>
      ))}
    </RadixTabs.List>
  );

  const row = vertical ? list : (
    <div style={{
      display: 'flex', alignItems: 'center', boxSizing: 'border-box',
      ...(look === 'line' ? { borderBottom: `1px solid ${LINE}` } : { padding: 4, borderRadius: radius + 2, backgroundColor: TRACK, border: look === 'contained' ? `1px solid ${LINE}` : undefined }),
    }}>
      {showNavigation && edge.overflow && nav(-1)}
      {list}
      {showNavigation && edge.overflow && nav(1)}
    </div>
  );

  return (
    <RadixTabs.Root
      ref={ref}
      defaultValue={first}
      value={value}
      onValueChange={onValueChange}
      orientation={orientation}
      className={className ? `${scope} ${className}` : scope}
      style={{ display: 'flex', flexDirection: vertical ? 'row' : 'column', gap: vertical ? 16 : 0, ...style }}
    >
      <style>{css}</style>
      {row}
      {renderContent && items.map((tab) => tab.content && (
        <RadixTabs.Content key={tab.id} value={tab.id} style={{ flex: vertical ? 1 : undefined, paddingTop: vertical ? 0 : 16, outline: 'none' }}>
          {tab.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
});

Tabs.displayName = 'Tabs';

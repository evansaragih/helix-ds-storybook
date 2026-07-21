import { useState, useRef, useEffect, useId } from 'react';
import { Input } from './Input';
import { Search, MoreHorizontal } from 'lucide-react';

export interface CommandItem {
  id: string;
  label: string;
  group?: string;
  leadingContent?: React.ReactNode;
  shortcut?: string;
  checked?: boolean;
  disabled?: boolean;
}

export interface CommandHeaderMenuItem {
  id: string;
  label: string;
  leadingContent?: React.ReactNode;
  shortcut?: string;
  onSelect?: () => void;
}

export interface CommandProps {
  /** Layout variant */
  type?: 'default' | 'checkbox' | 'radio';
  /** Title shown in the top header row (with ••• overflow icon) */
  header?: string;
  /** Items shown in the ••• dropdown on the header */
  headerMenu?: CommandHeaderMenuItem[];
  items: CommandItem[];
  placeholder?: string;
  /** Called when an item is clicked/activated */
  onSelect?: (item: CommandItem) => void;
  onQueryChange?: (query: string) => void;
  /** Controlled search value */
  value?: string;
  /** Hide the built-in search input (e.g. when an external input drives filtering) */
  hideSearch?: boolean;
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/* Drop shadow from Figma "shadow-sm" effect */
const SHADOW = 'var(--shadow-sm)';

/* Hover bg — Colors/Surface/Components/Brand Subtle */
const HOVER_BG = 'var(--color-status-brand-bg, #FEF2E9)';
/* Checkbox/radio items always sit on the brand-subtle surface */
const CHECKABLE_BG = 'var(--color-status-brand-bg, #FEF2E9)';

function CheckboxIcon({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <div style={{
        width: 16, height: 16, flexShrink: 0,
        borderRadius: 4,
        backgroundColor: 'var(--color-brand-primary, #F57E20)',
        border: '1px solid var(--color-brand-primary, #F57E20)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
          <path d="M2 5.5L4.5 8L9 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  return (
    <div style={{
      width: 16, height: 16, flexShrink: 0,
      borderRadius: 4,
      backgroundColor: '#FFFFFF',
      border: '1px solid #BABABA',
    }} />
  );
}

function RadioIcon({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <div style={{
        width: 16, height: 16, flexShrink: 0,
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-brand-primary, #F57E20)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          backgroundColor: 'var(--color-brand-primary, #F57E20)',
        }} />
      </div>
    );
  }
  return (
    <div style={{
      width: 16, height: 16, flexShrink: 0,
      borderRadius: '50%',
      backgroundColor: '#FFFFFF',
      border: '1px solid #BABABA',
    }} />
  );
}

export function Command({
  type = 'default',
  header,
  headerMenu,
  items,
  placeholder = 'This is placeholder',
  onSelect,
  onQueryChange,
  value,
  hideSearch = false,
  width = 237,
  className,
  style,
}: CommandProps) {
  const isControlled = value !== undefined;
  const [internalQuery, setInternalQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const headerMenuRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const query = isControlled ? value : internalQuery;

  const isSelectable = type === 'default';

  const filtered = items.filter(item => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return item.label.toLowerCase().indexOf(q) !== -1 ||
      (item.group !== undefined && item.group.toLowerCase().indexOf(q) !== -1);
  });

  /* Build groups preserving order */
  const groups: { group: string | null; items: CommandItem[] }[] = [];
  for (const item of filtered) {
    const g = item.group !== undefined ? item.group : null;
    let existing: { group: string | null; items: CommandItem[] } | undefined;
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].group === g) { existing = groups[i]; break; }
    }
    if (existing) existing.items.push(item);
    else groups.push({ group: g, items: [item] });
  }

  const navigable = isSelectable ? filtered.filter(i => !i.disabled) : [];

  const handleQueryChange = (q: string) => {
    if (!isControlled) setInternalQuery(q);
    onQueryChange?.(q);
    setActiveIndex(-1);
  };

  /* Close header menu on outside click */
  useEffect(() => {
    if (!headerMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (headerMenuRef.current && !headerMenuRef.current.contains(e.target as Node)) {
        setHeaderMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [headerMenuOpen]);

  /* Scroll active row into view */
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-idx="${activeIndex}"]`) as HTMLElement | null;
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSelectable) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, navigable.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (activeIndex >= 0 && navigable[activeIndex]) onSelect?.(navigable[activeIndex]); }
    else if (e.key === 'Escape') { handleQueryChange(''); }
  };

  /* ─── Item row ─────────────────────────────────────────────── */
  function ItemRow({ item }: { item: CommandItem }) {
    const [hovered, setHovered] = useState(false);
    const navIdx = navigable.indexOf(item);
    const isActive = navIdx === activeIndex;
    const isCheckable = type === 'checkbox' || type === 'radio';

    let bg = 'var(--color-container-primary, #FFFFFF)';
    if (isCheckable && item.checked) bg = CHECKABLE_BG;
    if (isActive || hovered) bg = HOVER_BG;

    return (
      <div
        data-idx={navIdx >= 0 ? navIdx : undefined}
        role={type === 'checkbox' ? 'menuitemcheckbox' : type === 'radio' ? 'menuitemradio' : 'menuitem'}
        aria-checked={isCheckable ? item.checked : undefined}
        aria-disabled={item.disabled}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          minHeight: 32, padding: '6px 8px',
          borderRadius: 6,
          backgroundColor: bg,
          cursor: item.disabled ? 'default' : 'pointer',
          opacity: item.disabled ? 0.5 : 1,
          transition: 'background-color 0.1s',
          flexShrink: 0, width: '100%', boxSizing: 'border-box',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseDown={() => { if (!item.disabled) onSelect?.(item); }}
      >
        {/* Leading: icon + label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
          {item.leadingContent && (
            <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, color: 'var(--color-text-tertiary, #828282)', width: 16, height: 16 }}>
              {item.leadingContent}
            </div>
          )}
          <span style={{
            fontFamily: 'var(--font-family-body)', fontWeight: 400,
            fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px',
            color: 'var(--color-text-primary, #14141E)',
            flex: 1, minWidth: 0,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {item.label}
          </span>
        </div>

        {/* Trailing */}
        {type === 'checkbox' && (
          <CheckboxIcon checked={!!item.checked} />
        )}
        {type === 'radio' && (
          <RadioIcon checked={!!item.checked} />
        )}
        {type === 'default' && item.shortcut && (
          <span style={{
            fontFamily: 'var(--font-family-body)', fontWeight: 400,
            fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px',
            color: 'var(--color-text-tertiary, #828282)',
            opacity: 0.6, flexShrink: 0, whiteSpace: 'nowrap',
          }}>
            {item.shortcut}
          </span>
        )}
      </div>
    );
  }

  /* ─── Header menu item row ─────────────────────────────────── */
  function HeaderMenuRow({ item }: { item: CommandHeaderMenuItem }) {
    const [hovered, setHovered] = useState(false);
    return (
      <div
        role="menuitem"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          minHeight: 32, padding: '6px 8px',
          borderRadius: 6,
          backgroundColor: hovered ? HOVER_BG : 'var(--color-container-primary, #FFFFFF)',
          cursor: 'pointer',
          transition: 'background-color 0.1s',
          width: '100%', boxSizing: 'border-box',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseDown={() => { item.onSelect?.(); setHeaderMenuOpen(false); }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
          {item.leadingContent && (
            <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, color: 'var(--color-text-tertiary, #828282)', width: 16, height: 16 }}>
              {item.leadingContent}
            </div>
          )}
          <span style={{
            fontFamily: 'var(--font-family-body)', fontWeight: 400,
            fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px',
            color: 'var(--color-text-primary, #14141E)',
            flex: 1, minWidth: 0,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {item.label}
          </span>
        </div>
        {item.shortcut && (
          <span style={{
            fontFamily: 'var(--font-family-body)', fontWeight: 400,
            fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px',
            color: 'var(--color-text-tertiary, #828282)',
            opacity: 0.6, flexShrink: 0, whiteSpace: 'nowrap',
          }}>
            {item.shortcut}
          </span>
        )}
      </div>
    );
  }

  /* ─── Render ────────────────────────────────────────────────── */
  return (
    <div
      role="menu"
      onKeyDown={handleKeyDown}
      className={className}
      style={{
        width,
        display: 'flex', flexDirection: 'column',
        backgroundColor: 'var(--color-container-primary, #FFFFFF)',
        border: '1px solid var(--color-stroke-default, #D7D7D7)',
        borderRadius: 6,
        boxShadow: SHADOW,
        paddingTop: 4, paddingBottom: 4,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Header row (with title + ••• icon) */}
      {header && (
        <div style={{ position: 'relative', flexShrink: 0, marginLeft: 4, marginRight: 4 }} ref={headerMenuRef}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '6px 8px',
          }}>
            <span style={{
              fontFamily: 'var(--font-family-body)', fontWeight: 500,
              fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.13px',
              color: 'var(--color-text-primary, #14141E)',
              whiteSpace: 'nowrap',
            }}>
              {header}
            </span>
            {headerMenu && headerMenu.length > 0 ? (
              <button
                onClick={() => setHeaderMenuOpen(v => !v)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'none', border: 'none', padding: 2,
                  cursor: 'pointer', borderRadius: 4,
                  color: 'var(--color-text-tertiary, #828282)',
                }}
              >
                <MoreHorizontal size={16} />
              </button>
            ) : (
              <MoreHorizontal size={16} color="var(--color-text-tertiary, #828282)" />
            )}
          </div>

          {/* ••• dropdown */}
          {headerMenuOpen && (
            <div
              role="menu"
              style={{
                position: 'absolute', top: '100%', right: 0, zIndex: 50,
                backgroundColor: 'var(--color-container-primary, #FFFFFF)',
                border: '1px solid var(--color-stroke-default, #D7D7D7)',
                borderRadius: 6,
                boxShadow: SHADOW,
                padding: 4,
                minWidth: 160,
              }}
            >
              {(headerMenu ?? []).map(item => (
                <HeaderMenuRow key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search input */}
      {!hideSearch && (
        <div style={{ padding: '0 8px', paddingTop: header ? 0 : 10, paddingBottom: 6, flexShrink: 0 }}>
          <Input
            size="sm"
            placeholder={placeholder}
            leadingContent={<Search size={16} />}
            value={query}
            onChange={e => handleQueryChange(e.target.value)}
            style={{ borderRadius: 8 }}
          />
        </div>
      )}

      {/* Item list */}
      <div
        id={listId}
        ref={listRef}
        role="listbox"
        style={{ display: 'flex', flexDirection: 'column', overflow: 'auto' }}
      >
        {filtered.length === 0 ? (
          <div style={{
            padding: '20px 12px', textAlign: 'center',
            fontFamily: 'var(--font-family-body)', fontSize: 13,
            color: 'var(--color-text-tertiary, #828282)',
          }}>
            No results for &ldquo;{query}&rdquo;
          </div>
        ) : (
          groups.map(({ group, items: groupItems }, gIdx) => (
            <div key={group ?? `__g${gIdx}`}>
              {/* Divider between groups */}
              {gIdx > 0 && (
                <div style={{ padding: '0 4px', margin: '4px 0', flexShrink: 0 }}>
                  <div style={{ height: 1, backgroundColor: 'var(--color-stroke-subtle, #D7D7D7)' }} />
                </div>
              )}

              <div style={{ padding: '0 4px', flexShrink: 0 }}>
                {/* Group label */}
                {group && (
                  <div style={{ padding: '6px 8px' }}>
                    <span style={{
                      fontFamily: 'var(--font-family-body)', fontWeight: 500,
                      fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.13px',
                      color: 'var(--color-text-primary, #14141E)',
                      whiteSpace: 'nowrap',
                    }}>
                      {group}
                    </span>
                  </div>
                )}

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: type !== 'default' ? 4 : 0, padding: type !== 'default' ? '8px 0' : 0 }}>
                  {groupItems.map(item => (
                    <ItemRow key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

Command.displayName = 'Command';

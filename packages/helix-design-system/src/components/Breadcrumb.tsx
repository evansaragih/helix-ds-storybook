import { forwardRef, useState } from 'react';
import { ChevronRight, Slash, MoreHorizontal } from 'lucide-react';
import { DropdownMenu } from './DropdownMenu';
import type { DropdownMenuItem } from './DropdownMenu';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  /** Figma Divider */
  divider?: 'chevron' | 'slash';
  /** Turns the last crumb into a context switcher: a menu of sibling destinations (Figma last crumb as a Popover trigger) */
  currentMenu?: DropdownMenuItem[];
}

/** A trail never shows more than three crumbs: past this many the middle ones collapse behind a "…" menu (Figma Extra Crumb) */
const MAX_CRUMBS = 3;

const crumb = (active: boolean, hovered: boolean): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', gap: 6, boxSizing: 'border-box', height: 28, padding: '4px 10px', borderRadius: 8, border: 'none',
  backgroundColor: hovered ? 'var(--color-container-tertiary, #EEEEEE)' : 'transparent',
  color: active ? 'var(--color-text-primary, #14141E)' : 'var(--color-text-tertiary, #828282)',
  fontFamily: 'var(--font-family-body)', fontWeight: 400, fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px',
  textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background-color 0.15s',
});

function Crumb({ item, active, as }: { item: BreadcrumbItem; active?: boolean; as?: 'button' }) {
  const [hovered, setHovered] = useState(false);
  const props = { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), style: crumb(Boolean(active), hovered && !active) };
  if (item.href && !active) {
    return <a href={item.href} onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick!(); } : undefined} {...props}>{item.label}</a>;
  }
  if (item.onClick && !active) return <button type="button" onClick={item.onClick} {...props}>{item.label}</button>;
  return <span aria-current={active ? 'page' : undefined} {...props} style={{ ...props.style, cursor: as === 'button' ? 'pointer' : 'default' }}>{item.label}</span>;
}

/** A trail of links showing where the current page sits in the hierarchy. It shows at most three crumbs — the first, a "…" menu holding every crumb in between, and the current page — and the last crumb can switch context. */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(({
  items,
  divider = 'chevron',
  currentMenu,
  style,
  ...props
}, ref) => {
  const collapsed = items.length > MAX_CRUMBS;
  const hidden = collapsed ? items.slice(1, -1) : [];   // every step between the first and the last
  const shown = collapsed ? [items[0], null, items[items.length - 1]] : items;

  const Sep = divider === 'slash' ? <Slash size={10} /> : <ChevronRight size={10} />;

  return (
    <nav ref={ref} aria-label="Breadcrumb" style={style} {...props}>
      <ol style={{ display: 'flex', alignItems: 'center', gap: 2, margin: 0, padding: 0, listStyle: 'none' }}>
        {shown.map((item, i) => {
          const last = i === shown.length - 1;
          return (
            <li key={item ? `${item.label}-${i}` : 'more'} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {item === null ? (
                <DropdownMenu
                  align="start"
                  trigger={<button type="button" aria-label={`Show ${hidden.length} hidden pages`} aria-haspopup="menu" style={{ ...crumb(false, false), width: 24, height: 24, padding: 0, justifyContent: 'center' }}><MoreHorizontal size={14} /></button>}
                  items={hidden.map((h) => ({ label: h.label, onSelect: h.onClick ?? (h.href ? () => { window.location.href = h.href!; } : undefined) }))}
                />
              ) : last && currentMenu ? (
                <DropdownMenu
                  align="start"
                  trigger={<button type="button" aria-haspopup="menu" style={{ ...crumb(true, false) }}>{item.label}<span style={{ display: 'flex', color: 'var(--color-text-tertiary, #828282)' }}><ChevronRight size={12} style={{ transform: 'rotate(90deg)' }} /></span></button>}
                  items={currentMenu}
                />
              ) : (
                <Crumb item={item} active={last} />
              )}
              {!last && <span aria-hidden="true" style={{ display: 'flex', color: 'var(--color-text-tertiary, #828282)' }}>{Sep}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

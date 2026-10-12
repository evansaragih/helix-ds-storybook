import { useState } from 'react';
import { ChevronDown, Palette, Boxes } from 'lucide-react';
import helixMarkSvg from '../../assets/logo/helix-mark.svg';
import { Badge } from '../../components/Badge';
import { IconButton } from '../../components/IconButton';
import { foundationItems, componentItems, type NavItem } from '../data/navigation';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed: boolean;
}

const groups: { id: string; label: string; items: NavItem[]; icon: typeof Palette }[] = [
  { id: 'foundations', label: 'Foundations', items: foundationItems, icon: Palette },
  { id: 'components', label: 'Components', items: componentItems, icon: Boxes },
];

export function Sidebar({ activeSection, onSectionChange, isCollapsed }: SidebarProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (id: string) =>
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  return (
    <aside className="dx-sidebar" style={{ width: isCollapsed ? 64 : 248 }}>
      <button className="dx-brand" onClick={() => onSectionChange('overview')} aria-label="Helix Design System home" style={{ justifyContent: isCollapsed ? 'center' : 'flex-start', padding: isCollapsed ? 0 : undefined }}>
        <img src={helixMarkSvg} alt="" />
        {!isCollapsed && <span className="dx-brand-name">helix</span>}
      </button>

      {isCollapsed ? (
        <div className="dx-collapsed-rail">
          {groups.map(({ id, label, items, icon: Icon }) => (
            <IconButton
              key={id}
              hierarchy="secondary"
              appearance={items.some((i) => i.id === activeSection) ? 'subtle' : 'ghost'}
              size="sm"
              aria-label={label}
              title={label}
              icon={<Icon size={18} />}
              onClick={() => onSectionChange(items[0].id)}
            />
          ))}
        </div>
      ) : (
        <nav className="dx-nav" aria-label="Documentation">
          {groups.map(({ id, label, items }) => {
            const open = !collapsedGroups.has(id);
            return (
              <div key={id} className="dx-group">
                <button className="dx-group-label" aria-expanded={open} onClick={() => toggleGroup(id)}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {label}
                    <Badge label={String(items.length)} color="neutral" appearance="subtle" size="xs" />
                  </span>
                  <ChevronDown size={14} />
                </button>
                {open && items.map((item) => (
                  <button
                    key={item.id}
                    className="dx-item"
                    aria-current={activeSection === item.id ? 'page' : undefined}
                    onClick={() => onSectionChange(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            );
          })}
        </nav>
      )}
    </aside>
  );
}

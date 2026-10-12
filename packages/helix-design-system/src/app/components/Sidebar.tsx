import { LayoutGrid, Palette, Atom, Boxes, Network, LayoutTemplate } from 'lucide-react';
import helixMarkSvg from '../../assets/logo/helix-mark.svg';
import { Badge } from '../../components/Badge';
import { navGroups } from '../data/navigation';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  /** Group whose pages are shown in the second panel, or null when it is closed */
  openGroup: string | null;
  onOpenGroupChange: (group: string | null) => void;
}

export const RAIL_WIDTH = 72;
export const PANEL_WIDTH = 232;

const groupIcons: Record<string, typeof Palette> = {
  foundations: Palette,
  Atomic: Atom,
  Molecule: Boxes,
  Organism: Network,
  Template: LayoutTemplate,
};

export function Sidebar({ activeSection, onSectionChange, openGroup, onOpenGroupChange }: SidebarProps) {
  const group = navGroups.find((g) => g.id === openGroup);
  const activeGroup = navGroups.find((g) => g.items.some((i) => i.id === activeSection))?.id;

  return (
    <>
      <aside className="dx-rail" aria-label="Sections">
        <button className="dx-brand" onClick={() => { onSectionChange('overview'); onOpenGroupChange(null); }} aria-label="Helix Design System home">
          <img src={helixMarkSvg} alt="" />
        </button>
        <button
          className="dx-rail-btn"
          aria-current={activeSection === 'overview' ? 'page' : undefined}
          onClick={() => { onSectionChange('overview'); onOpenGroupChange(null); }}
        >
          <LayoutGrid size={20} />
          <span>Overview</span>
        </button>
        {navGroups.map(({ id, label }) => {
          const Icon = groupIcons[id] ?? Boxes;
          return (
            <button
              key={id}
              className="dx-rail-btn"
              aria-expanded={openGroup === id}
              aria-current={openGroup === null && activeGroup === id ? 'true' : undefined}
              onClick={() => onOpenGroupChange(openGroup === id ? null : id)}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          );
        })}
      </aside>

      {group && (
        <nav className="dx-panel" aria-label={group.label}>
          <div className="dx-panel-head">
            <h2>{group.label}</h2>
            <Badge label={String(group.items.length)} color="neutral" appearance="subtle" size="xs" />
          </div>
          <div className="dx-panel-list">
            {group.items.map((item) => (
              <button key={item.id} className="dx-item" aria-current={activeSection === item.id ? 'page' : undefined} onClick={() => onSectionChange(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}

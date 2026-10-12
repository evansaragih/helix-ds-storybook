import { ComponentDocPage } from './ComponentDocPage';
import { Sidebar, SidebarItem, Badge, Logo } from '../../components';
import { LayoutDashboard, FlaskConical, Users, Settings } from 'lucide-react';

export function SidebarSection() {
  return (
    <ComponentDocPage
      slug="sidebar"
      title="Sidebars"
      description="The primary app navigation rail. Expanded shows icon and label; collapsed shows icons only. Compose with SidebarItem."
      usage={[
        { heading: 'Icon plus label', body: 'Every item needs an icon so it still reads when collapsed.' },
        { heading: 'One selected item', body: 'Mark the current page; the rest stay quiet.' },
        { heading: 'Pin account items', body: 'Use the footer slot for settings and sign out.' },
      ]}
      demos={[
        { id: 'expanded', title: 'Expanded', node: (<div style={{ height: 360, display: 'flex' }}><Sidebar header={<><Logo variant="wordmark" /><Badge label="Beta" size="xs" color="brand" appearance="solid" /></>}><SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" selected /><SidebarItem icon={<FlaskConical size={20} />} label="Lab processing" /><SidebarItem icon={<Users size={20} />} label="Customers" /><SidebarItem icon={<Settings size={20} />} label="Settings" disabled /></Sidebar></div>) },
        { id: 'collapsed', title: 'Collapsed', node: (<div style={{ height: 360, display: 'flex' }}><Sidebar collapsed header={<Logo variant="mark" />}><SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" selected /><SidebarItem icon={<FlaskConical size={20} />} label="Lab processing" /><SidebarItem icon={<Users size={20} />} label="Customers" /></Sidebar></div>) },
      ]}
    />
  );
}

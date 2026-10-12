import { ComponentDocPage } from './ComponentDocPage';
import { DashboardLayout, DashboardNavbar, DashboardFooter, Sidebar, SidebarItem, SectionHeader, MetricTile, Breadcrumb, Button, Logo } from '../../components';
import { LayoutDashboard, FlaskConical, Users, Activity } from 'lucide-react';

export function DashboardLayoutSection() {
  return (
    <ComponentDocPage
      slug="dashboard-layout"
      title="Dashboard Layout"
      description="The app shell for dashboard pages: a Sidebar beside a rounded content panel with a pinned navbar and footer and a scrolling body."
      usage={[
        { heading: 'One shell per app', body: 'Wrap every dashboard page in the same layout so navigation stays put.' },
        { heading: 'Scrolling body', body: 'Only the middle scrolls; the navbar and footer stay pinned.' },
        { heading: 'Footer when needed', body: 'Use the footer for save / cancel on form pages.' },
      ]}
      demos={[
        { id: 'shell', title: 'Layout', node: (<div style={{ height: 520, border: '1px solid #EEEEEE', borderRadius: 8, overflow: 'hidden' }}><DashboardLayout sidebar={<Sidebar header={<Logo variant="wordmark" />}><SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" selected /><SidebarItem icon={<FlaskConical size={20} />} label="Lab processing" /><SidebarItem icon={<Users size={20} />} label="Customers" /></Sidebar>} navbar={<DashboardNavbar leftContent={<Breadcrumb items={[{ label: 'Lab' }, { label: 'Overview' }]} />} rightContent={<Button hierarchy="secondary" appearance="solid" size="sm">Export</Button>} />} footer={<DashboardFooter leftContent={<Button hierarchy="secondary" appearance="ghost" size="sm">Back</Button>} rightContent={<Button hierarchy="primary" appearance="solid" size="sm">Save</Button>} />}><SectionHeader title="Growth Analytics" /><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>{['Samples','Reports','Customers'].map(l => <MetricTile key={l} icon={<Activity size={14} />} label={l} value="1,234" delta={{ label: '+4%' }} comparison="vs last month" />)}</div></DashboardLayout></div>) },
      ]}
    />
  );
}

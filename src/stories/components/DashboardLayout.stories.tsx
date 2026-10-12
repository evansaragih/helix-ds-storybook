import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardLayout, DashboardNavbar, DashboardFooter, Sidebar, SidebarItem, SectionHeader, MetricTile, Breadcrumb, Button, Logo, Badge } from 'helix-design-system/components';
import { LayoutDashboard, FlaskConical, Users, Settings, Activity } from 'lucide-react';

const meta = {
  title: 'Template/Dashboard Layout',
  component: DashboardLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { children: null },
} satisfies Meta<typeof DashboardLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <div style={{ height: 720 }}>
      <DashboardLayout
        sidebar={
          <Sidebar header={<><Logo variant="wordmark" /><Badge label="Beta" size="xs" color="brand" appearance="solid" /></>}>
            <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" selected />
            <SidebarItem icon={<FlaskConical size={20} />} label="Lab processing" />
            <SidebarItem icon={<Users size={20} />} label="Customers" />
            <SidebarItem icon={<Settings size={20} />} label="Settings" />
          </Sidebar>
        }
        navbar={
          <DashboardNavbar
            leftContent={<Breadcrumb items={[{ label: 'Lab' }, { label: 'Overview' }]} />}
            rightContent={<Button hierarchy="secondary" appearance="solid" size="sm">Export</Button>}
          />
        }
        footer={
          <DashboardFooter
            leftContent={<Button hierarchy="secondary" appearance="ghost" size="sm">Back</Button>}
            rightContent={<Button hierarchy="primary" appearance="solid" size="sm">Save</Button>}
          />
        }
      >
        <SectionHeader title="Growth Analytics" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {['Samples', 'Reports', 'Customers'].map((label) => (
            <MetricTile key={label} icon={<Activity size={14} />} label={label} value="1,234" delta={{ label: '+4%' }} comparison="vs last month" />
          ))}
        </div>
      </DashboardLayout>
    </div>
  ),
};

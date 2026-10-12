import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar, SidebarItem, Badge, Logo } from 'helix-design-system/components';
import { LayoutDashboard, FlaskConical, Users, Settings, LogOut } from 'lucide-react';

const meta = {
  title: 'Organism/Sidebars',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: { collapsed: { control: 'boolean' } },
  args: { collapsed: false, children: null },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = (
  <>
    <SidebarItem icon={<LayoutDashboard size={16} />} label="Dashboard" selected />
    <SidebarItem icon={<FlaskConical size={16} />} label="Lab processing" />
    <SidebarItem icon={<Users size={16} />} label="Customers" />
    <SidebarItem icon={<Settings size={16} />} label="Settings" disabled />
  </>
);

const footer = <SidebarItem icon={<LogOut size={16} />} label="Sign out" />;

export const Expanded: Story = {
  render: (args) => (
    <div style={{ height: 640 }}>
      <Sidebar {...args} header={<><Logo variant="wordmark" /><Badge label="Beta" size="xs" color="brand" appearance="solid" /></>} footer={footer}>{items}</Sidebar>
    </div>
  ),
};

export const Collapsed: Story = {
  args: { collapsed: true },
  render: (args) => (
    <div style={{ height: 640 }}>
      <Sidebar {...args} header={<Logo variant="mark" height={20} />} footer={footer}>{items}</Sidebar>
    </div>
  ),
};

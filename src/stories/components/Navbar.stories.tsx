import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navbar, Button, Logo } from 'helix-design-system/components';
import { AVATAR_USERS } from '../../data/avatarUsers';

const LINKS = [
  { label: 'Dashboard', active: true },
  { label: 'Samples' },
  { label: 'Reports' },
  { label: 'Settings' },
];

const meta = {
  title: 'Components/Navigation/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  args: {
    logo: <Logo variant="wordmark" height={20} />,
    links: LINKS,
    showSearch: true,
    showNotifications: true,
    user: { name: 'Sari Dewi' },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <div style={{ width: 960 }}><Navbar {...args} /></div>,
};

export const NoLinks: Story = {
  args: { links: [] },
  render: (args) => <div style={{ width: 960 }}><Navbar {...args} /></div>,
};

export const WithActions: Story = {
  args: { actions: <Button size="sm">New sample</Button> },
  render: (args) => <div style={{ width: 960 }}><Navbar {...args} /></div>,
};

export const WithMobileMenu: Story = {
  args: { onMenuClick: () => {} },
  render: (args) => <div style={{ width: 960 }}><Navbar {...args} /></div>,
};

export const WithAvatarImage: Story = {
  args: { user: { name: AVATAR_USERS[1].name, avatar: AVATAR_USERS[1].src } },
  render: (args) => <div style={{ width: 960 }}><Navbar {...args} /></div>,
};

export const Transparent: Story = {
  args: { transparent: true, logo: <Logo variant="wordmark" tone="white" height={20} /> },
  render: (args) => (
    <div style={{ width: 960, background: 'linear-gradient(135deg, #F57E20, #089AAA)', padding: 8, borderRadius: 12 }}>
      <Navbar {...args} />
    </div>
  ),
};

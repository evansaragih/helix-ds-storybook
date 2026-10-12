import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navbar, NavLink, Button, Logo } from 'helix-design-system/components';
import { ChevronDown, LayoutDashboard } from 'lucide-react';

const meta = {
  title: 'Organism/Navbars/Marketing Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: { state: { control: 'select', options: ['onTop', 'onScroll'] } },
  args: {
    state: 'onTop',
    leftContent: <Logo variant="wordmark" height={20} />,
    rightContent: (
      <>
        <NavLink label="Products" href="#" active />
        <NavLink label="Solutions" href="#" />
        <NavLink label="Resources" href="#" trailingIcon={<ChevronDown size={16} />} />
        <NavLink label="Pricing" href="#" />
        <Button hierarchy="secondary" appearance="outline" size="sm">Log in</Button>
        <Button size="sm">Get started</Button>
      </>
    ),
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const OnScroll: Story = {
  args: { state: 'onScroll' },
  render: (args) => (
    <div style={{ height: 160, background: 'linear-gradient(135deg, #FCC9A3, #EBF2FE)' }}><Navbar {...args} /></div>
  ),
};

/** Figma _nav-link — Leading / Trailing icon, State and Surface. */
export const NavLinks: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <NavLink label="Default" href="#" />
        <NavLink label="Active" href="#" active />
        <NavLink label="With icon" href="#" icon={<LayoutDashboard size={16} />} />
        <NavLink label="Trailing" href="#" trailingIcon={<ChevronDown size={16} />} />
      </div>
      <div style={{ display: 'flex', gap: 8, background: '#14141E', padding: 12, borderRadius: 8 }}>
        <NavLink surface="dark" label="Default" href="#" />
        <NavLink surface="dark" label="Active" href="#" active />
      </div>
    </div>
  ),
};

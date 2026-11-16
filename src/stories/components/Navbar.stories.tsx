import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navbar, NavLink, MobileMenu, MobileMenuItem, Button, IconButton, Logo, Toggle } from 'helix-design-system/components';
import { ChevronDown, LayoutDashboard, Menu, X } from 'lucide-react';

const meta = {
  title: 'Organism/Navbars/Marketing Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: { state: { control: 'select', options: ['onTop', 'onScroll'] }, device: { control: 'inline-radio', options: ['desktop', 'mobile'] } },
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

/** Figma Device=Mobile — the closed bar: logo plus a hamburger. Tapping it opens the Mobile Menu. */
export const Mobile: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 375 }}>
      <div style={{ background: '#F57E20' }}>
        <Navbar state="onTop" device="mobile" leftContent={<Logo variant="wordmark" tone="white" brand="nusantics" height={16} />}
          rightContent={<IconButton hierarchy="secondary" appearance="ghost" size="md" icon={<Menu size={20} color="#fff" />} aria-label="Open menu" />} />
      </div>
      <Navbar state="onScroll" device="mobile" leftContent={<Logo variant="wordmark" brand="nusantics" height={16} />}
        rightContent={<IconButton hierarchy="secondary" appearance="ghost" size="md" icon={<Menu size={20} />} aria-label="Open menu" />} />
    </div>
  ),
};

/** Figma Mobile Menu (375×832) — Header, Menu Items slot, Footer slot. Groups expand in place. */
export const MobileMenuPanel: Story = {
  name: 'Mobile Menu',
  render: () => (
    <div style={{ width: 375, height: 832, border: '1px solid #EEE' }}>
      <MobileMenu
        logo={<Logo variant="wordmark" brand="nusantics" height={16} />}
        closeButton={<IconButton hierarchy="secondary" appearance="ghost" size="md" icon={<X size={20} />} aria-label="Close menu" />}
        footer={
          <>
            <Toggle aria-label="Language" fullWidth options={[{ value: 'en', label: 'EN' }, { value: 'id', label: 'ID' }]} />
            <div style={{ display: 'flex', gap: 12 }}>
              <Button hierarchy="secondary" appearance="outline" size="sm" style={{ flex: 1 }}>Login</Button>
              <Button size="sm" style={{ flex: 1 }}>Contact Us</Button>
            </div>
          </>
        }
      >
        <MobileMenuItem label="For Lab" href="#">
          <MobileMenuItem label="Lab services" href="#" />
        </MobileMenuItem>
        <MobileMenuItem label="About Us" href="#" />
        <MobileMenuItem label="Products & Solutions" defaultOpen>
          <MobileMenuItem label="Product Pipeline" href="#" />
          <MobileMenuItem label="Human Diagnostics" href="#" />
          <MobileMenuItem label="Animal Diagnostics" href="#" />
        </MobileMenuItem>
        <MobileMenuItem label="Career" href="#" />
        <MobileMenuItem label="Knowledge Hub">
          <MobileMenuItem label="Paper & Publications" href="#" />
        </MobileMenuItem>
      </MobileMenu>
    </div>
  ),
};

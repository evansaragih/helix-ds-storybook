import type { Meta, StoryObj } from '@storybook/react-vite';
import { MenuItem } from 'helix-design-system/components';
import { Settings, LogOut, User, CreditCard, ChevronRight } from 'lucide-react';

const meta = {
  title: 'Components/Navigation/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['Default', 'Destructive'] },
    state: { control: 'select', options: ['Default', 'Hover', 'Focus', 'Pressed', 'Disabled', 'Selected'] },
    size: { control: 'select', options: ['Medium', 'Small'] },
  },
  args: {
    label: 'Account settings',
    variant: 'Default',
    state: 'Default',
    size: 'Medium',
    leadingContent: <Settings size={16} />,
  },
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <div style={{ width: 240 }}><MenuItem {...args} /></div>,
};

export const Menu: Story = {
  render: () => (
    <div style={{ width: 240, border: '1px solid var(--color-stroke-subtle)', borderRadius: 8, padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <MenuItem label="Profile" leadingContent={<User size={16} />} />
      <MenuItem label="Billing" leadingContent={<CreditCard size={16} />} shortcut="⌘B" />
      <MenuItem label="Settings" leadingContent={<Settings size={16} />} />
      <MenuItem label="Log out" variant="Destructive" leadingContent={<LogOut size={16} />} />
    </div>
  ),
};

export const WithSupportingText: Story = {
  args: { supportingText: 'Manage your workspace preferences' },
  render: (args) => <div style={{ width: 260 }}><MenuItem {...args} /></div>,
};

export const WithSubmenu: Story = {
  args: { hasSubmenu: true, label: 'More options' },
  render: (args) => <div style={{ width: 240 }}><MenuItem {...args} /></div>,
};

export const Destructive: Story = {
  args: { variant: 'Destructive', label: 'Delete account', leadingContent: <LogOut size={16} /> },
  render: (args) => <div style={{ width: 240 }}><MenuItem {...args} /></div>,
};

export const Selected: Story = {
  args: { state: 'Selected' },
  render: (args) => <div style={{ width: 240 }}><MenuItem {...args} /></div>,
};

export const Disabled: Story = {
  args: { state: 'Disabled' },
  render: (args) => <div style={{ width: 240 }}><MenuItem {...args} /></div>,
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 240 }}>
      {(['Medium', 'Small'] as const).map((size) => (
        <MenuItem key={size} {...args} size={size} label={`Size ${size}`} />
      ))}
    </div>
  ),
};

export const WithShortcutAndChevron: Story = {
  args: { trailingContent: <ChevronRight size={16} /> },
  render: (args) => <div style={{ width: 240 }}><MenuItem {...args} /></div>,
};

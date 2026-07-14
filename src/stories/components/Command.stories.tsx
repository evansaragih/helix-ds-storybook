import type { Meta, StoryObj } from '@storybook/react-vite';
import { Command } from 'helix-design-system/components';
import { FlaskConical, FileText, Settings, User } from 'lucide-react';

const ITEMS = [
  { id: 'samples', label: 'View samples', group: 'Navigation', leadingContent: <FlaskConical size={16} />, shortcut: '⌘S' },
  { id: 'reports', label: 'View reports', group: 'Navigation', leadingContent: <FileText size={16} />, shortcut: '⌘R' },
  { id: 'profile', label: 'My profile', group: 'Account', leadingContent: <User size={16} /> },
  { id: 'settings', label: 'Settings', group: 'Account', leadingContent: <Settings size={16} /> },
  { id: 'archived', label: 'Archived item', group: 'Account', disabled: true },
];

const CHECKABLE_ITEMS = [
  { id: 'a', label: 'Show completed', checked: true },
  { id: 'b', label: 'Show pending', checked: false },
  { id: 'c', label: 'Show archived', checked: false },
];

/**
 * **Deprecated:** `Command` has been superseded by `MenuItem` in the Figma
 * design system (see helix-design-system.md). It is kept here for backwards
 * compatibility with existing usages, but new work should use `MenuItem` /
 * a composed menu of `MenuItem`s instead.
 */
const meta = {
  title: 'Components/Navigation/Command',
  component: Command,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**Deprecated** — superseded by `MenuItem` in Figma. Prefer composing menus from `MenuItem` for new work; `Command` remains for existing usages only.',
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: ['default', 'checkbox', 'radio'] },
  },
  args: {
    items: ITEMS,
    header: 'Quick actions',
    placeholder: 'Search actions…',
    type: 'default',
  },
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <Command {...args} />,
};

export const NoHeader: Story = {
  args: { header: undefined },
  render: (args) => <Command {...args} />,
};

export const CheckboxType: Story = {
  args: { type: 'checkbox', items: CHECKABLE_ITEMS, header: 'Filter status' },
  render: (args) => <Command {...args} />,
};

export const RadioType: Story = {
  args: { type: 'radio', items: CHECKABLE_ITEMS, header: 'Sort by' },
  render: (args) => <Command {...args} />,
};

export const HideSearch: Story = {
  args: { hideSearch: true },
  render: (args) => <Command {...args} />,
};

export const WithHeaderMenu: Story = {
  args: {
    headerMenu: [
      { id: 'refresh', label: 'Refresh', onSelect: () => {} },
      { id: 'export', label: 'Export', onSelect: () => {} },
    ],
  },
  render: (args) => <Command {...args} />,
};

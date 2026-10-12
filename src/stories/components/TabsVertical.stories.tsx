import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from 'helix-design-system/components';

const ITEMS = [
  { id: 'profile', label: 'Profile', content: <div>Profile content</div> },
  { id: 'account', label: 'Account', content: <div>Account content</div> },
  { id: 'team', label: 'Team', content: <div>Team content</div>, badge: 2 },
  { id: 'billing', label: 'Billing', content: <div>Billing content</div>, disabled: true },
];

const meta = {
  title: 'Molecule/Tab/Tabs Vertical',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    appearance: { control: 'select', options: ['bordered', 'filled', 'contained'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { items: ITEMS, orientation: 'vertical', appearance: 'bordered', size: 'md', defaultValue: 'profile' },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Appearances: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 32 }}>
      {(['bordered', 'filled', 'contained'] as const).map((appearance) => <Tabs key={appearance} {...args} appearance={appearance} renderContent={false} />)}
    </div>
  ),
  decorators: [(Story) => <div style={{ width: 820 }}><Story /></div>],
};

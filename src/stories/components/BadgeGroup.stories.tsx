import type { Meta, StoryObj } from '@storybook/react-vite';
import { BadgeGroup } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Badge/Badge Group',
  component: BadgeGroup,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['brand', 'neutral', 'error', 'warning', 'success'] },
    size: { control: 'select', options: ['md', 'lg'] },
    position: { control: 'select', options: ['leading', 'trailing'] },
    dot: { control: 'boolean' },
  },
  args: { badge: 'New', children: 'We just launched the lab portal', color: 'brand', size: 'md', position: 'leading', dot: false },
} satisfies Meta<typeof BadgeGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
      {(['brand', 'neutral', 'error', 'warning', 'success'] as const).map((color) => <BadgeGroup key={color} {...args} color={color} />)}
    </div>
  ),
};

export const Positions: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
      <BadgeGroup {...args} position="leading" />
      <BadgeGroup {...args} position="trailing" />
      <BadgeGroup {...args} position="leading" dot />
      <BadgeGroup {...args} size="lg" />
    </div>
  ),
};

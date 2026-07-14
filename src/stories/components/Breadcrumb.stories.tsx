import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from 'helix-design-system/components';

const ITEMS = [
  { label: 'Nusantics', href: '#' },
  { label: 'Samples', href: '#' },
  { label: 'Sample #A-2291' },
];

const meta = {
  title: 'Components/Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    items: ITEMS,
    size: 'md',
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md'] as const).map((size) => (
        <Breadcrumb key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const TwoLevels: Story = {
  args: { items: [{ label: 'Home', href: '#' }, { label: 'Dashboard' }] },
};

export const DeepPath: Story = {
  args: {
    items: [
      { label: 'CeKolam', href: '#' },
      { label: 'Farms', href: '#' },
      { label: 'Pond 4', href: '#' },
      { label: 'Water Quality', href: '#' },
      { label: 'Report #88' },
    ],
  },
};

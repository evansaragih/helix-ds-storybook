import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from 'helix-design-system/components';
import { Search } from 'lucide-react';

const HIERARCHIES = ['primary', 'secondary', 'tertiary', 'destructive'] as const;
const APPEARANCES = ['solid', 'outline', 'subtle', 'ghost'] as const;

const meta = {
  title: 'Atomic/Button/Icon Button',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    hierarchy: { control: 'select', options: HIERARCHIES },
    appearance: { control: 'select', options: APPEARANCES },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    shape: { control: 'select', options: ['rounded', 'pill'] },
    notificationCount: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: { icon: <Search size={16} />, 'aria-label': 'Search', hierarchy: 'primary', appearance: 'solid', size: 'md', shape: 'rounded' },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const HierarchyAppearance: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, max-content)', gap: 12, background: '#FFFFFF', padding: 16, borderRadius: 8, border: '1px solid #EEEEEE' }}>
      {HIERARCHIES.flatMap((hierarchy) =>
        APPEARANCES.map((appearance) => <IconButton key={`${hierarchy}-${appearance}`} {...args} hierarchy={hierarchy} appearance={appearance} />)
      )}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: 12 }}>
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => <IconButton key={size} {...args} size={size} shape="pill" />)}
    </div>
  ),
};

export const Shapes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {(['rounded', 'pill'] as const).map((shape) => <IconButton key={shape} {...args} shape={shape} />)}
    </div>
  ),
};

export const WithNotificationBadge: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32, padding: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => <IconButton key={size} {...args} hierarchy="secondary" size={size} notificationCount={3} />)}
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

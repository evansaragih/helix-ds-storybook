import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarGroup } from 'helix-design-system/components';
import { AVATAR_USERS } from '../../data/avatarUsers';

const items = AVATAR_USERS.map((u, i) => ({ id: i, name: u.name, src: u.src }));

const meta = {
  title: 'Components/Data Display/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    addButtonShape: { control: 'select', options: ['circle', 'square'] },
  },
  args: {
    items,
    size: 'sm',
    max: 4,
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <AvatarGroup key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const NoOverflow: Story = {
  args: { items: items.slice(0, 3), max: undefined },
};

export const WithAddButtonCircle: Story = {
  args: { showAddButton: true, addButtonShape: 'circle' },
};

export const WithAddButtonSquare: Story = {
  args: { showAddButton: true, addButtonShape: 'square' },
};

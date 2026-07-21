import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarLabelGroup } from 'helix-design-system/components';
import { AVATAR_USERS } from '../../data/avatarUsers';

const user = AVATAR_USERS[0];

const meta = {
  title: 'Components/Data Display/AvatarLabelGroup',
  component: AvatarLabelGroup,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
  args: {
    name: user.name,
    email: 'olivia@untitledui.com',
    src: user.src,
    size: 'md',
  },
} satisfies Meta<typeof AvatarLabelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <AvatarLabelGroup key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const NoEmail: Story = {
  args: { email: undefined },
};

export const Placeholder: Story = {
  args: { src: undefined },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from 'helix-design-system/components';
import { User } from 'lucide-react';
import { AVATAR_USERS } from '../../data/avatarUsers';

const meta = {
  title: 'Molecule/Avatar/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xxs', 'xs', 'sm', 'md', 'lg'] },
    border: { control: 'boolean' },
    shape: { control: 'select', options: ['rounded', 'circular'] },
    status: { control: 'boolean' },
    content: { control: 'select', options: ['image', 'icon', 'placeholder'] },
  },
  args: {
    size: 'md',
    shape: 'rounded',
    content: 'placeholder',
    name: 'Sari Dewi',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {(['circular', 'rounded'] as const).map((shape) => (
        <Avatar key={shape} {...args} shape={shape} />
      ))}
    </div>
  ),
};

export const WithImage: Story = {
  args: {
    content: 'image',
    src: AVATAR_USERS[0].src,
    alt: AVATAR_USERS[0].name,
    name: AVATAR_USERS[0].name,
  },
};

export const WithIcon: Story = {
  args: { content: 'icon', icon: <User /> },
};

export const Placeholder: Story = {
  args: { content: 'placeholder', name: 'Budi Santoso' },
};

/** The full "Avatar users" reference set from Figma (node 2061:22852) — real photos, not placeholders. */
export const UserGallery: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {AVATAR_USERS.map((user) => (
        <div key={user.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 96 }}>
          <Avatar {...args} content="image" src={user.src} alt={user.name} name={user.name} size="lg" />
          <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', textAlign: 'center' }}>
            {user.name}
          </span>
          <a
            href={user.photoCreditUrl}
            target="_blank"
            rel="noreferrer"
            style={{ fontFamily: 'Rubik, sans-serif', fontSize: 11, color: 'var(--color-text-tertiary)', textAlign: 'center', textDecoration: 'underline' }}
          >
            Photo: {user.photoCredit}
          </a>
        </div>
      ))}
    </div>
  ),
};

/** Figma Status (presence dot) and Company logo are mutually exclusive overlays. */
export const Overlays: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => <Avatar key={size} {...args} size={size} status />)}
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => <Avatar key={`l${size}`} {...args} size={size} companyLogo={<span style={{ fontSize: 8, fontWeight: 700, color: '#F57E20' }}>N</span>} />)}
    </div>
  ),
};

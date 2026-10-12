import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { GroupItem, IconTile, Avatar, Badge } from 'helix-design-system/components';
import { Beaker, Image as ImageIcon } from 'lucide-react';

const meta = {
  title: 'Molecule/Item/Group Item',
  component: GroupItem,
  tags: ['autodocs'],
  argTypes: {
    control: { control: 'select', options: ['checkbox', 'radio', 'none'] },
    type: { control: 'select', options: ['standard', 'icon-card', 'photo-card'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: { title: 'Basic plan', description: 'Up to 10 samples per month.', size: 'md', checked: false },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
} satisfies Meta<typeof GroupItem>;

export default meta;
type Story = StoryObj<typeof meta>;

function Controlled(args: React.ComponentProps<typeof GroupItem>) {
  const [checked, setChecked] = useState(args.checked ?? false);
  return <GroupItem {...args} checked={checked} onCheckedChange={setChecked} />;
}

export const Playground: Story = { render: (args) => <Controlled {...args} /> };

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <GroupItem {...args} />
      <GroupItem {...args} checked />
      <GroupItem {...args} destructive title="Delete all samples" description="This cannot be undone." />
      <GroupItem {...args} disabled />
    </div>
  ),
};

export const RadioGroupExample: Story = {
  render: (args) => {
    const [value, setValue] = useState('basic');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {['basic', 'pro', 'team'].map((v) => (
          <GroupItem key={v} {...args} control="radio" name="plan" value={v} title={`${v[0].toUpperCase()}${v.slice(1)} plan`} checked={value === v} onCheckedChange={() => setValue(v)} />
        ))}
      </div>
    );
  },
};

/** Figma Type=Icon simple — the control moves to the end. */
export const IconSimple: Story = {
  args: { leading: <IconTile icon={<Beaker size={24} />} size="md" appearance="solid" />, trailing: '$10/month' },
  render: (args) => <Controlled {...args} />,
};

/** Figma Type=Avatar. */
export const WithAvatar: Story = {
  args: { leading: <Avatar size="md" initials="OR" />, title: 'Olivia Rhye', description: 'Product Manager, Integrations' },
  render: (args) => <Controlled {...args} />,
};

/** Brand text at the end of the title row — a price or a file size. */
export const WithTrailing: Story = { args: { trailing: '$10/month' }, render: (args) => <Controlled {...args} /> };

/** Figma Type=Icon card — a header with the control, and a white card for any content. */
export const IconCard: Story = {
  args: { type: 'icon-card', size: 'sm', leading: <IconTile icon={<Beaker size={20} />} size="sm" appearance="solid" /> },
  decorators: [(Story) => <div style={{ width: 483 }}><Story /></div>],
  render: (args) => (
    <Controlled {...args}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-family-headings)', fontWeight: 700, fontSize: 31, lineHeight: '37.2px', color: 'var(--color-text-primary, #14141E)' }}>$10</span>
          <span style={{ flex: 1, fontSize: 13, color: 'var(--color-text-secondary, #49494A)' }}>per month</span>
          <Badge size="xs" color="success" appearance="subtle" label="Limited time only" />
        </div>
        <span style={{ fontSize: 13, lineHeight: '19.2px', color: 'var(--color-text-secondary, #49494A)' }}>Includes up to 10 users, 20GB individual data and access to all features.</span>
      </div>
    </Controlled>
  ),
};

/** Figma Type=Item Photo Card — picture, title and a brand-coloured detail. */
export const PhotoCard: Story = {
  args: { type: 'photo-card', size: 'sm', title: 'Filename.pdf', trailing: '14 MB', description: 'Last modify: 23.06.2026', image: <ImageIcon size={64} color="#6B7A8C" /> },
  decorators: [(Story) => <div style={{ width: 296 }}><Story /></div>],
  render: (args) => <GroupItem {...args} />,
};

export const Small: Story = { args: { size: 'sm' }, render: (args) => <Controlled {...args} /> };

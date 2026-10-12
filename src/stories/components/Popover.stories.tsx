import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Popover, PopoverListHeader, Button, IconButton, FooterActions, Avatar } from 'helix-design-system/components';
import { Settings } from 'lucide-react';

const rows = ['Profile', 'Billing', 'Team', 'Notifications'].map((label) => (
  <div key={label} style={{ padding: '8px 12px', borderRadius: 6, fontFamily: 'var(--font-family-body)', fontSize: 13 }}>{label}</div>
));

const meta = {
  title: 'Molecule/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
  },
  args: { trigger: <Button hierarchy="secondary" appearance="outline" size="sm">Open popover</Button>, children: rows },
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ minHeight: 340, paddingTop: 16 }}><Story /></div>],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithHeader: Story = {
  args: { header: <PopoverListHeader label="Account" supportingText="menu" action={<IconButton aria-label="Settings" hierarchy="secondary" appearance="ghost" size="xs" icon={<Settings size={12} />} />} /> },
};

export const WithSearchHeader: Story = {
  render: (args) => {
    const [q, setQ] = useState('');
    return <Popover {...args} header={<PopoverListHeader type="search" searchValue={q} onSearchChange={setQ} />}>{rows.filter((r) => String(r.key).toLowerCase().includes(q.toLowerCase()))}</Popover>;
  },
};

export const WithUserHeader: Story = {
  args: { width: 340, header: <PopoverListHeader type="user" label="Sari Dewi" supportingText="sari@helix.com" avatar={<Avatar size="md" shape="circular" name="Sari Dewi" />} action={<Button size="xs" hierarchy="secondary" appearance="outline">Sign out</Button>} /> },
};

export const WithFooter: Story = {
  args: { footer: <div style={{ padding: '8px 4px 4px' }}><FooterActions><Button size="xs" hierarchy="secondary" appearance="outline">Cancel</Button><Button size="xs" hierarchy="tertiary">Apply</Button></FooterActions></div> },
};

export const Scrolling: Story = { args: { maxHeight: 120 } };

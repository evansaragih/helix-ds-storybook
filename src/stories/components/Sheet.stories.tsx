import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Sheet, Button, FooterActions, Input } from 'helix-design-system/components';

const body = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Input label="Sample name" placeholder="SMP-2026-0142" />
    <Input label="Analyst" placeholder="Dewi Lestari" />
  </div>
);

const meta = {
  title: 'Molecule/Sheets',
  component: Sheet,
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'select', options: ['left', 'right', 'top', 'bottom'] },
    closeOnOverlayClick: { control: 'boolean' },
  },
  args: { open: false, onClose: () => {}, side: 'right', title: 'Edit sample', description: 'Update the sample details.', children: body },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo(args: React.ComponentProps<typeof Sheet>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open sheet</Button>
      <Sheet
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        footer={<FooterActions><Button hierarchy="secondary" appearance="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button><Button size="sm" onClick={() => setOpen(false)}>Save</Button></FooterActions>}
      />
    </>
  );
}

export const Playground: Story = { render: (args) => <Demo {...args} /> };
export const Left: Story = { args: { side: 'left' }, render: (args) => <Demo {...args} /> };
export const Top: Story = { args: { side: 'top' }, render: (args) => <Demo {...args} /> };
export const Bottom: Story = { args: { side: 'bottom' }, render: (args) => <Demo {...args} /> };

/** Always open — for reviewing the layout against Figma. */
export const Open: Story = {
  args: { open: true },
  render: (args) => <Sheet {...args} footer={<FooterActions><Button hierarchy="secondary" appearance="outline" size="sm">Cancel</Button><Button size="sm">Save</Button></FooterActions>} />,
};

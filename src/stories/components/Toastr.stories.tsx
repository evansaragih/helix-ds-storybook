import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Toastr, Alert, Button } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Alert/Toastr',
  component: Toastr,
  tags: ['autodocs'],
  argTypes: { position: { control: 'select', options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'] } },
  args: { open: false, onClose: () => {}, position: 'top-right', children: null },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Toastr>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo(args: React.ComponentProps<typeof Toastr>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button hierarchy="secondary" appearance="outline" onClick={() => setOpen(true)}>Show toastr</Button>
      <Toastr {...args} open={open} onClose={() => setOpen(false)}>
        <Alert
          layout="compact"
          status="success"
          title="Sample saved"
          description="Your changes were saved to batch 24."
          action={{ label: 'View batch', onClick: () => setOpen(false) }}
          secondaryAction={{ label: 'Dismiss', onClick: () => setOpen(false) }}
          onClose={() => setOpen(false)}
        />
      </Toastr>
    </>
  );
}

export const Playground: Story = { render: (args) => <Demo {...args} /> };
export const BottomLeft: Story = { args: { position: 'bottom-left' }, render: (args) => <Demo {...args} /> };
export const TopLeft: Story = { args: { position: 'top-left' }, render: (args) => <Demo {...args} /> };
export const BottomRight: Story = { args: { position: 'bottom-right' }, render: (args) => <Demo {...args} /> };

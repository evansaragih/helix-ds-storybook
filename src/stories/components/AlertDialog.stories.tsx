import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { AlertDialog, Button } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Alert Dialog',
  component: AlertDialog,
  tags: ['autodocs'],
  argTypes: {
    iconStatus: { control: 'select', options: ['default', 'success', 'warning', 'destructive', 'info'] },
    layout: { control: 'select', options: ['stacked-left', 'horizontal', 'stacked-centered'] },
  },
  args: {
    open: true,
    iconStatus: 'default',
    layout: 'stacked-left',
    title: 'Alert Dialog title',
    description: 'This is a supporting description that gives context about the action being confirmed.',
    confirmAction: { label: 'Confirm', onClick: () => {} },
    cancelAction: { label: 'Cancel', onClick: () => {} },
    onClose: () => {},
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo(args: React.ComponentProps<typeof AlertDialog>) {
  const [open, setOpen] = useState(false);
  const [dontAsk, setDontAsk] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <AlertDialog
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        confirmAction={{ ...args.confirmAction, onClick: () => setOpen(false) }}
        cancelAction={args.cancelAction ? { ...args.cancelAction, onClick: () => setOpen(false) } : undefined}
        checkboxAction={args.checkboxAction ? { ...args.checkboxAction, checked: dontAsk, onChange: setDontAsk } : undefined}
      />
    </>
  );
}

export const Playground: Story = { render: (args) => <Demo {...args} /> };
export const Destructive: Story = {
  args: { iconStatus: 'destructive', title: 'Delete this sample?', description: 'This permanently removes the sample and its results.', confirmAction: { label: 'Delete', onClick: () => {} } },
  render: (args) => <Demo {...args} />,
};
export const Horizontal: Story = { args: { layout: 'horizontal' }, render: (args) => <Demo {...args} /> };
export const StackedCentered: Story = { args: { layout: 'stacked-centered', iconStatus: 'success' }, render: (args) => <Demo {...args} /> };
export const WithCheckbox: Story = { args: { checkboxAction: { label: "Don't show this again", checked: false, onChange: () => {} } }, render: (args) => <Demo {...args} /> };

/** Always open — for reviewing the layout against Figma. */
export const Open: Story = {};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertDialog, Button } from 'helix-design-system/components';

function CheckboxDialogDemo(args: React.ComponentProps<typeof AlertDialog>) {
  const [open, setOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <AlertDialog
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        confirmAction={{ ...args.confirmAction, onClick: () => setOpen(false) }}
        cancelAction={args.cancelAction ? { ...args.cancelAction, onClick: () => setOpen(false) } : undefined}
        checkboxAction={{ label: "Don't show this again", checked: dontShowAgain, onChange: setDontShowAgain }}
      />
    </>
  );
}

const meta = {
  title: 'Components/Overlays/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive', 'info'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    open: true,
    variant: 'default',
    title: 'Are you sure?',
    description: 'This action cannot be undone.',
    size: 'md',
    confirmAction: { label: 'Confirm', onClick: () => {} },
    cancelAction: { label: 'Cancel', onClick: () => {} },
    onClose: () => {},
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function DialogDemo(args: React.ComponentProps<typeof AlertDialog>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <AlertDialog
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        confirmAction={{ ...args.confirmAction, onClick: () => setOpen(false) }}
        cancelAction={args.cancelAction ? { ...args.cancelAction, onClick: () => setOpen(false) } : undefined}
      />
    </>
  );
}

export const Playground: Story = {
  render: (args) => <DialogDemo {...args} />,
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    title: 'Delete sample?',
    description: 'This will permanently delete the sample record and all associated results.',
    confirmAction: { label: 'Delete', onClick: () => {} },
  },
  render: (args) => <DialogDemo {...args} />,
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Heads up',
    description: 'Your subscription will renew in 3 days.',
    confirmAction: { label: 'Got it', onClick: () => {} },
    cancelAction: undefined,
  },
  render: (args) => <DialogDemo {...args} />,
};

export const Loading: Story = {
  args: {
    confirmAction: { label: 'Confirm', onClick: () => {}, loading: true },
  },
  render: (args) => <DialogDemo {...args} />,
};

export const Small: Story = {
  args: { size: 'sm' },
  render: (args) => <DialogDemo {...args} />,
};

export const WithCheckbox: Story = {
  render: (args) => <CheckboxDialogDemo {...args} />,
};

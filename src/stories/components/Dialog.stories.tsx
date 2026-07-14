import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog, Button } from 'helix-design-system/components';

const meta = {
  title: 'Components/Overlays/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    title: 'Edit profile',
    description: 'Update your account details below.',
    size: 'md',
    showClose: true,
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Dialog
      {...args}
      trigger={<Button>Open dialog</Button>}
      footer={
        <>
          <Button variant="neutral" size="sm">Cancel</Button>
          <Button size="sm">Save changes</Button>
        </>
      }
    >
      <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: 'var(--color-text-secondary)' }}>
        Dialog body content goes here.
      </p>
    </Dialog>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Dialog
          key={size}
          {...args}
          size={size}
          title={`${size.toUpperCase()} dialog`}
          trigger={<Button variant="neutral" size="sm">{size}</Button>}
        >
          <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: 'var(--color-text-secondary)' }}>
            This is a {size} sized dialog.
          </p>
        </Dialog>
      ))}
    </div>
  ),
};

export const NoFooter: Story = {
  render: (args) => (
    <Dialog {...args} trigger={<Button>Open dialog</Button>} footer={undefined}>
      <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: 'var(--color-text-secondary)' }}>
        Dialog body content without a footer.
      </p>
    </Dialog>
  ),
};

export const NoCloseButton: Story = {
  args: { showClose: false },
  render: (args) => (
    <Dialog
      {...args}
      trigger={<Button>Open dialog</Button>}
      footer={<Button size="sm">Done</Button>}
    >
      <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: 'var(--color-text-secondary)' }}>
        No close (X) button — must use the footer action.
      </p>
    </Dialog>
  ),
};

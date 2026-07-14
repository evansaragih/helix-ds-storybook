import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from 'helix-design-system/components';

const meta = {
  title: 'Components/Feedback & Status/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'info', 'success', 'warning', 'error'] },
  },
  args: {
    variant: 'default',
    title: 'Heads up',
    description: 'This is a supporting description for the alert.',
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <div style={{ width: 480 }}><Alert {...args} /></div>,
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 480 }}>
      {(['default', 'info', 'success', 'warning', 'error'] as const).map((variant) => (
        <Alert key={variant} {...args} variant={variant} title={`${variant[0].toUpperCase()}${variant.slice(1)} alert`} />
      ))}
    </div>
  ),
};

export const WithBadge: Story = {
  args: { badge: 'New' },
  render: (args) => <div style={{ width: 480 }}><Alert {...args} /></div>,
};

export const WithActions: Story = {
  args: {
    action: { label: 'Confirm', onClick: () => {} },
    secondaryAction: { label: 'Dismiss', onClick: () => {} },
  },
  render: (args) => <div style={{ width: 480 }}><Alert {...args} /></div>,
};

export const Closable: Story = {
  args: { onClose: () => {} },
  render: (args) => <div style={{ width: 480 }}><Alert {...args} /></div>,
};

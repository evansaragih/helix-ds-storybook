import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast, Button } from 'helix-design-system/components';

const meta = {
  title: 'Components/Feedback & Status/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'error', 'warning', 'info'] },
  },
  args: {
    variant: 'default',
    title: 'Sample submitted',
    description: 'Your sample has been queued for processing.',
    duration: 0,
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <div style={{ width: 380 }}><Toast {...args} /></div>,
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 380 }}>
      {(['default', 'success', 'error', 'warning', 'info'] as const).map((variant) => (
        <Toast
          key={variant}
          {...args}
          variant={variant}
          title={`${variant[0].toUpperCase()}${variant.slice(1)} toast`}
        />
      ))}
    </div>
  ),
};

export const WithAction: Story = {
  args: { action: { label: 'Undo', onClick: () => {} } },
  render: (args) => <div style={{ width: 380 }}><Toast {...args} /></div>,
};

export const Closable: Story = {
  render: (args) => {
    function Demo() {
      const [visible, setVisible] = useState(true);
      if (!visible) {
        return <Button size="sm" onClick={() => setVisible(true)}>Show toast again</Button>;
      }
      return <Toast {...args} onClose={() => setVisible(false)} />;
    }
    return <div style={{ width: 380 }}><Demo /></div>;
  },
};

export const NoDescription: Story = {
  args: { description: undefined },
  render: (args) => <div style={{ width: 380 }}><Toast {...args} /></div>,
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip, TooltipProvider, Button } from 'helix-design-system/components';

const meta = {
  title: 'Components/Overlays/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    variant: { control: 'select', options: ['dark', 'light'] },
  },
  args: {
    content: 'Helpful tooltip text',
    side: 'top',
    align: 'center',
    variant: 'dark',
    children: <Button variant="neutral">Hover me</Button>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <TooltipProvider>
      <div style={{ padding: 60 }}>
        <Tooltip {...args}>
          <Button variant="neutral">Hover me</Button>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

export const Sides: Story = {
  render: (args) => (
    <TooltipProvider>
      <div style={{ display: 'flex', gap: 60, padding: 60 }}>
        {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
          <Tooltip key={side} {...args} side={side}>
            <Button variant="neutral">{side}</Button>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
};

export const LightVariant: Story = {
  args: { variant: 'light' },
  render: (args) => (
    <TooltipProvider>
      <div style={{ padding: 60 }}>
        <Tooltip {...args}>
          <Button variant="neutral">Hover me</Button>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <TooltipProvider>
      <div style={{ padding: 60 }}>
        <Tooltip {...args}>
          <Button variant="neutral">No tooltip</Button>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

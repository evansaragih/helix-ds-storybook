import type { Meta, StoryObj } from '@storybook/react-vite';
import { Callout, Button } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Callout',
  component: Callout,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['error', 'warning', 'info', 'success', 'neutral'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    type: 'info',
    size: 'md',
    title: 'Info callout title',
    description: 'Supporting text that explains why something is the way it is.',
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <div style={{ width: 480 }}><Callout {...args} /></div>,
};

export const Types: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 480 }}>
      {(['error', 'warning', 'info', 'success', 'neutral'] as const).map((type) => (
        <Callout key={type} {...args} type={type} title={`${type[0].toUpperCase()}${type.slice(1)} callout title`} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 480 }}>
      <Callout {...args} size="sm" />
      <Callout {...args} size="md" />
    </div>
  ),
};

export const TitleOnly: Story = {
  args: { description: undefined },
  render: (args) => <div style={{ width: 480 }}><Callout {...args} /></div>,
};

export const WithTrailingAction: Story = {
  render: (args) => (
    <div style={{ width: 480 }}>
      <Callout {...args} trailing={<Button hierarchy="secondary" appearance="outline" size="sm">Learn more</Button>} />
    </div>
  ),
};

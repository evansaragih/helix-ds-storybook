import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from 'helix-design-system/components';

const meta = {
  title: 'Components/Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    type: { control: 'select', options: ['line', 'dash'] },
    labelAlign: { control: 'select', options: ['left', 'center', 'right'] },
  },
  args: {
    orientation: 'horizontal',
    type: 'line',
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <div style={{ width: 320 }}><Divider {...args} /></div>,
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}>
      {(['line', 'dash'] as const).map((type) => (
        <Divider key={type} {...args} type={type} />
      ))}
    </div>
  ),
};

export const WithLabel: Story = {
  args: { label: 'OR' },
  render: (args) => <div style={{ width: 320 }}><Divider {...args} /></div>,
};

export const LabelAlignment: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}>
      {(['left', 'center', 'right'] as const).map((labelAlign) => (
        <Divider key={labelAlign} {...args} label={labelAlign} labelAlign={labelAlign} />
      ))}
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 60 }}>
      <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: 13, color: 'var(--color-text-secondary)' }}>Left</span>
      <Divider {...args} />
      <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: 13, color: 'var(--color-text-secondary)' }}>Right</span>
    </div>
  ),
};

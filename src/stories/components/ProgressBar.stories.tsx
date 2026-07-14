import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from 'helix-design-system/components';

const meta = {
  title: 'Components/Data Display/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    labelType: {
      control: 'select',
      options: ['none', 'title', 'trailing', 'top-floating', 'bottom-floating', 'within'],
    },
  },
  args: {
    value: 64,
    labelType: 'title',
    label: 'Processing samples',
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <div style={{ width: 320 }}><ProgressBar {...args} /></div>,
};

export const LabelTypes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}>
      {(['none', 'title', 'trailing', 'top-floating', 'bottom-floating', 'within'] as const).map((labelType) => (
        <div key={labelType}>
          <p style={{ fontFamily: 'Rubik, sans-serif', fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>{labelType}</p>
          <ProgressBar {...args} labelType={labelType} height={labelType === 'within' ? 20 : 8} />
        </div>
      ))}
    </div>
  ),
};

export const Complete: Story = {
  args: { value: 100 },
  render: (args) => <div style={{ width: 320 }}><ProgressBar {...args} /></div>,
};

export const Empty: Story = {
  args: { value: 0 },
  render: (args) => <div style={{ width: 320 }}><ProgressBar {...args} /></div>,
};

export const CustomColor: Story = {
  args: { color: 'var(--color-brand-tertiary)', value: 42 },
  render: (args) => <div style={{ width: 320 }}><ProgressBar {...args} /></div>,
};

export const Animated: Story = {
  args: { animated: true },
  render: (args) => <div style={{ width: 320 }}><ProgressBar {...args} /></div>,
};

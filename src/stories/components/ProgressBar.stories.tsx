import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from 'helix-design-system/components';

const TYPES = ['base', 'title-label', 'trailing-label', 'top-floating-label', 'bottom-floating-label', 'within'] as const;

const meta = {
  title: 'Atomic/Progress Indicator/Progress Bar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: { type: { control: 'select', options: TYPES }, value: { control: { type: 'range', min: 0, max: 100 } } },
  args: { value: 50, type: 'base', label: 'Storage used' },
  decorators: [(Story) => <div style={{ width: 516 }}><Story /></div>],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma Type. */
export const Types: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {TYPES.map((type) => <ProgressBar key={type} {...args} type={type} />)}
    </div>
  ),
};

export const Values: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[0, 25, 50, 75, 100].map((value) => <ProgressBar key={value} {...args} type="trailing-label" value={value} />)}
    </div>
  ),
};

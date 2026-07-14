import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper } from 'helix-design-system/components';

const STEPS = [
  { id: 'collect', label: 'Sample collected', description: 'Received at lab' },
  { id: 'process', label: 'Processing', description: 'Sequencing in progress' },
  { id: 'analyze', label: 'Analysis', description: 'Bioinformatics pipeline' },
  { id: 'report', label: 'Report ready', description: 'Delivered to dashboard' },
];

const meta = {
  title: 'Components/Navigation/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
  args: {
    steps: STEPS,
    orientation: 'horizontal',
    activeStep: 1,
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <div style={{ width: 560 }}><Stepper {...args} /></div>,
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => <div style={{ width: 320 }}><Stepper {...args} /></div>,
};

export const AllCompleted: Story = {
  args: { activeStep: 4 },
  render: (args) => <div style={{ width: 560 }}><Stepper {...args} /></div>,
};

export const WithError: Story = {
  args: {
    steps: STEPS.map((s, i) => (i === 2 ? { ...s, status: 'error' as const } : s)),
    activeStep: undefined,
  },
  render: (args) => <div style={{ width: 560 }}><Stepper {...args} /></div>,
};

export const JustStarted: Story = {
  args: { activeStep: 0 },
  render: (args) => <div style={{ width: 560 }}><Stepper {...args} /></div>,
};

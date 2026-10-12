import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper } from 'helix-design-system/components';
import { FlaskConical, ClipboardList, FileCheck, Truck } from 'lucide-react';

const STEPS = [
  { id: 's1', title: 'Sample received', label: 'Date - Time Log', badge: 'Done' },
  { id: 's2', title: 'Lab processing', label: 'Date - Time Log', badge: 'Running' },
  { id: 's3', title: 'Quality check', label: 'Date - Time Log', badge: 'Pending' },
  { id: 's4', title: 'Report issued', label: 'Date - Time Log', badge: 'Pending' },
];

const meta = {
  title: 'Molecule/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    markerType: { control: 'select', options: ['number', 'icon'] },
    labelPosition: { control: 'select', options: ['right', 'left'] },
    activeStep: { control: { type: 'number', min: 0, max: 4 } },
  },
  args: { steps: STEPS, activeStep: 1, orientation: 'horizontal', markerType: 'number' },
  decorators: [(Story) => <div style={{ width: 760 }}><Story /></div>],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  decorators: [(Story) => <div style={{ width: 260 }}><Story /></div>],
};

export const VerticalLabelLeft: Story = {
  args: { orientation: 'vertical', labelPosition: 'left' },
  decorators: [(Story) => <div style={{ width: 260, display: 'flex', justifyContent: 'flex-end' }}><Story /></div>],
};

export const WithIcons: Story = {
  args: {
    markerType: 'icon',
    steps: [
      { ...STEPS[0], icon: <ClipboardList size={20} /> },
      { ...STEPS[1], icon: <FlaskConical size={20} /> },
      { ...STEPS[2], icon: <FileCheck size={20} /> },
      { ...STEPS[3], icon: <Truck size={20} /> },
    ],
  },
};

export const Clickable: Story = { args: { activeStep: 2, onStepClick: () => {} } };

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from 'helix-design-system/components';

const ITEMS = [
  { id: 'q1', title: 'How are samples processed?', content: 'Samples are logged on arrival, prepared, sequenced and quality-checked before a report is issued.' },
  { id: 'q2', title: 'How long does a result take?', content: 'Most results are ready within three to five working days, depending on the panel.' },
  { id: 'q3', title: 'Can I add samples to a batch later?', content: 'Yes — until the batch is locked for processing.' },
  { id: 'q4', title: 'Archived questions', content: 'Not available.', disabled: true },
];

const meta = {
  title: 'Molecule/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: { type: { control: 'select', options: ['single', 'multiple'] } },
  args: { items: ITEMS, type: 'single' },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const OpenByDefault: Story = { args: { defaultValue: 'q1' } };
export const Multiple: Story = { args: { type: 'multiple', defaultValue: ['q1', 'q2'] } };

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from 'helix-design-system/components';

const ITEMS = [
  { id: 'item-1', title: 'What is Nusantics?', content: 'Nusantics is a biotech company focused on microbiome research and diagnostics across Indonesia.' },
  { id: 'item-2', title: 'How do I get my results?', content: 'Results are delivered through the CeKolam dashboard within 5-7 business days of sample collection.' },
  { id: 'item-3', title: 'Is my data secure?', content: 'All sample and genomic data is encrypted at rest and in transit, following ISO 27001 practices.' },
  { id: 'item-4', title: 'Archived FAQ', content: 'This section is no longer maintained.', disabled: true },
];

const meta = {
  title: 'Components/Navigation/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['single', 'multiple'] },
    accordionStyle: { control: 'select', options: ['default', 'border', 'card'] },
  },
  args: {
    items: ITEMS,
    type: 'single',
    accordionStyle: 'default',
    defaultValue: 'item-1',
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <div style={{ width: 480 }}><Accordion {...args} /></div>,
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 480 }}>
      {(['default', 'border', 'card'] as const).map((accordionStyle) => (
        <div key={accordionStyle}>
          <p style={{ fontFamily: 'Rubik, sans-serif', fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>{accordionStyle}</p>
          <Accordion {...args} accordionStyle={accordionStyle} />
        </div>
      ))}
    </div>
  ),
};

export const Multiple: Story = {
  args: { type: 'multiple', defaultValue: ['item-1', 'item-2'] },
  render: (args) => <div style={{ width: 480 }}><Accordion {...args} /></div>,
};

export const WithDisabledItem: Story = {
  render: (args) => <div style={{ width: 480 }}><Accordion {...args} defaultValue="item-4" /></div>,
};

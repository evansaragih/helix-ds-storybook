import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState, Illustration } from 'helix-design-system/components';
import { Search } from 'lucide-react';

const TYPES = ['search', 'users', 'files', 'integrations', 'no-data', 'no-lab-results', 'error', 'no-permission'] as const;

const meta = {
  title: 'Molecule/Empty States',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: TYPES },
    size: { control: 'select', options: ['default', 'compact'] },
    illustration: { control: 'select', options: [true, false, 'dna', 'rna', 'lab-flask', 'microscope'] },
  },
  args: { type: 'search', size: 'default', animated: true, primaryAction: { label: 'New item' }, secondaryAction: { label: 'Clear search' } },
  decorators: [(Story) => <div style={{ width: 384, border: '1px solid #EEEEEE', borderRadius: 12 }}><Story /></div>],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma Type — each scenario with its illustration and default text. */
export const Types: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 384px)', gap: 16 }}>
      {TYPES.map((type) => <div key={type} style={{ border: '1px solid #EEEEEE', borderRadius: 12 }}><EmptyState {...args} type={type} /></div>)}
    </div>
  ),
  decorators: [],
};

/** Figma Size=Compact — horizontal layout for tight spaces. */
export const Compact: Story = { args: { size: 'compact' }, decorators: [(Story) => <div style={{ width: 352, border: '1px solid #EEEEEE', borderRadius: 12 }}><Story /></div>] };
export const WithIconTile: Story = { args: { icon: <Search size={24} />, illustration: false } };
export const BiotechIllustration: Story = { args: { type: 'no-lab-results', illustration: 'dna' } };
export const NoActions: Story = { args: { primaryAction: undefined, secondaryAction: undefined } };

const NAMES = ['no-data', 'search', 'users', 'files', 'integrations', 'error', 'no-permission', 'dna', 'rna', 'lab-flask', 'microscope'] as const;

export const Illustrations: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, justifyItems: 'center', width: 760 }}>
      {NAMES.map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#828282' }}>
          <Illustration name={name} />
          {name}
        </div>
      ))}
    </div>
  ),
  decorators: [(Story) => <Story />],
};

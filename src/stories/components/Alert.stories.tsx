import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from 'helix-design-system/components';

const STATUSES = ['default', 'primary', 'info', 'success', 'warning', 'error'] as const;
const LAYOUTS = ['card', 'compact', 'card-buttons', 'card-link'] as const;

const actions = {
  action: { label: 'View changes', onClick: () => {} },
  secondaryAction: { label: 'Dismiss', onClick: () => {} },
  onClose: () => {},
};

const meta = {
  title: 'Molecule/Alert/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: STATUSES },
    layout: { control: 'select', options: LAYOUTS },
  },
  args: { status: 'info', layout: 'card', title: 'Informational alert', description: 'Use to highlight helpful information or guidance. Not urgent — the user can continue without action.', ...actions },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma Layout. */
export const Layouts: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 600 }}>
      {LAYOUTS.map((layout) => (
        <div key={layout} style={{ width: layout === 'compact' ? 600 : 360 }}><Alert {...args} layout={layout} /></div>
      ))}
    </div>
  ),
  decorators: [],
};

/** Figma Status. */
export const Statuses: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {STATUSES.map((status) => <Alert key={status} {...args} status={status} title={`${status[0].toUpperCase()}${status.slice(1)} alert`} />)}
    </div>
  ),
};

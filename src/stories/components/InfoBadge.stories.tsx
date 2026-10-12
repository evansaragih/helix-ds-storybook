import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoBadge } from 'helix-design-system/components';
import { FileText } from 'lucide-react';

const meta = {
  title: 'Organism/Meta Badge/Info Badge',
  component: InfoBadge,
  tags: ['autodocs'],
  argTypes: { appearance: { control: 'select', options: ['snippet-card', 'meta-badge', 'info-pill', 'reference-card'] } },
  args: { appearance: 'snippet-card', icon: <FileText size={20} />, label: 'Submission ID', value: 'RCP-2026-a7f3c8d1' },
} satisfies Meta<typeof InfoBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Appearances: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, background: 'var(--color-container-secondary, #F7F7F7)', padding: 24, borderRadius: 12 }}>
      {(['snippet-card', 'meta-badge', 'info-pill', 'reference-card'] as const).map((appearance) => (
        <InfoBadge key={appearance} {...args} appearance={appearance} />
      ))}
    </div>
  ),
};

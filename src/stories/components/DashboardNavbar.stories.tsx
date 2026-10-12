import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardNavbar, Button, IconButton, Breadcrumb } from 'helix-design-system/components';
import { PanelLeft } from 'lucide-react';

const meta = {
  title: 'Organism/Navbars/Dashboard Navbar',
  component: DashboardNavbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DashboardNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma Dashboard Navbar — sidebar toggle + breadcrumb on the left, page actions on the right. */
export const Playground: Story = {
  render: () => (
    <div style={{ width: 960 }}>
      <DashboardNavbar
        leftContent={<>
          <IconButton aria-label="Toggle sidebar" hierarchy="secondary" appearance="ghost" shape="rounded" icon={<PanelLeft size={16} />} />
          <div style={{ width: 1, height: 20, background: 'var(--color-stroke-subtle, #EEEEEE)' }} />
          <Breadcrumb items={[{ label: 'Lab' }, { label: 'Processing' }, { label: 'Batch 24' }]} />
        </>}
        rightContent={<>
          <Button hierarchy="secondary" appearance="solid" size="sm">Export</Button>
          <Button hierarchy="primary" appearance="solid" size="sm">New sample</Button>
        </>}
      />
    </div>
  ),
};



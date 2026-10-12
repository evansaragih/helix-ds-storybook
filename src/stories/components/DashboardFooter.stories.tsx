import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardFooter, Button } from 'helix-design-system/components';


const meta = {
  title: 'Organism/Navbars/Dashboard Footer',
  component: DashboardFooter,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DashboardFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <div style={{ width: 960 }}>
      <DashboardFooter
        leftContent={<Button hierarchy="secondary" appearance="ghost" size="sm">Back</Button>}
        rightContent={<>
          <Button hierarchy="secondary" appearance="outline" size="sm">Cancel</Button>
          <Button hierarchy="primary" appearance="solid" size="sm">Save</Button>
        </>}
      />
    </div>
  ),
};


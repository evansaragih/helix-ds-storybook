import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover, PopoverHeader, PopoverBody, PopoverFooter, Button } from 'helix-design-system/components';

const meta = {
  title: 'Components/Overlays/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'],
    },
  },
  args: {
    placement: 'bottom-start',
    width: 280,
    trigger: <Button variant="neutral">Open popover</Button>,
    children: null,
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ paddingTop: 80, paddingLeft: 80 }}>
      <Popover {...args} trigger={<Button variant="neutral">Open popover</Button>}>
        <PopoverHeader title="Sample details" description="Collected 2 days ago" />
        <PopoverBody>
          <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: 'var(--color-text-secondary)' }}>
            Additional details about this sample go here.
          </p>
        </PopoverBody>
        <PopoverFooter>
          <Button variant="neutral" size="sm">Cancel</Button>
          <Button size="sm">Confirm</Button>
        </PopoverFooter>
      </Popover>
    </div>
  ),
};

export const SimpleContent: Story = {
  render: (args) => (
    <div style={{ paddingTop: 80, paddingLeft: 80 }}>
      <Popover {...args} trigger={<Button variant="neutral">More info</Button>}>
        <PopoverBody>
          <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: 'var(--color-text-secondary)' }}>
            A simple popover with only a body — no header or footer.
          </p>
        </PopoverBody>
      </Popover>
    </div>
  ),
};

export const Placements: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 80, paddingTop: 80, paddingLeft: 80, paddingBottom: 80 }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <Popover key={placement} {...args} placement={placement} trigger={<Button variant="neutral">{placement}</Button>}>
          <PopoverBody>
            <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: 'var(--color-text-secondary)' }}>
              Placed to the {placement}.
            </p>
          </PopoverBody>
        </Popover>
      ))}
    </div>
  ),
};

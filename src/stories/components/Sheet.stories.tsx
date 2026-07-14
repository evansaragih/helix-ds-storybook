import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sheet, Button } from 'helix-design-system/components';

const meta = {
  title: 'Components/Overlays/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'select', options: ['right', 'left', 'top', 'bottom'] },
  },
  args: {
    side: 'right',
    title: 'Sample details',
    description: 'View and edit sample metadata.',
    open: false,
    onClose: () => {},
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

function SheetDemo(args: React.ComponentProps<typeof Sheet>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open sheet</Button>
      <Sheet
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="neutral" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setOpen(false)}>Save</Button>
          </>
        }
      >
        <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: 'var(--color-text-secondary)' }}>
          Sheet body content goes here.
        </p>
      </Sheet>
    </>
  );
}

export const Playground: Story = {
  render: (args) => <SheetDemo {...args} />,
};

export const Sides: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      {(['right', 'left', 'top', 'bottom'] as const).map((side) => (
        <SheetDemo key={side} {...args} side={side} title={`${side} sheet`} />
      ))}
    </div>
  ),
};

export const NoFooter: Story = {
  render: (args) => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open sheet</Button>
          <Sheet {...args} open={open} onClose={() => setOpen(false)}>
            <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: 'var(--color-text-secondary)' }}>
              A sheet without a footer.
            </p>
          </Sheet>
        </>
      );
    }
    return <Demo />;
  },
};

export const CustomSize: Story = {
  args: { size: 480 },
  render: (args) => <SheetDemo {...args} />,
};

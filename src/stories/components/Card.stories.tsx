import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardTitle, CardDescription, Button } from 'helix-design-system/components';

const meta = {
  title: 'Components/Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    elevation: { control: 'select', options: ['none', 'sm', 'default', 'md'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
  },
  args: {
    elevation: 'sm',
    padding: 'md',
    bordered: false,
    hoverable: false,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <Card {...args}>
        <CardHeader>
          <CardTitle>Card title</CardTitle>
          <CardDescription>Supporting description text goes here.</CardDescription>
        </CardHeader>
        <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: 'var(--color-text-secondary)' }}>
          Card body content.
        </p>
      </Card>
    </div>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <Card
        {...args}
        header={<strong style={{ fontFamily: 'Rubik, sans-serif', fontSize: 16 }}>Project settings</strong>}
        footer={<Button size="sm">Save changes</Button>}
      >
        <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: 'var(--color-text-secondary)' }}>
          Configure how this project behaves.
        </p>
      </Card>
    </div>
  ),
};

export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => (
    <div style={{ width: 360 }}>
      <Card {...args}>
        <CardHeader>
          <CardTitle>Bordered card</CardTitle>
          <CardDescription>Opts back into a 1px outline on top of the default shadow.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};

export const Hoverable: Story = {
  args: { hoverable: true },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Card {...args}>
        <CardHeader>
          <CardTitle>Hover me</CardTitle>
          <CardDescription>Elevates on hover.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};

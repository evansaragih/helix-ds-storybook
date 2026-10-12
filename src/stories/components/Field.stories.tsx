import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field, Checkbox, Button } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Field',
  component: Field,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md'] } },
  args: {
    heading: 'Creative',
    supportingText: 'Select all that apply.',
    size: 'md',
    children: (
      <>
        <Checkbox size="md" label="Design" />
        <Checkbox size="md" label="Illustration" />
        <Checkbox size="md" label="Photography" />
      </>
    ),
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Required: Story = { args: { required: true, info: true } };

export const WithCounterAndAction: Story = {
  args: {
    counter: '2 selected',
    trailingAction: <Button hierarchy="primary" appearance="link" size="sm">Clear</Button>,
  },
};

export const WithError: Story = { args: { required: true, error: 'Select at least one option.' } };

export const Small: Story = { args: { size: 'sm' } };

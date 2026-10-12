import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextArea } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Input/Text Area',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: { resizable: { control: 'boolean' }, required: { control: 'boolean' }, invalid: { control: 'boolean' }, disabled: { control: 'boolean' } },
  args: { label: 'Label', placeholder: 'Placeholder', hint: 'This is a hint text to help user.' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma State — Default, Hovered, Focused, Error, Disabled. Hover and focus are interactive. */
export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextArea {...args} />
      <TextArea {...args} defaultValue="Filled text" />
      <TextArea {...args} error="This is an error message." hint={undefined} />
      <TextArea {...args} disabled />
    </div>
  ),
};

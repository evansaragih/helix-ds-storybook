import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from 'helix-design-system/components';

const VIEW: [{ value: string; label: string }, { value: string; label: string }] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'weekly', label: 'Weekly' },
];

const meta = {
  title: 'Molecule/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    surface: { control: 'select', options: ['light', 'dark'] },
  },
  args: { 'aria-label': 'View', options: VIEW, defaultValue: 'monthly', size: 'md', surface: 'light' },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma Size — md is 46px tall, sm is 36px tall. */
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Toggle {...args} size="md" />
      <Toggle {...args} size="sm" defaultValue="weekly" />
    </div>
  ),
};

/** Figma Icon — a 16px flag before each label, as in the Marketing Navbar language switch. */
export const WithFlags: Story = {
  render: (args) => {
    const flag = (name: string) => <img src={`/prototypes/nusantics-landing-page/assets/flag-${name}.svg`} alt="" width={16} height={16} style={{ display: 'block' }} />;
    return (
      <Toggle
        {...args}
        aria-label="Language"
        size="sm"
        defaultValue="en"
        options={[{ value: 'en', label: 'EN', icon: flag('gb') }, { value: 'id', label: 'ID', icon: flag('id') }]}
      />
    );
  },
};

/** Figma Surface — dark is a glass container for photo or dark backgrounds. */
export const Surfaces: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ padding: 16, borderRadius: 12, background: '#fff' }}><Toggle {...args} surface="light" size="sm" /></div>
      <div style={{ padding: 16, borderRadius: 12, background: '#14141E' }}><Toggle {...args} surface="dark" size="sm" defaultValue="weekly" /></div>
    </div>
  ),
};

/** A segment can be disabled; hover and focus appear when you interact. */
export const Disabled: Story = {
  args: { options: [VIEW[0], { ...VIEW[1], disabled: true }] },
};

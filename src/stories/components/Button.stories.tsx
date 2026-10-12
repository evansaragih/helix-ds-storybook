import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from 'helix-design-system/components';
import { ArrowRight, Plus } from 'lucide-react';

const HIERARCHIES = ['primary', 'secondary', 'tertiary', 'destructive'] as const;
const APPEARANCES = ['solid', 'outline', 'subtle', 'ghost', 'link'] as const;

const meta = {
  title: 'Atomic/Button/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    hierarchy: { control: 'select', options: HIERARCHIES },
    appearance: { control: 'select', options: APPEARANCES },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    underline: { control: 'select', options: ['always', 'on-hover', 'none'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { children: 'Button', hierarchy: 'primary', appearance: 'solid', size: 'md' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma Hierarchy × Appearance. Tertiary has Solid and Outline only in Figma; other appearances fall back to Outline. */
export const HierarchyAppearance: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, max-content)', gap: 12, alignItems: 'center', background: '#FFFFFF', padding: 16, borderRadius: 8, border: '1px solid #EEEEEE' }}>
      {HIERARCHIES.flatMap((hierarchy) =>
        APPEARANCES.map((appearance) => (
          <Button key={`${hierarchy}-${appearance}`} {...args} hierarchy={hierarchy} appearance={appearance}>
            {hierarchy} {appearance}
          </Button>
        ))
      )}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => <Button key={size} {...args} size={size}>{size}</Button>)}
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button {...args} leadingIcon={<Plus size={16} />}>New</Button>
      <Button {...args} trailingIcon={<ArrowRight size={16} />}>Continue</Button>
    </div>
  ),
};

export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };

export const LinkUnderline: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24 }}>
      {(['always', 'on-hover', 'none'] as const).map((underline) => (
        <Button key={underline} {...args} appearance="link" underline={underline}>{underline}</Button>
      ))}
    </div>
  ),
};

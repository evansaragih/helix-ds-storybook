import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextLink } from 'helix-design-system/components';
import { ArrowRight, ExternalLink } from 'lucide-react';

const meta = {
  title: 'Components/Inputs & Forms/TextLink',
  component: TextLink,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'neutral', 'destructive'] },
    weight: { control: 'select', options: ['regular', 'semibold'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    underline: { control: 'select', options: ['always', 'hover', 'none'] },
  },
  args: {
    children: 'Learn more',
    variant: 'primary',
    weight: 'regular',
    size: 'md',
    underline: 'hover',
    href: '#',
  },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {(['primary', 'secondary', 'tertiary', 'neutral', 'destructive'] as const).map((variant) => (
        <TextLink key={variant} {...args} variant={variant}>{variant}</TextLink>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <TextLink key={size} {...args} size={size}>{size}</TextLink>
      ))}
    </div>
  ),
};

export const Underline: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      {(['always', 'hover', 'none'] as const).map((underline) => (
        <TextLink key={underline} {...args} underline={underline}>{underline}</TextLink>
      ))}
    </div>
  ),
};

export const WithLeadingIcon: Story = {
  args: { leadingIcon: <ExternalLink size={16} /> },
};

export const WithTrailingIcon: Story = {
  args: { trailingIcon: <ArrowRight size={16} />, children: 'View all reports' },
};

export const Semibold: Story = {
  args: { weight: 'semibold' },
};

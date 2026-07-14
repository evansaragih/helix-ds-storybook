import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section, Bar, RadiusBox } from './helpers';
import { FoundationDocsPage } from './FoundationDocsPage';

const meta = {
  title: 'Foundations/Spacing & Radius',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: FoundationDocsPage,
      description: {
        component: 'The spacing scale used for padding/gap/margin, and the border-radius scale used across components.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SPACING: [string, string][] = [
  ['--spacing-0', '0px'], ['--spacing-2', '2px'], ['--spacing-4', '4px'], ['--spacing-6', '6px'],
  ['--spacing-8', '8px'], ['--spacing-12', '12px'], ['--spacing-16', '16px'], ['--spacing-20', '20px'],
  ['--spacing-24', '24px'], ['--spacing-32', '32px'], ['--spacing-40', '40px'], ['--spacing-48', '48px'],
  ['--spacing-64', '64px'], ['--spacing-80', '80px'], ['--spacing-96', '96px'],
];

const RADIUS: [string, string, string][] = [
  ['--radius-none', '0px', 'None'],
  ['--radius-xs', '2px', 'XS'],
  ['--radius-sm', '4px', 'SM'],
  ['--radius-md', '6px', 'MD'],
  ['--radius-lg', '8px', 'LG — inputs, buttons'],
  ['--radius-xl', '12px', 'XL — minor containers'],
  ['--radius-2xl', '16px', '2XL — cards, sheets, dialogs'],
  ['--radius-3xl', '24px', '3XL — dropdowns, popovers'],
  ['--radius-full', '9999px', 'Full — pills'],
];

export const SpacingScale: Story = {
  name: 'Spacing Scale',
  render: () => (
    <Section title="Spacing Scale">
      {SPACING.map(([varName, value]) => (
        <Bar key={varName} varName={varName} value={value} />
      ))}
    </Section>
  ),
};

export const BorderRadius: Story = {
  name: 'Border Radius',
  render: () => (
    <Section title="Border Radius">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {RADIUS.map(([varName, value, label]) => (
          <RadiusBox key={varName} label={label} varName={varName} value={value} />
        ))}
      </div>
    </Section>
  ),
};

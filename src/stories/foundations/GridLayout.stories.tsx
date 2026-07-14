import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section, Bar } from './helpers';
import { FoundationDocsPage } from './FoundationDocsPage';

const meta = {
  title: 'Foundations/Grid & Layout',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: FoundationDocsPage,
      description: {
        component: 'Container breakpoints, max-widths for constraining content, and a 12-column grid built from the spacing scale.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const CONTAINERS: [string, string][] = [
  ['--container-sm', '640px'],
  ['--container-md', '768px'],
  ['--container-lg', '1024px'],
  ['--container-xl', '1280px'],
  ['--container-2xl', '1536px'],
];

const MAX_WIDTHS: [string, string][] = [
  ['--max-width-3xs', '256px'], ['--max-width-2xs', '288px'], ['--max-width-xs', '320px'],
  ['--max-width-sm', '384px'], ['--max-width-md', '448px'], ['--max-width-lg', '512px'],
  ['--max-width-xl', '576px'], ['--max-width-2xl', '672px'], ['--max-width-3xl', '768px'],
  ['--max-width-4xl', '896px'], ['--max-width-5xl', '1024px'], ['--max-width-6xl', '1152px'],
  ['--max-width-7xl', '1280px'],
];

export const ContainerWidths: Story = {
  name: 'Container Breakpoints',
  render: () => (
    <Section title="Container Breakpoints" description="Bars shown at 1/3 scale; real values shown alongside.">
      {CONTAINERS.map(([varName, value]) => (
        <Bar key={varName} varName={varName} value={value} divisor={3} />
      ))}
    </Section>
  ),
};

export const MaxWidths: Story = {
  name: 'Max Widths',
  render: () => (
    <Section title="Max Widths" description="For constraining content blocks (cards, modals, form columns, prose).">
      {MAX_WIDTHS.map(([varName, value]) => (
        <Bar key={varName} varName={varName} value={value} divisor={2} />
      ))}
    </Section>
  ),
};

export const GridExample: Story = {
  name: '12-Column Grid',
  render: () => (
    <Section title="12-Column Grid" description="Built from the spacing scale — 24px gutter (--spacing-24).">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'var(--spacing-24)',
          maxWidth: 'var(--container-lg)',
        }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            style={{
              height: 64,
              borderRadius: 6,
              background: 'var(--color-status-brand-bg)',
              border: '1px dashed var(--color-brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontFamily: 'monospace',
              color: 'var(--color-brand-primary)',
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </Section>
  ),
};

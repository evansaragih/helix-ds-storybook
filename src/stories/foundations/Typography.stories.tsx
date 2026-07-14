import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from './helpers';
import { FoundationDocsPage } from './FoundationDocsPage';

const meta = {
  title: 'Foundations/Typography',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: FoundationDocsPage,
      description: {
        component:
          'Type families, weights, and the full size scale — headings set in Quicksand, body copy in Rubik.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Sample({
  varName,
  value,
  fontFamily,
  fontWeight,
  lineHeightVar,
  lineHeightValue,
  label,
}: {
  varName: string;
  value: string;
  fontFamily: string;
  fontWeight: number;
  lineHeightVar?: string;
  lineHeightValue?: string;
  label: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 24,
        padding: '16px 0',
        borderBottom: '1px solid var(--color-stroke-subtle)',
      }}
    >
      <div style={{ width: 220, flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>{label}</div>
        <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-tertiary)' }}>{varName}</div>
        <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>
          {value}
          {lineHeightValue ? ` / ${lineHeightValue}` : ''}
        </div>
      </div>
      <div
        style={{
          fontFamily: `var(${fontFamily})`,
          fontWeight,
          fontSize: `var(${varName})`,
          lineHeight: lineHeightVar ? `var(${lineHeightVar})` : 1.2,
          color: 'var(--color-text-primary)',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        Nusantics Design System
      </div>
    </div>
  );
}

export const FontFamilies: Story = {
  render: () => (
    <Section title="Font Families">
      <div style={{ display: 'flex', gap: 40 }}>
        <div>
          <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>
            --font-family-heading
          </div>
          <div style={{ fontFamily: 'var(--font-family-heading)', fontSize: 32, fontWeight: 600 }}>
            Quicksand
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>
            --font-family-body
          </div>
          <div style={{ fontFamily: 'var(--font-family-body)', fontSize: 32 }}>Rubik</div>
        </div>
      </div>
    </Section>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <Section title="Font Weights">
      {[
        ['--font-weight-regular', 400, 'Regular'],
        ['--font-weight-medium', 500, 'Medium'],
        ['--font-weight-semibold', 600, 'Semibold'],
        ['--font-weight-bold', 700, 'Bold'],
      ].map(([varName, weight, label]) => (
        <div key={varName as string} style={{ display: 'flex', gap: 24, alignItems: 'baseline', padding: '8px 0' }}>
          <div style={{ width: 200, fontSize: 12, fontFamily: 'monospace', color: 'var(--color-text-tertiary)' }}>
            {varName} ({weight})
          </div>
          <div style={{ fontFamily: 'var(--font-family-body)', fontWeight: weight as number, fontSize: 20 }}>
            {label} — Aa Bb Cc
          </div>
        </div>
      ))}
    </Section>
  ),
};

export const TypeScale: Story = {
  name: 'Type Scale',
  render: () => (
    <>
      <Section title="Display">
        <Sample varName="--text-display-hero" value="76px" fontFamily="--font-family-heading" fontWeight={700} lineHeightVar="--line-height-76" lineHeightValue="91.2px" label="Display / Hero" />
        <Sample varName="--text-display-large" value="61px" fontFamily="--font-family-heading" fontWeight={700} lineHeightVar="--line-height-61" lineHeightValue="73px" label="Display / Large" />
      </Section>
      <Section title="Heading">
        <Sample varName="--text-heading-page-title" value="49px" fontFamily="--font-family-heading" fontWeight={600} lineHeightVar="--line-height-49" lineHeightValue="58.8px" label="Heading / Page title (h1)" />
        <Sample varName="--text-heading-section-title" value="39px" fontFamily="--font-family-heading" fontWeight={600} lineHeightVar="--line-height-39" lineHeightValue="46.8px" label="Heading / Section title (h2)" />
        <Sample varName="--text-heading-card-title" value="31px" fontFamily="--font-family-heading" fontWeight={600} lineHeightVar="--line-height-31" lineHeightValue="37.2px" label="Heading / Card title (h3)" />
        <Sample varName="--text-heading-sub-section" value="25px" fontFamily="--font-family-heading" fontWeight={600} lineHeightVar="--line-height-25" lineHeightValue="30px" label="Heading / Sub-section (h4)" />
      </Section>
      <Section title="Body">
        <Sample varName="--text-body-large" value="20px" fontFamily="--font-family-body" fontWeight={400} lineHeightVar="--line-height-20" lineHeightValue="24px" label="Body / Large" />
        <Sample varName="--text-body-default" value="16px" fontFamily="--font-family-body" fontWeight={400} lineHeightVar="--line-height-16" lineHeightValue="19.2px" label="Body / Default" />
        <Sample varName="--text-body-small" value="13px" fontFamily="--font-family-body" fontWeight={400} lineHeightVar="--line-height-13" lineHeightValue="15.6px" label="Body / Small" />
      </Section>
      <Section title="Micro">
        <Sample varName="--text-caption-badge" value="10px" fontFamily="--font-family-body" fontWeight={500} lineHeightVar="--line-height-10" lineHeightValue="12px" label="Caption / Badge" />
        <Sample varName="--text-micro-legal" value="8px" fontFamily="--font-family-body" fontWeight={400} lineHeightVar="--line-height-8" lineHeightValue="9.6px" label="Micro / Legal" />
      </Section>
    </>
  ),
};

export const LetterSpacing: Story = {
  name: 'Letter Spacing',
  render: () => (
    <Section title="Letter Spacing" description="Applied to all headings (h1–h6).">
      <div style={{ display: 'flex', gap: 24, alignItems: 'baseline' }}>
        <div style={{ width: 200, fontSize: 12, fontFamily: 'monospace', color: 'var(--color-text-tertiary)' }}>
          --letter-spacing-default (-0.01em)
        </div>
        <div style={{ fontFamily: 'var(--font-family-heading)', fontWeight: 600, fontSize: 28, letterSpacing: 'var(--letter-spacing-default)' }}>
          Nusantics Design System
        </div>
      </div>
    </Section>
  ),
};

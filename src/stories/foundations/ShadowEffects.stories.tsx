import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section, TokenSwatch } from './helpers';
import { FoundationDocsPage } from './FoundationDocsPage';

const meta = {
  title: 'Foundations/Shadow & Effects',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: FoundationDocsPage,
      description: {
        component: 'Standard elevation shadows, brand-aware colored shadows (used under solid buttons), and overlay tints.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ELEVATIONS: [string, string][] = [
  ['--shadow-sm', 'Small'],
  ['--shadow', 'Default'],
  ['--shadow-md', 'Medium'],
  ['--shadow-lg', 'Large'],
];

export const Elevations: Story = {
  render: () => (
    <Section title="Elevations" description="Layered soft shadows used for cards, dialogs, popovers, and dropdowns.">
      <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', padding: '24px 8px' }}>
        {ELEVATIONS.map(([varName, label]) => (
          <div key={varName} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 12,
                background: 'var(--color-container-primary)',
                boxShadow: `var(${varName})`,
              }}
            />
            <div style={{ fontSize: 12, fontWeight: 600 }}>{label}</div>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-tertiary)' }}>{varName}</div>
          </div>
        ))}
      </div>
    </Section>
  ),
};

export const BrandShadows: Story = {
  name: 'Brand Shadows (reacts to Brand toolbar)',
  render: () => (
    <Section
      title="Brand Shadows"
      description="Used as the colored drop-shadow under solid primary/secondary/tertiary buttons — matches the active brand's accent color."
    >
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <TokenSwatch label="Shadow · Brand primary" varName="--color-shadow-brand-primary" />
        <TokenSwatch label="Shadow · Brand secondary" varName="--color-shadow-brand-secondary" />
        <TokenSwatch label="Shadow · Brand tertiary" varName="--color-shadow-brand-tertiary" />
      </div>
      <div style={{ display: 'flex', gap: 24, marginTop: 24 }}>
        <div
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            background: 'var(--color-brand-primary)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            boxShadow: '0px 0.5px 4px 0px var(--color-shadow-brand-primary)',
          }}
        >
          Primary button
        </div>
        <div
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            background: 'var(--color-brand-secondary)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            boxShadow: '0px 0.5px 4px 0px var(--color-shadow-brand-secondary)',
          }}
        >
          Secondary button
        </div>
      </div>
    </Section>
  ),
};

export const Overlays: Story = {
  render: () => (
    <Section title="Overlays" description="Scrims used behind modals/dialogs and on top of images.">
      <div style={{ display: 'flex', gap: 24 }}>
        <div
          style={{
            position: 'relative',
            width: 160,
            height: 100,
            borderRadius: 8,
            background:
              'repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 50% / 16px 16px',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'var(--color-overlay-black)' }} />
        </div>
        <div
          style={{
            position: 'relative',
            width: 160,
            height: 100,
            borderRadius: 8,
            background: 'var(--color-brand-primary)',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'var(--color-overlay-white)' }} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24, marginTop: 8, fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-tertiary)' }}>
        <div style={{ width: 160 }}>--color-overlay-black</div>
        <div style={{ width: 160 }}>--color-overlay-white</div>
      </div>
    </Section>
  ),
};

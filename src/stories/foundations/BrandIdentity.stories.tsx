import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from 'helix-design-system/components';
import { Section } from './helpers';
import { FoundationDocsPage } from './FoundationDocsPage';

const BRANDS = ['nusantics', 'cekolam', 'causa'] as const;
const BRAND_LABELS: Record<(typeof BRANDS)[number], string> = {
  nusantics: 'Nusantics',
  cekolam: 'CeKolam',
  causa: 'Causa',
};

function LogoCard({ brand, dark = false }: { brand: (typeof BRANDS)[number]; dark?: boolean }) {
  return (
    <div
      data-brand={brand}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 24,
        borderRadius: 12,
        border: '1px solid var(--color-stroke-subtle)',
        background: dark ? 'var(--color-bg-inverse)' : 'var(--color-container-primary)',
        minWidth: 220,
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: dark ? 'rgba(255,255,255,0.6)' : 'var(--color-text-tertiary)',
        }}
      >
        {BRAND_LABELS[brand]}
      </span>
      <Logo variant="wordmark" tone={dark ? 'white' : 'default'} height={22} />
      <Logo variant="mark" tone={dark ? 'white' : 'default'} height={32} />
    </div>
  );
}

const meta = {
  title: 'Foundations/Brand Identity',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: FoundationDocsPage,
      description: {
        component:
          '`Logo` is brand-aware the same way color tokens are: it renders one `<img>` per brand and the ambient `[data-brand]` cascade shows the right one — no brand prop, no JS lookup. Use the Brand toolbar above to see it switch live.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Live: Story = {
  name: 'Live (reacts to Brand toolbar)',
  render: () => (
    <Section
      title="Live"
      description="A single <Logo /> with no brand prop — it resolves from whichever data-brand is active on an ancestor. Try the Brand toolbar above."
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <Logo variant="wordmark" height={28} />
        <Logo variant="mark" height={40} />
      </div>
    </Section>
  ),
};

export const AllBrands: Story = {
  name: 'All Brands',
  render: () => (
    <>
      <Section
        title="On light surfaces"
        description="variant='wordmark' and variant='mark', tone='default' — each card pins its own data-brand, independent of the toolbar."
      >
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {BRANDS.map((brand) => (
            <LogoCard key={brand} brand={brand} />
          ))}
        </div>
      </Section>
      <Section title="On dark surfaces" description="tone='white' — for transparent Navbars, footers, hero sections.">
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {BRANDS.map((brand) => (
            <LogoCard key={brand} brand={brand} dark />
          ))}
        </div>
      </Section>
    </>
  ),
};

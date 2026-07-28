import { Logo } from '../../components/Logo';
import { PageLayout, Section } from './PageLayout';

const toc = [
  { id: 'live', label: 'Live' },
  { id: 'light-surfaces', label: 'On Light Surfaces' },
  { id: 'dark-surfaces', label: 'On Dark Surfaces' },
];

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
        gap: '16px',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #eee',
        background: dark ? '#14141e' : '#fff',
        minWidth: '220px',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-family-body)',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: dark ? 'rgba(255,255,255,0.6)' : '#828282',
      }}>
        {BRAND_LABELS[brand]}
      </span>
      <Logo variant="wordmark" tone={dark ? 'white' : 'default'} height={22} />
      <Logo variant="mark" tone={dark ? 'white' : 'default'} height={32} />
    </div>
  );
}

export function BrandIdentitySection() {
  return (
    <PageLayout
      category="Foundations"
      title="Brand Identity"
      description="Logo is brand-aware the same way color tokens are: it renders one <img> per brand and the ambient data-brand cascade shows the right one — no brand prop, no JS lookup."
      tocItems={toc}
    >
      <Section id="live" title="Live">
        <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontSize: '13px', color: '#828282' }}>
          A single &lt;Logo /&gt; with no brand prop — it resolves from whichever data-brand is active on an ancestor.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', padding: '24px', backgroundColor: '#f7f7f7', borderRadius: '8px', border: '1px solid #eee' }}>
          <Logo variant="wordmark" height={28} />
          <Logo variant="mark" height={40} />
        </div>
      </Section>

      <Section id="light-surfaces" title="On Light Surfaces">
        <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontSize: '13px', color: '#828282' }}>
          variant=&quot;wordmark&quot; and variant=&quot;mark&quot;, tone=&quot;default&quot; — each card pins its own data-brand, independent of the active brand.
        </p>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {BRANDS.map((brand) => (
            <LogoCard key={brand} brand={brand} />
          ))}
        </div>
      </Section>

      <Section id="dark-surfaces" title="On Dark Surfaces">
        <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontSize: '13px', color: '#828282' }}>
          tone=&quot;white&quot; — for transparent Navbars, footers, hero sections.
        </p>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {BRANDS.map((brand) => (
            <LogoCard key={brand} brand={brand} dark />
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}

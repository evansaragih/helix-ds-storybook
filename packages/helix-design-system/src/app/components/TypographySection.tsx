import { PageLayout, Section } from './PageLayout';

const toc = [
  { id: 'font-families', label: 'Font Families' },
  { id: 'type-scale', label: 'Type Scale' },
  { id: 'font-weights', label: 'Font Weights' }
];

const card = {
  padding: '20px 24px',
  backgroundColor: '#f7f7f7',
  borderRadius: '8px',
  border: '1px solid #eee',
  marginBottom: '12px'
};

export function TypographySection() {
  return (
    <PageLayout
      category="Foundations"
      title="Typography"
      description="Typography scale and font families that define the visual hierarchy and readability across the design system."
      tocItems={toc}
    >
      <Section id="font-families" title="Font Families">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {[
            { name: 'Quicksand', role: 'Headings', family: 'var(--font-family-heading)' },
            { name: 'Rubik', role: 'Body Text', family: 'var(--font-family-body)' }
          ].map((f) => (
            <div key={f.name} style={{ ...card, marginBottom: 0 }}>
              <p style={{ fontFamily: f.family, fontSize: '32px', fontWeight: 600, color: '#14141e', margin: '0 0 4px' }}>{f.name}</p>
              <p style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#828282', margin: '0 0 12px' }}>{f.role}</p>
              <p style={{ fontFamily: f.family, fontSize: '14px', color: '#49494a', margin: 0, lineHeight: '1.6' }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz<br />
                0123456789
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="type-scale" title="Type Scale">
        <h3 style={{ margin: '0 0 12px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '14px', color: '#828282', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Display</h3>
        {[
          { name: 'Hero Display', size: 'var(--text-display-hero)', label: '76px · var(--text-display-hero)' },
          { name: 'Large Heading', size: 'var(--text-display-large)', label: '61px · var(--text-display-large)' }
        ].map((item) => (
          <div key={item.name} style={card}>
            <p style={{ fontFamily: 'var(--font-family-heading)', fontSize: item.size, fontWeight: 600, color: '#14141e', margin: '0 0 6px' }}>{item.name}</p>
            <p style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#828282', margin: 0 }}>{item.label}</p>
          </div>
        ))}

        <h3 style={{ margin: '24px 0 12px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '14px', color: '#828282', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Headings</h3>
        {[
          { name: 'Page Title', size: 'var(--text-heading-page-title)', label: '49px · var(--text-heading-page-title)' },
          { name: 'Section Title', size: 'var(--text-heading-section-title)', label: '39px · var(--text-heading-section-title)' },
          { name: 'Card Title', size: 'var(--text-heading-card-title)', label: '31px · var(--text-heading-card-title)' },
          { name: 'Sub Section', size: 'var(--text-heading-sub-section)', label: '25px · var(--text-heading-sub-section)' }
        ].map((item) => (
          <div key={item.name} style={card}>
            <p style={{ fontFamily: 'var(--font-family-heading)', fontSize: item.size, fontWeight: 600, color: '#14141e', margin: '0 0 6px' }}>{item.name}</p>
            <p style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#828282', margin: 0 }}>{item.label}</p>
          </div>
        ))}

        <h3 style={{ margin: '24px 0 12px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '14px', color: '#828282', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Body</h3>
        {[
          { name: 'Large Body — The quick brown fox jumps over the lazy dog', size: 'var(--text-body-large)', label: '20px · var(--text-body-large)' },
          { name: 'Default Body — The quick brown fox jumps over the lazy dog', size: 'var(--text-body-default)', label: '16px · var(--text-body-default)' },
          { name: 'Small Helper — The quick brown fox jumps over the lazy dog', size: 'var(--text-body-small)', label: '13px · var(--text-body-small)' }
        ].map((item) => (
          <div key={item.name} style={card}>
            <p style={{ fontFamily: 'var(--font-family-body)', fontSize: item.size, color: '#14141e', margin: '0 0 6px' }}>{item.name}</p>
            <p style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#828282', margin: 0 }}>{item.label}</p>
          </div>
        ))}
      </Section>

      <Section id="font-weights" title="Font Weights">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {[
            { name: 'Regular', value: '400', weight: 400 },
            { name: 'Medium', value: '500', weight: 500 },
            { name: 'Semibold', value: '600', weight: 600 },
            { name: 'Bold', value: '700', weight: 700 }
          ].map((item) => (
            <div key={item.name} style={{ ...card, marginBottom: 0 }}>
              <p style={{ fontFamily: 'Rubik, sans-serif', fontSize: '20px', fontWeight: item.weight, color: '#14141e', margin: '0 0 4px' }}>{item.name}</p>
              <p style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#828282', margin: 0 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}

import { PageLayout, Section } from './PageLayout';

const toc = [
  { id: 'spacing-scale', label: 'Spacing Scale' },
  { id: 'border-radius', label: 'Border Radius' },
  { id: 'breakpoints', label: 'Breakpoints' }
];

export function UtilitiesSection() {
  const spacing = [
    { name: 'sp-0', value: '0px' }, { name: 'sp-2', value: '2px' },
    { name: 'sp-4', value: '4px' }, { name: 'sp-6', value: '6px' },
    { name: 'sp-8', value: '8px' }, { name: 'sp-12', value: '12px' },
    { name: 'sp-16', value: '16px' }, { name: 'sp-20', value: '20px' },
    { name: 'sp-24', value: '24px' }, { name: 'sp-32', value: '32px' },
    { name: 'sp-40', value: '40px' }, { name: 'sp-48', value: '48px' },
    { name: 'sp-64', value: '64px' }, { name: 'sp-80', value: '80px' },
    { name: 'sp-96', value: '96px' }
  ];

  const borderRadius = [
    { name: 'None', value: '0px', var: '--radius-none' },
    { name: 'XS', value: '2px', var: '--radius-xs' },
    { name: 'SM', value: '4px', var: '--radius-sm' },
    { name: 'MD', value: '6px', var: '--radius-md' },
    { name: 'LG', value: '8px', var: '--radius-lg' },
    { name: 'XL', value: '12px', var: '--radius-xl' },
    { name: '2XL', value: '16px', var: '--radius-2xl' },
    { name: '3XL', value: '24px', var: '--radius-3xl' },
    { name: 'Full', value: '9999px', var: '--radius-full' }
  ];

  const breakpoints = [
    { name: 'SM', value: '640px', var: '--container-sm' },
    { name: 'MD', value: '768px', var: '--container-md' },
    { name: 'LG', value: '1024px', var: '--container-lg' },
    { name: 'XL', value: '1280px', var: '--container-xl' },
    { name: '2XL', value: '1536px', var: '--container-2xl' }
  ];

  return (
    <PageLayout
      category="Foundations"
      title="Spacing & Layout"
      description="Spacing, border radius, and breakpoint tokens for consistent, scalable layouts across all screen sizes."
      tocItems={toc}
    >
      <Section id="spacing-scale" title="Spacing Scale">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {spacing.map((item) => (
            <div key={item.name} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '10px 16px',
              backgroundColor: '#f7f7f7',
              borderRadius: '8px',
              border: '1px solid #eee'
            }}>
              <div style={{
                width: item.value === '0px' ? '2px' : item.value,
                maxWidth: '200px',
                height: '28px',
                backgroundColor: '#F57E20',
                borderRadius: '4px',
                flexShrink: 0,
                minWidth: item.value === '0px' ? '2px' : undefined
              }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: '13px', color: '#14141e' }}>
                  {item.name}
                </span>
                <span style={{ fontFamily: 'var(--font-family-body)', fontSize: '12px', color: '#828282', marginLeft: '8px' }}>
                  {item.value} · var(--spacing-{item.name.replace('sp-', '')})
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="border-radius" title="Border Radius">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {borderRadius.map((item) => (
            <div key={item.name} style={{
              padding: '16px',
              backgroundColor: '#f7f7f7',
              borderRadius: '8px',
              border: '1px solid #eee'
            }}>
              <div style={{
                width: '100%',
                height: '72px',
                backgroundColor: '#F57E20',
                borderRadius: item.value === '9999px' ? '9999px' : item.value,
                marginBottom: '12px'
              }} />
              <p style={{ margin: '0 0 2px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: '13px', color: '#14141e' }}>{item.name}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: '11px', color: '#828282' }}>{item.value}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: '11px', color: '#9f9f9f' }}>var({item.var})</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="breakpoints" title="Breakpoints">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {breakpoints.map((item) => (
            <div key={item.name} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              backgroundColor: '#f7f7f7',
              borderRadius: '8px',
              border: '1px solid #eee'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#F57E20',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-family-body)',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: 'white'
                }}>{item.name}</span>
                <div>
                  <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: '14px', color: '#14141e' }}>{item.value}</p>
                  <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: '12px', color: '#828282' }}>var({item.var})</p>
                </div>
              </div>
              <div style={{
                height: '4px',
                width: `${(parseInt(item.value) / 1536) * 200}px`,
                backgroundColor: '#F57E20',
                borderRadius: '2px',
                opacity: 0.4
              }} />
            </div>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}

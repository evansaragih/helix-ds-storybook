import { PageLayout, Section } from './PageLayout';

const toc = [
  { id: 'text-colors', label: 'Text Colors' },
  { id: 'button-colors', label: 'Button Colors' },
  { id: 'input-colors', label: 'Input Colors' },
  { id: 'background-colors', label: 'Backgrounds' },
  { id: 'status-colors', label: 'Status Surfaces' },
  { id: 'data-viz-colors', label: 'Data Visualization' }
];

const swatch = (hex: string, size = 48) => (
  <div style={{
    width: size, height: size, flexShrink: 0,
    backgroundColor: hex, borderRadius: '6px',
    border: '1px solid rgba(0,0,0,0.08)'
  }} />
);

export function SemanticsSection() {
  const textColors = [
    { name: 'Primary', hex: '#14141E', usage: 'Body text' },
    { name: 'Secondary', hex: '#49494A', usage: 'Subtitles' },
    { name: 'Tertiary', hex: '#828282', usage: 'Captions' },
    { name: 'Muted', hex: '#9F9F9F', usage: 'Disabled' },
    { name: 'On Primary', hex: '#FFFFFF', usage: 'Text on colored backgrounds' },
    { name: 'Brand Primary', hex: '#F57E20', usage: 'Primary brand text' },
    { name: 'Brand Secondary', hex: '#58595B', usage: 'Secondary brand text' },
    { name: 'Brand Tertiary', hex: '#476142', usage: 'Tertiary brand text' },
    { name: 'Error', hex: '#EF4444', usage: 'Error messages' },
    { name: 'Success', hex: '#12843C', usage: 'Success messages' },
    { name: 'Warning', hex: '#A66800', usage: 'Warning messages' },
    { name: 'Info', hex: '#014CC5', usage: 'Informational messages' }
  ];

  const buttonColors = [
    { category: 'Primary', states: [{ state: 'Default', hex: '#F57E20' }, { state: 'Hover', hex: '#DF6505' }, { state: 'Pressed', hex: '#B35001' }] },
    { category: 'Secondary', states: [{ state: 'Default', hex: '#58595B' }, { state: 'Hover', hex: '#48494B' }, { state: 'Pressed', hex: '#393A3B' }] },
    { category: 'Tertiary', states: [{ state: 'Default', hex: '#476142' }, { state: 'Hover', hex: '#3E5639' }, { state: 'Pressed', hex: '#2E402A' }] },
    { category: 'Danger', states: [{ state: 'Default', hex: '#DC2626' }, { state: 'Hover', hex: '#B91C1C' }, { state: 'Pressed', hex: '#991B1B' }] },
    { category: 'Success', states: [{ state: 'Default', hex: '#22C55E' }, { state: 'Hover', hex: '#19A54C' }, { state: 'Pressed', hex: '#12843C' }] },
    { category: 'Warning', states: [{ state: 'Default', hex: '#F59E0B' }, { state: 'Hover', hex: '#CE8303' }, { state: 'Pressed', hex: '#A66800' }] },
    { category: 'Info', states: [{ state: 'Default', hex: '#3B82F6' }, { state: 'Hover', hex: '#0560F5' }, { state: 'Pressed', hex: '#014CC5' }] }
  ];

  const inputColors = [
    { category: 'Background', colors: [{ state: 'Default', hex: '#FFFFFF' }, { state: 'Hover', hex: '#EEEEEE' }, { state: 'Focus', hex: '#FFFFFF' }, { state: 'Disabled', hex: '#D7D7D7' }, { state: 'Error', hex: '#FEE2E2' }, { state: 'Success', hex: '#E9F9EF' }] },
    { category: 'Border', colors: [{ state: 'Default', hex: '#D7D7D7' }, { state: 'Hover', hex: '#9F9F9F' }, { state: 'Focus', hex: '#F57E20' }, { state: 'Disabled', hex: '#D7D7D7' }, { state: 'Error', hex: '#DC2626' }, { state: 'Success', hex: '#22C55E' }] },
    { category: 'Text', colors: [{ state: 'Default', hex: '#14141E' }, { state: 'Placeholder', hex: '#9F9F9F' }, { state: 'Disabled', hex: '#9F9F9F' }, { state: 'Error', hex: '#DC2626' }] }
  ];

  const backgroundColors = [
    { name: 'Page', hex: '#FFFFFF', usage: 'Main page background' },
    { name: 'Subtle', hex: '#EEEEEE', usage: 'Subtle secondary background' },
    { name: 'Hover', hex: '#EEEEEE', usage: 'Hover state background' },
    { name: 'Inverse', hex: '#14141E', usage: 'Dark inverse background' }
  ];

  const containerColors = [
    { name: 'Primary', hex: '#FFFFFF', usage: 'Primary containers' },
    { name: 'Secondary', hex: '#F7F7F7', usage: 'Secondary containers' },
    { name: 'Tertiary', hex: '#EEEEEE', usage: 'Tertiary containers' },
    { name: 'Disabled', hex: '#D7D7D7', usage: 'Disabled containers' }
  ];

  const statusColors = [
    { name: 'Brand', hex: '#FEF2E9', usage: 'Brand status background' },
    { name: 'Error', hex: '#FEE2E2', usage: 'Error status background' },
    { name: 'Success', hex: '#E9F9EF', usage: 'Success status background' },
    { name: 'Warning', hex: '#FEF5E7', usage: 'Warning status background' },
    { name: 'Info', hex: '#EBF2FE', usage: 'Info status background' }
  ];

  const dataVizColors = [
    { name: 'Chart 1', hex: '#F57E20' }, { name: 'Chart 2', hex: '#59595A' },
    { name: 'Chart 3', hex: '#22C55E' }, { name: 'Chart 4', hex: '#F59E0B' },
    { name: 'Chart 5', hex: '#3B82F6' }, { name: 'Chart 6', hex: '#D2DBC3' },
    { name: 'Chart 7', hex: '#22C55E' }, { name: 'Chart 8', hex: '#2B485E' }
  ];

  const rowCard = { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', backgroundColor: '#f7f7f7', borderRadius: '8px', border: '1px solid #eee' } as const;

  return (
    <PageLayout
      category="Foundations"
      title="Semantics"
      description="Semantic color tokens with clear purpose and usage guidelines for consistent, accessible UI implementation."
      tocItems={toc}
    >
      <Section id="text-colors" title="Text Colors">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {textColors.map((c) => (
            <div key={c.name} style={rowCard}>
              {swatch(c.hex)}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '13px', color: '#14141e' }}>{c.name}</p>
                <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: '11px', color: '#828282' }}>{c.hex} · {c.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="button-colors" title="Button Colors">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {buttonColors.map((btn) => (
            <div key={btn.category} style={{ padding: '16px', backgroundColor: '#f7f7f7', borderRadius: '8px', border: '1px solid #eee' }}>
              <p style={{ margin: '0 0 12px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '14px', color: '#14141e' }}>{btn.category}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {btn.states.map((s) => (
                  <div key={s.state} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {swatch(s.hex, 32)}
                    <div>
                      <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#49494a' }}>{s.state}</p>
                      <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: '11px', color: '#828282' }}>{s.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="input-colors" title="Input Colors">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {inputColors.map((input) => (
            <div key={input.category} style={{ padding: '16px', backgroundColor: '#f7f7f7', borderRadius: '8px', border: '1px solid #eee' }}>
              <p style={{ margin: '0 0 12px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '14px', color: '#14141e' }}>{input.category}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {input.colors.map((c) => (
                  <div key={c.state} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {swatch(c.hex, 28)}
                    <div>
                      <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#49494a' }}>{c.state}</p>
                      <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: '11px', color: '#828282' }}>{c.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="background-colors" title="Backgrounds & Containers">
        <h3 style={{ margin: '0 0 12px', fontFamily: 'Rubik, sans-serif', fontWeight: 500, fontSize: '14px', color: '#828282' }}>Backgrounds</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
          {backgroundColors.map((c) => (
            <div key={c.name} style={{ borderRadius: '8px', border: '1px solid #eee', overflow: 'hidden' }}>
              <div style={{ height: '60px', backgroundColor: c.hex, borderBottom: '1px solid #eee' }} />
              <div style={{ padding: '8px 10px', backgroundColor: '#f7f7f7' }}>
                <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '12px', color: '#14141e' }}>{c.name}</p>
                <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: '11px', color: '#828282' }}>{c.hex}</p>
              </div>
            </div>
          ))}
        </div>
        <h3 style={{ margin: '0 0 12px', fontFamily: 'Rubik, sans-serif', fontWeight: 500, fontSize: '14px', color: '#828282' }}>Containers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {containerColors.map((c) => (
            <div key={c.name} style={{ borderRadius: '8px', border: '1px solid #eee', overflow: 'hidden' }}>
              <div style={{ height: '60px', backgroundColor: c.hex, borderBottom: '1px solid #eee' }} />
              <div style={{ padding: '8px 10px', backgroundColor: '#f7f7f7' }}>
                <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '12px', color: '#14141e' }}>{c.name}</p>
                <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: '11px', color: '#828282' }}>{c.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="status-colors" title="Status Surfaces">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
          {statusColors.map((c) => (
            <div key={c.name} style={{ borderRadius: '8px', border: '1px solid #eee', overflow: 'hidden' }}>
              <div style={{ height: '72px', backgroundColor: c.hex, borderBottom: '1px solid #eee' }} />
              <div style={{ padding: '8px 10px' }}>
                <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '12px', color: '#14141e' }}>{c.name}</p>
                <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: '11px', color: '#828282' }}>{c.hex}</p>
                <p style={{ margin: '2px 0 0', fontFamily: 'Rubik, sans-serif', fontSize: '11px', color: '#9f9f9f' }}>{c.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="data-viz-colors" title="Data Visualization">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {dataVizColors.map((c) => (
            <div key={c.name} style={{ borderRadius: '8px', border: '1px solid #eee', overflow: 'hidden' }}>
              <div style={{ height: '72px', backgroundColor: c.hex }} />
              <div style={{ padding: '8px 10px' }}>
                <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '12px', color: '#14141e' }}>{c.name}</p>
                <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: '11px', color: '#828282' }}>{c.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}

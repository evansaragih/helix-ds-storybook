import { PageLayout, Section } from './PageLayout';
import { Spinner } from '../../components/Spinner';

const toc = [
  { id: 'spinner-usage', label: 'Usage Guidelines' },
  { id: 'spinner-sizes', label: 'Sizes' },
  { id: 'spinner-variants', label: 'Variants' },
  { id: 'spinner-inline', label: 'Inline Usage' },
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>{children}</div>
    </div>
  );
}

export function SpinnerSection() {
  return (
    <PageLayout
      category="Components"
      title="Spinner"
      description="Spinners indicate an ongoing operation. Use them when content is loading and the wait time is short. For longer waits, prefer a skeleton or progress bar."
      tocItems={toc}
    >
      <Section id="spinner-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Short waits only', body: 'Use a spinner for operations under 3 seconds. For longer loads, show a skeleton screen or progress bar with a label.' },
            { heading: 'Pair with context', body: 'A spinner alone provides no feedback. Accompany it with a label ("Saving…") or place it inside the loading element.' },
            { heading: 'Don\'t stack spinners', body: 'Show at most one spinner per page region. Multiple simultaneous spinners create visual noise and confusion.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="spinner-sizes" title="Sizes">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Five sizes from xs (12 px) to xl (48 px). Match the spinner size to the context — xs/sm inside buttons, md for inline content, lg/xl for full-page loads.
        </p>
        <Card title="All sizes">
          {(['xs','sm','md','lg','xl'] as const).map(s => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Spinner size={s} />
              <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 11, color: '#828282' }}>{s}</span>
            </div>
          ))}
        </Card>
      </Section>

      <Section id="spinner-variants" title="Variants">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Variant colors map to the brand palette. Use <code>white</code> on dark or colored backgrounds.
        </p>
        <Card title="All variants">
          {(['primary','secondary','tertiary','neutral'] as const).map(v => (
            <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Spinner size="md" variant={v} />
              <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 11, color: '#828282' }}>{v}</span>
            </div>
          ))}
          <div style={{ padding: '12px 16px', borderRadius: 8, backgroundColor: '#14141E', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Spinner size="md" variant="white" />
            <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 11, color: '#828282' }}>white</span>
          </div>
        </Card>
      </Section>

      <Section id="spinner-inline" title="Inline Usage">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Spinners can be placed inline with text or inside buttons to indicate loading state.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
            <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>With label</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Saving changes…', 'Loading data…', 'Processing…'].map(label => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Spinner size="sm" />
                  <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#49494A' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
            <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>Full page</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0', gap: 12 }}>
              <Spinner size="xl" />
              <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282' }}>Loading your workspace…</span>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}

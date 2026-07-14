import { PageLayout, Section } from './PageLayout';
import { Divider } from '../../components';

const toc = [
  { id: 'divider-usage',       label: 'Usage Guidelines' },
  { id: 'divider-types',       label: 'Types' },
  { id: 'divider-orientation', label: 'Orientation' },
  { id: 'divider-label',       label: 'With Label' },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      {children}
    </div>
  );
}

export function DividerSection() {
  return (
    <PageLayout
      category="Components"
      title="Divider"
      description="Dividers separate content into logical groups. They support horizontal and vertical orientations, solid and dashed styles, and an optional label."
      tocItems={toc}
    >
      <Section id="divider-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Separate, don\'t decorate', body: 'Use dividers to create clear visual breaks between unrelated content groups — not as decorative lines.' },
            { heading: 'Prefer whitespace first', body: 'A divider is a last resort. Generous padding or margin between sections often works better.' },
            { heading: 'Vertical dividers in toolbars', body: 'Vertical dividers work well inside toolbars or button groups to signal a boundary between different action clusters.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="divider-types" title="Types">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          <code>line</code> is a solid 1 px stroke; <code>dash</code> uses a dashed pattern.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <DemoCard title="line">
            <Divider type="line" />
          </DemoCard>
          <DemoCard title="dash">
            <Divider type="dash" />
          </DemoCard>
        </div>
      </Section>

      <Section id="divider-orientation" title="Orientation">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Horizontal (default) spans the full width of its container. Vertical requires an explicit height to render.
        </p>
        <DemoCard title="Vertical divider in a row">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 32 }}>
            <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: 13, color: '#49494A' }}>Section A</span>
            <Divider orientation="vertical" style={{ height: 20 }} />
            <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: 13, color: '#49494A' }}>Section B</span>
            <Divider orientation="vertical" style={{ height: 20 }} />
            <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: 13, color: '#49494A' }}>Section C</span>
          </div>
        </DemoCard>
      </Section>

      <Section id="divider-label" title="With Label">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          A label floats within the divider line. Align it left, center, or right.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <DemoCard title="label left">
            <Divider label="Or continue with" labelAlign="left" />
          </DemoCard>
          <DemoCard title="label center">
            <Divider label="Or continue with" labelAlign="center" />
          </DemoCard>
          <DemoCard title="label right">
            <Divider label="Or continue with" labelAlign="right" />
          </DemoCard>
        </div>
      </Section>
    </PageLayout>
  );
}

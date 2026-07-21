import { PageLayout, Section } from './PageLayout';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Slash } from 'lucide-react';

const toc = [
  { id: 'breadcrumb-usage', label: 'Usage Guidelines' },
  { id: 'breadcrumb-basic', label: 'Basic' },
  { id: 'breadcrumb-sizes', label: 'Sizes' },
  { id: 'breadcrumb-separator', label: 'Custom Separator' },
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </div>
  );
}

const dashboardCrumbs = [
  { label: 'Home', onClick: () => {} },
  { label: 'Dashboard', onClick: () => {} },
  { label: 'Analytics' },
];

const deepCrumbs = [
  { label: 'Settings', onClick: () => {} },
  { label: 'Organisation', onClick: () => {} },
  { label: 'Members', onClick: () => {} },
  { label: 'Evan Himawan' },
];

export function BreadcrumbSection() {
  return (
    <PageLayout
      category="Components"
      title="Breadcrumb"
      description="Breadcrumbs show the user's location within a hierarchy and allow quick navigation to any ancestor page."
      tocItems={toc}
    >
      <Section id="breadcrumb-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Show hierarchy', body: 'Only use breadcrumbs when the content lives in a hierarchy of 2+ levels. Single-level pages don\'t need breadcrumbs.' },
            { heading: 'Current page is last', body: 'The final crumb represents the current page. It should not be a link — the user is already there.' },
            { heading: 'Keep labels short', body: 'Truncate or abbreviate long segment names. Breadcrumbs should never wrap to a second line on typical viewports.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="breadcrumb-basic" title="Basic">
        <Card title="Breadcrumb examples">
          <Breadcrumb items={[{ label: 'Home', onClick: () => {} }, { label: 'Settings' }]} />
          <Breadcrumb items={dashboardCrumbs} />
          <Breadcrumb items={deepCrumbs} />
        </Card>
      </Section>

      <Section id="breadcrumb-sizes" title="Sizes">
        <Card title="Size variants">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#828282' }}>Small</p>
              <Breadcrumb size="sm" items={dashboardCrumbs} />
            </div>
            <div>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#828282' }}>Medium (default)</p>
              <Breadcrumb size="md" items={dashboardCrumbs} />
            </div>
          </div>
        </Card>
      </Section>

      <Section id="breadcrumb-separator" title="Custom Separator">
        <Card title="Separator variants">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#828282' }}>Default (ChevronRight)</p>
              <Breadcrumb items={dashboardCrumbs} />
            </div>
            <div>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#828282' }}>Slash</p>
              <Breadcrumb items={dashboardCrumbs} separator={<Slash size={14} strokeWidth={1.5} />} />
            </div>
            <div>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#828282' }}>Text dot</p>
              <Breadcrumb items={dashboardCrumbs} separator={<span style={{ fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282' }}>·</span>} />
            </div>
          </div>
        </Card>
      </Section>
    </PageLayout>
  );
}

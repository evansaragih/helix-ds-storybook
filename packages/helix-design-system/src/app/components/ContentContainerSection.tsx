import { PageLayout, Section } from './PageLayout';
import { ContentContainer } from '../../components';

const toc = [
  { id: 'content-container-usage', label: 'Usage Guidelines' },
  { id: 'content-container-basic', label: 'Basic' },
  { id: 'content-container-custom-header', label: 'Custom Header' },
  { id: 'content-container-padding', label: 'Padding' },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </div>
  );
}

export function ContentContainerSection() {
  return (
    <PageLayout
      category="Components"
      title="Content Container"
      description="Generic single-card shell — a header (icon + title/description + optional badge + optional action button) above a freeform content slot. Used for metrics cards, feature cards, and custom layouts. Matches Figma's Content Container (node 233:17314)."
      tocItems={toc}
    >
      <Section id="content-container-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'One container, any body', body: 'The header is opinionated (icon + title + description + badge); the body accepts anything you pass as children.' },
            { heading: 'Reach for Card for simpler cases', body: 'If you don’t need the icon/badge/action-button header pattern, Card + CardHeader/CardTitle is more composable.' },
            { heading: 'Action button is optional', body: 'Hide it with showActionButton={false} when the container is purely informational.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="content-container-basic" title="Basic">
        <DemoCard title="Title + description + badge">
          <div style={{ width: 420 }}>
            <ContentContainer title="Title" description="Description" badgeLabel="Blue">
              <div style={{ height: 44, borderRadius: 8, backgroundColor: 'var(--color-status-brand-bg, #FEF2E9)' }} />
            </ContentContainer>
          </div>
        </DemoCard>
        <DemoCard title="No action button">
          <div style={{ width: 420 }}>
            <ContentContainer title="Title only" showActionButton={false}>
              <div style={{ height: 44, borderRadius: 8, backgroundColor: 'var(--color-status-brand-bg, #FEF2E9)' }} />
            </ContentContainer>
          </div>
        </DemoCard>
      </Section>

      <Section id="content-container-custom-header" title="Custom Header">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Pass <code>headerContent</code> to fully replace the icon/title/description/badge layout with your own.
        </p>
        <DemoCard title="Custom header content">
          <div style={{ width: 420 }}>
            <ContentContainer headerContent={<strong style={{ fontFamily: 'var(--font-family-body)', fontSize: 16 }}>Fully custom header</strong>}>
              <div style={{ height: 44, borderRadius: 8, backgroundColor: 'var(--color-status-brand-bg, #FEF2E9)' }} />
            </ContentContainer>
          </div>
        </DemoCard>
      </Section>

      <Section id="content-container-padding" title="Padding">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Body padding follows the same scale as Card: <code>none</code>, <code>sm</code>, <code>md</code> (default), <code>lg</code>.
        </p>
        <DemoCard title="Padding scale">
          {(['none', 'sm', 'md', 'lg'] as const).map(p => (
            <div key={p} style={{ width: 420 }}>
              <ContentContainer title={`padding="${p}"`} showActionButton={false} padding={p}>
                <div style={{ height: 32, borderRadius: 6, backgroundColor: 'var(--color-status-brand-bg, #FEF2E9)' }} />
              </ContentContainer>
            </div>
          ))}
        </DemoCard>
      </Section>
    </PageLayout>
  );
}

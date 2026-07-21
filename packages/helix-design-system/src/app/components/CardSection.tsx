import { PageLayout, Section } from './PageLayout';
import { Card, CardHeader, CardTitle, CardDescription, Button } from '../../components';

const toc = [
  { id: 'card-usage',      label: 'Usage Guidelines' },
  { id: 'card-elevation',  label: 'Elevation' },
  { id: 'card-padding',    label: 'Padding' },
  { id: 'card-slots',      label: 'Header & Footer' },
  { id: 'card-hoverable',  label: 'Hoverable' },
];

export function CardSection() {
  return (
    <PageLayout
      category="Components"
      title="Card"
      description="Cards are surface containers that group related content. They support configurable elevation, padding, optional header and footer slots, and a hover lift effect."
      tocItems={toc}
    >
      <Section id="card-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Group related content', body: 'A card should contain a single cohesive idea — like a product, a metric, or a task. Avoid mixing unrelated content.' },
            { heading: 'Keep hierarchy clear', body: 'Use CardTitle + CardDescription to establish the reading order. Put supporting details or actions in the footer slot.' },
            { heading: 'Use elevation consistently', body: 'Choose one elevation level per layer of your UI (e.g. sm for list cards, md for modal-like cards).' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="card-elevation" title="Elevation">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Elevation controls the drop shadow depth. Use <code>none</code> for flat layouts, <code>sm</code> for subtle lift, and <code>md</code> for prominent cards.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {(['none', 'sm', 'default', 'md'] as const).map(e => (
            <Card key={e} elevation={e}>
              <CardHeader><CardTitle>elevation="{e}"</CardTitle></CardHeader>
              <CardDescription>This card uses the <strong>{e}</strong> shadow token.</CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="card-padding" title="Padding">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Four padding presets: <code>none</code> (0), <code>sm</code> (12 px), <code>md</code> (16 px, default), <code>lg</code> (24 px).
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {(['none', 'sm', 'md', 'lg'] as const).map(p => (
            <Card key={p} padding={p}>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A' }}>padding="{p}"</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="card-slots" title="Header & Footer">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Pass content to <code>header</code> and <code>footer</code> props to add bordered sections above and below the card body.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <Card
            header={<CardTitle>Card with header</CardTitle>}
          >
            <CardDescription>Main content goes here. The header is separated by a border.</CardDescription>
          </Card>
          <Card
            header={<CardTitle>Card with both slots</CardTitle>}
            footer={
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <Button variant="neutral" size="sm">Cancel</Button>
                <Button variant="primary" size="sm">Confirm</Button>
              </div>
            }
          >
            <CardDescription>The footer has a secondary background and sits below a border.</CardDescription>
          </Card>
        </div>
      </Section>

      <Section id="card-hoverable" title="Hoverable">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Set <code>hoverable</code> to add a subtle lift + shadow transition on mouse-enter. Useful for clickable card grids.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[1, 2, 3].map(i => (
            <Card key={i} hoverable style={{ cursor: 'pointer' }}>
              <CardHeader><CardTitle>Hoverable card {i}</CardTitle></CardHeader>
              <CardDescription>Hover to see the lift effect.</CardDescription>
            </Card>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}

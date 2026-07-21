import { PageLayout, Section } from './PageLayout';
import { AvatarGroup, AvatarLabelGroup } from '../../components';

const toc = [
  { id: 'avatar-group-usage', label: 'Usage Guidelines' },
  { id: 'avatar-group-sizes', label: 'Sizes' },
  { id: 'avatar-group-overflow', label: 'Overflow & Add Button' },
  { id: 'avatar-label-group', label: 'Avatar Label Group' },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>{children}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 12, color: 'var(--color-text-tertiary, #828282)', width: 120, flexShrink: 0 }}>
        {label}
      </span>
      {children}
    </div>
  );
}

const users = [
  { id: 1, name: 'Olivia Rhye', src: 'https://i.pravatar.cc/80?img=1' },
  { id: 2, name: 'Phoenix Baker', src: 'https://i.pravatar.cc/80?img=2' },
  { id: 3, name: 'Lana Steiner', src: 'https://i.pravatar.cc/80?img=3' },
  { id: 4, name: 'Demi Wilkinson', src: 'https://i.pravatar.cc/80?img=4' },
  { id: 5, name: 'Candice Wu', src: 'https://i.pravatar.cc/80?img=5' },
  { id: 6, name: 'Natasha Craig', src: 'https://i.pravatar.cc/80?img=6' },
  { id: 7, name: 'Drew Cano', src: 'https://i.pravatar.cc/80?img=7' },
];

export function AvatarGroupSection() {
  return (
    <PageLayout
      category="Components"
      title="Avatar Group"
      description="Avatar Group stacks multiple user avatars with an overlap, collapsing overflow into a count badge. Optionally pairs with an add-user action for team or member management surfaces."
      tocItems={toc}
    >
      <Section id="avatar-group-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Cap the visible count', body: 'Show 4-6 avatars max and collapse the rest into a "+N" badge to keep the group compact.' },
            { heading: 'Order by relevance', body: 'Put the most recently active or most important members first — the earliest positions get the most visual weight.' },
            { heading: 'Pair with a label when needed', body: 'Use Avatar Label Group instead when the viewer needs to identify a single specific person, not just headcount.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="avatar-group-sizes" title="Sizes">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Three sizes are available: <code>xs</code>, <code>sm</code>, and <code>md</code>.
        </p>
        <DemoCard title="Sizes">
          <Row label="xs"><AvatarGroup items={users} size="xs" max={5} /></Row>
          <Row label="sm"><AvatarGroup items={users} size="sm" max={5} /></Row>
          <Row label="md"><AvatarGroup items={users} size="md" max={5} /></Row>
        </DemoCard>
      </Section>

      <Section id="avatar-group-overflow" title="Overflow & Add Button">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Pass <code>max</code> to collapse extra avatars into a count badge. Enable <code>showAddButton</code> for team-management surfaces, with a circular or square shape via <code>addButtonShape</code>.
        </p>
        <DemoCard title="Overflow + add button combinations">
          <Row label="No overflow"><AvatarGroup items={users.slice(0, 3)} size="sm" /></Row>
          <Row label="With overflow"><AvatarGroup items={users} size="sm" max={4} /></Row>
          <Row label="+ Add button (circle)"><AvatarGroup items={users} size="sm" max={4} showAddButton addButtonShape="circle" /></Row>
          <Row label="+ Add button (square)"><AvatarGroup items={users} size="sm" max={4} showAddButton addButtonShape="square" /></Row>
        </DemoCard>
      </Section>

      <Section id="avatar-label-group" title="Avatar Label Group">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Pairs a single avatar with a name and optional email — use when the viewer needs to identify one specific person (comment authors, assignee pickers, member rows).
        </p>
        <DemoCard title="Sizes">
          <Row label="sm"><AvatarLabelGroup size="sm" name="Olivia Rhye" email="olivia@untitledui.com" src="https://i.pravatar.cc/80?img=1" /></Row>
          <Row label="md"><AvatarLabelGroup size="md" name="Olivia Rhye" email="olivia@untitledui.com" src="https://i.pravatar.cc/80?img=1" /></Row>
          <Row label="lg"><AvatarLabelGroup size="lg" name="Olivia Rhye" email="olivia@untitledui.com" src="https://i.pravatar.cc/80?img=1" /></Row>
          <Row label="xl"><AvatarLabelGroup size="xl" name="Olivia Rhye" email="olivia@untitledui.com" src="https://i.pravatar.cc/80?img=1" /></Row>
        </DemoCard>
      </Section>
    </PageLayout>
  );
}

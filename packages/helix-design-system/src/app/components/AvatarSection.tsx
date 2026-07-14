import { PageLayout, Section } from './PageLayout';
import { Avatar } from '../../components';
import { User, Star } from 'lucide-react';

const toc = [
  { id: 'avatar-usage',   label: 'Usage Guidelines' },
  { id: 'avatar-sizes',   label: 'Sizes' },
  { id: 'avatar-shapes',  label: 'Shapes' },
  { id: 'avatar-content', label: 'Content Types' },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: 12, color: 'var(--color-text-tertiary, #828282)', width: 120, flexShrink: 0 }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        {children}
      </div>
    </div>
  );
}

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </div>
  );
}

export function AvatarSection() {
  return (
    <PageLayout
      category="Components"
      title="Avatar"
      description="Avatars represent a user or entity with an image, initials, or icon. They support multiple sizes and shapes and are commonly used in navigation, comment threads, and profile areas."
      tocItems={toc}
    >
      <Section id="avatar-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Image first', body: 'Use a photo when available — it provides the strongest recognition signal for people.' },
            { heading: 'Consistent size', body: 'Pick one size per UI context. Mixing sizes in a list creates visual noise.' },
            { heading: 'Fallback gracefully', body: 'Always provide a name or initials fallback in case the image fails to load.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="avatar-sizes" title="Sizes">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Four sizes are available: <code>xs</code> (24 px), <code>sm</code> (32 px), <code>md</code> (40 px), and <code>lg</code> (48 px).
        </p>
        <DemoCard title="Initials avatars at all sizes">
          <Row label="xs (24px)"><Avatar size="xs" name="Evan Himawan" /></Row>
          <Row label="sm (32px)"><Avatar size="sm" name="Evan Himawan" /></Row>
          <Row label="md (40px)"><Avatar size="md" name="Evan Himawan" /></Row>
          <Row label="lg (48px)"><Avatar size="lg" name="Evan Himawan" /></Row>
        </DemoCard>
      </Section>

      <Section id="avatar-shapes" title="Shapes">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Use <code>circular</code> (default) for people and <code>rounded</code> for teams, bots, or entities.
        </p>
        <DemoCard title="Shape comparison">
          <Row label="circular">
            <Avatar size="md" name="Evan Himawan" shape="circular" />
            <Avatar size="md" name="Helix" shape="circular" />
          </Row>
          <Row label="rounded">
            <Avatar size="md" name="Evan Himawan" shape="rounded" />
            <Avatar size="md" name="Helix" shape="rounded" />
          </Row>
        </DemoCard>
      </Section>

      <Section id="avatar-content" title="Content Types">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Avatars support three content types: <code>image</code>, <code>placeholder</code> (initials derived from name), and <code>icon</code>.
        </p>
        <DemoCard title="All content types">
          <Row label="Image">
            <Avatar size="md" src="https://i.pravatar.cc/80?img=1" name="Alice" />
            <Avatar size="md" src="https://i.pravatar.cc/80?img=2" name="Bob" />
          </Row>
          <Row label="Initials">
            <Avatar size="md" name="Evan Himawan" />
            <Avatar size="md" name="Helix" />
            <Avatar size="md" initials="DS" />
          </Row>
          <Row label="Icon">
            <Avatar size="md" icon={<User size={16} />} />
            <Avatar size="md" icon={<Star size={16} />} />
          </Row>
        </DemoCard>
      </Section>
    </PageLayout>
  );
}

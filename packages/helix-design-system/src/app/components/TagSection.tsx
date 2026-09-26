import { PageLayout, Section } from './PageLayout';
import { Tag, Badge } from '../../components';
import { Globe, MapPin } from 'lucide-react';

const toc = [
  { id: 'tag-usage',       label: 'Usage Guidelines' },
  { id: 'tag-vs-badge',    label: 'Tag vs. Badge' },
  { id: 'tag-adornments',  label: 'Leading Adornments' },
  { id: 'tag-sizes',       label: 'Sizes' },
  { id: 'tag-selectable',  label: 'Selectable (Checkbox)' },
  { id: 'tag-presets',     label: 'State Presets' },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{
        fontFamily: 'var(--font-family-body)', fontSize: 12,
        color: 'var(--color-text-tertiary, #828282)',
        width: 100, flexShrink: 0,
      }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        {children}
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      padding: 20, backgroundColor: '#F7F7F7',
      borderRadius: 10, border: '1px solid #EEEEEE',
    }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>
        {title}
      </p>
      {children}
    </div>
  );
}

const AVATAR_SRC = 'https://i.pravatar.cc/64?img=12';

export function TagSection() {
  return (
    <PageLayout
      category="Components"
      title="Tag"
      description="Tags (chips) are neutral, outlined, interactive pills used to represent a filter, selection, or removable item — e.g. active filters, selected categories, or tokens in a multi-select input. They support a leading icon, avatar, or status dot; a trailing count; a close action; and a selectable checkbox state."
      tocItems={toc}
    >
      {/* Usage Guidelines */}
      <Section id="tag-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Use for user-driven state', body: 'Tags represent something a user chose or can remove — an applied filter, a selected option, an input token. Not a system-reported status.' },
            { heading: 'Stay neutral',               body: 'Tags are always outlined and neutral gray — color is not used to encode meaning here. If you need semantic color, that’s a Badge.' },
            { heading: 'Make removal obvious',        body: 'When a tag can be removed, always show the close (×) affordance rather than relying on a click on the whole tag.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Tag vs Badge */}
      <Section id="tag-vs-badge" title="Tag vs. Badge">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Tag and Badge look similar (both are small pill labels) but exist for opposite reasons — mixing them up is
          the most common misuse. Use the table below to pick the right one.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <Card title="Tag — user-driven, neutral, interactive">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              <Tag label="Design" onClose={() => {}} />
              <Tag label="Remote" checkbox checked />
              <Tag label="Filters" count={5} />
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.8' }}>
              <li>Always outlined, neutral color</li>
              <li>Represents something the user picked or can remove</li>
              <li>Built around interaction: close, checkbox, count</li>
              <li>e.g. applied filters, selected categories, input tokens</li>
            </ul>
          </Card>
          <Card title="Badge — system-reported, color-coded, mostly static">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              <Badge variant="green" label="Active" status />
              <Badge variant="red" label="Error" />
              <Badge variant="brand-subtle" label="New" />
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.8' }}>
              <li>Filled, color-coded by semantic meaning</li>
              <li>Represents a state the system reports</li>
              <li>Usually not removable by the user</li>
              <li>e.g. order status, notification count, plan tier</li>
            </ul>
          </Card>
        </div>
        <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#828282', lineHeight: '1.6' }}>
          Rule of thumb: if removing it or checking it makes sense, it's a <strong>Tag</strong>. If it's just
          conveying status/color at a glance, it's a <strong>Badge</strong>.
        </p>
      </Section>

      {/* Leading Adornments */}
      <Section id="tag-adornments" title="Leading Adornments">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          A tag can lead with plain text, an icon, an avatar, or a status dot — and can trail with a close button
          and/or a count pill. Only one leading adornment is shown at a time.
        </p>
        <Card title="Plain">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Row label="Default"><Tag label="Label" /></Row>
            <Row label="With close"><Tag label="Label" onClose={() => {}} /></Row>
            <Row label="With count"><Tag label="Label" count={5} /></Row>
          </div>
        </Card>
        <div style={{ height: 12 }} />
        <Card title="Leading icon">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Row label="Default"><Tag label="Label" leadingIcon={<Globe size={12} />} /></Row>
            <Row label="With close"><Tag label="Label" leadingIcon={<Globe size={12} />} onClose={() => {}} /></Row>
            <Row label="With count"><Tag label="Label" leadingIcon={<Globe size={12} />} count={5} /></Row>
          </div>
        </Card>
        <div style={{ height: 12 }} />
        <Card title="Leading avatar">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Row label="Default"><Tag label="Label" avatarSrc={AVATAR_SRC} /></Row>
            <Row label="With close"><Tag label="Label" avatarSrc={AVATAR_SRC} onClose={() => {}} /></Row>
            <Row label="With count"><Tag label="Label" avatarSrc={AVATAR_SRC} count={5} /></Row>
          </div>
        </Card>
        <div style={{ height: 12 }} />
        <Card title="Status dot">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Row label="Default"><Tag label="Label" status /></Row>
            <Row label="With close"><Tag label="Label" status onClose={() => {}} /></Row>
            <Row label="With count"><Tag label="Label" status count={5} /></Row>
          </div>
        </Card>
      </Section>

      {/* Sizes */}
      <Section id="tag-sizes" title="Sizes">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Three sizes — <strong>sm</strong> (10px), <strong>md</strong> (13px, default), <strong>lg</strong> (16px).
        </p>
        <Card title="Size scale">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Row label="sm — 10px"><Tag size="sm" label="Small" leadingIcon={<MapPin size={10} />} onClose={() => {}} /></Row>
            <Row label="md — 13px"><Tag size="md" label="Medium" leadingIcon={<MapPin size={12} />} onClose={() => {}} /></Row>
            <Row label="lg — 16px"><Tag size="lg" label="Large" leadingIcon={<MapPin size={14} />} onClose={() => {}} /></Row>
          </div>
        </Card>
      </Section>

      {/* Selectable */}
      <Section id="tag-selectable" title="Selectable (Checkbox)">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Set <code>checkbox</code> to swap the leading adornment for a checkbox, turning the tag into a
          multi-select option (e.g. a filter chip list).
        </p>
        <Card title="Checkbox variants">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Row label="Unchecked"><Tag label="Label" checkbox /></Row>
            <Row label="Checked"><Tag label="Label" checkbox checked /></Row>
            <Row label="With close"><Tag label="Label" checkbox checked onClose={() => {}} /></Row>
            <Row label="With count"><Tag label="Label" checkbox checked count={5} /></Row>
          </div>
        </Card>
      </Section>
      {/* State Presets */}
      <Section id="tag-presets" title="State Presets">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Four functional presets — independent from the mouse-interaction states (default/hover/pressed) shown
          earlier. These describe what the tag <em>means</em>, not how the cursor is currently touching it.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          <Card title="Default / Neutral">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              <Tag label="Label" />
            </div>
            <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>
              Outlined, neutral gray. Nothing has been picked yet.
            </p>
          </Card>
          <Card title="Active / Selected">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              <Tag label="Label" checkbox checked />
            </div>
            <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>
              Triggers automatically when <code>checkbox</code> is checked — brand-tinted background/border/text,
              reusing the same "Selected" token family as active nav/tab/list items.
            </p>
          </Card>
          <Card title="Disabled">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              <Tag label="Label" onClose={() => {}} disabled />
              <Tag label="Label" checkbox checked disabled />
            </div>
            <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>
              Explicit disabled tokens (not a blanket opacity fade) — muted gray fill, border, and text.
            </p>
          </Card>
          <Card title="Removable">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              <Tag label="Hover the ×" onClose={() => {}} />
            </div>
            <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>
              Not a whole-tag color change — hovering the × itself tints just the icon (and its circular hit area)
              with the error color, signaling deletion without implying the tag itself is in an error state.
            </p>
          </Card>
        </div>
      </Section>
    </PageLayout>
  );
}

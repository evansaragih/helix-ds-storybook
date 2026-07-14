import { PageLayout, Section } from './PageLayout';
import { Badge } from '../../components';
import { Star, ArrowUpRight, Bell, Tag } from 'lucide-react';

const toc = [
  { id: 'badge-usage',    label: 'Usage Guidelines' },
  { id: 'badge-variants', label: 'Variants' },
  { id: 'badge-colors',   label: 'Color Badges' },
  { id: 'badge-sizes',    label: 'Sizes' },
  { id: 'badge-slots',    label: 'Slots' },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{
        fontFamily: 'Rubik, sans-serif', fontSize: 12,
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
      <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>
        {title}
      </p>
      {children}
    </div>
  );
}

export function BadgeSection() {
  return (
    <PageLayout
      category="Components"
      title="Badge"
      description="Badges are compact labels used to display status, counts, categories, or metadata. They support color-coded semantic variants, optional icons, a status dot, a loading state, and a close action."
      tocItems={toc}
    >
      {/* Usage Guidelines */}
      <Section id="badge-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Keep labels short',   body: 'One or two words max. Badges communicate state at a glance — they are not for full sentences.' },
            { heading: 'Pick the right color', body: 'Use semantic variants (green = success, red = error, yellow = warning) so meaning is consistent across the UI.' },
            { heading: 'Use sparingly',        body: 'Too many badges compete for attention. Reserve them for status or counts that truly need to stand out.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Variants */}
      <Section id="badge-variants" title="Variants">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Structural variants control background, border, and text — independent of semantic color.
        </p>
        <Card title="All variants">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Row label="Default"><Badge variant="default" label="Default" /></Row>
            <Row label="Secondary"><Badge variant="secondary" label="Secondary" /></Row>
            <Row label="Outline"><Badge variant="outline" label="Outline" /></Row>
            <Row label="Destructive"><Badge variant="destructive" label="Destructive" /></Row>
            <Row label="Ghost"><Badge variant="ghost" label="Ghost" /></Row>
          </div>
        </Card>
      </Section>

      {/* Color Badges */}
      <Section id="badge-colors" title="Color Badges">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Semantic status colors — all mapped to CSS variables from the design token system.
        </p>
        <Card title="Status colors">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Badge variant="blue"         label="Info" />
            <Badge variant="green"        label="Success" />
            <Badge variant="yellow"       label="Warning" />
            <Badge variant="red"          label="Error" />
            <Badge variant="brand-subtle" label="Brand" />
            <Badge variant="gray"         label="Pending" />
            <Badge variant="default"      label="Brand Primary" />
          </div>
        </Card>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { variant: 'blue'         as const, token: '--color-status-info-bg',     text: '--color-text-info' },
            { variant: 'green'        as const, token: '--color-status-success-bg',  text: '--color-text-success' },
            { variant: 'yellow'       as const, token: '--color-status-warning-bg',  text: '--color-text-warning' },
            { variant: 'red'          as const, token: '--color-status-error-bg',    text: '--color-destructive' },
            { variant: 'brand-subtle' as const, token: '--color-status-brand-bg',    text: '--color-brand-primary' },
            { variant: 'gray'         as const, token: '--color-bg-subtle',          text: '--color-text-tertiary' },
          ].map(({ variant, token, text }) => (
            <div key={variant} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <Badge variant={variant} label={variant} style={{ marginBottom: 10 }} />
              <p style={{ margin: '0 0 2px', fontFamily: 'Rubik, sans-serif', fontSize: 11, color: '#828282' }}>bg: <code>{token}</code></p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 11, color: '#828282' }}>text: <code>{text}</code></p>
            </div>
          ))}
        </div>
      </Section>

      {/* Sizes */}
      <Section id="badge-sizes" title="Sizes">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Four sizes — <strong>sm</strong> (10px) for dense UI, <strong>md</strong> (13px) for default use, <strong>lg</strong> (16px) for emphasis, <strong>xl</strong> (20px) for hero areas.
        </p>
        <Card title="Size scale">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Row label="sm — 10px"><Badge size="sm" label="Small" /><Badge size="sm" variant="green" label="Active" /><Badge size="sm" variant="gray" label="Pending" /></Row>
            <Row label="md — 13px"><Badge size="md" label="Medium" /><Badge size="md" variant="green" label="Active" /><Badge size="md" variant="gray" label="Pending" /></Row>
            <Row label="lg — 16px"><Badge size="lg" label="Large" /><Badge size="lg" variant="green" label="Active" /><Badge size="lg" variant="gray" label="Pending" /></Row>
            <Row label="xl — 20px"><Badge size="xl" label="XLarge" /><Badge size="xl" variant="green" label="Active" /><Badge size="xl" variant="gray" label="Pending" /></Row>
          </div>
        </Card>
      </Section>

      {/* Slots */}
      <Section id="badge-slots" title="Slots">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Badges accept optional leading/trailing icons, a status dot, a loading spinner, and a close button.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          <Card title="Leading icon">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Badge label="Starred"  leadingIcon={<Star size={10} />} />
              <Badge label="Notify"   leadingIcon={<Bell size={10} />} variant="brand-subtle" />
              <Badge label="Category" leadingIcon={<Tag size={10} />}  variant="secondary" />
            </div>
          </Card>

          <Card title="Trailing icon">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Badge label="Open link"  trailingIcon={<ArrowUpRight size={10} />} />
              <Badge label="Details"    trailingIcon={<ArrowUpRight size={10} />} variant="secondary" />
              <Badge label="View"       trailingIcon={<ArrowUpRight size={10} />} variant="outline" />
            </div>
          </Card>

          <Card title="Status dot">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Badge label="Online"  variant="green"  status />
              <Badge label="Busy"    variant="red"    status />
              <Badge label="Away"    variant="yellow" status />
              <Badge label="Offline" variant="gray"   status />
            </div>
          </Card>

          <Card title="Loading">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Badge label="Generating…" loading variant="secondary" />
              <Badge label="Deleting…"   loading variant="destructive" />
              <Badge label="Saving…"     loading variant="brand-subtle" />
            </div>
          </Card>

          <Card title="With close">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Badge label="React"      onClose={() => {}} />
              <Badge label="TypeScript" onClose={() => {}} variant="secondary" />
              <Badge label="Design"     onClose={() => {}} variant="brand-subtle" />
              <Badge label="Urgent"     onClose={() => {}} variant="destructive" />
            </div>
          </Card>

          <Card title="Combined">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Badge size="md" label="Featured"    variant="default"   leadingIcon={<Star size={12} />} onClose={() => {}} />
              <Badge size="md" label="Notification" variant="brand-subtle" status onClose={() => {}} />
              <Badge size="md" label="Processing"  variant="secondary" loading />
              <Badge size="lg" label="Live"        variant="red"       status />
            </div>
          </Card>
        </div>
      </Section>
    </PageLayout>
  );
}

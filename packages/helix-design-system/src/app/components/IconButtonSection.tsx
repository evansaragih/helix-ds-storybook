import { Heart, Search, Settings, Trash2, Plus } from 'lucide-react';
import { PageLayout, Section } from './PageLayout';
import { IconButton, type IconButtonVariant } from '../../components';

const toc = [
  { id: 'icon-button-usage', label: 'Usage Guidelines' },
  { id: 'icon-button-shapes', label: 'Shapes' },
  { id: 'icon-button-variants', label: 'Variants' },
  { id: 'icon-button-states', label: 'States' },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 12, color: 'var(--color-text-tertiary, #828282)', width: 140, flexShrink: 0 }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        {children}
      </div>
    </div>
  );
}

const variants: { variant: IconButtonVariant; label: string }[] = [
  { variant: 'primary', label: 'Primary' },
  { variant: 'primary-outline', label: 'Primary Outline' },
  { variant: 'secondary', label: 'Secondary' },
  { variant: 'secondary-outline', label: 'Secondary Outline' },
  { variant: 'tertiary', label: 'Tertiary' },
  { variant: 'tertiary-outline', label: 'Tertiary Outline' },
  { variant: 'neutral', label: 'Neutral' },
  { variant: 'invert', label: 'Invert' },
  { variant: 'ghost-neutral', label: 'Ghost' },
  { variant: 'ghost-brand', label: 'Ghost Brand' },
  { variant: 'destructive', label: 'Destructive' },
  { variant: 'transparent', label: 'Transparent' },
];

export function IconButtonSection() {
  return (
    <PageLayout
      category="Components"
      title="Icon Button"
      description="Icon-only buttons for compact, high-frequency actions — available as a square (Buttons / Icon) or fully circular pill (Buttons / Icon Pill) shape, sharing the same hierarchy and state model as Button."
      tocItems={toc}
    >
      <Section id="icon-button-usage" title="Usage Guidelines">
        <div style={{ padding: '20px 24px', backgroundColor: '#f7f7f7', borderRadius: '8px', border: '1px solid #eee' }}>
          <ul style={{ margin: 0, paddingLeft: '20px', fontFamily: 'var(--font-family-body)', fontSize: '14px', color: '#49494a', lineHeight: '1.8' }}>
            <li style={{ marginBottom: '8px' }}>Always pass a descriptive <code>aria-label</code> — there is no visible text to fall back on</li>
            <li style={{ marginBottom: '8px' }}>Use <strong>circle</strong> shape for floating/overlay actions (carousel nav, avatar add-button)</li>
            <li style={{ marginBottom: '8px' }}>Use <strong>square</strong> shape for actions embedded in toolbars, tables, or input adornments</li>
            <li>Match variant to the same hierarchy rules as <strong>Button</strong> — one Primary icon action per toolbar at most</li>
          </ul>
        </div>
      </Section>

      <Section id="icon-button-shapes" title="Shapes">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          <code>shape="square"</code> (36×36, corresponds to Figma&apos;s <em>Buttons / Icon</em>) vs <code>shape="circle"</code> (36×36, <em>Buttons / Icon Pill</em>) — both a 1:1 square footprint, differing only in corner radius.
        </p>
        <DemoCard title="Square vs Circle">
          <Row label="square">
            <IconButton shape="square" variant="primary" icon={<Search size={16} />} aria-label="Search" />
            <IconButton shape="square" variant="secondary" icon={<Settings size={16} />} aria-label="Settings" />
            <IconButton shape="square" variant="neutral" icon={<Heart size={16} />} aria-label="Favorite" />
          </Row>
          <Row label="circle">
            <IconButton shape="circle" variant="primary" icon={<Search size={16} />} aria-label="Search" />
            <IconButton shape="circle" variant="secondary" icon={<Settings size={16} />} aria-label="Settings" />
            <IconButton shape="circle" variant="neutral" icon={<Heart size={16} />} aria-label="Favorite" />
          </Row>
        </DemoCard>
      </Section>

      <Section id="icon-button-variants" title="Variants">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Same hierarchy set as <code>Button</code>, plus a bare <code>transparent</code> variant for the lowest-emphasis icon actions.
        </p>
        <DemoCard title="All variants (circle)">
          {variants.map(v => (
            <Row key={v.variant} label={v.label}>
              <IconButton shape="circle" variant={v.variant} icon={<Plus size={16} />} aria-label={v.label} />
            </Row>
          ))}
        </DemoCard>
      </Section>

      <Section id="icon-button-states" title="States">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Hover, focus (ring), and disabled states are handled internally — try tabbing to or hovering the buttons below.
        </p>
        <DemoCard title="Primary — interactive vs disabled">
          <Row label="Enabled">
            <IconButton shape="circle" variant="primary" icon={<Trash2 size={16} />} aria-label="Delete" />
          </Row>
          <Row label="Disabled">
            <IconButton shape="circle" variant="primary" icon={<Trash2 size={16} />} aria-label="Delete" disabled />
          </Row>
        </DemoCard>
      </Section>
    </PageLayout>
  );
}

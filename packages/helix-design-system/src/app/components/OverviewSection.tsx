import { Palette, Type, Ruler, Layers, Shapes, Fingerprint, ArrowRight, Beaker } from 'lucide-react';
import demoVideo from '../../imports/Nusantics_Design_System_Document.mp4';
import { Badge } from '../../components/Badge';
import { Button, Checkbox, RadioButton, Slider, ProgressBar, Spinner, Divider, IconTile, Dot, Switch, Badge as DemoBadge, Input } from '../../components';
import { foundationItems, componentItems } from '../data/navigation';

interface OverviewSectionProps {
  onNavigate: (section: string) => void;
}

const foundationMeta: Record<string, { icon: typeof Palette; blurb: string }> = {
  primitives: { icon: Palette, blurb: 'Brand and system palettes with semantic color roles.' },
  typography: { icon: Type, blurb: 'Font families, type scale and weights for clear hierarchy.' },
  utilities: { icon: Ruler, blurb: 'Spacing scale and layout primitives for harmonious designs.' },
  elevation: { icon: Layers, blurb: 'Shadow levels that communicate depth and focus.' },
  icons: { icon: Shapes, blurb: 'A consistent icon set sized for every component.' },
  'brand-identity': { icon: Fingerprint, blurb: 'Brand-aware logos for Nusantics, CeKolam and Causa.' },
};

const noop = () => {};
const previews: { id: string; title: string; node: React.ReactNode }[] = [
  { id: 'button', title: 'Buttons', node: <div style={{ display: 'flex', gap: 8 }}><Button size="sm">Button</Button><Button size="sm" hierarchy="secondary" appearance="outline">Button</Button></div> },
  { id: 'checkbox', title: 'Checkbox', node: <div style={{ display: 'flex', gap: 12 }}><Checkbox checked onChange={noop} label="Checked" /><Checkbox checked={false} onChange={noop} label="Off" /></div> },
  { id: 'radio-button', title: 'Radio Button', node: <RadioButton value="basic" label="Basic" supportingText="Up to 10 samples" /> },
  { id: 'switch', title: 'Switch', node: <Switch label="Notifications" defaultChecked /> },
  { id: 'slider', title: 'Slider', node: <div style={{ width: 160 }}><Slider defaultValue={50} aria-label="Preview" /></div> },
  { id: 'progress-bar', title: 'Progress Indicator', node: <div style={{ width: 160 }}><ProgressBar value={60} label="Storage used" /></div> },
  { id: 'spinner', title: 'Loading Indicator', node: <Spinner /> },
  { id: 'divider', title: 'Divider', node: <div style={{ width: 160 }}><Divider /></div> },
  { id: 'icon-tile', title: 'Icon Tile', node: <IconTile size="md" icon={<Beaker size={20} />} /> },
  { id: 'dot', title: 'Dot', node: <div style={{ display: 'flex', gap: 8 }}>{(['brand', 'info', 'success', 'warning', 'error'] as const).map((c) => <Dot key={c} color={c} size="xl" />)}</div> },
  { id: 'badge', title: 'Badge', node: <div style={{ display: 'flex', gap: 6 }}><DemoBadge label="Brand" color="brand" appearance="subtle" /><DemoBadge label="Done" color="success" appearance="subtle" /></div> },
  { id: 'input', title: 'Input', node: <div style={{ width: 170 }}><Input placeholder="Placeholder" /></div> },
];

function ShowcaseCard({ title, onClick, children }: { title: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button className="dx-showcase" onClick={onClick}>
      <span className="dx-showcase-preview"><span className="dx-showcase-slot" aria-hidden>{children}</span></span>
      <span className="dx-showcase-title">{title}</span>
      <span className="dx-showcase-link">See Components</span>
    </button>
  );
}

export function OverviewSection({ onNavigate }: OverviewSectionProps) {
  const componentCount = componentItems.filter((i) => i.id !== 'components-overview').length;
  const stats = [
    { value: componentCount, label: 'Components' },
    { value: foundationItems.length, label: 'Foundations' },
    { value: 3, label: 'Brand themes' },
  ];

  return (
    <div>
      <section className="dx-landing">
        <div className="dx-landing-copy">
          <Badge label="Design System" color="brand" appearance="subtle" size="md" />
          <h1>Helix Design System</h1>
          <p>Accelerate designer's and developer's workflow for a seamless and impactful user experience across all interfaces.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button size="md" trailingIcon={<ArrowRight size={16} />} onClick={() => onNavigate('components-overview')}>Browse components</Button>
            <Button size="md" hierarchy="secondary" appearance="outline" onClick={() => onNavigate('primitives')}>Explore foundations</Button>
          </div>
        </div>
        <div className="dx-landing-media">
          <video src={demoVideo} autoPlay loop muted playsInline />
        </div>
      </section>

      <div className="dx-stats">
        {stats.map((s) => (
          <div key={s.label} className="dx-stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <section className="dx-section">
        <h2>Foundations</h2>
        <p className="dx-lead">The tokens every component is built from.</p>
        <div className="dx-showcase-grid">
          {foundationItems.map((item) => {
            const Icon = (foundationMeta[item.id]?.icon ?? Palette);
            return (
              <ShowcaseCard key={item.id} title={item.label} onClick={() => onNavigate(item.id)}>
                <IconTile size="md" icon={<Icon size={20} />} />
              </ShowcaseCard>
            );
          })}
        </div>
      </section>

      <section className="dx-section">
        <h2>Components</h2>
        <p className="dx-lead">Start with the pieces used on almost every screen.</p>
        <div className="dx-showcase-grid">
          {previews.map((p) => (
            <ShowcaseCard key={p.id} title={p.title} onClick={() => onNavigate(p.id)}>{p.node}</ShowcaseCard>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <Button hierarchy="secondary" appearance="outline" trailingIcon={<ArrowRight size={16} />} onClick={() => onNavigate('components-overview')}>All {componentCount} components</Button>
        </div>
      </section>
    </div>
  );
}

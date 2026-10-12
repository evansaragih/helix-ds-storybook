import { Palette, Type, Ruler, Layers, Shapes, Fingerprint, ArrowRight } from 'lucide-react';
import { Badge } from '../../components/Badge';
import { IconTile } from '../../components/IconTile';
import { Button, HelixAnimation } from '../../components';
import { foundationItems, componentItems, componentLevels } from '../data/navigation';
import { componentPreviews, fallbackPreview } from '../data/componentPreviews';

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
  const componentCount = componentItems.length;
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
            <Button size="md" trailingIcon={<ArrowRight size={16} />} onClick={() => document.getElementById('overview-components')?.scrollIntoView({ behavior: 'smooth' })}>Browse components</Button>
            <Button size="md" hierarchy="secondary" appearance="outline" onClick={() => onNavigate('primitives')}>Explore foundations</Button>
          </div>
        </div>
        <div className="dx-landing-media">
          <HelixAnimation size={360} />
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

      <section id="overview-components" className="dx-section">
        <h2>Components</h2>
        <p className="dx-lead">Every component, grouped by atomic design level.</p>
        {componentLevels.map((level) => (
          <div key={level} style={{ marginBottom: 40 }}>
            <h3 className="dx-level">{level}</h3>
            <div className="dx-showcase-grid">
              {componentItems.filter((i) => i.level === level).map((item) => (
                <ShowcaseCard key={item.id} title={item.label} onClick={() => onNavigate(item.id)}>
                  {componentPreviews[item.id] ?? fallbackPreview}
                </ShowcaseCard>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

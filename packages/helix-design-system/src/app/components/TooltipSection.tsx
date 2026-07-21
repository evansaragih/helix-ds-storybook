import { PageLayout, Section } from './PageLayout';
import { Tooltip, TooltipProvider, Button } from '../../components';
import { Info, HelpCircle, Settings } from 'lucide-react';

const toc = [
  { id: 'tooltip-usage',    label: 'Usage Guidelines' },
  { id: 'tooltip-variants', label: 'Variants' },
  { id: 'tooltip-sides',    label: 'Placement' },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>{children}</div>
    </div>
  );
}

export function TooltipSection() {
  return (
    <TooltipProvider>
      <PageLayout
        category="Components"
        title="Tooltip"
        description="Tooltips display a short label when the user hovers or focuses a trigger element. They are non-interactive and should only carry supplementary information."
        tocItems={toc}
      >
        <Section id="tooltip-usage" title="Usage Guidelines">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { heading: 'Supplement, don\'t explain', body: 'Tooltips should add useful context to an already-understandable UI element — not serve as the only explanation.' },
              { heading: 'Keep text very short', body: 'One sentence max. If you need more than 60 characters, consider a popover or inline helper text instead.' },
              { heading: 'Never put critical info here', body: 'Tooltips are invisible until hovered. Never hide required field instructions, errors, or legal text in a tooltip.' },
            ].map(g => (
              <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
                <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
                <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="tooltip-variants" title="Variants">
          <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
            <code>dark</code> (default) uses a near-black background. <code>light</code> uses white with a subtle shadow — better on dark surfaces.
          </p>
          <DemoCard title="dark vs light">
            <Tooltip content="Dark tooltip" variant="dark">
              <Button variant="neutral" size="sm">Dark tooltip</Button>
            </Tooltip>
            <Tooltip content="Light tooltip" variant="light">
              <Button variant="neutral" size="sm">Light tooltip</Button>
            </Tooltip>
          </DemoCard>
        </Section>

        <Section id="tooltip-sides" title="Placement">
          <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
            Control placement with the <code>side</code> prop: <code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code>.
          </p>
          <DemoCard title="Four sides">
            <Tooltip content="Tooltip on top" side="top">
              <Button variant="primary-outline" size="sm">Top</Button>
            </Tooltip>
            <Tooltip content="Tooltip on right" side="right">
              <Button variant="primary-outline" size="sm">Right</Button>
            </Tooltip>
            <Tooltip content="Tooltip on bottom" side="bottom">
              <Button variant="primary-outline" size="sm">Bottom</Button>
            </Tooltip>
            <Tooltip content="Tooltip on left" side="left">
              <Button variant="primary-outline" size="sm">Left</Button>
            </Tooltip>
          </DemoCard>
          <div style={{ marginTop: 16 }}>
            <DemoCard title="Icon button with tooltip">
              <Tooltip content="View settings">
                <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 6, border: '1px solid #EEEEEE', backgroundColor: 'white', cursor: 'pointer' }}>
                  <Settings size={14} color="#49494A" />
                </button>
              </Tooltip>
              <Tooltip content="More information about this field">
                <Info size={16} color="#9F9F9F" style={{ cursor: 'help' }} />
              </Tooltip>
              <Tooltip content="Need help?">
                <HelpCircle size={16} color="#9F9F9F" style={{ cursor: 'help' }} />
              </Tooltip>
            </DemoCard>
          </div>
        </Section>
      </PageLayout>
    </TooltipProvider>
  );
}

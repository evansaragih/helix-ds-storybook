import { PageLayout, Section } from './PageLayout';
import { ProgressBar } from '../../components';

const toc = [
  { id: 'progress-usage',  label: 'Usage Guidelines' },
  { id: 'progress-labels', label: 'Label Types' },
  { id: 'progress-colors', label: 'Custom Colors' },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>{children}</div>
    </div>
  );
}

export function ProgressBarSection() {
  return (
    <PageLayout
      category="Components"
      title="Progress Bar"
      description="Progress bars communicate the completion percentage of a task. Six label placement options and full color control make them adaptable to any context."
      tocItems={toc}
    >
      <Section id="progress-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Show determinate progress', body: 'Use a progress bar when you know the total work. For indefinite loading, use a spinner or skeleton instead.' },
            { heading: 'Label the value', body: 'Always show a percentage or fraction near the bar so users know where they are — don\'t rely on bar length alone.' },
            { heading: 'Use semantic colors', body: 'Match color to meaning: brand color for normal progress, green for success, red for error or over-quota states.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="progress-labels" title="Label Types">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Six label placements: <code>none</code>, <code>title</code>, <code>trailing</code>, <code>top-floating</code>, <code>bottom-floating</code>, and <code>within</code>.
        </p>
        <DemoCard title="All label types">
          <ProgressBar value={65} labelType="none" />
          <ProgressBar value={65} labelType="title" label="Upload progress" />
          <ProgressBar value={65} labelType="trailing" />
          <ProgressBar value={65} labelType="top-floating" height={10} />
          <ProgressBar value={65} labelType="bottom-floating" height={10} />
          <ProgressBar value={65} labelType="within" height={18} />
        </DemoCard>
      </Section>

      <Section id="progress-colors" title="Custom Colors">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Override the fill color with <code>color</code> and the track with <code>trackColor</code>. Use semantic status colors for success/warning/error states.
        </p>
        <DemoCard title="Semantic color examples">
          <ProgressBar value={80} labelType="title" label="Completed" color="var(--color-status-success, #22C55E)" />
          <ProgressBar value={45} labelType="title" label="In Progress" color="var(--color-brand-primary, #F57E20)" />
          <ProgressBar value={92} labelType="title" label="Storage used" color="var(--color-status-error, #EF4444)" />
          <ProgressBar value={60} labelType="title" label="Pending review" color="var(--color-status-warning, #F59E0B)" />
        </DemoCard>
      </Section>
    </PageLayout>
  );
}

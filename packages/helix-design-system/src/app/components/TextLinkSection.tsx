import { PageLayout, Section } from './PageLayout';
import { TextLink } from '../../components/TextLink';
import { ExternalLink, ArrowRight, Download } from 'lucide-react';

const toc = [
  { id: 'textlink-usage', label: 'Usage Guidelines' },
  { id: 'textlink-variants', label: 'Variants' },
  { id: 'textlink-weights', label: 'Weights' },
  { id: 'textlink-sizes', label: 'Sizes' },
  { id: 'textlink-icons', label: 'With Icons' },
  { id: 'textlink-underline', label: 'Underline Modes' },
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>{children}</div>
    </div>
  );
}

export function TextLinkSection() {
  return (
    <PageLayout
      category="Components"
      title="Text Link"
      description="Text links are inline interactive elements used within prose or standalone for navigation. They differ from buttons by being embedded in text flow."
      tocItems={toc}
    >
      <Section id="textlink-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Use for navigation', body: 'Links navigate — they don\'t trigger actions. For actions use a Button. Prefer links for "Learn more", "View details", "Go to page" patterns.' },
            { heading: 'Label clearly', body: 'Avoid "click here" or "read more" without context. Labels should describe the destination, e.g., "View invoice #1024".' },
            { heading: 'Match variant to context', body: 'Use neutral on dark/colored backgrounds. Use destructive only for links that affect critical data (e.g., "Revoke access").' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="textlink-variants" title="Variants">
        <Card title="All variants">
          <TextLink variant="primary" href="#">Primary link</TextLink>
          <TextLink variant="secondary" href="#">Secondary link</TextLink>
          <TextLink variant="tertiary" href="#">Tertiary link</TextLink>
          <TextLink variant="neutral" href="#">Neutral link</TextLink>
          <TextLink variant="destructive" href="#">Destructive link</TextLink>
        </Card>
      </Section>

      <Section id="textlink-weights" title="Weights">
        <Card title="Regular vs Semibold">
          <TextLink weight="regular" href="#">Regular weight</TextLink>
          <TextLink weight="semibold" href="#">Semibold weight</TextLink>
        </Card>
      </Section>

      <Section id="textlink-sizes" title="Sizes">
        <Card title="All sizes">
          <TextLink size="sm" href="#">Small (12px)</TextLink>
          <TextLink size="md" href="#">Medium (14px)</TextLink>
          <TextLink size="lg" href="#">Large (16px)</TextLink>
        </Card>
      </Section>

      <Section id="textlink-icons" title="With Icons">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Card title="Leading icon">
            <TextLink leadingIcon={<Download size={14} />} href="#">Download report</TextLink>
            <TextLink leadingIcon={<ExternalLink size={14} />} variant="secondary" href="#">Open in new tab</TextLink>
          </Card>
          <Card title="Trailing icon">
            <TextLink trailingIcon={<ArrowRight size={14} />} href="#">View all results</TextLink>
            <TextLink trailingIcon={<ExternalLink size={14} />} weight="semibold" href="#">External docs</TextLink>
          </Card>
        </div>
      </Section>

      <Section id="textlink-underline" title="Underline Modes">
        <Card title="Underline behaviour">
          <TextLink underline="always" href="#">Always underlined</TextLink>
          <TextLink underline="hover" href="#">Underline on hover (default)</TextLink>
          <TextLink underline="none" href="#">Never underlined</TextLink>
        </Card>
        <div style={{ marginTop: 12, padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
          <p style={{ margin: '0 0 12px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>In prose</p>
          <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#49494A', lineHeight: '1.7' }}>
            Your project settings have been updated. Changes to billing are reflected immediately —{' '}
            <TextLink size="md" href="#">view your invoice</TextLink> or{' '}
            <TextLink size="md" variant="secondary" href="#">contact support</TextLink> if anything looks incorrect.
          </p>
        </div>
      </Section>
    </PageLayout>
  );
}

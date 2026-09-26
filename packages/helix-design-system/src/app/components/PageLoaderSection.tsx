import { useEffect, useState } from 'react';
import { PageLayout, Section } from './PageLayout';
import { PageLoader } from '../../components';

const toc = [
  { id: 'page-loader-usage', label: 'Usage Guidelines' },
  { id: 'page-loader-brands', label: 'Brand Variants' },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>{children}</div>
    </div>
  );
}

function AnimatedPageLoader(props: Omit<React.ComponentProps<typeof PageLoader>, 'value'>) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 4)), 200);
    return () => clearInterval(id);
  }, []);
  return <PageLoader {...props} value={value} />;
}

export function PageLoaderSection() {
  return (
    <PageLayout
      category="Components"
      title="Page Loader"
      description="A branded card shown while a page or view is fetching data — logo over a determinate progress bar. Drive value from real load progress when it's known, or step it programmatically for a perceived-progress effect."
      tocItems={toc}
    >
      <Section id="page-loader-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Use for full-page loads', body: 'Show the Page Loader while an entire page or route is fetching data — not for small in-place operations, which should use Spinner or Progress Bar instead.' },
            { heading: 'Drive value, don\'t fake it', body: 'Pass real progress when it\'s measurable (e.g. request/asset count). If it isn\'t, step the value on a timer so it never appears stuck.' },
            { heading: 'Keep the brand visible', body: 'The logo cascades with the active data-brand context — don\'t override tone/variant unless the surface behind the card requires it (e.g. a dark background).' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="page-loader-brands" title="Brand Variants">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          The logo follows the same <code>data-brand</code> cascade as every other brand-aware token — no prop needed to switch brands.
        </p>
        <DemoCard title="Animated progress">
          <AnimatedPageLoader />
        </DemoCard>
      </Section>
    </PageLayout>
  );
}

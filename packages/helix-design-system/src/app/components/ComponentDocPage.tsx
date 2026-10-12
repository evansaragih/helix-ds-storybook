import type { ReactNode } from 'react';
import { PageLayout, Section } from './PageLayout';

export interface DocDemo {
  id: string;
  title: string;
  description?: string;
  /** Rendered on a light panel; give wide demos their own width */
  node: ReactNode;
}

export interface ComponentDocPageProps {
  /** Used to prefix the toc anchors, e.g. "dot" */
  slug: string;
  title: string;
  description: string;
  /** Short "when to use" guidance cards */
  usage?: { heading: string; body: string }[];
  demos: DocDemo[];
}

const body: React.CSSProperties = { margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' };

/** Standard docs page for a component: optional usage guidance followed by titled demo panels. */
export function ComponentDocPage({ slug, title, description, usage, demos }: ComponentDocPageProps) {
  const toc = [
    ...(usage ? [{ id: `${slug}-usage`, label: 'Usage Guidelines' }] : []),
    ...demos.map((d) => ({ id: `${slug}-${d.id}`, label: d.title })),
  ];

  return (
    <PageLayout category="Components" title={title} description={description} tocItems={toc}>
      {usage && (
        <Section id={`${slug}-usage`} title="Usage Guidelines">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {usage.map((g) => (
              <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
                <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
                <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
              </div>
            ))}
          </div>
        </Section>
      )}
      {demos.map((d) => (
        <Section key={d.id} id={`${slug}-${d.id}`} title={d.title}>
          {d.description && <p style={{ ...body, marginBottom: 24 }}>{d.description}</p>}
          <div style={{ padding: 24, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE', overflowX: 'auto' }}>
            {d.node}
          </div>
        </Section>
      ))}
    </PageLayout>
  );
}

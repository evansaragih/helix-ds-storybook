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
          <div className="dx-usage">
            {usage.map((g, i) => (
              <div key={g.heading} className="dx-usage-card">
                <span className="dx-usage-n">{i + 1}</span>
                <h3>{g.heading}</h3>
                <p>{g.body}</p>
              </div>
            ))}
          </div>
        </Section>
      )}
      {demos.map((d) => (
        <Section key={d.id} id={`${slug}-${d.id}`} title={d.title}>
          {d.description && <p className="dx-lead">{d.description}</p>}
          <div className="dx-demo">
            <div className="dx-demo-canvas">{d.node}</div>
          </div>
        </Section>
      ))}
    </PageLayout>
  );
}

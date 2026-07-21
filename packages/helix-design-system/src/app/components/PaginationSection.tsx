import { useState } from 'react';
import { PageLayout, Section } from './PageLayout';
import { Pagination } from '../../components';

const toc = [
  { id: 'pagination-usage',       label: 'Usage Guidelines' },
  { id: 'pagination-basic',       label: 'Basic Usage' },
  { id: 'pagination-rows',        label: 'Rows Per Page' },
  { id: 'pagination-many',        label: 'Many Pages' },
  { id: 'pagination-controlled',  label: 'Controlled' },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      {children}
    </div>
  );
}

export function PaginationSection() {
  const [page, setPage] = useState(1);

  return (
    <PageLayout
      category="Components"
      title="Pagination"
      description="Pagination breaks long lists into navigable pages. Smart ellipsis logic keeps the control compact even with hundreds of pages."
      tocItems={toc}
    >
      <Section id="pagination-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Show total count', body: 'Always display the total number of results near the pagination control so users know the scope of the dataset.' },
            { heading: 'Respect page size', body: 'Choose a page size that balances load time and context. 10–25 items is typical; allow users to change it if needed.' },
            { heading: 'Preserve state on back', body: 'Encode the current page in the URL so the browser back button returns the user to the right page.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="pagination-rows" title="Rows Per Page">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Enable <code>showRowsPerPage</code> to display the full layout matching the Figma design — "Rows per page" label on the left, pagination controls on the right.
        </p>
        <DemoCard title="With rows per page selector">
          <Pagination total={100} pageSize={10} defaultPage={2} showRowsPerPage />
        </DemoCard>
      </Section>

      <Section id="pagination-basic" title="Basic Usage">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Provide <code>total</code> items and <code>pageSize</code>. The component derives total pages automatically.
        </p>
        <DemoCard title="5 pages (no ellipsis)">
          <Pagination total={50} pageSize={10} defaultPage={3} />
        </DemoCard>
      </Section>

      <Section id="pagination-many" title="Many Pages">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          With many pages, smart ellipsis collapses the middle. The <code>siblingCount</code> prop controls how many pages appear on each side of the current page.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <DemoCard title="siblingCount=1 (default), middle page">
            <Pagination total={300} pageSize={10} defaultPage={15} siblingCount={1} />
          </DemoCard>
          <DemoCard title="siblingCount=2">
            <Pagination total={300} pageSize={10} defaultPage={15} siblingCount={2} />
          </DemoCard>
        </div>
      </Section>

      <Section id="pagination-controlled" title="Controlled">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Pass <code>page</code> and <code>onPageChange</code> to control the active page externally.
        </p>
        <DemoCard title={`Current page: ${page} / 20`}>
          <Pagination total={200} pageSize={10} page={page} onPageChange={setPage} />
        </DemoCard>
      </Section>
    </PageLayout>
  );
}

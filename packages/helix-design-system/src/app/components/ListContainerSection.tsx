import { PageLayout, Section } from './PageLayout';
import { ListContainer } from '../../components';

const toc = [
  { id: 'list-container-usage', label: 'Usage Guidelines' },
  { id: 'list-container-card-list', label: 'Card List' },
  { id: 'list-container-custom-body', label: 'Custom Body (Row List / Table)' },
  { id: 'list-container-footer', label: 'Footer' },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </div>
  );
}

const items = [
  { id: 1, title: 'Unchecked', description: 'Description text', trailingBadgeLabel: '3:45' },
  { id: 2, title: 'Unchecked', description: 'Description text', trailingBadgeLabel: '3:45' },
  { id: 3, title: 'Unchecked', description: 'Description text', trailingBadgeLabel: '3:45' },
];

export function ListContainerSection() {
  return (
    <PageLayout
      category="Components"
      title="List Container"
      description="Wraps a header (icon + title/description + badge + action button), an optional toolbar-filter row, a body, and a footer (pagination or Cancel/Continue) around any collection of items. Matches Figma's List Container (node 1057:19300), which defines four layout modes: Card List, Row List, Data Table, and Sortable List."
      tocItems={toc}
    >
      <Section id="list-container-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Card List is built in', body: 'Pass `items` and ListContainer auto-renders them as bordered ListItemCard rows — the only layout with a first-class renderer today.' },
            { heading: 'Other layouts via children', body: 'For Row List, Data Table, or Sortable List, pass your own rows (or an existing Table) as children — ListContainer only owns the header/toolbar/footer chrome.' },
            { heading: 'Footer is opt-in both ways', body: 'showPagination + paginationProps renders Pagination; showFooterActions renders Cancel/Continue. Both can combine, matching Figma exactly.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="list-container-card-list" title="Card List">
        <DemoCard title="Auto-rendered from items">
          <div style={{ width: 480 }}>
            <ListContainer title="Title" description="Description" badgeLabel="Blue" items={items} showPagination={false} />
          </div>
        </DemoCard>
      </Section>

      <Section id="list-container-custom-body" title="Custom Body (Row List / Table)">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Pass anything as <code>children</code> to render a Row List or Data Table layout instead — ListContainer just supplies the surrounding chrome.
        </p>
        <DemoCard title="Custom children">
          <div style={{ width: 480 }}>
            <ListContainer title="Custom layout" layout="row-list" showActionButton={false} showPagination={false}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Row A', 'Row B', 'Row C'].map(r => (
                  <div key={r} style={{ padding: '8px 12px', borderRadius: 6, backgroundColor: '#F7F7F7', fontFamily: 'var(--font-family-body)', fontSize: 13 }}>{r}</div>
                ))}
              </div>
            </ListContainer>
          </div>
        </DemoCard>
      </Section>

      <Section id="list-container-footer" title="Footer">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Pagination and action-buttons footers, shown independently.
        </p>
        <DemoCard title="With pagination">
          <div style={{ width: 480 }}>
            <ListContainer title="Paginated list" items={items} showPagination paginationProps={{ total: 3, pageSize: 1, page: 2 }} />
          </div>
        </DemoCard>
        <DemoCard title="With action buttons">
          <div style={{ width: 480 }}>
            <ListContainer title="Confirm selection" items={items} showPagination={false} showFooterActions />
          </div>
        </DemoCard>
      </Section>
    </PageLayout>
  );
}

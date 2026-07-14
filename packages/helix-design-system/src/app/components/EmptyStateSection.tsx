import { PageLayout, Section } from './PageLayout';
import { EmptyState } from '../../components/EmptyState';
import { Plus, RefreshCw } from 'lucide-react';

const toc = [
  { id: 'empty-usage', label: 'Usage Guidelines' },
  { id: 'empty-variants', label: 'Variants' },
  { id: 'empty-actions', label: 'With Actions' },
  { id: 'empty-compact', label: 'Compact' },
];

export function EmptyStateSection() {
  return (
    <PageLayout
      category="Components"
      title="Empty State"
      description="Empty states fill the void when there is no content to display. A well-designed empty state explains why the area is empty and guides the user to their next action."
      tocItems={toc}
    >
      <Section id="empty-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Explain the why', body: 'Tell the user why there\'s nothing here. "No results" is better than a blank box, but "No projects yet — create one to get started" is even better.' },
            { heading: 'Offer a path forward', body: 'Include an action whenever possible. Empty states are a prime location to guide users to their first meaningful step.' },
            { heading: 'Match the context', body: 'Choose an icon or illustration that reflects the content type. A file-empty state looks different from a search-empty state.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="empty-variants" title="Variants">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Each variant ships with a contextual icon. Override with the <code>icon</code> prop for custom illustrations.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {(['default', 'search', 'folder', 'image', 'file'] as const).map(v => (
            <div key={v} style={{ backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE', overflow: 'hidden' }}>
              <EmptyState
                variant={v}
                title={`No ${v === 'default' ? 'items' : v + 's'} found`}
                description="Nothing to display here yet."
                compact
              />
            </div>
          ))}
        </div>
      </Section>

      <Section id="empty-actions" title="With Actions">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE', overflow: 'hidden' }}>
            <EmptyState
              title="No projects yet"
              description="Create your first project to start collaborating with your team."
              action={{ label: 'Create project', onClick: () => {}, variant: 'primary' }}
            />
          </div>
          <div style={{ backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE', overflow: 'hidden' }}>
            <EmptyState
              variant="search"
              title={"No results for \"analytics\""}
              description="Try adjusting your search or filters to find what you're looking for."
              action={{ label: 'Clear search', onClick: () => {}, variant: 'outline' }}
              secondaryAction={{ label: 'Browse all', onClick: () => {} }}
            />
          </div>
          <div style={{ backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE', overflow: 'hidden' }}>
            <EmptyState
              icon={<RefreshCw size={32} strokeWidth={1.5} />}
              title="Failed to load data"
              description="Something went wrong fetching your data. Check your connection and try again."
              action={{ label: 'Retry', onClick: () => {} }}
            />
          </div>
          <div style={{ backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE', overflow: 'hidden' }}>
            <EmptyState
              icon={<Plus size={32} strokeWidth={1.5} />}
              title="Invite your team"
              description="You're the only member. Add colleagues to collaborate on projects together."
              action={{ label: 'Invite members', onClick: () => {}, variant: 'primary' }}
              secondaryAction={{ label: 'Learn more', onClick: () => {} }}
            />
          </div>
        </div>
      </Section>

      <Section id="empty-compact" title="Compact">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Use the compact variant inside cards, table rows, or constrained containers.
        </p>
        <div style={{ backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE', overflow: 'hidden' }}>
          <EmptyState
            variant="file"
            title="No documents"
            description="Upload or create a document to get started."
            compact
            action={{ label: 'Upload', onClick: () => {} }}
          />
        </div>
      </Section>
    </PageLayout>
  );
}

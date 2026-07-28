import { PageLayout, Section } from './PageLayout';
import { UploadProgressDrawer, type UploadDrawerFile } from '../../components';

const toc = [
  { id: 'upload-drawer-usage', label: 'Usage Guidelines' },
  { id: 'upload-drawer-expanded', label: 'Expanded' },
  { id: 'upload-drawer-collapsed', label: 'Collapsed' },
  { id: 'upload-drawer-states', label: 'Waiting & Failed' },
];

const SAMPLE_FILES: UploadDrawerFile[] = [
  { id: '1', name: 'ITB-PRK-001_R1.fastq.gz', sizeLabel: '891 MB', status: 'uploading', progress: 70, speedLabel: '340.78 MB/s · ~2s' },
  { id: '2', name: 'ITB-PRK-002_R1.fastq.gz', sizeLabel: '891 MB', status: 'waiting' },
  { id: '3', name: 'unannotated_sample_001.fastq.gz', sizeLabel: '—', status: 'failed', errorReason: 'Rejected — sample code not found' },
  { id: '4', name: 'ITB-PRK-003_R1.fastq.gz', sizeLabel: '891 MB', status: 'success' },
  { id: '5', name: 'ITB-PRK-004_R1.fastq.gz', sizeLabel: '891 MB', status: 'success' },
];

/** UploadProgressDrawer self-positions `fixed`, so each demo pins it to an `absolute`
 *  frame instead of letting it escape to the real page corner. */
function Frame({ children }: { children: React.ReactNode }) {
  return <div style={{ position: 'relative', height: 420, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE', overflow: 'hidden' }}>{children}</div>;
}

export function UploadProgressDrawerSection() {
  return (
    <PageLayout
      category="Components"
      title="Upload Progress Drawer"
      description="Floating panel that tracks a batch upload, meant to be paired with Dropzone. Self-positions fixed at 24px from the right and 16px from the bottom."
      tocItems={toc}
    >
      <Section id="upload-drawer-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {[
            { heading: 'Pair with Dropzone', body: 'Open the drawer once files start uploading from a Dropzone drop or file picker.' },
            { heading: 'Collapse, don’t dismiss', body: 'Let users collapse the panel to a compact header while uploads continue in the background.' },
          ].map((g) => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="upload-drawer-expanded" title="Expanded">
        <Frame>
          <UploadProgressDrawer open expanded files={SAMPLE_FILES} progress={42} title="Uploading files…" style={{ position: 'absolute' }} />
        </Frame>
      </Section>

      <Section id="upload-drawer-collapsed" title="Collapsed">
        <Frame>
          <UploadProgressDrawer open expanded={false} files={SAMPLE_FILES} progress={20} title="Uploading files…" style={{ position: 'absolute' }} />
        </Frame>
      </Section>

      <Section id="upload-drawer-states" title="Waiting & Failed">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          <Frame>
            <UploadProgressDrawer
              open
              expanded
              progress={0}
              title="Uploading files…"
              files={SAMPLE_FILES.map((f) => ({ ...f, status: 'waiting', progress: undefined }))}
              style={{ position: 'absolute' }}
            />
          </Frame>
          <Frame>
            <UploadProgressDrawer
              open
              expanded
              progress={100}
              title="Uploading files…"
              files={SAMPLE_FILES.map((f) => ({ ...f, status: 'failed', errorReason: 'Rejected — sample code not found' }))}
              style={{ position: 'absolute' }}
            />
          </Frame>
        </div>
      </Section>
    </PageLayout>
  );
}

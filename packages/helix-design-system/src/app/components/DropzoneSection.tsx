import { PageLayout, Section } from './PageLayout';
import { Dropzone } from '../../components/Dropzone';

const toc = [
  { id: 'dropzone-default',   label: 'Default' },
  { id: 'dropzone-variants',  label: 'Variants' },
  { id: 'dropzone-states',    label: 'States' },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 24, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      {children}
    </div>
  );
}

export function DropzoneSection() {
  return (
    <PageLayout
      category="Components"
      title="Dropzone"
      description="A file upload area that supports drag & drop and click-to-browse. Accepts single or multiple files with optional type and size constraints."
      tocItems={toc}
    >
      <Section id="dropzone-default" title="Default">
        <DemoCard title="Basic upload">
          <Dropzone
            label="Upload file"
            helperText="Drag & drop or click to select a file."
          />
        </DemoCard>
      </Section>

      <Section id="dropzone-variants" title="Variants">
        <DemoCard title="With file type & size constraints">
          <Dropzone
            label="Profile image"
            accept="image/png,image/jpeg,image/webp"
            maxSize={5 * 1024 * 1024}
            helperText="Accepted: PNG, JPG, WEBP · Max 5 MB"
          />
        </DemoCard>
        <DemoCard title="Multiple files">
          <Dropzone
            label="Attachments"
            multiple
            accept=".pdf,.docx,.xlsx"
            maxSize={10 * 1024 * 1024}
            helperText="PDF, DOCX, XLSX · Max 10 MB per file"
          />
        </DemoCard>
      </Section>

      <Section id="dropzone-states" title="States">
        <DemoCard title="Error state">
          <Dropzone
            label="Required document"
            error
            errorText="Please upload a valid document to continue."
          />
        </DemoCard>
        <DemoCard title="Disabled state">
          <Dropzone
            label="Upload (disabled)"
            disabled
            helperText="Uploads are disabled."
          />
        </DemoCard>
      </Section>
    </PageLayout>
  );
}

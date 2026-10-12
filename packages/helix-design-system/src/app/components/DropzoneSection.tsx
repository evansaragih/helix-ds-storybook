import { ComponentDocPage } from './ComponentDocPage';
import { Dropzone, FileUploadField } from '../../components';

const col = (n: React.ReactNode, w = 400) => <div style={{ width: w, display: 'flex', flexDirection: 'column', gap: 16 }}>{n}</div>;

export function DropzoneSection() {
  return (
    <ComponentDocPage
      slug="dropzone"
      title="Dropzone"
      description="File-upload controls: a drag-and-drop Dropzone with a click-to-browse fallback, a compact File Upload Field, and the Upload Progress Drawer that tracks uploads."
      usage={[
        { heading: 'Dropzone for primary uploads', body: 'Use the Dropzone when uploading files is the main task on the screen.' },
        { heading: 'Field for forms', body: 'Use File Upload Field for a single attachment inside a form.' },
        { heading: 'Say what is accepted', body: 'Put the accepted types and size limit in the supporting text.' },
      ]}
      demos={[
        { id: 'sizes', title: 'Sizes', description: 'Medium and large.', node: col(<><Dropzone description="PDF, CSV up to 10MB" /><Dropzone size="lg" description="PDF, CSV up to 10MB" /></>, 480) },
        { id: 'states', title: 'States', description: 'Hover and drag over the first one to see its states.', node: col(<><Dropzone description="PDF, CSV up to 10MB" /><Dropzone disabled description="PDF, CSV up to 10MB" /><Dropzone error="This file type is not supported." description="PDF, CSV up to 10MB" /></>) },
        { id: 'container', title: 'Container appearance', node: col(<Dropzone appearance="container" hint="Files are uploaded when you save." description="PDF, CSV up to 10MB" />) },
        { id: 'field', title: 'File Upload Field', node: col(<><FileUploadField label="Attachment" hint="PDF up to 10MB" /><FileUploadField floating label="Attachment" /></>, 320) },
      ]}
    />
  );
}

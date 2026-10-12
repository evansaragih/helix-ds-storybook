import { ComponentDocPage } from './ComponentDocPage';
import { Lightbox, Button } from '../../components';
import { useState } from 'react';

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200', alt: 'Laboratory glassware', title: 'Sample preparation', description: 'Samples are prepared and labelled before sequencing.' },
  { src: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200', alt: 'Microscope', title: 'Microscopy', description: 'Quality check under the microscope.' },
];

function LightboxDemo() {
  const [layout, setLayout] = useState<'image' | 'image-caption' | 'gallery-strip' | null>(null);
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {(['image', 'image-caption', 'gallery-strip'] as const).map((l) => (
        <Button key={l} hierarchy="secondary" appearance="outline" size="sm" onClick={() => setLayout(l)}>{l}</Button>
      ))}
      <Lightbox open={layout !== null} onClose={() => setLayout(null)} images={IMAGES} layout={layout ?? 'image'} />
    </div>
  );
}

export function LightboxSection() {
  return (
    <ComponentDocPage
      slug="lightbox"
      title="Lightbox"
      description="A full-size photo preview on a dark scrim with a close button and optional previous / next navigation."
      usage={[
        { heading: 'Preview, not edit', body: 'Use to enlarge a photo from a grid or list.' },
        { heading: 'Caption layout', body: 'Add a title and description under the photo when the image needs context.' },
        { heading: 'Gallery strip', body: 'Show thumbnails when the user will jump between several images.' },
      ]}
      demos={[
        { id: 'demo', title: 'Layouts', node: (<LightboxDemo />) },
      ]}
    />
  );
}

import { ComponentDocPage } from './ComponentDocPage';
import { Carousel } from '../../components';

const IMG = (id: string) => `https://images.unsplash.com/${id}?w=1200&q=70`;
const SLIDES = [
  { id: 's1', image: IMG('photo-1532094349884-543bc11b234d'), title: 'Sample prep', description: 'Samples are prepared and labelled before sequencing.', label: 'Step 1', bullets: ['Logged on arrival', 'Barcoded', 'Stored at 4°C'] },
  { id: 's2', image: IMG('photo-1582719471384-894fbb16e074'), title: 'Microscopy', description: 'Quality check under the microscope.', label: 'Step 2', bullets: ['Visual QC', 'Contamination check'] },
  { id: 's3', image: IMG('photo-1576086213369-97a306d36557'), title: 'Analysis', description: 'Results are reviewed by the analyst.', label: 'Step 3', bullets: ['Automated pipeline', 'Analyst sign-off'] },
  { id: 's4', image: IMG('photo-1579154204601-01588f351e67'), title: 'Reporting', description: 'A report is issued to the customer.', label: 'Step 4', bullets: ['PDF report', 'Shared securely'] },
];

export function CarouselSection() {
  return (
    <ComponentDocPage
      slug="carousel"
      title="Carousel"
      description="A set of slides shown one at a time or as a row of cards, with a page indicator and prev / next navigation. Layouts: Single, Center Peek, Row Cards, Stack Peek and Split Feature."
      usage={[
        { heading: 'Browse, don’t bury', body: 'Use a carousel for browsable content like photos or features — not for essential information.' },
        { heading: 'Show the next one', body: 'Peek layouts hint at more slides, which makes the control easier to discover.' },
        { heading: 'Indicator for position', body: 'Choose the page indicator that fits the surface; use the inverse dots on dark backgrounds.' },
      ]}
      demos={[
        { id: 'single', title: 'Single', node: <Carousel slides={SLIDES} /> },
        { id: 'center', title: 'Center Peek', node: <Carousel slides={SLIDES} layout="center-peek" /> },
        { id: 'row', title: 'Row Cards', node: <Carousel slides={SLIDES} layout="row-cards" /> },
        { id: 'stack', title: 'Stack Peek', node: <Carousel slides={SLIDES} layout="stack-peek" /> },
        { id: 'split', title: 'Split Feature', node: <div style={{ width: 1000 }}><Carousel slides={SLIDES} layout="split-feature" /></div> },
      ]}
    />
  );
}

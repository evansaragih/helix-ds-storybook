import { ComponentDocPage } from './ComponentDocPage';
import { Accordion } from '../../components';

const ITEMS = [
  { id: 'q1', title: 'How are samples processed?', content: 'Samples are logged on arrival, prepared, sequenced and quality-checked before a report is issued.' },
  { id: 'q2', title: 'How long does a result take?', content: 'Most results are ready within three to five working days, depending on the panel.' },
  { id: 'q3', title: 'Can I add samples to a batch later?', content: 'Yes — until the batch is locked for processing.' },
  { id: 'q4', title: 'Archived questions', content: 'Not available.', disabled: true },
];

export function AccordionSection() {
  return (
    <ComponentDocPage
      slug="accordion"
      title="Accordion"
      description="A stack of expandable sections. Each item shows its title; opening it reveals the content beneath. Use to condense long, scannable content such as FAQs or settings groups."
      usage={[
        { heading: 'Scannable titles', body: 'Titles should make sense on their own so people can skip what they don’t need.' },
        { heading: 'Single or multiple', body: 'Use single when sections are alternatives; multiple when people compare several at once.' },
        { heading: 'Not for essentials', body: 'Don’t hide content users must read behind an accordion.' },
      ]}
      demos={[
        { id: 'single', title: 'Single', description: 'One panel open at a time.', node: <div style={{ width: 400 }}><Accordion items={ITEMS} defaultValue="q1" /></div> },
        { id: 'multiple', title: 'Multiple', node: <div style={{ width: 400 }}><Accordion type="multiple" items={ITEMS} defaultValue={['q1', 'q2']} /></div> },
      ]}
    />
  );
}

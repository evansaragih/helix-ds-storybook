import { PageLayout, Section } from './PageLayout';
import { Accordion } from '../../components';

const toc = [
  { id: 'accordion-usage',  label: 'Usage Guidelines' },
  { id: 'accordion-styles', label: 'Styles' },
  { id: 'accordion-modes',  label: 'Single vs Multiple' },
];

const faqItems = [
  {
    id: 'q1',
    title: 'What is Helix?',
    content: 'Helix is a biotechnology company focused on microbiome science and personalised health solutions developed in Indonesia.',
  },
  {
    id: 'q2',
    title: 'How do I get started with the design system?',
    content: 'Install the npm package, import the CSS tokens from theme.css, and start using components. All components accept className and style overrides for flexibility.',
  },
  {
    id: 'q3',
    title: 'Does the design system support dark mode?',
    content: 'Dark mode support is planned. The three-layer CSS variable architecture makes it straightforward to add a dark mode by overriding semantic tokens.',
  },
];

export function AccordionSection() {
  return (
    <PageLayout
      category="Components"
      title="Accordion"
      description="Accordions progressively disclose content — showing a list of headers and revealing each section's body on click. They reduce visual complexity in dense UIs."
      tocItems={toc}
    >
      <Section id="accordion-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Collapse secondary info', body: 'Accordions work best for supplementary details that not every user needs — FAQs, settings panels, additional specs.' },
            { heading: 'Keep headers scannable', body: 'The header is always visible. Write it so users can decide whether to expand without reading the body first.' },
            { heading: 'Avoid nesting', body: 'Nested accordions create ambiguous expand/collapse semantics. Flatten the hierarchy using tabs or drill-down navigation instead.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="accordion-styles" title="Styles">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Three visual styles: <code>default</code> (bottom border only), <code>border</code> (full border box), and <code>card</code> (individual elevated cards).
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {(['default', 'border', 'card'] as const).map(style => (
            <div key={style}>
              <p style={{ margin: '0 0 12px', fontFamily: 'Rubik, sans-serif', fontWeight: 500, fontSize: 13, color: '#49494A' }}>
                style="{style}"
              </p>
              <Accordion accordionStyle={style} items={faqItems} />
            </div>
          ))}
        </div>
      </Section>

      <Section id="accordion-modes" title="Single vs Multiple">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          <code>type="single"</code> collapses the previous item when a new one opens. <code>type="multiple"</code> allows multiple items open simultaneously.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <p style={{ margin: '0 0 12px', fontFamily: 'Rubik, sans-serif', fontWeight: 500, fontSize: 13, color: '#49494A' }}>Single (default)</p>
            <Accordion type="single" items={faqItems} />
          </div>
          <div>
            <p style={{ margin: '0 0 12px', fontFamily: 'Rubik, sans-serif', fontWeight: 500, fontSize: 13, color: '#49494A' }}>Multiple</p>
            <Accordion type="multiple" items={faqItems} defaultValue={['q1', 'q2']} />
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}

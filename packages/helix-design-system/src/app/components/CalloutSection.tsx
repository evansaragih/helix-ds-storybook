import { ComponentDocPage } from './ComponentDocPage';
import { Callout, Button } from '../../components';

export function CalloutSection() {
  return (
    <ComponentDocPage
      slug="callout"
      title="Callout"
      description="A static explainer box that stays part of the page and never auto-dismisses. Use it to explain why something is the way it is; use Alert for messages that need attention or dismissal."
      usage={[
        { heading: 'Explain, don\'t interrupt', body: 'Callouts live in the content flow. Anything urgent belongs in an Alert or Toast.' },
        { heading: 'Keep it short', body: 'A title plus one or two sentences. Link out for anything longer.' },
        { heading: 'Neutral for general notes', body: 'Reserve error and warning for real risk so they keep their weight.' },
      ]}
      demos={[
        { id: 'types', title: 'Types', node: (<div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>{(['error','warning','info','success','neutral'] as const).map(t => <Callout key={t} type={t} title={`${t[0].toUpperCase()}${t.slice(1)} callout title`} description="Supporting text that explains why something is the way it is." />)}</div>) },
        { id: 'sizes', title: 'Sizes', node: (<div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}><Callout size="sm" title="Small callout" description="Compact explainer text." /><Callout size="md" title="Medium callout" description="Default explainer text." /></div>) },
        { id: 'trailing', title: 'With trailing action', node: (<div style={{ maxWidth: 480 }}><Callout title="Learn how sequencing works" description="A short walkthrough of the pipeline." trailing={<Button hierarchy="secondary" appearance="outline" size="sm">Learn more</Button>} /></div>) },
      ]}
    />
  );
}

import { ComponentDocPage } from './ComponentDocPage';
import { Field, Checkbox, Button } from '../../components';

export function FieldSection() {
  return (
    <ComponentDocPage
      slug="field"
      title="Field"
      description="A heading plus a stack of form controls grouped under one scannable header, with optional supporting text, counter, trailing action and error message."
      usage={[
        { heading: 'Group related controls', body: 'One Field per question — a checklist, a radio set or a block of inputs.' },
        { heading: 'Required and info', body: 'Mark required groups and add an info icon when the heading needs explaining.' },
        { heading: 'Error under the group', body: 'Show one error message for the group rather than one per control.' },
      ]}
      demos={[
        { id: 'basic', title: 'Basic', node: (<div style={{ width: 320 }}><Field heading="Creative" supportingText="Select all that apply."><Checkbox size="md" label="Design" /><Checkbox size="md" label="Illustration" /><Checkbox size="md" label="Photography" /></Field></div>) },
        { id: 'extras', title: 'Required, counter and action', node: (<div style={{ width: 320 }}><Field heading="Creative" required info counter="2 selected" trailingAction={<Button hierarchy="primary" appearance="link" size="sm">Clear</Button>}><Checkbox size="md" label="Design" /><Checkbox size="md" label="Illustration" /></Field></div>) },
        { id: 'error', title: 'With error', node: (<div style={{ width: 320 }}><Field heading="Creative" required error="Select at least one option."><Checkbox size="md" label="Design" /><Checkbox size="md" label="Illustration" /></Field></div>) },
      ]}
    />
  );
}

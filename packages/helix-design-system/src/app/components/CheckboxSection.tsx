import { ComponentDocPage } from './ComponentDocPage';
import { Checkbox } from '../../components';

export function CheckboxSection() {
  return (
    <ComponentDocPage
      slug="checkbox"
      title="Checkbox"
      description="A labeled checkbox row: control, label and optional supporting text. Use for a single binary choice in a form or list. For a setting that takes effect immediately use Switch."
      usage={[
        { heading: 'Independent choices', body: 'Use checkboxes when any number of options can be selected. For exactly one, use Radio Button.' },
        { heading: 'Indeterminate for parents', body: 'Show the indeterminate state on a parent whose children are partly selected.' },
        { heading: 'Explain in supporting text', body: 'Put consequences or hints in the supporting text, not in the label.' },
      ]}
      demos={[
        { id: 'states', title: 'Checked and State', description: 'Figma Checked (unchecked, checked, indeterminate) × State. Hover and focus appear when you interact with a checkbox.',
          node: (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, max-content)', gap: 20 }}>
              {([false, true, 'indeterminate'] as const).flatMap((c) => [
                <Checkbox key={`${c}d`} checked={c} onChange={() => {}} label="Default" />,
                <Checkbox key={`${c}i`} checked={c} onChange={() => {}} invalid label="Invalid" />,
                <Checkbox key={`${c}x`} checked={c} onChange={() => {}} disabled label="Disabled" />,
              ])}
            </div>
          ) },
        { id: 'sizes', title: 'Sizes', description: 'Small 16px, medium 20px.',
          node: <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{(['sm', 'md'] as const).map((s) => <Checkbox key={s} size={s} defaultChecked label="Label" supportingText="Supporting text" />)}</div> },
      ]}
    />
  );
}

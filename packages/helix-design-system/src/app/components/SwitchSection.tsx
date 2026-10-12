import { ComponentDocPage } from './ComponentDocPage';
import { Switch } from '../../components';

export function SwitchSection() {
  return (
    <ComponentDocPage
      slug="switch"
      title="Switch"
      description="A toggle for a setting that takes effect immediately. For a choice submitted with a form use Checkbox."
      usage={[
        { heading: 'Immediate effect', body: 'A switch applies as soon as it is flipped — no save step.' },
        { heading: 'Label the on state', body: 'Write the label so it reads correctly when the switch is on.' },
        { heading: 'Feedback for errors', body: 'Use invalid with a feedback message when a setting cannot be applied.' },
      ]}
      demos={[
        { id: 'states', title: 'States', description: 'Off, on, disabled and invalid. Hover and focus appear when you interact.',
          node: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Switch label="Off" />
              <Switch label="On" defaultChecked />
              <Switch label="Disabled" disabled />
              <Switch label="Invalid" invalid feedback="This setting is required." />
            </div>
          ) },
        { id: 'sizes', title: 'Sizes and content', description: 'Small 28×16, medium 44×24. Label only, or label with supporting text.',
          node: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(['sm', 'md'] as const).map((s) => <Switch key={s} size={s} defaultChecked label="Notifications" supportingText="Tell me when a sample finishes processing." />)}
            </div>
          ) },
      ]}
    />
  );
}

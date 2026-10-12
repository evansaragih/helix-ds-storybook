import { ComponentDocPage } from './ComponentDocPage';
import { Button } from '../../components';
import { ArrowRight, Plus } from 'lucide-react';

const HIERARCHIES = ['primary', 'secondary', 'tertiary', 'destructive'] as const;
const APPEARANCES = ['solid', 'outline', 'subtle', 'ghost', 'link'] as const;

export function ButtonSection() {
  return (
    <ComponentDocPage
      slug="button"
      title="Button"
      description="Core action button. Use for the primary action in a view, supporting actions, or a destructive / irreversible action. For an icon-only action use Icon Button."
      usage={[
        { heading: 'One primary per view', body: 'Use a single Primary Solid button for the main action; supporting actions use Secondary or Outline.' },
        { heading: 'Destructive for irreversible', body: 'Reserve the Destructive hierarchy for actions that delete or can’t be undone.' },
        { heading: 'Link inside text', body: 'Use the Link appearance for inline actions that read as part of a sentence.' },
      ]}
      demos={[
        { id: 'matrix', title: 'Hierarchy and Appearance', description: 'Hierarchy × Appearance as in Figma. Tertiary has Solid and Outline only; its other appearances use Outline.',
          node: (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, max-content)', gap: 12, alignItems: 'center' }}>
              {HIERARCHIES.flatMap((h) => APPEARANCES.map((a) => <Button key={h + a} hierarchy={h} appearance={a}>{h} {a}</Button>))}
            </div>
          ) },
        { id: 'sizes', title: 'Sizes', description: 'Extra small 24 · small 36 · medium 44 · large 52.',
          node: <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>{(['xs', 'sm', 'md', 'lg'] as const).map((s) => <Button key={s} size={s}>{s}</Button>)}</div> },
        { id: 'icons', title: 'With icons',
          node: <div style={{ display: 'flex', gap: 12 }}><Button leadingIcon={<Plus size={16} />}>New</Button><Button trailingIcon={<ArrowRight size={16} />}>Continue</Button></div> },
        { id: 'states', title: 'Loading and disabled',
          node: <div style={{ display: 'flex', gap: 12 }}><Button loading>Saving</Button><Button disabled>Disabled</Button><Button appearance="outline" disabled>Disabled</Button></div> },
        { id: 'link', title: 'Link underline',
          node: <div style={{ display: 'flex', gap: 24 }}>{(['always', 'on-hover', 'none'] as const).map((u) => <Button key={u} appearance="link" underline={u}>{u}</Button>)}</div> },
      ]}
    />
  );
}

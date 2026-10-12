import { ComponentDocPage } from './ComponentDocPage';
import { Slider } from '../../components';

export function SliderSection() {
  return (
    <ComponentDocPage
      slug="slider"
      title="Slider"
      description="A draggable track for picking a number in a range — a rounded track, a brand fill, a ring thumb and a value bubble. Use for continuous numeric input; for a few fixed options use Radio Group or Tabs."
      usage={[
        { heading: 'Continuous values', body: 'Use for volume, a price range or a threshold, where any value in the range makes sense.' },
        { heading: 'Show the value', body: 'The bubble above the thumb appears on hover, focus and drag. Pass valueTooltip="always" when the number matters at a glance.' },
        { heading: 'Keyboard', body: 'Focus the thumb and use the arrow keys, Home and End. The focus ring is drawn outside the thumb.' },
      ]}
      demos={[
        { id: 'sizes', title: 'Sizes', description: 'Default has an 8px track, Compact a 4px track. Hover, focus or drag to see the value bubble.', node: <div style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 48, paddingTop: 48 }}><Slider defaultValue={50} aria-label="Default" /><Slider defaultValue={50} size="compact" aria-label="Compact" /></div> },
        { id: 'always', title: 'Value bubble always visible', node: <div style={{ width: 280, paddingTop: 48 }}><Slider defaultValue={50} valueTooltip="always" aria-label="Value" /></div> },
        { id: 'disabled', title: 'Disabled', node: <div style={{ width: 280 }}><Slider defaultValue={50} disabled aria-label="Disabled" /></div> },
      ]}
    />
  );
}

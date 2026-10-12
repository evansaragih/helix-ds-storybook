import { ComponentDocPage } from './ComponentDocPage';
import { ProgressBar, ProgressCircle } from '../../components';

const TYPES = ['base', 'title-label', 'trailing-label', 'top-floating-label', 'bottom-floating-label', 'within'] as const;

export function ProgressBarSection() {
  return (
    <ComponentDocPage
      slug="progress-bar"
      title="Progress Indicator"
      description="Determinate completion: a horizontal Progress Bar and a circular Progress Circle. Use for upload and download progress and form completion; for an unknown wait use Spinner."
      usage={[
        { heading: 'Only when you know', body: 'Progress indicators need a measurable value. For unknown waits use a Spinner.' },
        { heading: 'Pick the label', body: 'Show the percentage next to, above or inside the bar depending on the room you have.' },
        { heading: 'Circle for compact', body: 'Use the circle where a bar would not fit, such as a row of upload items.' },
      ]}
      demos={[
        { id: 'bar', title: 'Progress Bar types', node: <div style={{ width: 516, display: 'flex', flexDirection: 'column', gap: 24 }}>{TYPES.map((t) => <ProgressBar key={t} type={t} value={50} label="Storage used" />)}</div> },
        { id: 'circle', title: 'Progress Circle', description: 'Sizes XXS to LG, thick and thin.', node: <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>{(['thick', 'thin'] as const).map((th) => <div key={th} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>{(['xxs', 'xs', 'sm', 'md', 'lg'] as const).map((s) => <ProgressCircle key={s} size={s} thickness={th} value={40} supportingText="Active users" />)}</div>)}</div> },
      ]}
    />
  );
}

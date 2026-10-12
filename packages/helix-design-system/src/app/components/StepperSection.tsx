import { ComponentDocPage } from './ComponentDocPage';
import { Stepper } from '../../components';
import { FlaskConical, ClipboardList, FileCheck, Truck } from 'lucide-react';

const STEPS = [
  { id: 's1', title: 'Sample received', label: 'Date - Time Log', badge: 'Done' },
  { id: 's2', title: 'Lab processing', label: 'Date - Time Log', badge: 'Running' },
  { id: 's3', title: 'Quality check', label: 'Date - Time Log', badge: 'Pending' },
  { id: 's4', title: 'Report issued', label: 'Date - Time Log', badge: 'Pending' },
];

export function StepperSection() {
  return (
    <ComponentDocPage
      slug="stepper"
      title="Stepper"
      description="Step navigation for a multi-step flow: numbered or icon markers joined by connectors, with a step caption, title, label and status badge. Horizontal across the top or vertical in a column."
      usage={[
        { heading: 'A sequence', body: 'Use a stepper when the steps happen in order. For peer views use Tab.' },
        { heading: 'Show progress', body: 'Completed steps are green, the current step is brand-colored, and pending steps stay quiet.' },
        { heading: 'Vertical for narrow panels', body: 'Switch to vertical inside side panels and sheets.' },
      ]}
      demos={[
        { id: 'horizontal', title: 'Horizontal', node: <div style={{ width: 760 }}><Stepper steps={STEPS} activeStep={1} /></div> },
        { id: 'vertical', title: 'Vertical', description: 'Labels on the right (default) or the left.',
          node: <div style={{ display: 'flex', gap: 80 }}><div style={{ width: 240 }}><Stepper orientation="vertical" steps={STEPS} activeStep={1} /></div><div style={{ width: 240 }}><Stepper orientation="vertical" labelPosition="left" steps={STEPS} activeStep={2} /></div></div> },
        { id: 'icons', title: 'Icon markers', node: <div style={{ width: 760 }}><Stepper markerType="icon" activeStep={1} steps={[{ ...STEPS[0], icon: <ClipboardList size={20} /> }, { ...STEPS[1], icon: <FlaskConical size={20} /> }, { ...STEPS[2], icon: <FileCheck size={20} /> }, { ...STEPS[3], icon: <Truck size={20} /> }]} /></div> },
      ]}
    />
  );
}

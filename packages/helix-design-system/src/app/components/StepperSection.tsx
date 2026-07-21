import { useState } from 'react';
import { PageLayout, Section } from './PageLayout';
import { Stepper, Button } from '../../components';
import type { Step } from '../../components';

const toc = [
  { id: 'stepper-usage',       label: 'Usage Guidelines' },
  { id: 'stepper-orientation', label: 'Orientation' },
  { id: 'stepper-statuses',    label: 'Step Statuses' },
  { id: 'stepper-interactive', label: 'Interactive' },
];

const steps: Step[] = [
  { id: 'account', label: 'Account',   description: 'Create your account' },
  { id: 'profile', label: 'Profile',   description: 'Set up your profile' },
  { id: 'billing', label: 'Billing',   description: 'Add a payment method' },
  { id: 'confirm', label: 'Confirm',   description: 'Review and submit' },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      {children}
    </div>
  );
}

export function StepperSection() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <PageLayout
      category="Components"
      title="Stepper"
      description="Steppers guide users through a linear sequence of steps. They visualise progress and communicate which step is active, completed, or pending."
      tocItems={toc}
    >
      <Section id="stepper-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Sequential flows only', body: 'Use a stepper when the user must complete steps in order. For non-linear navigation, use tabs.' },
            { heading: 'Keep steps ≤ 5', body: 'More than 5 steps becomes hard to scan. Consider whether some steps can be combined or moved to a later flow.' },
            { heading: 'Show progress clearly', body: 'Always highlight the current step and visually differentiate completed from pending steps.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="stepper-orientation" title="Orientation">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          <code>horizontal</code> (default) is best for page headers. <code>vertical</code> works well in sidebars or onboarding flows with descriptions.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <DemoCard title="Horizontal">
            <Stepper steps={steps} orientation="horizontal" activeStep={2} />
          </DemoCard>
          <DemoCard title="Vertical">
            <Stepper steps={steps} orientation="vertical" activeStep={1} />
          </DemoCard>
        </div>
      </Section>

      <Section id="stepper-statuses" title="Step Statuses">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Individual steps can have explicit statuses: <code>completed</code>, <code>active</code>, <code>pending</code>, or <code>error</code>.
        </p>
        <DemoCard title="With explicit statuses">
          <Stepper
            steps={[
              { id: 's1', label: 'Completed', status: 'completed' },
              { id: 's2', label: 'Active',    status: 'active' },
              { id: 's3', label: 'Error',     status: 'error' },
              { id: 's4', label: 'Pending',   status: 'pending' },
            ]}
          />
        </DemoCard>
      </Section>

      <Section id="stepper-interactive" title="Interactive">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Use <code>activeStep</code> with external state to drive a wizard flow.
        </p>
        <DemoCard title={`Step ${activeStep + 1} of ${steps.length}`}>
          <Stepper steps={steps} activeStep={activeStep} />
          <div style={{ marginTop: 24, padding: 16, backgroundColor: 'white', borderRadius: 8, border: '1px solid #EEEEEE', minHeight: 60, display: 'flex', alignItems: 'center' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#49494A' }}>
              {steps[activeStep]?.description ?? 'All steps complete!'}
            </p>
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="neutral" size="sm" onClick={() => setActiveStep(s => Math.max(0, s - 1))} disabled={activeStep === 0}>
              Back
            </Button>
            <Button variant="primary" size="sm" onClick={() => setActiveStep(s => Math.min(steps.length - 1, s + 1))} disabled={activeStep === steps.length - 1}>
              Next
            </Button>
          </div>
        </DemoCard>
      </Section>
    </PageLayout>
  );
}

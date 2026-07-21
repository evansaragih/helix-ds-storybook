import { PageLayout, Section } from './PageLayout';
import { Checkbox } from '../../components';

const toc = [
  { id: 'states', label: 'States' },
  { id: 'variants', label: 'Variants' }
];

export function CheckboxSection() {
  return (
    <PageLayout
      category="Components"
      title="Checkbox"
      description="Checkboxes allow the user to select one or more items from a set. They can also be used to turn an option on or off."
      tocItems={toc}
    >
      <Section id="states" title="States">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: '14px', color: '#828282', lineHeight: '1.6' }}>
          Checkboxes communicate their status through visual changes. They support Checked, Unchecked, and Indeterminate states.
        </p>
        
        <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #EEEEEE' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Checkbox label="Unchecked" description="Description text" />
            <Checkbox checked label="Checked" description="Description text" />
            <Checkbox checked="indeterminate" label="Multi-Select" description="Description text" />
            <Checkbox simulateState="Focus" checked label="Focus" description="Description text" />
            <Checkbox disabled label="Disabled" description="Description text" />
            <Checkbox disabled checked label="Disabled" description="Description text" />
            <Checkbox invalid label="Invalid" description="Description text" />
          </div>
        </div>
      </Section>

      <Section id="variants" title="Variants">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: '14px', color: '#828282', lineHeight: '1.6' }}>
          Checkboxes can be used standalone, with labels, or with supporting description text. They can also be right-aligned for list views.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div style={{ padding: '32px', backgroundColor: '#f9f9f9', borderRadius: '16px', border: '1px solid #EEEEEE' }}>
            <h4 style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontSize: '14px', fontWeight: 600, color: '#14141E' }}>Standalone & Small Size</h4>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <Checkbox checked />
              <Checkbox checked size="Small" />
              <Checkbox size="Small" />
            </div>
          </div>
          
          <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #EEEEEE' }}>
            <Checkbox checked label="Accept terms and conditions" description="By clicking this checkbox, you agree to the terms and conditions." />
          </div>

          <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #EEEEEE' }}>
            <h4 style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontSize: '14px', fontWeight: 600, color: '#14141E' }}>
              Show these items on the desktop:
            </h4>
            <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: '13px', color: '#828282' }}>
              Describe your task in natural language.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Checkbox checked label="Hard disks" />
              <Checkbox checked label="External disks" />
              <Checkbox label="CDs, DVDs, and iPods" />
              <Checkbox label="Connected servers" />
            </div>
          </div>

          <div style={{ padding: '32px', backgroundColor: '#f9f9f9', borderRadius: '16px', border: '1px solid #EEEEEE' }}>
            <h4 style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: '14px', fontWeight: 600, color: '#14141E' }}>Right-Aligned (List Items)</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #EEEEEE' }}>
                <Checkbox align="Right" label="Unchecked" description="Description text" />
              </div>
              <div style={{ padding: '16px', backgroundColor: '#F7F7F7', borderRadius: '8px', border: '1px solid #EEEEEE' }}>
                <Checkbox align="Right" disabled label="Disabled" description="Description text" />
              </div>
              <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #F57E20' }}>
                <Checkbox align="Right" checked label="Checked" description="Description text" />
              </div>
            </div>
          </div>

        </div>
      </Section>
    </PageLayout>
  );
}

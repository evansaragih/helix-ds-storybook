import { ComponentDocPage } from './ComponentDocPage';
import { FooterActions, Button, Checkbox } from '../../components';

export function FooterActionsSection() {
  return (
    <ComponentDocPage
      slug="footer-actions"
      title="Footer Action"
      description="The action row for a footer or bottom bar. Use inside a Dialog, Popover, Dropdown panel, Sheet or any overlay that needs an action bar."
      usage={[
        { heading: 'Primary last', body: 'Put the main action on the right, cancel to its left.' },
        { heading: 'Fill for narrow panels', body: 'Equal-width buttons suit popovers and mobile sheets.' },
        { heading: 'Left slot', body: 'A checkbox or text link can sit opposite the buttons.' },
      ]}
      demos={[
        { id: 'right', title: 'Right aligned', node: (<div style={{ width: 400 }}><FooterActions><Button hierarchy="secondary" appearance="outline" size="sm">Cancel</Button><Button hierarchy="primary" appearance="solid" size="sm">Save</Button></FooterActions></div>) },
        { id: 'fill', title: 'Fill container', node: (<div style={{ width: 400 }}><FooterActions alignment="fill"><Button hierarchy="secondary" appearance="outline" size="sm">Cancel</Button><Button hierarchy="primary" appearance="solid" size="sm">Save</Button></FooterActions></div>) },
        { id: 'left', title: 'With left content', node: (<div style={{ width: 400 }}><FooterActions leftContent={<Checkbox size="sm" label="Don't ask again" />}><Button hierarchy="secondary" appearance="outline" size="sm">Cancel</Button><Button hierarchy="primary" appearance="solid" size="sm">Save</Button></FooterActions></div>) },
      ]}
    />
  );
}

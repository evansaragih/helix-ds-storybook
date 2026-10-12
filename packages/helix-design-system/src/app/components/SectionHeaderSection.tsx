import { ComponentDocPage } from './ComponentDocPage';
import { SectionHeader, Button } from '../../components';

export function SectionHeaderSection() {
  return (
    <ComponentDocPage
      slug="section-header"
      title="Section Header"
      description="A page or section header with a title, an optional action and an optional toolbar row. Use above a data view such as a list or table."
      usage={[
        { heading: 'Above a data view', body: 'Pair with a list, table or card grid.' },
        { heading: 'One main action', body: 'Keep the trailing slot to a single primary action.' },
        { heading: 'Toolbar below', body: 'Put sort and filter chips in the toolbar slot.' },
      ]}
      demos={[
        { id: 'basic', title: 'With action', node: (<div style={{ width: 700 }}><SectionHeader title="Growth Analytics" actions={<Button hierarchy="primary" appearance="solid" size="sm">Add new</Button>} /></div>) },
      ]}
    />
  );
}

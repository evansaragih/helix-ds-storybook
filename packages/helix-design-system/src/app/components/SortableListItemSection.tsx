import { ComponentDocPage } from './ComponentDocPage';
import { SortableListItem } from '../../components';

export function SortableListItemSection() {
  return (
    <ComponentDocPage
      slug="sortable-list-item"
      title="Sortable List Item"
      description="A reorderable list row: a drag handle plus the row content. It only renders the row — bring your own drag-and-drop logic through handleProps."
      usage={[
        { heading: 'User-controlled order', body: 'Use where the user decides the order, such as grouping or ranking.' },
        { heading: 'Bring your own dnd', body: 'The component is presentational; wire dnd-kit or similar to the handle.' },
        { heading: 'Static rows', body: 'Use List Item for rows that aren\'t reorderable.' },
      ]}
      demos={[
        { id: 'states', title: 'States', node: (<div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 240 }}><SortableListItem>Default</SortableListItem><SortableListItem dragging>Dragging</SortableListItem><SortableListItem disabled>Disabled</SortableListItem></div>) },
      ]}
    />
  );
}

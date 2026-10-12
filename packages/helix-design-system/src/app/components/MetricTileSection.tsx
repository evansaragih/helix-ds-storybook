import { ComponentDocPage } from './ComponentDocPage';
import { MetricTile } from '../../components';
import { Activity } from 'lucide-react';

export function MetricTileSection() {
  return (
    <ComponentDocPage
      slug="metric-tile"
      title="Metric Tile"
      description="A KPI tile: a labelled value with an optional change badge, comparison caption, graph and footer. It replaces the older Card Metric."
      usage={[
        { heading: 'One number', body: 'Lead with the value; keep the label short.' },
        { heading: 'Show the change', body: 'Add a delta badge and a comparison caption so the number has context.' },
        { heading: 'Detailed for deep dives', body: 'The detailed variant adds extra content and a footer band.' },
      ]}
      demos={[
        { id: 'simple', title: 'Simple', node: (<div style={{ width: 254 }}><MetricTile icon={<Activity size={14} />} label="Metrics label" value="1,234" delta={{ label: '+4%' }} comparison="vs February 2026" /></div>) },
        { id: 'footer', title: 'With footer', node: (<div style={{ width: 254 }}><MetricTile variant="with-footer" icon={<Activity size={14} />} label="Metrics label" value="1,234" footer={<span style={{ fontSize: 13, color: '#49494A' }}>Updated 5 min ago</span>} /></div>) },
      ]}
    />
  );
}

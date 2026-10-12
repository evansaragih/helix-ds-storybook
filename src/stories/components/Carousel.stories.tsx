import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel } from 'helix-design-system/components';

const IMG = (id: string) => `https://images.unsplash.com/${id}?w=1200&q=70`;
const SLIDES = [
  { id: 's1', image: IMG('photo-1532094349884-543bc11b234d'), title: 'Sample prep', description: 'Samples are prepared and labelled before sequencing.', label: 'Step 1', bullets: ['Logged on arrival', 'Barcoded', 'Stored at 4°C'] },
  { id: 's2', image: IMG('photo-1582719471384-894fbb16e074'), title: 'Microscopy', description: 'Quality check under the microscope.', label: 'Step 2', bullets: ['Visual QC', 'Contamination check'] },
  { id: 's3', image: IMG('photo-1576086213369-97a306d36557'), title: 'Analysis', description: 'Results are reviewed by the analyst.', label: 'Step 3', bullets: ['Automated pipeline', 'Analyst sign-off'] },
  { id: 's4', image: IMG('photo-1579154204601-01588f351e67'), title: 'Reporting', description: 'A report is issued to the customer.', label: 'Step 4', bullets: ['PDF report', 'Shared securely'] },
];

const meta = {
  title: 'Molecule/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'select', options: ['single', 'center-peek', 'row-cards', 'stack-peek', 'split-feature'] },
    indicator: { control: 'select', options: ['dots', 'dots-inverse', 'progress', 'bar', 'track', false] },
    showNavigation: { control: 'boolean' },
  },
  args: { slides: SLIDES, layout: 'single', indicator: 'dots', showNavigation: true },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const CenterPeek: Story = { args: { layout: 'center-peek' } };
export const RowCards: Story = { args: { layout: 'row-cards' } };
export const StackPeek: Story = { args: { layout: 'stack-peek' } };
export const SplitFeature: Story = { args: { layout: 'split-feature' }, decorators: [(Story) => <div style={{ width: 1000 }}><Story /></div>] };

/** Figma _page-indicator appearances. */
export const Indicators: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {(['dots', 'dots-inverse', 'progress', 'bar', 'track'] as const).map((indicator) => <Carousel key={indicator} {...args} indicator={indicator} />)}
    </div>
  ),
};

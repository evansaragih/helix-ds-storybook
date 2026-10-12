import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip, TooltipProvider, Button } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    arrow: { control: 'boolean' },
  },
  args: { content: 'Tooltip text', side: 'top', arrow: true, children: <Button hierarchy="secondary" appearance="outline" size="sm">Hover me</Button> },
  decorators: [(Story) => <TooltipProvider><div style={{ padding: '80px 120px' }}><Story /></div></TooltipProvider>],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma Content=Two-Block — an additional grey block above the main text. */
export const TwoBlock: Story = { args: { additionalContent: 'Additional Text' } };

/** Figma Content=Detailed — a title and a longer body. */
export const Detailed: Story = {
  args: { title: 'This is a tooltip', content: 'Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand the meaning, function or alt-text of an element.' },
};

export const NoArrow: Story = { args: { arrow: false } };

/** The tooltip is open so its look can be reviewed against Figma. */
export const Open: Story = {
  render: (args) => (
    <TooltipProvider>
      <div style={{ padding: '80px 120px' }}>
        <Tooltip {...args} delayDuration={0}><Button hierarchy="secondary" appearance="outline" size="sm" autoFocus>Focused</Button></Tooltip>
      </div>
    </TooltipProvider>
  ),
  decorators: [],
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentContainer, Button } from 'helix-design-system/components';

const header = <span style={{ fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 16, lineHeight: '24px' }}>Section title</span>;
const body = <div style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#49494A' }}>Content goes here — any layout fits inside the body slot.</div>;
const footer = <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}><Button size="sm" hierarchy="secondary" appearance="outline">Cancel</Button><Button size="sm">Save</Button></div>;

const meta = {
  title: 'Molecule/Content Container',
  component: ContentContainer,
  tags: ['autodocs'],
  argTypes: {
    surface: { control: 'select', options: ['white', 'gray'] },
    intent: { control: 'select', options: ['neutral', 'destructive', 'brand'] },
    contentStyle: { control: 'select', options: ['flush', 'floating'] },
    contentSurface: { control: 'select', options: ['subtle', 'default'] },
    headerDivider: { control: 'boolean' },
    divided: { control: 'boolean' },
    border: { control: 'boolean' },
  },
  args: { header, children: body },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
} satisfies Meta<typeof ContentContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const WithFooter: Story = { args: { footer } };
export const Floating: Story = { args: { contentStyle: 'floating', contentSurface: 'default', surface: 'gray', footer } };
export const Gray: Story = { args: { surface: 'gray', contentSurface: 'default' } };
export const Intents: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ContentContainer {...args} intent="destructive" header={undefined} contentStyle="floating" contentSurface="default" footer={<span style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#DC2626' }}>This action cannot be undone.</span>} />
      <ContentContainer {...args} intent="brand" header={undefined} contentStyle="floating" contentSurface="default" footer={<span style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#F57E20' }}>Recommended for your plan.</span>} />
    </div>
  ),
};
export const BodyOnly: Story = { args: { header: undefined } };

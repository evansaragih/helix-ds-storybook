import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentContainer } from 'helix-design-system/components';

function PlaceholderBody({ height = 44 }: { height?: number }) {
  return <div style={{ height, borderRadius: 8, backgroundColor: '#FEF2E9' }} />;
}

const meta = {
  title: 'Components/Data Display/ContentContainer',
  component: ContentContainer,
  tags: ['autodocs'],
  argTypes: {
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    badgeVariant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'destructive', 'ghost', 'blue', 'green', 'yellow', 'red', 'brand-subtle', 'gray'],
    },
  },
  args: {
    title: 'Title',
    description: 'Description',
    badgeLabel: 'Blue',
    showActionButton: true,
    padding: 'md',
  },
} satisfies Meta<typeof ContentContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 420 }}>
      <ContentContainer {...args}>
        <PlaceholderBody />
      </ContentContainer>
    </div>
  ),
};

export const NoActionButton: Story = {
  args: { showActionButton: false },
  render: (args) => (
    <div style={{ width: 420 }}>
      <ContentContainer {...args}>
        <PlaceholderBody />
      </ContentContainer>
    </div>
  ),
};

export const NoBadge: Story = {
  args: { badgeLabel: undefined },
  render: (args) => (
    <div style={{ width: 420 }}>
      <ContentContainer {...args}>
        <PlaceholderBody />
      </ContentContainer>
    </div>
  ),
};

export const CustomHeader: Story = {
  render: (args) => (
    <div style={{ width: 420 }}>
      <ContentContainer
        {...args}
        headerContent={<strong style={{ fontFamily: 'var(--font-family-body, Rubik)', fontSize: 16 }}>Fully custom header</strong>}
      >
        <PlaceholderBody />
      </ContentContainer>
    </div>
  ),
};

export const NoBody: Story = {
  render: (args) => (
    <div style={{ width: 420 }}>
      <ContentContainer {...args} />
    </div>
  ),
};

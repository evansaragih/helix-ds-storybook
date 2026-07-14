import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel } from 'helix-design-system/components';

function Slide({ label, color }: { label: string; color: string }) {
  return (
    <div
      style={{
        height: 180,
        borderRadius: 12,
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Rubik, sans-serif',
        fontWeight: 500,
        fontSize: 16,
        color: '#FFFFFF',
      }}
    >
      {label}
    </div>
  );
}

const COLORS = ['#F57E20', '#476142', '#089AAA', '#014CC5', '#A66800'];

const ITEMS = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  content: <Slide label={`Slide ${i + 1}`} color={COLORS[i % COLORS.length]} />,
}));

const meta = {
  title: 'Components/Layout/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    visibleCount: { control: 'select', options: [1, 2, 3, 4] },
  },
  args: {
    items: ITEMS,
    visibleCount: 1,
    showArrows: true,
    showDots: true,
    gap: 16,
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <div style={{ width: 480 }}><Carousel {...args} /></div>,
};

export const MultipleVisible: Story = {
  args: { visibleCount: 3 },
  render: (args) => <div style={{ width: 640 }}><Carousel {...args} /></div>,
};

export const AutoPlay: Story = {
  args: { autoPlay: 2500 },
  render: (args) => <div style={{ width: 480 }}><Carousel {...args} /></div>,
};

export const NoArrowsOrDots: Story = {
  args: { showArrows: false, showDots: false },
  render: (args) => <div style={{ width: 480 }}><Carousel {...args} /></div>,
};

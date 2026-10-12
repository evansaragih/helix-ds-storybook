import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { PageLoader } from 'helix-design-system/components';

const meta = {
  title: 'Atomic/Loading indicator/Page Loader',
  component: PageLoader,
  tags: ['autodocs'],
  argTypes: { brand: { control: 'select', options: ['nusantics', 'cekolam', 'causa'] }, value: { control: { type: 'range', min: 0, max: 100 } } },
  args: { value: 50, brand: 'nusantics' },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof PageLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Brands: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, background: '#F7F7F7', padding: 24, borderRadius: 12 }}>
      {(['nusantics', 'cekolam', 'causa'] as const).map((brand) => <PageLoader key={brand} {...args} brand={brand} />)}
    </div>
  ),
};

export const Animated: Story = {
  render: (args) => {
    const [value, setValue] = useState(0);
    useEffect(() => { const t = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 5)), 300); return () => clearInterval(t); }, []);
    return <PageLoader {...args} value={value} />;
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { PageLoader } from 'helix-design-system/components';

const meta = {
  title: 'Components/Feedback/PageLoader',
  component: PageLoader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A branded card shown while a page or view is fetching data — logo over a determinate progress bar. Used for full-page/route loads, not small in-place operations (use Spinner or ProgressBar for those).',
      },
    },
  },
  args: {
    value: 40,
  },
} satisfies Meta<typeof PageLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Empty: Story = {
  args: { value: 0 },
};

export const Complete: Story = {
  args: { value: 100 },
};

export const Animated: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState(0);
      useEffect(() => {
        const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 4)), 200);
        return () => clearInterval(id);
      }, []);
      return <PageLoader value={value} />;
    }
    return <Demo />;
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Lightbox, Button } from 'helix-design-system/components';

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200', alt: 'Laboratory glassware', title: 'Sample preparation', description: 'Samples are prepared and labelled before sequencing.' },
  { src: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200', alt: 'Microscope', title: 'Microscopy', description: 'Quality check under the microscope.' },
  { src: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200', alt: 'Lab technician', title: 'Analysis', description: 'Results are reviewed by the analyst.' },
];

const meta = {
  title: 'Molecule/Lightbox',
  component: Lightbox,
  tags: ['autodocs'],
  argTypes: { layout: { control: 'select', options: ['image', 'image-caption', 'gallery-strip'] }, showNavigation: { control: 'boolean' } },
  args: { open: false, onClose: () => {}, images: IMAGES, layout: 'image-caption', showNavigation: true },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Lightbox>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo(args: React.ComponentProps<typeof Lightbox>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open lightbox</Button>
      <Lightbox {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export const Playground: Story = { render: (args) => <Demo {...args} /> };
export const ImageOnly: Story = { args: { layout: 'image' }, render: (args) => <Demo {...args} /> };
export const GalleryStrip: Story = { args: { layout: 'gallery-strip' }, render: (args) => <Demo {...args} /> };
export const SingleImage: Story = { args: { images: [IMAGES[0]] }, render: (args) => <Demo {...args} /> };

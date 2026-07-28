import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropzone } from 'helix-design-system/components';

const meta = {
  title: 'Components/Inputs & Forms/Dropzone',
  component: Dropzone,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['md', 'lg'] },
  },
  args: {
    label: 'Sample data file',
    helperText: 'Upload your raw sequencing data.',
    accept: '.fastq,.csv,.pdf',
    maxSize: 10 * 1024 * 1024,
    multiple: true,
  },
} satisfies Meta<typeof Dropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    maxSize: 1200
  },

  // resize: both — drag the bottom-right corner handle to stretch this box in either direction
  render: (args) => <div style={{ width: 420, height: 84, minWidth: 280, minHeight: 84, maxWidth: '100%', resize: 'both', overflow: 'auto', padding: 2 }}><Dropzone {...args} style={{ height: '100%' }} /></div>
};

export const Large: Story = {
  args: { size: 'lg' },
  render: (args) => <div style={{ width: 420 }}><Dropzone {...args} /></div>,
};

export const SingleFile: Story = {
  args: { multiple: false, label: 'Profile photo', accept: 'image/*' },
  render: (args) => <div style={{ width: 420 }}><Dropzone {...args} /></div>,
};

export const Invalid: Story = {
  args: { error: true, errorText: 'File type not supported.' },
  render: (args) => <div style={{ width: 420 }}><Dropzone {...args} /></div>,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <div style={{ width: 420 }}><Dropzone {...args} /></div>,
};

export const NoConstraints: Story = {
  args: { accept: undefined, maxSize: undefined, helperText: undefined },
  render: (args) => <div style={{ width: 420 }}><Dropzone {...args} /></div>,
};

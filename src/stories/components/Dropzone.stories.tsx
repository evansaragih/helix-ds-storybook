import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropzone } from 'helix-design-system/components';

const meta = {
  title: 'Components/Inputs & Forms/Dropzone',
  component: Dropzone,
  tags: ['autodocs'],
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

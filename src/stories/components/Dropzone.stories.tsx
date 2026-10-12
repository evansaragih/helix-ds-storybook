import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropzone, FileUploadField } from 'helix-design-system/components';

const meta = {
  title: 'Organism/Dropzone/Dropzone',
  component: Dropzone,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['md', 'lg'] },
    appearance: { control: 'select', options: ['transparent', 'container'] },
    disabled: { control: 'boolean' },
    showBrowseButton: { control: 'boolean' },
  },
  args: { size: 'md', appearance: 'transparent', description: 'PDF, CSV up to 10MB', accept: '.pdf,.csv', multiple: true },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
} satisfies Meta<typeof Dropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Large: Story = { args: { size: 'lg' }, decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>] };
export const Container: Story = { args: { appearance: 'container', hint: 'Files are uploaded when you save.' } };

/** Figma State — Default, Hover, Drag-Active, Disabled, Error. Hover and drag are interactive. */
export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Dropzone {...args} />
      <Dropzone {...args} disabled />
      <Dropzone {...args} error="This file type is not supported." />
    </div>
  ),
};

export const WithMaxSize: Story = { args: { maxSize: 1024 * 1024, description: 'Up to 1 MB each' } };
export const FileField: Story = {
  render: () => (
    <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FileUploadField label="Attachment" hint="PDF up to 10MB" />
      <FileUploadField floating label="Attachment" />
      <FileUploadField label="Attachment" error="A file is required." />
    </div>
  ),
};

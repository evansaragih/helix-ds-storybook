import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { UploadProgressDrawer, Dropzone, type UploadDrawerFile } from 'helix-design-system/components';

const SAMPLE_FILES: UploadDrawerFile[] = [
  { id: '1', name: 'ITB-PRK-001_R1.fastq.gz', sizeLabel: '891 MB', status: 'uploading', progress: 70, speedLabel: '340.78 MB/s · ~2s' },
  { id: '2', name: 'ITB-PRK-002_R1.fastq.gz', sizeLabel: '891 MB', status: 'waiting' },
  { id: '3', name: 'unannotated_sample_001.fastq.gz', sizeLabel: '—', status: 'failed', errorReason: 'Rejected — sample code not found' },
  { id: '4', name: 'ITB-PRK-003_R1.fastq.gz', sizeLabel: '891 MB', status: 'success' },
  { id: '5', name: 'ITB-PRK-004_R1.fastq.gz', sizeLabel: '891 MB', status: 'success' },
];

const meta = {
  title: 'Components/Overlays/Upload Progress Drawer',
  component: UploadProgressDrawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Floating panel that tracks a batch upload, meant to be paired with `Dropzone`. It self-positions `fixed` at 24px from the right and 16px from the bottom — no layout wrapper needed. Stories below override that to `position: absolute` so the panel stays inside the demo frame instead of the real viewport corner.',
      },
    },
  },
  args: {
    open: true,
    expanded: true,
    files: SAMPLE_FILES,
    progress: 42,
    title: 'Uploading files…',
  },
} satisfies Meta<typeof UploadProgressDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Demo frame tall enough to hold the drawer without it escaping to the real page corner. */
function Frame({ children }: { children: React.ReactNode }) {
  return <div style={{ position: 'relative', height: 560, width: '100%' }}>{children}</div>;
}

export const Playground: Story = {
  render: (args) => (
    <Frame>
      <UploadProgressDrawer {...args} style={{ position: 'absolute' }} />
    </Frame>
  ),
};

export const Collapsed: Story = {
  args: { expanded: false, progress: 20 },
  render: (args) => (
    <Frame>
      <UploadProgressDrawer {...args} style={{ position: 'absolute' }} />
    </Frame>
  ),
};

export const AllWaiting: Story = {
  args: {
    progress: 0,
    files: SAMPLE_FILES.map((f) => ({ ...f, status: 'waiting' as const, progress: undefined })),
  },
  render: (args) => (
    <Frame>
      <UploadProgressDrawer {...args} style={{ position: 'absolute' }} />
    </Frame>
  ),
};

export const AllFailed: Story = {
  args: {
    progress: 100,
    files: SAMPLE_FILES.map((f) => ({ ...f, status: 'failed' as const, errorReason: 'Rejected — sample code not found' })),
  },
  render: (args) => (
    <Frame>
      <UploadProgressDrawer {...args} style={{ position: 'absolute' }} />
    </Frame>
  ),
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** End-to-end: drop files in, watch them move through waiting → uploading → success/failed. */
function LiveDemo() {
  const [files, setFiles] = useState<UploadDrawerFile[]>([]);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);

  function simulateUpload(id: string) {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: 'uploading', progress: 0 } : f)));
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id !== id || f.status !== 'uploading') return f;
          const next = Math.min(100, (f.progress ?? 0) + 12 + Math.random() * 12);
          if (next >= 100) {
            clearInterval(interval);
            const failed = Math.random() > 0.8;
            return failed
              ? { ...f, status: 'failed', progress: 100, errorReason: 'Rejected — sample code not found' }
              : { ...f, status: 'success', progress: 100 };
          }
          return { ...f, progress: next, speedLabel: `${(Math.random() * 4 + 1).toFixed(2)} MB/s · ~${Math.ceil((100 - next) / 20)}s` };
        }),
      );
    }, 450);
  }

  function handleFilesChange(newFiles: File[]) {
    const items: UploadDrawerFile[] = newFiles.map((file, i) => ({
      id: `${Date.now()}-${i}`,
      name: file.name,
      sizeLabel: formatBytes(file.size),
      status: 'waiting',
    }));
    setFiles((prev) => [...prev, ...items]);
    setOpen(true);
    items.forEach((item) => setTimeout(() => simulateUpload(item.id), 200));
  }

  const total = files.length;
  const doneCount = files.filter((f) => f.status === 'success' || f.status === 'failed').length;
  const overallProgress =
    total === 0 ? 0 : Math.round(files.reduce((sum, f) => sum + (f.status === 'waiting' ? 0 : f.status === 'uploading' ? (f.progress ?? 0) : 100), 0) / total);

  return (
    <Frame>
      <div style={{ width: 420 }}>
        <Dropzone label="Sample data files" helperText="Drop files to see the upload drawer track them." multiple onFilesChange={handleFilesChange} />
      </div>
      <UploadProgressDrawer
        open={open}
        expanded={expanded}
        onExpandedChange={setExpanded}
        files={files}
        progress={overallProgress}
        onCancelAll={() => setOpen(false)}
        onRemoveFile={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
        style={{ position: 'absolute' }}
      />
      {total > 0 && doneCount === total && (
        <p style={{ position: 'absolute', bottom: 8, left: 0, fontSize: 12, color: 'var(--color-text-tertiary)', fontFamily: 'Rubik, sans-serif' }}>
          All {total} file(s) processed — collapse or dismiss via Cancel all.
        </p>
      )}
    </Frame>
  );
}

export const LiveUploadDemo: Story = {
  name: 'Live Upload Demo',
  render: () => <LiveDemo />,
};

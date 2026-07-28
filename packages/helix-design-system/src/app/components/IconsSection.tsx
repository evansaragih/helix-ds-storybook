import {
  AlertCircle, AlertTriangle, ArrowRight, Bell, Calendar, Check, CheckCircle2,
  ChevronDown, ChevronLeft, ChevronRight, ChevronUp, FileArchive, FileBarChart2,
  FileImage, FileSpreadsheet, FileText, FileX, Files, Filter, FolderOpen,
  ImageOff, Inbox, Info, ListFilter, Menu, Minus, MoreHorizontal, Plus, Search,
  SquareDashed, Trash2, TrendingDown, TrendingUp, UploadCloud, X, XCircle,
  type LucideIcon,
} from 'lucide-react';
import { PageLayout, Section } from './PageLayout';

const toc = [
  { id: 'actions-navigation', label: 'Actions & Navigation' },
  { id: 'status-feedback', label: 'Status & Feedback' },
  { id: 'files-documents', label: 'Files & Documents' },
  { id: 'misc', label: 'Misc' },
];

function IconSwatch({ name, Icon }: { name: string; Icon: LucideIcon }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      padding: '16px 12px',
      backgroundColor: '#f7f7f7',
      borderRadius: '8px',
      border: '1px solid #eee',
    }}>
      <Icon size={20} color="#14141e" />
      <span style={{
        fontFamily: 'var(--font-family-body)',
        fontSize: '11px',
        color: '#828282',
        textAlign: 'center',
        wordBreak: 'break-word',
      }}>
        {name}
      </span>
    </div>
  );
}

function IconGrid({ icons }: { icons: { name: string; Icon: LucideIcon }[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
      {icons.map(({ name, Icon }) => (
        <IconSwatch key={name} name={name} Icon={Icon} />
      ))}
    </div>
  );
}

export function IconsSection() {
  return (
    <PageLayout
      category="Foundations"
      title="Icons"
      description="This design system standardizes on lucide-react as its default icon library across almost every component. react-icons is reserved for the rare spot where a Figma spec names a literal react-icons glyph and pixel-exact fidelity matters."
      tocItems={toc}
    >
      <Section id="actions-navigation" title="Actions & Navigation">
        <IconGrid icons={[
          { name: 'Check', Icon: Check },
          { name: 'ChevronDown', Icon: ChevronDown },
          { name: 'ChevronLeft', Icon: ChevronLeft },
          { name: 'ChevronRight', Icon: ChevronRight },
          { name: 'ChevronUp', Icon: ChevronUp },
          { name: 'Filter', Icon: Filter },
          { name: 'ListFilter', Icon: ListFilter },
          { name: 'Menu', Icon: Menu },
          { name: 'Minus', Icon: Minus },
          { name: 'MoreHorizontal', Icon: MoreHorizontal },
          { name: 'Plus', Icon: Plus },
          { name: 'Search', Icon: Search },
          { name: 'X', Icon: X },
          { name: 'ArrowRight', Icon: ArrowRight },
        ]} />
      </Section>

      <Section id="status-feedback" title="Status & Feedback">
        <IconGrid icons={[
          { name: 'AlertCircle', Icon: AlertCircle },
          { name: 'AlertTriangle', Icon: AlertTriangle },
          { name: 'CheckCircle2', Icon: CheckCircle2 },
          { name: 'Info', Icon: Info },
          { name: 'XCircle', Icon: XCircle },
          { name: 'TrendingUp', Icon: TrendingUp },
          { name: 'TrendingDown', Icon: TrendingDown },
        ]} />
      </Section>

      <Section id="files-documents" title="Files & Documents">
        <IconGrid icons={[
          { name: 'FileArchive', Icon: FileArchive },
          { name: 'FileBarChart2', Icon: FileBarChart2 },
          { name: 'FileImage', Icon: FileImage },
          { name: 'FileSpreadsheet', Icon: FileSpreadsheet },
          { name: 'FileText', Icon: FileText },
          { name: 'FileX', Icon: FileX },
          { name: 'Files', Icon: Files },
          { name: 'FolderOpen', Icon: FolderOpen },
          { name: 'UploadCloud', Icon: UploadCloud },
          { name: 'ImageOff', Icon: ImageOff },
          { name: 'Inbox', Icon: Inbox },
        ]} />
      </Section>

      <Section id="misc" title="Misc">
        <IconGrid icons={[
          { name: 'Bell', Icon: Bell },
          { name: 'Calendar', Icon: Calendar },
          { name: 'SquareDashed', Icon: SquareDashed },
          { name: 'Trash2', Icon: Trash2 },
        ]} />
      </Section>
    </PageLayout>
  );
}

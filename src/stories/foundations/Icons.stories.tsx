import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AlertCircle, AlertTriangle, ArrowRight, Bell, Calendar, Check, CheckCircle2,
  ChevronDown, ChevronLeft, ChevronRight, ChevronUp, FileArchive, FileBarChart2,
  FileImage, FileSpreadsheet, FileText, FileX, Files, Filter, FolderOpen,
  ImageOff, Inbox, Info, ListFilter, Menu, Minus, MoreHorizontal, Plus, Search,
  SquareDashed, Trash2, TrendingDown, TrendingUp, UploadCloud, X, XCircle,
} from 'lucide-react';
import { Section, SwatchGrid, IconSwatch } from './helpers';
import { FoundationDocsPage } from './FoundationDocsPage';

const meta = {
  title: 'Foundations/Icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: FoundationDocsPage,
      description: {
        component:
          'This design system standardizes on **lucide-react** as its default icon library across almost every component. `react-icons` is also installed, reserved for the rare spot where a Figma spec names a literal `react-icons` glyph and pixel-exact fidelity matters (currently just Dropzone\'s decorative illustration) — default to lucide everywhere else so the icon language stays consistent. `import { IconName } from \'lucide-react\'` — browse lucide\'s full set at lucide.dev/icons if nothing here fits.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActionsAndNavigation: Story = {
  name: 'Actions & Navigation',
  render: () => (
    <Section title="Actions & Navigation">
      <SwatchGrid>
        <IconSwatch name="Check" Icon={Check} />
        <IconSwatch name="ChevronDown" Icon={ChevronDown} />
        <IconSwatch name="ChevronLeft" Icon={ChevronLeft} />
        <IconSwatch name="ChevronRight" Icon={ChevronRight} />
        <IconSwatch name="ChevronUp" Icon={ChevronUp} />
        <IconSwatch name="Filter" Icon={Filter} />
        <IconSwatch name="ListFilter" Icon={ListFilter} />
        <IconSwatch name="Menu" Icon={Menu} />
        <IconSwatch name="Minus" Icon={Minus} />
        <IconSwatch name="MoreHorizontal" Icon={MoreHorizontal} />
        <IconSwatch name="Plus" Icon={Plus} />
        <IconSwatch name="Search" Icon={Search} />
        <IconSwatch name="X" Icon={X} />
        <IconSwatch name="ArrowRight" Icon={ArrowRight} />
      </SwatchGrid>
    </Section>
  ),
};

export const StatusAndFeedback: Story = {
  name: 'Status & Feedback',
  render: () => (
    <Section title="Status & Feedback">
      <SwatchGrid>
        <IconSwatch name="AlertCircle" Icon={AlertCircle} />
        <IconSwatch name="AlertTriangle" Icon={AlertTriangle} />
        <IconSwatch name="CheckCircle2" Icon={CheckCircle2} />
        <IconSwatch name="Info" Icon={Info} />
        <IconSwatch name="XCircle" Icon={XCircle} />
        <IconSwatch name="TrendingUp" Icon={TrendingUp} />
        <IconSwatch name="TrendingDown" Icon={TrendingDown} />
      </SwatchGrid>
    </Section>
  ),
};

export const FilesAndDocuments: Story = {
  name: 'Files & Documents',
  render: () => (
    <Section title="Files & Documents">
      <SwatchGrid>
        <IconSwatch name="FileArchive" Icon={FileArchive} />
        <IconSwatch name="FileBarChart2" Icon={FileBarChart2} />
        <IconSwatch name="FileImage" Icon={FileImage} />
        <IconSwatch name="FileSpreadsheet" Icon={FileSpreadsheet} />
        <IconSwatch name="FileText" Icon={FileText} />
        <IconSwatch name="FileX" Icon={FileX} />
        <IconSwatch name="Files" Icon={Files} />
        <IconSwatch name="FolderOpen" Icon={FolderOpen} />
        <IconSwatch name="UploadCloud" Icon={UploadCloud} />
        <IconSwatch name="ImageOff" Icon={ImageOff} />
        <IconSwatch name="Inbox" Icon={Inbox} />
      </SwatchGrid>
    </Section>
  ),
};

export const Misc: Story = {
  name: 'Misc',
  render: () => (
    <Section title="Misc" description="Placeholder/decorative glyphs and everything that doesn't fit the other groups.">
      <SwatchGrid>
        <IconSwatch name="Bell" Icon={Bell} />
        <IconSwatch name="Calendar" Icon={Calendar} />
        <IconSwatch name="SquareDashed" Icon={SquareDashed} />
        <IconSwatch name="Trash2" Icon={Trash2} />
      </SwatchGrid>
    </Section>
  ),
};

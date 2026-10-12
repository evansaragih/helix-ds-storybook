import type { ReactNode } from 'react';
import {
  Beaker, Bell, CalendarDays, GalleryHorizontal, Image as ImageIcon, LayoutDashboard, LayoutPanelLeft, Menu, MessageSquare,
  MousePointerClick, PanelBottom, PanelRight, Table2, Table as TableIcon, Tags, Upload, Inbox, MoreHorizontal, Columns2, Layers, Users,
} from 'lucide-react';
import {
  Accordion, Alert, Avatar, Badge, Breadcrumb, Button, Callout, Checkbox, ContentContainer, ContentDivider, Divider, Dot, Dropzone, Field,
  FooterActions, GroupItem, IconButton, IconTile, InfoBadge, Input, LabelValue, ListItem, LoadingState, MetricTile, Pagination, ProgressBar,
  RadioButton, SectionHeader, Select, Skeleton, Slider, SortableListItem, Spinner, Stepper, Switch, Tabs, Tag,
} from '../../components';

const noop = () => {};
const row = (gap = 8): React.CSSProperties => ({ display: 'flex', alignItems: 'center', gap });
const w = (n: number, node: ReactNode) => <div style={{ width: n }}>{node}</div>;
const tile = (icon: ReactNode) => <IconTile size="md" icon={icon} />;

/** Small live (or iconic, for overlays and full-page layouts) preview shown on each Overview card. */
export const componentPreviews: Record<string, ReactNode> = {
  button: <div style={row()}><Button size="sm">Button</Button><Button size="sm" hierarchy="secondary" appearance="outline">Button</Button></div>,
  'icon-button': <div style={row()}><IconButton aria-label="Notifications" size="sm" icon={<Bell size={16} />} /><IconButton aria-label="More" size="sm" hierarchy="secondary" appearance="outline" icon={<MoreHorizontal size={16} />} /></div>,
  checkbox: <div style={row(12)}><Checkbox checked onChange={noop} label="Checked" /><Checkbox checked={false} onChange={noop} label="Off" /></div>,
  'radio-button': <RadioButton value="basic" label="Basic" supportingText="Up to 10 samples" />,
  'progress-bar': w(160, <ProgressBar value={60} label="Storage used" />),
  slider: w(160, <Slider defaultValue={50} aria-label="Preview" />),
  spinner: <Spinner />,
  divider: w(160, <Divider />),
  'icon-tile': <div style={row(12)}>{(['xs', 'sm', 'md', 'lg'] as const).map((s) => <IconTile key={s} size={s} icon={<Beaker />} />)}</div>,
  dot: <div style={row()}>{(['brand', 'info', 'success', 'warning', 'error'] as const).map((c) => <Dot key={c} color={c} size="xl" />)}</div>,
  switch: <Switch label="Notifications" defaultChecked />,

  accordion: w(200, <Accordion defaultValue="q1" items={[{ id: 'q1', title: 'How are samples processed?', content: 'Logged, prepared, sequenced and checked.' }, { id: 'q2', title: 'How long does it take?', content: 'Three to five days.' }]} />),
  alert: w(220, <Alert layout="card" status="info" title="Informational alert" description="Helpful guidance." />),
  'alert-dialog': tile(<MessageSquare />),
  avatar: <div style={row()}>{(['xs', 'sm', 'md'] as const).map((s) => <Avatar key={s} size={s} name="Evan Himawan" />)}</div>,
  'avatar-group': <div style={row(-6)}>{['Evan H', 'Olivia R', 'Lana S'].map((n) => <Avatar key={n} size="sm" name={n} />)}</div>,
  badge: <div style={row(6)}><Badge label="Brand" color="brand" appearance="subtle" /><Badge label="Done" color="success" appearance="subtle" /><Badge label="Error" color="error" appearance="subtle" /></div>,
  breadcrumb: <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Lab', href: '#' }, { label: 'Processing', href: '#' }]} />,
  callout: w(220, <Callout type="info" title="Info callout" description="Supporting text." />),
  carousel: tile(<GalleryHorizontal />),
  'content-divider': w(200, <ContentDivider appearance="sides">Notifications</ContentDivider>),
  'content-container': w(200, <ContentContainer header={<strong style={{ fontSize: 13 }}>Section title</strong>} contentSurface="default">Body</ContentContainer>),
  dialog: tile(<PanelBottom />),
  'dropdown-menu': tile(<Menu />),
  'empty-state': tile(<Inbox />),
  skeleton: <div style={row(16)}>{(['title', 'circle', 'rectangle'] as const).map((s) => <Skeleton key={s} shape={s} />)}</div>,
  'loading-state': <LoadingState type="spinner" />,
  field: w(180, <Field heading="Creative" supportingText="Select all that apply."><Checkbox size="md" label="Design" /></Field>),
  'toolbar-filter': <div style={row()}><Tag label="Status" /><Tag label="Type" /></div>,
  'footer-actions': w(200, <FooterActions><Button hierarchy="secondary" appearance="outline" size="sm">Cancel</Button><Button size="sm">Save</Button></FooterActions>),
  input: w(180, <Input placeholder="Placeholder" />),
  'group-item': w(200, <GroupItem checked title="Basic plan" description="Up to 10 samples." />),
  'list-item': w(180, <ListItem label="Default" trailing="⌘K" />),
  'sortable-list-item': w(160, <SortableListItem>Default</SortableListItem>),
  'label-value': <LabelValue size="md" label="Sample ID" value="SMP-2026-0142" />,
  lightbox: tile(<ImageIcon />),
  pagination: <Pagination total={50} defaultPage={2} />,
  popover: tile(<MousePointerClick />),
  'section-header': w(220, <SectionHeader title="Growth Analytics" actions={<Button size="sm">Add</Button>} />),
  select: w(180, <Select options={[{ value: 'jakarta', label: 'Jakarta' }, { value: 'bandung', label: 'Bandung' }]} placeholder="Select a city" />),
  sheet: tile(<PanelRight />),
  stepper: w(220, <Stepper activeStep={1} steps={[{ id: 's1', title: 'Received', label: 'Done', badge: 'Done' }, { id: 's2', title: 'Processing', label: 'Now', badge: 'Running' }]} />),
  tabs: w(220, <Tabs showNavigation={false} renderContent={false} items={[{ id: 'a', label: 'Overview' }, { id: 'b', label: 'Activity' }, { id: 'c', label: 'Settings' }]} />),
  tag: <div style={row(6)}><Tag label="Design" onClose={noop} /><Tag label="Lab" /></div>,
  toast: tile(<Bell />),
  tooltip: tile(<MessageSquare />),
  table: tile(<TableIcon />),

  navbar: tile(<Menu />),
  sidebar: tile(<LayoutPanelLeft />),
  dropzone: w(200, <Dropzone description="PDF, CSV up to 10MB" />),
  'upload-progress-drawer': tile(<Upload />),
  'info-badge': <InfoBadge appearance="meta-badge" icon={<Tags size={16} />} label="Submission ID" value="RCP-2026" />,
  'metric-tile': w(180, <MetricTile icon={<Layers size={14} />} label="Metrics label" value="1,234" delta={{ label: '+4%' }} comparison="vs last month" />),
  'date-picker': tile(<CalendarDays />),
  'comparison-table': tile(<Table2 />),
  'dashboard-layout': tile(<LayoutDashboard />),
};

export const fallbackPreview = tile(<Columns2 />);
export const usersPreview = tile(<Users />);

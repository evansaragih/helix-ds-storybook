import { PageLayout } from './PageLayout';
import { OverviewSection } from './OverviewSection';
import { PrimitivesSection } from './PrimitivesSection';
import { SemanticsSection } from './SemanticsSection';
import { TypographySection } from './TypographySection';
import { UtilitiesSection } from './UtilitiesSection';
import { ElevationSection } from './ElevationSection';
import { IconsSection } from './IconsSection';
import { BrandIdentitySection } from './BrandIdentitySection';
import { InputSection } from './InputSection';
import { CheckboxSection } from './CheckboxSection';
import { ButtonSection } from './ButtonSection';
import { BadgeSection } from './BadgeSection';
import { AlertSection } from './AlertSection';
import { AvatarSection } from './AvatarSection';
import { AvatarGroupSection } from './AvatarGroupSection';
import { IconButtonSection } from './IconButtonSection';
import { AccordionSection } from './AccordionSection';
import { DividerSection } from './DividerSection';
import { SwitchSection } from './SwitchSection';
import { RadioButtonSection } from './RadioButtonSection';
import { SelectSection } from './SelectSection';
import { TabsSection } from './TabsSection';
import { TooltipSection } from './TooltipSection';
import { ProgressBarSection } from './ProgressBarSection';
import { SliderSection } from './SliderSection';
import { PaginationSection } from './PaginationSection';
import { DialogSection } from './DialogSection';
import { StepperSection } from './StepperSection';
import { TableSection } from './TableSection';
import { SpinnerSection } from './SpinnerSection';
import { BreadcrumbSection } from './BreadcrumbSection';
import { ToastrSection } from './ToastrSection';
import { AlertDialogSection } from './AlertDialogSection';
import { PopoverSection } from './PopoverSection';
import { SheetSection } from './SheetSection';
import { EmptyStateSection } from './EmptyStateSection';
import { NavbarSection } from './NavbarSection';
import { DatePickerSection } from './DatePickerSection';
import { ComparisonTableSection } from './ComparisonTableSection';
import { ContentContainerSection } from './ContentContainerSection';
import { componentItems } from '../data/navigation';
import { CarouselSection } from './CarouselSection';
import { ToolbarFilterSection } from './ToolbarFilterSection';
import { DropzoneSection } from './DropzoneSection';
import { UploadProgressDrawerSection } from './UploadProgressDrawerSection';
import { DotSection } from './DotSection';
import { IconTileSection } from './IconTileSection';
import { CalloutSection } from './CalloutSection';
import { SkeletonSection } from './SkeletonSection';
import { LoadingStateSection } from './LoadingStateSection';
import { LabelValueSection } from './LabelValueSection';
import { ContentDividerSection } from './ContentDividerSection';
import { FieldSection } from './FieldSection';
import { FooterActionsSection } from './FooterActionsSection';
import { GroupItemSection } from './GroupItemSection';
import { ListItemSection } from './ListItemSection';
import { SortableListItemSection } from './SortableListItemSection';
import { SectionHeaderSection } from './SectionHeaderSection';
import { SidebarSection } from './SidebarSection';
import { DropdownMenuSection } from './DropdownMenuSection';
import { MetricTileSection } from './MetricTileSection';
import { InfoBadgeSection } from './InfoBadgeSection';
import { LightboxSection } from './LightboxSection';
import { DashboardLayoutSection } from './DashboardLayoutSection';
import { TagSection } from './TagSection';

interface MainContentProps {
  activeSection: string;
  isCollapsed: boolean;
  onSectionChange: (section: string) => void;
}

export function MainContent({ activeSection, isCollapsed, onSectionChange }: MainContentProps) {
  const renderSection = () => {
    switch (activeSection) {
      case 'overview':          return <OverviewSection />;
      case 'primitives':        return <PrimitivesSection />;
      case 'semantics':         return <SemanticsSection />;
      case 'typography':        return <TypographySection />;
      case 'utilities':         return <UtilitiesSection />;
      case 'elevation':         return <ElevationSection />;
      case 'icons':             return <IconsSection />;
      case 'brand-identity':    return <BrandIdentitySection />;
      case 'input':             return <InputSection />;
      case 'checkbox':          return <CheckboxSection />;
      case 'button':            return <ButtonSection />;
      case 'badge':             return <BadgeSection />;
      case 'alert':             return <AlertSection />;
      case 'avatar':            return <AvatarSection />;
      case 'avatar-group':      return <AvatarGroupSection />;
      case 'icon-button':       return <IconButtonSection />;
      case 'accordion':         return <AccordionSection />;
      case 'divider':           return <DividerSection />;
      case 'switch':            return <SwitchSection />;
      case 'radio-button':      return <RadioButtonSection />;
      case 'select':            return <SelectSection />;
      case 'tabs':              return <TabsSection />;
      case 'tooltip':           return <TooltipSection />;
      case 'progress-bar':      return <ProgressBarSection />;
      case 'slider':            return <SliderSection />;
      case 'pagination':        return <PaginationSection />;
      case 'dialog':            return <DialogSection />;
      case 'stepper':           return <StepperSection />;
      case 'table':             return <TableSection />;
      case 'spinner':           return <SpinnerSection />;
      case 'breadcrumb':        return <BreadcrumbSection />;
      case 'toast':             return <ToastrSection />;
      case 'alert-dialog':      return <AlertDialogSection />;
      case 'popover':           return <PopoverSection />;
      case 'sheet':             return <SheetSection />;
      case 'empty-state':       return <EmptyStateSection />;
      case 'navbar':            return <NavbarSection />;
      case 'date-picker':       return <DatePickerSection />;
      case 'comparison-table':  return <ComparisonTableSection />;
      case 'content-container': return <ContentContainerSection />;
      case 'carousel':          return <CarouselSection />;
      case 'toolbar-filter':    return <ToolbarFilterSection />;
      case 'dropzone':          return <DropzoneSection />;
      case 'upload-progress-drawer': return <UploadProgressDrawerSection />;
      case 'dot': return <DotSection />;
      case 'icon-tile': return <IconTileSection />;
      case 'callout': return <CalloutSection />;
      case 'skeleton': return <SkeletonSection />;
      case 'loading-state': return <LoadingStateSection />;
      case 'label-value': return <LabelValueSection />;
      case 'content-divider': return <ContentDividerSection />;
      case 'field': return <FieldSection />;
      case 'footer-actions': return <FooterActionsSection />;
      case 'group-item': return <GroupItemSection />;
      case 'list-item': return <ListItemSection />;
      case 'sortable-list-item': return <SortableListItemSection />;
      case 'section-header': return <SectionHeaderSection />;
      case 'sidebar': return <SidebarSection />;
      case 'dropdown-menu': return <DropdownMenuSection />;
      case 'metric-tile': return <MetricTileSection />;
      case 'info-badge': return <InfoBadgeSection />;
      case 'lightbox': return <LightboxSection />;
      case 'dashboard-layout': return <DashboardLayoutSection />;
      case 'tag': return <TagSection />;
      case 'components-overview':
        return (
          <PageLayout
            category="Components"
            title="Components"
            description="The Helix design system follows the Figma component sets. Pick any component to see usage guidance and interactive examples."
            tocItems={[]}
          >
            <div className="dx-usage" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 12 }}>
              {componentItems.filter((i) => i.id !== 'components-overview').map((i) => (
                <button key={i.id} className="dx-tile" onClick={() => onSectionChange(i.id)}>
                  {i.label}
                </button>
              ))}
            </div>
          </PageLayout>
        );
      default:
        return <OverviewSection />;
    }
  };

  return (
    <main className="dx-main" style={{ marginLeft: isCollapsed ? 64 : 248 }}>
      <div className="dx-container">{renderSection()}</div>
    </main>
  );
}

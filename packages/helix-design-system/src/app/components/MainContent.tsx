import { OverviewSection } from './OverviewSection';
import { PrimitivesSection } from './PrimitivesSection';
import { SemanticsSection } from './SemanticsSection';
import { TypographySection } from './TypographySection';
import { UtilitiesSection } from './UtilitiesSection';
import { ElevationSection } from './ElevationSection';
import { InputSection } from './InputSection';
import { InputOTPSection } from './InputOTPSection';
import { ListContainerSection } from './ListContainerSection';
import { CheckboxSection } from './CheckboxSection';
import { ButtonSection } from './ButtonSection';
import { MenuItemSection } from './MenuItemSection';
import { BadgeSection } from './BadgeSection';
import { AlertSection } from './AlertSection';
import { AvatarSection } from './AvatarSection';
import { AvatarGroupSection } from './AvatarGroupSection';
import { IconButtonSection } from './IconButtonSection';
import { CardSection } from './CardSection';
import { AccordionSection } from './AccordionSection';
import { DividerSection } from './DividerSection';
import { SwitchSection } from './SwitchSection';
import { RadioButtonSection } from './RadioButtonSection';
import { SelectSection } from './SelectSection';
import { TabsSection } from './TabsSection';
import { TooltipSection } from './TooltipSection';
import { ProgressBarSection } from './ProgressBarSection';
import { PaginationSection } from './PaginationSection';
import { DialogSection } from './DialogSection';
import { StepperSection } from './StepperSection';
import { TableSection } from './TableSection';
import { SpinnerSection } from './SpinnerSection';
import { TextLinkSection } from './TextLinkSection';
import { BreadcrumbSection } from './BreadcrumbSection';
import { ToastSection } from './ToastSection';
import { AlertDialogSection } from './AlertDialogSection';
import { PopoverSection } from './PopoverSection';
import { SheetSection } from './SheetSection';
import { EmptyStateSection } from './EmptyStateSection';
import { NavbarSection } from './NavbarSection';
import { DatePickerSection } from './DatePickerSection';
import { CardMetricSection } from './CardMetricSection';
import { InfoCardSection } from './InfoCardSection';
import { ComparisonTableSection } from './ComparisonTableSection';
import { ContentContainerSection } from './ContentContainerSection';
import { CarouselSection } from './CarouselSection';
import { ToolbarFilterSection } from './ToolbarFilterSection';
import { DropzoneSection } from './DropzoneSection';

interface MainContentProps {
  activeSection: string;
  isCollapsed: boolean;
}

export function MainContent({ activeSection, isCollapsed }: MainContentProps) {
  const renderSection = () => {
    switch (activeSection) {
      case 'overview':          return <OverviewSection />;
      case 'primitives':        return <PrimitivesSection />;
      case 'semantics':         return <SemanticsSection />;
      case 'typography':        return <TypographySection />;
      case 'utilities':         return <UtilitiesSection />;
      case 'elevation':         return <ElevationSection />;
      case 'input':             return <InputSection />;
      case 'input-otp':         return <InputOTPSection />;
      case 'list-container':    return <ListContainerSection />;
      case 'checkbox':          return <CheckboxSection />;
      case 'button':            return <ButtonSection />;
      case 'menu-item':         return <MenuItemSection />;
      case 'badge':             return <BadgeSection />;
      case 'alert':             return <AlertSection />;
      case 'avatar':            return <AvatarSection />;
      case 'avatar-group':      return <AvatarGroupSection />;
      case 'icon-button':       return <IconButtonSection />;
      case 'card':              return <CardSection />;
      case 'accordion':         return <AccordionSection />;
      case 'divider':           return <DividerSection />;
      case 'switch':            return <SwitchSection />;
      case 'radio-button':      return <RadioButtonSection />;
      case 'select':            return <SelectSection />;
      case 'tabs':              return <TabsSection />;
      case 'tooltip':           return <TooltipSection />;
      case 'progress-bar':      return <ProgressBarSection />;
      case 'pagination':        return <PaginationSection />;
      case 'dialog':            return <DialogSection />;
      case 'stepper':           return <StepperSection />;
      case 'table':             return <TableSection />;
      case 'spinner':           return <SpinnerSection />;
      case 'text-link':         return <TextLinkSection />;
      case 'breadcrumb':        return <BreadcrumbSection />;
      case 'toast':             return <ToastSection />;
      case 'alert-dialog':      return <AlertDialogSection />;
      case 'popover':           return <PopoverSection />;
      case 'sheet':             return <SheetSection />;
      case 'empty-state':       return <EmptyStateSection />;
      case 'navbar':            return <NavbarSection />;
      case 'date-picker':       return <DatePickerSection />;
      case 'card-metric':       return <CardMetricSection />;
      case 'info-card':         return <InfoCardSection />;
      case 'comparison-table':  return <ComparisonTableSection />;
      case 'content-container': return <ContentContainerSection />;
      case 'carousel':          return <CarouselSection />;
      case 'toolbar-filter':    return <ToolbarFilterSection />;
      case 'dropzone':          return <DropzoneSection />;
      case 'components-overview':
        return (
          <div style={{ padding: '40px 48px' }}>
            <h1 style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'var(--text-heading-page-title)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--spacing-16)',
              fontWeight: 'var(--font-weight-semibold)',
            }}>
              Components
            </h1>
            <p style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: 'var(--text-body-large)',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6',
              marginBottom: 32,
            }}>
              The Helix design system includes 43 production-ready components. Select any component from the sidebar to view its documentation and interactive examples.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
              {[
                'Accordion', 'Alert', 'Alert Dialog', 'Avatar', 'Avatar Group', 'Badge', 'Breadcrumb',
                'Button', 'Card', 'Card Metric', 'Carousel', 'Checkbox', 'Comparison Table', 'Content Container',
                'Date Picker', 'Dialog', 'Divider', 'Empty State', 'Icon Button', 'Info Card', 'Input',
                'Input OTP', 'List Container', 'Menu', 'Navbar', 'Pagination', 'Popover', 'Progress Bar',
                'Radio Button', 'Select', 'Sheet', 'Spinner', 'Stepper', 'Switch',
                'Table', 'Tabs', 'Text Link', 'Toast', 'Toolbar Filter', 'Tooltip',
              ].map(name => (
                <div key={name} style={{
                  padding: '12px 16px',
                  backgroundColor: '#F7F7F7',
                  borderRadius: 8,
                  border: '1px solid #EEEEEE',
                  fontFamily: 'var(--font-family-body)',
                  fontSize: 13,
                  color: '#14141E',
                  fontWeight: 500,
                }}>
                  {name}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <OverviewSection />;
    }
  };

  return (
    <main
      className="min-h-screen"
      style={{
        marginLeft: isCollapsed ? '64px' : '240px',
        marginTop: '64px',
        padding: 'var(--spacing-32)',
        backgroundColor: 'var(--color-bg-secondary)',
        transition: 'margin-left 0.3s ease'
      }}
    >
      <div className="mx-auto" style={{ width: '100%' }}>
        <div className="min-h-screen">
          <div
            className="bg-white"
            style={{
              padding: 'var(--spacing-32)',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid var(--color-stroke-subtle)'
            }}
          >
            {renderSection()}
          </div>
        </div>
      </div>
    </main>
  );
}

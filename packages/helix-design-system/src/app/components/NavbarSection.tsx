import { ComponentDocPage } from './ComponentDocPage';
import { Navbar, NavLink, MobileMenu, MobileMenuItem, DashboardNavbar, DashboardFooter, Breadcrumb, Button, IconButton, Logo, Toggle } from '../../components';
import { ChevronDown, X } from 'lucide-react';

const right = (
  <>
    <NavLink label="Products" href="#" active />
    <NavLink label="Solutions" href="#" />
    <NavLink label="Resources" href="#" trailingIcon={<ChevronDown size={16} />} />
    <Button hierarchy="secondary" appearance="outline" size="sm">Log in</Button>
    <Button size="sm">Get started</Button>
  </>
);

export function NavbarSection() {
  return (
    <ComponentDocPage
      slug="navbar"
      title="Navbars"
      description="Page-level navigation bars: the marketing site header (Marketing Navbar), and the dashboard top bar and footer."
      usage={[
        { heading: 'Slots, not props', body: 'Put the logo in the left slot and links and actions in the right slot.' },
        { heading: 'One active link', body: 'The active NavLink is a solid brand pill — keep a single one active.' },
        { heading: 'Dashboard bars', body: 'In app screens use the Dashboard Navbar for context and the Dashboard Footer for page actions.' },
      ]}
      demos={[
        { id: 'marketing', title: 'Marketing Navbar', description: 'onScroll is a solid Surface/Default fill, with no transparency or blur.',
          node: <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 900 }}><Navbar state="onTop" leftContent={<strong style={{ fontFamily: 'var(--font-family-body)' }}>Helix</strong>} rightContent={right} /><div style={{ background: 'linear-gradient(135deg, #FCC9A3, #EBF2FE)' }}><Navbar state="onScroll" leftContent={<strong style={{ fontFamily: 'var(--font-family-body)' }}>Helix</strong>} rightContent={right} /></div></div> },
        { id: 'mobile-menu', title: 'Mobile Navbar and Mobile Menu', description: 'Device=mobile is the closed bar; the hamburger opens the Mobile Menu (header, links, footer pinned to the bottom).',
          node: <div style={{ width: 375, height: 640, border: '1px solid var(--color-stroke-subtle, #EEEEEE)' }}><MobileMenu logo={<Logo variant="wordmark" brand="nusantics" height={16} />} closeButton={<IconButton hierarchy="secondary" appearance="ghost" size="md" icon={<X size={20} />} aria-label="Close menu" />}
            footer={<><Toggle aria-label="Language" fullWidth options={[{ value: 'en', label: 'EN' }, { value: 'id', label: 'ID' }]} /><div style={{ display: 'flex', gap: 12 }}><Button hierarchy="secondary" appearance="outline" size="sm" style={{ flex: 1 }}>Login</Button><Button size="sm" style={{ flex: 1 }}>Contact Us</Button></div></>}>
            <MobileMenuItem label="For Lab" href="#"><MobileMenuItem label="Lab services" href="#" /></MobileMenuItem>
            <MobileMenuItem label="About Us" href="#" />
            <MobileMenuItem label="Products & Solutions" defaultOpen><MobileMenuItem label="Product Pipeline" href="#" /><MobileMenuItem label="Human Diagnostics" href="#" /></MobileMenuItem>
            <MobileMenuItem label="Career" href="#" />
          </MobileMenu></div> },
        { id: 'dashboard', title: 'Dashboard Navbar and Footer',
          node: <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 900 }}><DashboardNavbar leftContent={<Breadcrumb items={[{ label: 'Lab' }, { label: 'Processing' }]} />} rightContent={<Button size="sm">New sample</Button>} /><DashboardFooter leftContent={<Button hierarchy="secondary" appearance="ghost" size="sm">Back</Button>} rightContent={<Button size="sm">Save</Button>} /></div> },
      ]}
    />
  );
}

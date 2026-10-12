import { ComponentDocPage } from './ComponentDocPage';
import { Navbar, NavLink, DashboardNavbar, DashboardFooter, Breadcrumb, Button } from '../../components';
import { ChevronDown } from 'lucide-react';

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
        { id: 'marketing', title: 'Marketing Navbar', description: 'onTop is solid white; onScroll is translucent with a blur.',
          node: <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 900 }}><Navbar state="onTop" leftContent={<strong style={{ fontFamily: 'var(--font-family-body)' }}>Helix</strong>} rightContent={right} /><div style={{ background: 'linear-gradient(135deg, #FCC9A3, #EBF2FE)' }}><Navbar state="onScroll" leftContent={<strong style={{ fontFamily: 'var(--font-family-body)' }}>Helix</strong>} rightContent={right} /></div></div> },
        { id: 'dashboard', title: 'Dashboard Navbar and Footer',
          node: <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 900 }}><DashboardNavbar leftContent={<Breadcrumb items={[{ label: 'Lab' }, { label: 'Processing' }]} />} rightContent={<Button size="sm">New sample</Button>} /><DashboardFooter leftContent={<Button hierarchy="secondary" appearance="ghost" size="sm">Back</Button>} rightContent={<Button size="sm">Save</Button>} /></div> },
      ]}
    />
  );
}

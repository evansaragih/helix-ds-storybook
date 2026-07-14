import { PageLayout, Section } from './PageLayout';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components';
import helixMarkSvg from '../../assets/logo/helix-mark.svg';

const toc = [
  { id: 'navbar-usage', label: 'Usage Guidelines' },
  { id: 'navbar-basic', label: 'Basic' },
  { id: 'navbar-with-links', label: 'With Nav Links' },
  { id: 'navbar-examples', label: 'Examples' },
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '0 0 0', backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE', overflow: 'hidden' }}>
      <p style={{ margin: '0', padding: '14px 20px 12px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E', borderBottom: '1px solid #EEEEEE' }}>{title}</p>
      <div style={{ padding: 0 }}>{children}</div>
    </div>
  );
}

const logo = (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <img src={helixMarkSvg} alt="Helix" style={{ width: 28, height: 28 }} />
    <span style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 700, fontSize: 15, color: '#14141E' }}>Helix</span>
  </div>
);

const navLinks = [
  { label: 'Dashboard', active: true },
  { label: 'Projects' },
  { label: 'Analytics' },
  { label: 'Settings' },
];

export function NavbarSection() {
  return (
    <PageLayout
      category="Components"
      title="Navbar"
      description="The Navbar is the top-level navigation container. It provides branding, nav links, utility controls, and user context across all authenticated pages."
      tocItems={toc}
    >
      <Section id="navbar-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Sticky by default', body: 'Set sticky to keep the navbar anchored at the top as users scroll. This provides persistent orientation and access to global controls.' },
            { heading: 'Consistent across pages', body: 'The navbar should look the same across all pages. Avoid per-page changes to the logo, user area, or nav item set.' },
            { heading: 'Limit nav items', body: 'Keep top-level navigation to 5–7 items maximum. More than this creates decision fatigue. Move less-used items to a sidebar or user menu.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="navbar-basic" title="Basic">
        <Card title="Logo only">
          <Navbar logo={logo} showSearch showNotifications user={{ name: 'Evan Himawan', initials: 'E' }} />
        </Card>
        <div style={{ marginTop: 12 }} />
        <Card title="With actions slot">
          <Navbar
            logo={logo}
            actions={<><Button variant="neutral" size="sm">Sign in</Button><Button variant="primary" size="sm">Get started</Button></>}
          />
        </Card>
      </Section>

      <Section id="navbar-with-links" title="With Nav Links">
        <Card title="Full navigation">
          <Navbar
            logo={logo}
            links={navLinks}
            showSearch
            showNotifications
            user={{ name: 'Evan Himawan', initials: 'E' }}
          />
        </Card>
      </Section>

      <Section id="navbar-examples" title="Examples">
        <Card title="Marketing navbar">
          <Navbar
            logo={logo}
            links={[{ label: 'Product' }, { label: 'Pricing' }, { label: 'Blog' }, { label: 'Docs' }]}
            actions={<><Button variant="neutral" size="sm">Log in</Button><Button variant="primary" size="sm">Start free trial</Button></>}
          />
        </Card>
        <div style={{ marginTop: 12 }} />
        <Card title="App navbar">
          <Navbar
            logo={logo}
            links={navLinks}
            showNotifications
            user={{ name: 'Evan Himawan', initials: 'E' }}
          />
        </Card>
      </Section>
    </PageLayout>
  );
}

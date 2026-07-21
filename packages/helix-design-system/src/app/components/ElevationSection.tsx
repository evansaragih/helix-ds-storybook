import { PageLayout, Section } from './PageLayout';

const toc = [
  { id: 'elevation-scale', label: 'Elevation Scale' },
  { id: 'usage-guidelines', label: 'Usage Guidelines' }
];

const ElevationCard = ({ level, shadow, description }: { level: string; shadow: string; description: string }) => (
  <div style={{
    padding: '32px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: shadow,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'transform 0.2s ease',
    cursor: 'default'
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
  >
    <div style={{
      fontFamily: 'var(--font-family-body)',
      fontWeight: 600,
      fontSize: '16px',
      color: '#14141e'
    }}>
      {level}
    </div>
    <div style={{
      fontFamily: 'var(--font-family-body)',
      fontSize: '13px',
      color: '#828282',
      lineHeight: '1.5'
    }}>
      {description}
    </div>
    <div style={{
      marginTop: '12px',
      padding: '8px 12px',
      backgroundColor: '#f5f5f5',
      borderRadius: '6px',
      fontFamily: 'monospace',
      fontSize: '11px',
      color: '#58595b',
      wordBreak: 'break-all'
    }}>
      box-shadow: {shadow};
    </div>
  </div>
);

export function ElevationSection() {
  const levels = [
    {
      level: 'Elevation 1',
      shadow: 'var(--elevation-1)',
      description: 'The lowest level of elevation, used for standard cards, buttons, and small interactive elements.'
    },
    {
      level: 'Elevation 2',
      shadow: 'var(--elevation-2)',
      description: 'Used for elements that require more prominence, such as hover states or slightly elevated containers.'
    },
    {
      level: 'Elevation 3',
      shadow: 'var(--elevation-3)',
      description: 'High elevation for navigation elements like dropdowns, popovers, and sticky headers.'
    },
    {
      level: 'Elevation 4',
      shadow: 'var(--elevation-4)',
      description: 'The highest level of elevation, reserved for critical overlays like modals and system dialogs.'
    }
  ];

  return (
    <PageLayout
      category="Foundations"
      title="Elevation"
      description="Elevation uses shadows to create a sense of depth and hierarchy, helping users understand which elements are interactive or important."
      tocItems={toc}
    >
      <Section id="elevation-scale" title="Elevation Scale">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '32px',
          padding: '20px 0'
        }}>
          {levels.map((lvl) => (
            <ElevationCard key={lvl.level} {...lvl} />
          ))}
        </div>
      </Section>

      <Section id="usage-guidelines" title="Usage Guidelines">
        <div style={{
          padding: '24px',
          backgroundColor: '#f9f9f9',
          borderRadius: '12px',
          border: '1px solid #eee'
        }}>
          <ul style={{ 
            margin: 0, 
            paddingLeft: '20px', 
            fontFamily: 'var(--font-family-body)', 
            fontSize: '14px', 
            color: '#49494a',
            lineHeight: '1.8'
          }}>
            <li>Use elevation sparingly to maintain a clean and focused interface.</li>
            <li>Lower elevation levels are typically used for persistent elements on the page.</li>
            <li>Higher elevation levels indicate temporary or modal states that sit above the main content.</li>
            <li>Shadows should remain subtle and neutral to avoid distracting the user.</li>
          </ul>
        </div>
      </Section>
    </PageLayout>
  );
}

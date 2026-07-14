import { PageLayout, Section } from './PageLayout';
import { Carousel } from '../../components/Carousel';

const toc = [
  { id: 'carousel-usage', label: 'Usage Guidelines' },
  { id: 'carousel-single', label: 'Single Slide' },
  { id: 'carousel-multi', label: 'Multiple Visible' },
  { id: 'carousel-autoplay', label: 'Auto-play' },
];

function SlideCard({ index, color }: { index: number; color: string }) {
  return (
    <div style={{
      height: 180,
      borderRadius: 12,
      backgroundColor: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontFamily: 'Rubik, sans-serif',
      fontWeight: 600,
      fontSize: 24,
    }}>
      Slide {index}
    </div>
  );
}

const COLORS = ['#F57E20', '#089AAA', '#476142', '#014CC5', '#DC2626', '#A66800'];

const slides = COLORS.map((color, i) => ({
  id: i + 1,
  content: <SlideCard index={i + 1} color={color} />,
}));

const featureSlides = [
  { id: 1, content: (
    <div style={{ padding: 24, border: '1px solid #EEEEEE', borderRadius: 12, backgroundColor: '#FFF' }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#FEF2E9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, color: '#F57E20', fontSize: 20 }}>🚀</div>
      <h3 style={{ margin: '0 0 8px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 16, color: '#14141E' }}>Fast onboarding</h3>
      <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: '#49494A', lineHeight: '1.6' }}>Get your team up and running in minutes with guided setup and pre-built templates.</p>
    </div>
  )},
  { id: 2, content: (
    <div style={{ padding: 24, border: '1px solid #EEEEEE', borderRadius: 12, backgroundColor: '#FFF' }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#E6F7F9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, color: '#089AAA', fontSize: 20 }}>📊</div>
      <h3 style={{ margin: '0 0 8px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 16, color: '#14141E' }}>Advanced analytics</h3>
      <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: '#49494A', lineHeight: '1.6' }}>Track every metric that matters with real-time dashboards and custom report exports.</p>
    </div>
  )},
  { id: 3, content: (
    <div style={{ padding: 24, border: '1px solid #EEEEEE', borderRadius: 12, backgroundColor: '#FFF' }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#EBF0EA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, color: '#476142', fontSize: 20 }}>🔒</div>
      <h3 style={{ margin: '0 0 8px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 16, color: '#14141E' }}>Enterprise security</h3>
      <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: '#49494A', lineHeight: '1.6' }}>SOC 2 compliant, SSO, audit logs, and role-based access control built in from day one.</p>
    </div>
  )},
  { id: 4, content: (
    <div style={{ padding: 24, border: '1px solid #EEEEEE', borderRadius: 12, backgroundColor: '#FFF' }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#EBF2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, color: '#014CC5', fontSize: 20 }}>🤝</div>
      <h3 style={{ margin: '0 0 8px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 16, color: '#14141E' }}>Team collaboration</h3>
      <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: '#49494A', lineHeight: '1.6' }}>Comments, mentions, shared views, and live presence — work together in real time.</p>
    </div>
  )},
];

export function CarouselSection() {
  return (
    <PageLayout
      category="Components"
      title="Carousel"
      description="Carousels allow users to browse through a set of items one by one or in groups. Use them for feature highlights, image galleries, or content previews."
      tocItems={toc}
    >
      <Section id="carousel-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Limit carousel depth', body: 'Users rarely advance past slide 3–4. Keep critical content in the first 2 slides. Don\'t hide important actions inside later slides.' },
            { heading: 'Always show controls', body: 'Keep arrow buttons and dots visible. Hidden-until-hover controls are difficult on touch devices and reduce discoverability.' },
            { heading: 'Don\'t auto-play text', body: 'Auto-play is acceptable for image galleries but avoid it for carousels containing text or interactive elements — users may not have time to read.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="carousel-single" title="Single Slide">
        <Carousel items={slides.slice(0, 4)} visibleCount={1} />
      </Section>

      <Section id="carousel-multi" title="Multiple Visible">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Set <code>visibleCount</code> to show multiple slides at once — useful for feature or card grids.
        </p>
        <Carousel items={featureSlides} visibleCount={2} gap={16} />
        <div style={{ marginTop: 24 }}>
          <Carousel items={slides} visibleCount={3} gap={12} />
        </div>
      </Section>

      <Section id="carousel-autoplay" title="Auto-play">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Pass <code>autoPlay</code> in milliseconds to enable automatic advancing. Suitable for image galleries.
        </p>
        <Carousel items={slides} visibleCount={1} autoPlay={3000} />
      </Section>
    </PageLayout>
  );
}

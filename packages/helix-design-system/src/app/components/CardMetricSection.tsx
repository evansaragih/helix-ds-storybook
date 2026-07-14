import { PageLayout, Section } from './PageLayout';
import { CardMetric } from '../../components/CardMetric';
import { Users, DollarSign, ShoppingCart, Activity, ArrowUpRight } from 'lucide-react';

const toc = [
  { id: 'metric-usage', label: 'Usage Guidelines' },
  { id: 'metric-basic', label: 'Basic' },
  { id: 'metric-trends', label: 'With Trends' },
  { id: 'metric-icons', label: 'With Icons' },
  { id: 'metric-grid', label: 'Dashboard Grid' },
];

export function CardMetricSection() {
  return (
    <PageLayout
      category="Components"
      title="Card Metric"
      description="Metric cards display a single key performance indicator with optional trend context. Use them in dashboard grids to surface the most important data at a glance."
      tocItems={toc}
    >
      <Section id="metric-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'One metric per card', body: 'Each card should display a single value with a clear label. Don\'t try to cram multiple metrics into one card.' },
            { heading: 'Provide trend context', body: 'A number without context is hard to interpret. Always pair the value with a trend (up/down/neutral) and a reference period.' },
            { heading: 'Consistent formatting', body: 'Format values consistently across all metric cards in a dashboard. If one shows "€1,234", others shouldn\'t show "1234 EUR".' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="metric-basic" title="Basic">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <CardMetric label="Total users" value="24,521" />
          <CardMetric label="Monthly revenue" value="Rp 4.2M" />
          <CardMetric label="Active sessions" value="1,847" />
        </div>
      </Section>

      <Section id="metric-trends" title="With Trends">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <CardMetric
            label="Total revenue"
            value="Rp 12.4M"
            trend="up"
            trendValue="+18.2%"
            trendLabel="vs last month"
          />
          <CardMetric
            label="Churn rate"
            value="2.4%"
            trend="down"
            trendValue="-0.6%"
            trendLabel="vs last month"
          />
          <CardMetric
            label="Avg. session time"
            value="4m 32s"
            trend="neutral"
            trendValue="±0%"
            trendLabel="no change"
          />
        </div>
      </Section>

      <Section id="metric-icons" title="With Icons">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          <CardMetric
            label="Total users"
            value="24,521"
            trend="up"
            trendValue="+12%"
            trendLabel="this month"
            icon={<Users size={18} />}
            accentColor="var(--color-brand-primary, #F57E20)"
          />
          <CardMetric
            label="Revenue"
            value="Rp 8.1M"
            trend="up"
            trendValue="+24%"
            trendLabel="this month"
            icon={<DollarSign size={18} />}
            accentColor="var(--color-text-success, #12843C)"
          />
          <CardMetric
            label="Orders"
            value="3,210"
            trend="down"
            trendValue="-4%"
            trendLabel="this month"
            icon={<ShoppingCart size={18} />}
            accentColor="var(--color-destructive, #DC2626)"
          />
          <CardMetric
            label="Uptime"
            value="99.9%"
            trend="neutral"
            trendValue="±0%"
            trendLabel="last 30 days"
            icon={<Activity size={18} />}
            accentColor="var(--color-text-info, #014CC5)"
          />
        </div>
      </Section>

      <Section id="metric-grid" title="Dashboard Grid">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Metric cards are designed for a 4-column dashboard grid. Use consistent icon and accent colour conventions across the grid.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { label: 'Monthly active users', value: '48,921', trend: 'up' as const, tv: '+8.1%', tl: 'vs last month', icon: <Users size={16} />, color: '#F57E20' },
            { label: 'Gross revenue', value: 'Rp 24.7M', trend: 'up' as const, tv: '+31%', tl: 'vs last month', icon: <DollarSign size={16} />, color: '#12843C' },
            { label: 'New orders', value: '6,481', trend: 'down' as const, tv: '-2%', tl: 'vs last month', icon: <ShoppingCart size={16} />, color: '#DC2626' },
            { label: 'Conversion rate', value: '3.8%', trend: 'up' as const, tv: '+0.4%', tl: 'vs last month', icon: <ArrowUpRight size={16} />, color: '#089AAA' },
          ].map(m => (
            <CardMetric
              key={m.label}
              label={m.label}
              value={m.value}
              trend={m.trend}
              trendValue={m.tv}
              trendLabel={m.tl}
              icon={m.icon}
              accentColor={m.color}
            />
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}

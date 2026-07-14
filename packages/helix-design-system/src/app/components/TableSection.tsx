import { PageLayout, Section } from './PageLayout';
import { Table, Badge } from '../../components';
import type { Column } from '../../components';

const toc = [
  { id: 'table-usage',   label: 'Usage Guidelines' },
  { id: 'table-basic',   label: 'Basic Table' },
  { id: 'table-options', label: 'Options' },
  { id: 'table-custom',  label: 'Custom Cells' },
];

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
}

const users: User[] = [
  { id: 1, name: 'Evan Himawan',   email: 'evan@helix.com',    role: 'Admin',   status: 'active' },
  { id: 2, name: 'Sarah Putri',    email: 'sarah@helix.com',   role: 'Editor',  status: 'active' },
  { id: 3, name: 'Budi Santoso',   email: 'budi@helix.com',    role: 'Viewer',  status: 'pending' },
  { id: 4, name: 'Dewi Rahayu',    email: 'dewi@helix.com',    role: 'Editor',  status: 'inactive' },
  { id: 5, name: 'Andi Wijaya',    email: 'andi@helix.com',    role: 'Viewer',  status: 'active' },
];

const basicColumns: Column<User>[] = [
  { key: 'name',  header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role',  header: 'Role' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'secondary'> = {
  active: 'success', pending: 'warning', inactive: 'secondary',
};

const richColumns: Column<User>[] = [
  { key: 'name',  header: 'Name',  render: row => <strong style={{ fontFamily: 'Rubik, sans-serif', fontSize: 13 }}>{row.name}</strong> },
  { key: 'email', header: 'Email', render: row => <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#828282' }}>{row.email}</span> },
  { key: 'role',  header: 'Role',  align: 'center', render: row => <Badge variant="outline" label={row.role} /> },
  {
    key: 'status', header: 'Status', align: 'center',
    render: row => <Badge variant="default" color={statusVariant[row.status]} label={row.status} />,
  },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      {children}
    </div>
  );
}

export function TableSection() {
  return (
    <PageLayout
      category="Components"
      title="Table"
      description="Tables display structured data in rows and columns. They support striped rows, hover highlighting, cell borders, and fully custom cell renderers."
      tocItems={toc}
    >
      <Section id="table-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Align data types', body: 'Left-align text, right-align numbers, and centre-align status badges. Consistent alignment speeds up scanning.' },
            { heading: 'Keep columns focused', body: 'Show only the columns the user needs for the primary task. Use a detail panel or drill-down for secondary data.' },
            { heading: 'Handle empty states', body: 'Always provide a meaningful empty-state message. "No data" tells users the table worked, not that there\'s an error.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="table-basic" title="Basic Table">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Pass <code>columns</code> and <code>data</code> to render a basic table. Column values are derived from the row's matching key by default.
        </p>
        <Table columns={basicColumns} data={users} getRowKey={r => r.id} />
      </Section>

      <Section id="table-options" title="Options">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          <code>striped</code>, <code>hoverable</code>, <code>bordered</code>, <code>cellBorders</code>, and size <code>sm</code> / <code>md</code>.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <DemoCard title="striped + size=sm">
            <Table columns={basicColumns} data={users} striped size="sm" getRowKey={r => r.id} />
          </DemoCard>
          <DemoCard title="cellBorders">
            <Table columns={basicColumns} data={users} cellBorders getRowKey={r => r.id} />
          </DemoCard>
          <DemoCard title="Empty state">
            <Table columns={basicColumns} data={[]} emptyText="No team members found." />
          </DemoCard>
        </div>
      </Section>

      <Section id="table-custom" title="Custom Cells">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Use the <code>render</code> function on each column to return any React node — badges, buttons, avatars, etc.
        </p>
        <Table columns={richColumns} data={users} getRowKey={r => r.id} />
      </Section>
    </PageLayout>
  );
}

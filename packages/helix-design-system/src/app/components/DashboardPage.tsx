import { useState } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { Avatar, Table } from '../../components';
import type { Column } from '../../components';
import { Bell, X } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  /** icon shape: 'rect' | 'circle' */
  iconShape: 'rect' | 'circle';
}

interface ActivityRow {
  id: string;
  sampleId: string;
  analysisType: string;
  status: 'Selesai' | 'Diproses' | 'Menunggu';
  date: string;
  report: string | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard',    iconShape: 'rect'   },
  { id: 'sampel',    label: 'Sampel Saya',  iconShape: 'rect'   },
  { id: 'analisis',  label: 'Analisis',     iconShape: 'rect'   },
  { id: 'laporan',   label: 'Laporan',      iconShape: 'rect'   },
  { id: 'kit',       label: 'Kit BiomeSeq', iconShape: 'rect'   },
];

const ACTIVITY_DATA: ActivityRow[] = [
  { id: '1', sampleId: 'NUS-2026-001', analysisType: '16S rRNA Metagenomik', status: 'Selesai',  date: '28 Apr 2026', report: 'Lihat Laporan' },
  { id: '2', sampleId: 'NUS-2026-002', analysisType: 'Shotgun Sequencing',   status: 'Diproses', date: '27 Apr 2026', report: null },
  { id: '3', sampleId: 'NUS-2026-003', analysisType: 'Resistome Analysis',   status: 'Menunggu', date: '26 Apr 2026', report: null },
  { id: '4', sampleId: 'NUS-2026-004', analysisType: '16S rRNA Metagenomik', status: 'Selesai',  date: '24 Apr 2026', report: 'Lihat Laporan' },
];

const STATUS_CONFIG = {
  Selesai:  { bg: '#ECFDF0', color: '#22C55E' },
  Diproses: { bg: '#EFF3FF', color: '#3C82F6' },
  Menunggu: { bg: '#FFF3E6', color: '#F57E20' },
};

const STAT_CARDS = [
  { label: 'Total Sampel',    value: '24',  sub: '+3 bulan ini',        accentColor: '#F57E20', circleBg: '#FFF3E6' },
  { label: 'Analisis Aktif',  value: '7',   sub: '2 menunggu hasil',    accentColor: '#3C82F6', circleBg: '#EFF3FF' },
  { label: 'Laporan Selesai', value: '12',  sub: 'Terakhir 3 hari lalu',accentColor: '#22C55E', circleBg: '#ECFDF0' },
  { label: 'Kredit Tersisa',  value: '850', sub: 'Dari 1.000 kredit',   accentColor: '#A855F7', circleBg: '#FAF5FF' },
];

// ─── Activity columns ─────────────────────────────────────────────────────────

const COLUMNS: Column<ActivityRow>[] = [
  {
    key: 'sampleId',
    header: 'ID Sampel',
    width: 160,
    render: row => (
      <span style={{ fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 13, color: '#111827' }}>
        {row.sampleId}
      </span>
    ),
  },
  {
    key: 'analysisType',
    header: 'Jenis Analisis',
    render: row => (
      <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#111827' }}>
        {row.analysisType}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    width: 130,
    render: row => {
      const cfg = STATUS_CONFIG[row.status];
      return (
        <span style={{
          display: 'inline-flex', alignItems: 'center',
          padding: '3px 12px', borderRadius: 999,
          backgroundColor: cfg.bg,
          color: cfg.color,
          fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 12,
        }}>
          {row.status}
        </span>
      );
    },
  },
  {
    key: 'date',
    header: 'Tanggal',
    width: 140,
    render: row => (
      <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#6B7280' }}>
        {row.date}
      </span>
    ),
  },
  {
    key: 'report',
    header: 'Laporan',
    render: row => row.report ? (
      <button style={{
        background: 'none', border: 'none', padding: 0, cursor: 'pointer',
        fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#F57E20',
      }}>
        Lihat Laporan →
      </button>
    ) : (
      <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#9CA3AF' }}>—</span>
    ),
  },
];

// ─── Sidebar icon ─────────────────────────────────────────────────────────────

function SidebarIcon({ shape, active }: { shape: 'rect' | 'circle'; active: boolean }) {
  const color = active ? '#F57E20' : '#6B7280';
  if (shape === 'circle') {
    return (
      <div style={{
        width: 18, height: 18, borderRadius: '50%',
        backgroundColor: color, flexShrink: 0,
      }} />
    );
  }
  return (
    <div style={{
      width: 18, height: 18, borderRadius: 4,
      backgroundColor: color, flexShrink: 0,
    }} />
  );
}

// ─── Sidebar nav item ─────────────────────────────────────────────────────────

function SidebarNavItem({
  item, active, onClick,
}: {
  item: NavItem; active: boolean; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex', alignItems: 'center', gap: 12,
        width: '100%', height: 48,
        padding: '0 24px',
        border: 'none', cursor: 'pointer',
        backgroundColor: active ? '#FFF3E6' : hovered ? '#F9FAFB' : 'transparent',
        color: active ? '#F57E20' : '#6B7280',
        fontFamily: 'var(--font-family-body)',
        fontWeight: active ? 500 : 400,
        fontSize: 14,
        transition: 'background-color 0.15s, color 0.15s',
        textAlign: 'left',
      }}
    >
      {active && (
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 3, backgroundColor: '#F57E20',
          borderRadius: '0 2px 2px 0',
        }} />
      )}
      <SidebarIcon shape={item.iconShape} active={active} />
      {item.label}
    </button>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, accentColor, circleBg }: typeof STAT_CARDS[0]) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: 12,
      boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
      overflow: 'hidden',
      flex: 1,
      minWidth: 0,
    }}>
      {/* Colored top bar — 4px */}
      <div style={{ height: 4, backgroundColor: accentColor }} />

      <div style={{ padding: '20px 20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
          {/* Big number */}
          <span style={{
            fontFamily: 'Quicksand, Rubik, sans-serif',
            fontWeight: 700, fontSize: 36,
            color: '#111827', lineHeight: 1,
          }}>
            {value}
          </span>

          {/* Ellipse circle + rectangle icon inside */}
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            backgroundColor: circleBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: 4,
              backgroundColor: accentColor,
            }} />
          </div>
        </div>

        {/* Label */}
        <p style={{ margin: '0 0 4px', fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#6B7280' }}>
          {label}
        </p>

        {/* Sub text */}
        <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: accentColor, fontWeight: 500 }}>
          {sub}
        </p>
      </div>
    </div>
  );
}

// ─── Welcome Dialog ───────────────────────────────────────────────────────────

function WelcomeDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <RadixDialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            backgroundColor: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease',
          }}
        />
        <RadixDialog.Content
          style={{
            position: 'fixed', zIndex: 201,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 480,
            backgroundColor: 'white',
            borderRadius: 16,
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            outline: 'none',
          }}
        >
          {/* Orange gradient header */}
          <div style={{
            background: 'linear-gradient(135deg, #F57E20 0%, #F9A84D 100%)',
            padding: '32px 32px 28px',
            position: 'relative',
          }}>
            {/* Icon circle */}
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 16,
            }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: 'white' }} />
            </div>

            <RadixDialog.Title style={{
              margin: 0,
              fontFamily: 'Quicksand, Rubik, sans-serif',
              fontWeight: 700, fontSize: 22, color: 'white',
              lineHeight: 1.3,
            }}>
              Selamat datang kembali,<br />Dr. Andi! 👋
            </RadixDialog.Title>

            <RadixDialog.Close
              style={{
                position: 'absolute', top: 16, right: 16,
                background: 'rgba(255,255,255,0.2)', border: 'none',
                borderRadius: '50%', width: 32, height: 32,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'white',
              }}
            >
              <X size={16} />
            </RadixDialog.Close>
          </div>

          {/* Body */}
          <div style={{ padding: '28px 32px 32px' }}>
            <p style={{
              margin: '0 0 20px',
              fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#6B7280',
              lineHeight: 1.7,
            }}>
              Platform riset mikrobiom Anda siap digunakan. Berikut yang bisa Anda lakukan hari ini:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {[
                { accentColor: '#F57E20', bg: '#FFF3E6', text: 'Daftarkan sampel baru untuk analisis metagenomik' },
                { accentColor: '#3C82F6', bg: '#EFF3FF', text: 'Pantau 7 analisis yang sedang berjalan'           },
                { accentColor: '#22C55E', bg: '#ECFDF0', text: 'Unduh 12 laporan yang telah selesai'              },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    backgroundColor: item.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <div style={{ width: 16, height: 16, borderRadius: 3, backgroundColor: item.accentColor }} />
                  </div>
                  <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#374151' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              style={{
                width: '100%', height: 48,
                backgroundColor: '#F57E20',
                color: 'white', border: 'none',
                borderRadius: 8, cursor: 'pointer',
                fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 14,
                transition: 'background-color 0.15s',
                boxShadow: '0 4px 14px rgba(245,126,32,0.35)',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#E06E10')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#F57E20')}
            >
              Mulai Eksplorasi →
            </button>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

// ─── Main DashboardPage ───────────────────────────────────────────────────────

export function DashboardPage() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      backgroundColor: '#F6F7F9',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-family-body)',
    }}>

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <header style={{
        height: 72, flexShrink: 0,
        backgroundColor: 'white',
        borderBottom: '1px solid #E5E8ED',
        display: 'flex', alignItems: 'center',
        padding: '0 32px 0 32px',
        position: 'relative', zIndex: 10,
      }}>
        {/* Brand text — "nusantics" only, no SVG mark */}
        <div style={{ width: 176, flexShrink: 0 }}>
          <span style={{
            fontFamily: 'var(--font-family-heading)',
            fontWeight: 700, fontSize: 22,
            color: '#F57E20',
            letterSpacing: '-0.3px',
          }}>
            nusantics
          </span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Right: bell + divider + user */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Notification bell — 36×36 */}
          <button style={{
            width: 36, height: 36, borderRadius: 8,
            backgroundColor: '#F6F7F9', border: '1px solid #E5E8ED',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', position: 'relative',
            flexShrink: 0,
          }}>
            <Bell size={16} color="#6B7280" />
            {/* Notification dot */}
            <span style={{
              position: 'absolute', top: 7, right: 7,
              width: 7, height: 7, borderRadius: '50%',
              backgroundColor: '#F57E20',
              border: '1.5px solid white',
            }} />
          </button>

          {/* Vertical divider — 1×32px */}
          <div style={{ width: 1, height: 32, backgroundColor: '#E5E8ED', flexShrink: 0 }} />

          {/* User section — name + Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontFamily: 'var(--font-family-body)',
              fontWeight: 500, fontSize: 14,
              color: '#111827',
            }}>
              Dr. Andi Firmansyah
            </span>
            <Avatar size="md" initials="AF" />
          </div>
        </div>
      </header>

      {/* ── Body: sidebar + main ───────────────────────────────── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── Sidebar ──────────────────────────────────────────── */}
        <aside style={{
          width: 240, flexShrink: 0,
          backgroundColor: 'white',
          borderRight: '1px solid #E5E8ED',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
        }}>
          <div style={{ paddingTop: 28 }}>
            {/* "MENU" label */}
            <p style={{
              margin: '0 0 8px 24px',
              fontFamily: 'var(--font-family-body)',
              fontWeight: 500, fontSize: 11,
              color: '#6B7280',
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
            }}>
              MENU
            </p>

            {NAV_ITEMS.map(item => (
              <SidebarNavItem
                key={item.id}
                item={item}
                active={activeNav === item.id}
                onClick={() => setActiveNav(item.id)}
              />
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {/* Bottom: separator + Pengaturan */}
          <div style={{ paddingBottom: 16 }}>
            <div style={{ height: 1, backgroundColor: '#E5E8ED', margin: '0 24px 8px' }} />
            <SidebarNavItem
              item={{ id: 'settings', label: 'Pengaturan', iconShape: 'circle' }}
              active={activeNav === 'settings'}
              onClick={() => setActiveNav('settings')}
            />
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────────────── */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '40px 40px 60px' }}>

          {/* Page header */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{
              margin: '0 0 6px',
              fontFamily: 'Quicksand, Rubik, sans-serif',
              fontWeight: 700, fontSize: 26, color: '#111827',
              letterSpacing: '-0.3px',
            }}>
              Selamat datang kembali, Dr. Andi!
            </h1>
            <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#6B7280' }}>
              Berikut ringkasan aktivitas riset Anda di platform Nusantics.
            </p>
          </div>

          {/* Stat cards row */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
            {STAT_CARDS.map(card => (
              <StatCard key={card.label} {...card} />
            ))}
          </div>

          {/* Activity section header */}
          <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{
              margin: 0,
              fontFamily: 'Quicksand, Rubik, sans-serif',
              fontWeight: 700, fontSize: 18, color: '#111827',
            }}>
              Aktivitas Terbaru
            </h2>
            <button style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              fontFamily: 'var(--font-family-body)', fontSize: 13,
              color: '#F57E20', fontWeight: 500,
            }}>
              Lihat semua →
            </button>
          </div>

          {/* Activity table */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: 12,
            boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
            overflow: 'hidden',
          }}>
            <Table
              columns={COLUMNS}
              data={ACTIVITY_DATA}
              getRowKey={r => r.id}
              bordered={false}
              style={{ borderRadius: 0 }}
            />
          </div>
        </main>
      </div>

      {/* ── Welcome popup ────────────────────────────────────────── */}
      <WelcomeDialog open={showWelcome} onClose={() => setShowWelcome(false)} />

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  );
}

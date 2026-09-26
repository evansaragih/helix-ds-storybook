import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { Info, Lock, TriangleAlert, Eraser } from 'lucide-react';
import {
  Dialog,
  Stepper,
  Table,
  Alert,
  Select,
  Input,
  Badge,
  Button,
  Accordion,
  AlertDialog,
  Tooltip,
  TooltipProvider,
} from 'helix-design-system/components';
import type { Column } from 'helix-design-system/components';
import { Tag } from '../../../packages/helix-design-system/src/components/Tag';

/* ────────────────────────────────────────────────────────────────────────
 * Prototypes / Testing Round Modal — "Dense results matrix" direction
 *
 * A single, compact matrix is the whole modal. Every disease target is one
 * row; Round 1 sits inline as a locked, muted column so it stays visible
 * while Round 2 is entered right beside it. Round 2 values are set with
 * quick-fill chips (Angka · Neg. · N/A · Undet.) instead of a long stack of
 * free-text fields, and a bulk-fill toolbar sets every active target at once.
 * Which disease groups are editable is driven live by the retest Tag chips.
 * Saving is a deliberate, irreversible commit gated by an AlertDialog.
 * ──────────────────────────────────────────────────────────────────────── */

const SAMPLE_ID = 'NUS-SK001-260603-Q0A';

const ANALYSTS = [
  { value: 'dewi', label: 'Dewi Lestari' },
  { value: 'rahmat', label: 'Rahmat Hidayat' },
  { value: 'siti', label: 'Siti Nurhaliza' },
  { value: 'budi', label: 'Budi Santoso' },
];

const REASONS = [
  { value: 'inkonklusif', label: 'Hasil Round 1 inkonklusif' },
  { value: 'ic-gagal', label: 'Kontrol internal (IC) gagal' },
  { value: 'kontaminasi', label: 'Dugaan kontaminasi sampel' },
  { value: 'verifikasi', label: 'Permintaan verifikasi ulang' },
  { value: 'ambang', label: 'Nilai Ct di ambang batas' },
];

interface TargetDef {
  id: string;
  label: string;
  ic: boolean;
}
interface DiseaseDef {
  id: string;
  label: string;
  targets: TargetDef[];
}

const DISEASES: DiseaseDef[] = [
  {
    id: 'AHPND',
    label: 'AHPND',
    targets: [
      { id: 'pirA', label: 'Pir A', ic: false },
      { id: 'pirB', label: 'Pir B', ic: false },
      { id: 'ahpndIC', label: 'AHPND IC', ic: true },
    ],
  },
  {
    id: 'EHP',
    label: 'EHP',
    targets: [
      { id: 'ehp', label: 'EHP', ic: false },
      { id: 'ehpIC', label: 'EHP IC', ic: true },
    ],
  },
  {
    id: 'WSSV',
    label: 'WSSV',
    targets: [
      { id: 'wssv', label: 'WSSV', ic: false },
      { id: 'wssvIC', label: 'WSSV IC', ic: true },
    ],
  },
];

// Round 1 is saved with every target = N/A.
const ROUND1: Record<string, string> = Object.fromEntries(
  DISEASES.flatMap((d) => d.targets.map((t) => [t.id, 'N/A'])),
);

type CellMode = '' | 'num' | 'neg' | 'na' | 'undet';
interface Cell {
  mode: CellMode;
  num: string;
}

interface Row {
  key: string;
  diseaseId: string;
  diseaseLabel: string;
  firstInGroup: boolean;
  groupSize: number;
  target: TargetDef;
}

const ROWS: Row[] = DISEASES.flatMap((d) =>
  d.targets.map((t, ti) => ({
    key: t.id,
    diseaseId: d.id,
    diseaseLabel: d.label,
    firstInGroup: ti === 0,
    groupSize: d.targets.length,
    target: t,
  })),
);

/* Resolve a stored cell to its display string, or null if unset. */
function cellText(cell: Cell): string | null {
  switch (cell.mode) {
    case 'neg':
      return 'Neg.';
    case 'na':
      return 'N/A';
    case 'undet':
      return 'Undet.';
    case 'num':
      return cell.num.trim() ? `${cell.num.trim()} Ct` : null;
    default:
      return null;
  }
}

/* ─── Quick-fill chip ──────────────────────────────────────────────── */
function Chip({
  active,
  disabled,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      size="xs"
      pill
      variant={active ? 'primary-subtle' : 'ghost-neutral'}
      disabled={disabled}
      onClick={onClick}
      style={
        active
          ? undefined
          : { border: '1px solid var(--color-stroke-subtle, #EEEEEE)' }
      }
    >
      {children}
    </Button>
  );
}

const EMPTY_CELLS: Record<string, Cell> = Object.fromEntries(
  ROWS.map((r) => [r.key, { mode: '', num: '' } as Cell]),
);

function TestingRoundModal() {
  const [open, setOpen] = useState(true);
  const [petugas, setPetugas] = useState('');
  const [alasan, setAlasan] = useState('');
  const [active, setActive] = useState<Record<string, boolean>>({
    AHPND: true,
    EHP: true,
    WSSV: true,
  });
  const [cells, setCells] = useState<Record<string, Cell>>(EMPTY_CELLS);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [ack, setAck] = useState(false);
  const [saved, setSaved] = useState(false);

  const setCell = (id: string, patch: Partial<Cell>) =>
    setCells((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));

  const isActive = (diseaseId: string) => active[diseaseId];

  // Bulk-fill every active target with a single preset (or clear it).
  const bulkFill = (mode: CellMode) =>
    setCells((prev) => {
      const next = { ...prev };
      for (const r of ROWS) {
        if (!isActive(r.diseaseId)) continue;
        if (mode === 'undet' && !r.target.ic) continue; // Undet. only valid for IC
        next[r.key] = { mode, num: '' };
      }
      return next;
    });

  const activeRows = ROWS.filter((r) => isActive(r.diseaseId));
  const filledCount = activeRows.filter((r) => cellText(cells[r.key])).length;
  const allFilled = activeRows.length > 0 && filledCount === activeRows.length;
  const valid =
    !!petugas && !!alasan && Object.values(active).some(Boolean) && allFilled;

  const stepStatus = saved ? 2 : 1;

  const analystName =
    ANALYSTS.find((a) => a.value === petugas)?.label ?? '—';
  const reasonName = REASONS.find((r) => r.value === alasan)?.label ?? '—';

  /* ─── Matrix columns ─────────────────────────────────────────────── */
  const columns: Column<Row>[] = useMemo(
    () => [
      {
        key: 'penyakit',
        header: 'Penyakit',
        width: 104,
        render: (row) => {
          if (!row.firstInGroup) return null;
          const on = isActive(row.diseaseId);
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  fontWeight: 500,
                  fontSize: 13,
                  color: on
                    ? 'var(--color-text-primary, #14141E)'
                    : 'var(--color-text-muted, #9F9F9F)',
                }}
              >
                {row.diseaseLabel}
              </span>
              <Badge
                size="sm"
                variant={on ? 'brand-subtle' : 'gray'}
                label={on ? 'Diuji ulang' : 'Dilewati'}
              />
            </div>
          );
        },
      },
      {
        key: 'target',
        header: 'Target',
        width: 96,
        render: (row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                fontSize: 13,
                color: isActive(row.diseaseId)
                  ? 'var(--color-text-primary, #14141E)'
                  : 'var(--color-text-muted, #9F9F9F)',
              }}
            >
              {row.target.label}
            </span>
            {row.target.ic && (
              <Badge size="sm" variant="outline" label="IC" />
            )}
          </div>
        ),
      },
      {
        key: 'round1',
        align: 'center',
        width: 74,
        header: (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              justifyContent: 'center',
            }}
          >
            <span>Round 1</span>
            <Tooltip content="Round 1 sudah tersimpan & terkunci — tidak bisa diubah atau dihapus.">
              <span style={{ display: 'flex', cursor: 'help' }}>
                <Lock size={11} color="var(--color-text-tertiary, #828282)" />
              </span>
            </Tooltip>
          </div>
        ),
        render: (row) => (
          <span
            style={{
              fontSize: 12,
              color: 'var(--color-text-muted, #9F9F9F)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {ROUND1[row.key]}
          </span>
        ),
      },
      {
        key: 'round2',
        header: saved ? 'Round 2' : 'Round 2 (isi)',
        render: (row) => {
          const cell = cells[row.key];
          const on = isActive(row.diseaseId);

          if (!on) {
            return (
              <span
                style={{
                  fontSize: 12,
                  fontStyle: 'italic',
                  color: 'var(--color-text-muted, #9F9F9F)',
                }}
              >
                — tidak diuji ulang —
              </span>
            );
          }

          // After save: read-only value, immutable.
          if (saved) {
            const txt = cellText(cell);
            return (
              <Badge
                size="md"
                variant={txt ? 'green' : 'gray'}
                label={txt ?? '—'}
              />
            );
          }

          return (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 4,
                width: 236,
              }}
            >
              <Chip
                active={cell.mode === 'num'}
                onClick={() => setCell(row.key, { mode: 'num' })}
              >
                Angka
              </Chip>
              {cell.mode === 'num' && (
                <div style={{ width: 92, flexShrink: 0 }}>
                  <Input
                    size="xs"
                    value={cell.num}
                    onChange={(e) =>
                      setCell(row.key, { mode: 'num', num: e.target.value })
                    }
                    placeholder="Ct"
                    inputMode="decimal"
                    trailingContent={<span style={{ fontSize: 11 }}>Ct</span>}
                  />
                </div>
              )}
              <Chip
                active={cell.mode === 'neg'}
                onClick={() => setCell(row.key, { mode: 'neg', num: '' })}
              >
                Neg.
              </Chip>
              <Chip
                active={cell.mode === 'na'}
                onClick={() => setCell(row.key, { mode: 'na', num: '' })}
              >
                N/A
              </Chip>
              {row.target.ic && (
                <Chip
                  active={cell.mode === 'undet'}
                  onClick={() => setCell(row.key, { mode: 'undet', num: '' })}
                >
                  Undet.
                </Chip>
              )}
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cells, active, saved],
  );

  return (
    <TooltipProvider>
      {!open && (
        <Button onClick={() => setOpen(true)}>Buka Testing Round Modal</Button>
      )}

      <Dialog
        open={open}
        onOpenChange={setOpen}
        size="lg"
        title={`Testing Round 2 — ${SAMPLE_ID}`}
        description="Panel AHPND · EHP · WSSV — Round 2 dari maks. 2 round"
        footer={
          saved ? (
            <Button size="sm" onClick={() => setOpen(false)}>
              Tutup
            </Button>
          ) : (
            <>
              <span
                style={{
                  marginRight: 'auto',
                  fontSize: 12,
                  color: valid
                    ? 'var(--color-text-success, #12843C)'
                    : 'var(--color-text-tertiary, #828282)',
                }}
              >
                {activeRows.length === 0
                  ? 'Pilih minimal satu penyakit untuk diuji ulang'
                  : `${filledCount}/${activeRows.length} target terisi`}
              </span>
              <Button
                variant="neutral"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Batal
              </Button>
              <Button
                size="sm"
                disabled={!valid}
                onClick={() => {
                  setAck(false);
                  setConfirmOpen(true);
                }}
              >
                Simpan Round 2
              </Button>
            </>
          )
        }
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxHeight: '68vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingRight: 4,
          }}
        >
          {/* Progress: Round 1 done → Round 2 */}
          <Stepper
            steps={[
              { id: 'r1', label: 'Round 1', description: 'Tersimpan' },
              {
                id: 'r2',
                label: 'Round 2',
                description: saved ? 'Tersimpan' : 'Sedang diisi',
              },
            ]}
            activeStep={stepStatus}
          />

          {/* Single merged notice */}
          {saved ? (
            <Alert
              variant="success"
              title="Round 2 tersimpan & terkunci"
              description="Sample tercatat sebagai retest (bukan First Time Right) di Lab KPI PathoCheck. Round yang tersimpan tidak bisa diedit maupun dihapus."
            />
          ) : (
            <Alert
              variant="warning"
              title="Retest — sample tidak First Time Right (FTR)"
              description="Menambah Round 2 menandai sample ini bukan FTR. Retest menurunkan skor FTR lab & tercatat di Lab KPI PathoCheck. Maks. 2 round per sample."
            />
          )}

          {/* Config bar — analyst + reason + retest scope */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
              backgroundColor: 'var(--color-container-secondary, #F7F7F7)',
            }}
          >
            {saved ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                }}
              >
                <ReadOnlyField label="Petugas lab" value={analystName} />
                <ReadOnlyField label="Alasan retest" value={reasonName} />
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                }}
              >
                <Select
                  label="Petugas lab"
                  required
                  size="sm"
                  placeholder="Pilih analis…"
                  options={ANALYSTS}
                  value={petugas}
                  onValueChange={setPetugas}
                />
                <Select
                  label="Alasan retest"
                  required
                  size="sm"
                  placeholder="Pilih alasan…"
                  options={REASONS}
                  value={alasan}
                  onValueChange={setAlasan}
                />
              </div>
            )}

            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: 'var(--color-text-primary, #14141E)',
                }}
              >
                Penyakit yang diuji ulang
              </span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {DISEASES.map((d) => (
                  <Tag
                    key={d.id}
                    label={d.label}
                    checkbox={!saved}
                    checked={active[d.id]}
                    status={saved}
                    statusColor={
                      active[d.id]
                        ? 'var(--color-text-success, #12843C)'
                        : 'var(--color-text-muted, #9F9F9F)'
                    }
                    onCheckedChange={
                      saved
                        ? undefined
                        : (c) =>
                            setActive((prev) => ({ ...prev, [d.id]: c }))
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bulk quick-fill toolbar */}
          {!saved && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: 'var(--color-text-tertiary, #828282)',
                }}
              >
                Isi cepat target aktif:
              </span>
              <Button
                size="xs"
                variant="secondary-outline"
                disabled={activeRows.length === 0}
                onClick={() => bulkFill('neg')}
              >
                Semua Neg.
              </Button>
              <Button
                size="xs"
                variant="secondary-outline"
                disabled={activeRows.length === 0}
                onClick={() => bulkFill('na')}
              >
                Semua N/A
              </Button>
              <Button
                size="xs"
                variant="ghost-neutral"
                leadingIcon={<Eraser size={12} />}
                disabled={activeRows.length === 0}
                onClick={() => bulkFill('')}
              >
                Bersihkan
              </Button>
            </div>
          )}

          {/* The dense matrix */}
          <Table<Row>
            columns={columns}
            data={ROWS}
            size="sm"
            cellBorders
            hoverable={false}
            getRowKey={(r) => r.key}
          />

          {/* One shared format legend (replaces per-field hints) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              color: 'var(--color-text-tertiary, #828282)',
            }}
          >
            <Info size={13} />
            <span>
              Format nilai: Angka (Ct) · Neg. · N/A. Kolom IC juga menerima
              Undet.
            </span>
          </div>

          {/* Data-entry policy tucked into an accordion */}
          <Accordion
            accordionStyle="border"
            items={[
              {
                id: 'kebijakan',
                title: 'Kebijakan disiplin entri data',
                content: (
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 18,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      fontSize: 13,
                      lineHeight: '19.2px',
                      color: 'var(--color-text-secondary, #49494A)',
                    }}
                  >
                    <li>Maksimal 2 testing round per sample.</li>
                    <li>
                      Round yang sudah tersimpan tidak bisa diedit maupun
                      dihapus.
                    </li>
                    <li>
                      Perbaikan hasil Round 1 hanya lewat Round 2 ini.
                    </li>
                    <li>Pastikan input sudah benar sebelum menyimpan.</li>
                  </ul>
                ),
              },
            ]}
          />
        </div>
      </Dialog>

      {/* Irreversible-save confirmation */}
      <AlertDialog
        open={confirmOpen}
        variant="default"
        title="Simpan Round 2?"
        description="Round yang tersimpan tidak bisa diedit atau dihapus. Pastikan semua nilai Round 2 sudah benar."
        icon={<TriangleAlert size={22} />}
        checkboxAction={{
          label: 'Saya sudah memeriksa ulang semua nilai',
          checked: ack,
          onChange: setAck,
        }}
        confirmAction={{
          label: 'Ya, simpan',
          onClick: () => {
            if (!ack) return;
            setSaved(true);
            setConfirmOpen(false);
          },
        }}
        cancelAction={{
          label: 'Periksa lagi',
          onClick: () => setConfirmOpen(false),
        }}
        onClose={() => setConfirmOpen(false)}
      />
    </TooltipProvider>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span
        style={{ fontSize: 13, color: 'var(--color-text-tertiary, #828282)' }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--color-text-primary, #14141E)',
        }}
      >
        {value}
      </span>
    </div>
  );
}

const meta = {
  title: 'Prototypes/Testing Round Modal/C · Dense Matrix',
  component: TestingRoundModal,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TestingRoundModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DenseResultsMatrix: Story = {};

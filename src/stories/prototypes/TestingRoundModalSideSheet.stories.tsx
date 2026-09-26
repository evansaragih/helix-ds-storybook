import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Sheet,
  Stepper,
  Table,
  Alert,
  AlertDialog,
  Select,
  Input,
  Badge,
  Button,
  Accordion,
  Tooltip,
  TooltipProvider,
  Divider,
} from 'helix-design-system/components';
import type { Column } from 'helix-design-system/components';
import { Tag } from '../../../packages/helix-design-system/src/components/Tag';
import { Lock, Info, FlaskConical, CalendarClock, Plus } from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
 * Prototypes / Testing Round Modal — "Side sheet timeline" direction
 *
 * The Testing Round editor is re-cast as a RIGHT-SIDE SHEET so the sample
 * page stays in view behind it, and the two rounds are stacked as a vertical
 * TIMELINE: Round 1 is a locked, read-only card that stays visible while the
 * user fills in Round 2 directly beneath it.
 *
 * Deliberately different from the tabs + 4-column-table + sticky-checkbox
 * proposal:
 *   · a side Sheet, not a centered Dialog
 *   · a timeline (locked card → active card), not Round 1 / Round 2 tabs
 *   · Round 1 stays on screen as its own locked card + inline "R1 ·" refs
 *     next to every Round 2 field (no comparison table)
 *   · ONE merged retest warning Alert (was two stacked notices)
 *   · ONE format legend for the whole form (was a hint under every field)
 *   · result fields collapse per disease and only appear for diseases the
 *     user actually re-tests (was one long vertical form)
 *   · a save confirmation AlertDialog with the "sudah cek ulang" ack
 *     (was an inline sticky-footer checkbox)
 * ────────────────────────────────────────────────────────────────────────── */

const SAMPLE_ID = 'NUS-SK001-260603-Q0A';

type DiseaseId = 'AHPND' | 'EHP' | 'WSSV';

interface Target {
  key: string;
  label: string;
  ic: boolean;
}

const DISEASES: { id: DiseaseId; label: string; targets: Target[] }[] = [
  {
    id: 'AHPND',
    label: 'AHPND',
    targets: [
      { key: 'pirA', label: 'Pir A', ic: false },
      { key: 'pirB', label: 'Pir B', ic: false },
      { key: 'ahpndIC', label: 'AHPND IC', ic: true },
    ],
  },
  {
    id: 'EHP',
    label: 'EHP',
    targets: [
      { key: 'ehp', label: 'EHP', ic: false },
      { key: 'ehpIC', label: 'EHP IC', ic: true },
    ],
  },
  {
    id: 'WSSV',
    label: 'WSSV',
    targets: [
      { key: 'wssv', label: 'WSSV', ic: false },
      { key: 'wssvIC', label: 'WSSV IC', ic: true },
    ],
  },
];

type ValueMap = Record<string, string>;

// Round 1 is saved with every value N/A.
const ROUND1: ValueMap = {
  pirA: 'N/A', pirB: 'N/A', ahpndIC: 'N/A',
  ehp: 'N/A', ehpIC: 'N/A',
  wssv: 'N/A', wssvIC: 'N/A',
};

const ANALYSTS = [
  { value: 'rina', label: 'Rina Hapsari' },
  { value: 'dimas', label: 'Dimas Prabowo' },
  { value: 'yuni', label: 'Yuni Kartika' },
  { value: 'agus', label: 'Agus Santoso' },
];

const REASONS = [
  { value: 'ic-invalid', label: 'IC invalid / kontrol gagal' },
  { value: 'inconclusive', label: 'Hasil inconclusive' },
  { value: 'contamination', label: 'Dugaan kontaminasi' },
  { value: 'client-request', label: 'Permintaan klien' },
  { value: 'requalify', label: 'Requalify borderline Ct' },
];

/* ─── small token-styled helpers ──────────────────────────────────────────── */

const heading = 'var(--font-family-heading, Quicksand), sans-serif';
const body = 'var(--font-family-body), sans-serif';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      margin: 0,
      fontFamily: body,
      fontWeight: 500,
      fontSize: 13,
      lineHeight: '19.2px',
      color: 'var(--color-text-primary)',
      letterSpacing: '-0.01px',
    }}>
      {children}
    </p>
  );
}

/** Read-only summary of a saved round, rendered as a Table. */
function RoundResultTable({ values }: { values: ValueMap }) {
  interface Row { penyakit: string; target: string; hasil: string }
  const rows: Row[] = DISEASES.flatMap((d) =>
    d.targets.map((t) => ({ penyakit: d.label, target: t.label, hasil: values[t.key] ?? '—' })),
  );
  const columns: Column<Row>[] = [
    {
      key: 'penyakit',
      header: 'Penyakit',
      render: (r, i) =>
        // only print the disease name on its first target row
        i > 0 && rows[i - 1].penyakit === r.penyakit
          ? ''
          : <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{r.penyakit}</span>,
    },
    { key: 'target', header: 'Target' },
    {
      key: 'hasil',
      header: 'Hasil',
      align: 'right',
      render: (r) => {
        const neg = r.hasil.toLowerCase() === 'neg.' || r.hasil.toLowerCase() === 'neg';
        const na = r.hasil.toUpperCase() === 'N/A';
        return (
          <span style={{
            fontFamily: body,
            fontWeight: 500,
            fontSize: 13,
            color: na ? 'var(--color-text-tertiary)'
              : neg ? 'var(--color-text-success, #12843C)'
              : 'var(--color-text-primary)',
          }}>
            {r.hasil || '—'}
          </span>
        );
      },
    },
  ];
  return (
    <Table<Row>
      columns={columns}
      data={rows}
      size="sm"
      hoverable={false}
      getRowKey={(r) => `${r.penyakit}-${r.target}`}
    />
  );
}

/** The circle marker + connector spine for one timeline node. */
function TimelineSpine({
  status,
  last = false,
}: {
  status: 'done' | 'active';
  last?: boolean;
}) {
  const done = status === 'done';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 32 }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        backgroundColor: done ? 'var(--color-text-success, #12843C)' : 'var(--color-brand-primary)',
        border: `2px solid ${done ? 'var(--color-text-success, #12843C)' : 'var(--color-brand-primary)'}`,
        color: '#FFFFFF',
      }}>
        {done
          ? <Lock size={14} strokeWidth={2.5} />
          : <FlaskConical size={15} strokeWidth={2.25} />}
      </div>
      {!last && (
        <div style={{
          width: 2, flex: 1, minHeight: 24, marginTop: 4, marginBottom: 4,
          backgroundColor: 'var(--color-stroke-subtle, #D7D7D7)',
        }} />
      )}
    </div>
  );
}

/* ─── the redesigned editor ────────────────────────────────────────────────── */

function TestingRoundEditor() {
  const [open, setOpen] = useState(true);

  // Round 2 draft state
  const [analyst, setAnalyst] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [retest, setRetest] = useState<Record<DiseaseId, boolean>>({
    AHPND: true, EHP: true, WSSV: true,
  });
  const [values, setValues] = useState<ValueMap>({});

  // Save flow
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [ack, setAck] = useState(false);
  const [round2Saved, setRound2Saved] = useState(false);

  const activeDiseases = useMemo(() => DISEASES.filter((d) => retest[d.id]), [retest]);

  const toggleDisease = (id: DiseaseId) =>
    setRetest((prev) => ({ ...prev, [id]: !prev[id] }));

  const setValue = (key: string, v: string) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  const handleSave = () => {
    if (!ack) return;
    setRound2Saved(true);
    setConfirmOpen(false);
    setAck(false);
  };

  /* Per-disease result groups (only for diseases being re-tested), collapsed
     into an Accordion so the form no longer runs as one long column. */
  const accordionItems = activeDiseases.map((d) => ({
    id: d.id,
    title: `${d.label} · ${d.targets.length} target`,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 4 }}>
        {d.targets.map((t) => {
          const quick = t.ic ? ['Neg.', 'N/A', 'Undetermined'] : ['Neg.', 'N/A'];
          const current = values[t.key] ?? '';
          return (
            <div key={t.key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontFamily: body, fontWeight: 500, fontSize: 13,
                  color: 'var(--color-text-primary)',
                }}>
                  {t.label}
                </span>
                {t.ic && (
                  <Tooltip content="Internal Control — nilai boleh Undetermined">
                    <span>
                      <Badge variant="gray" size="sm" label="IC" />
                    </span>
                  </Tooltip>
                )}
                {/* inline Round 1 reference so the saved value stays in view */}
                <span style={{
                  marginLeft: 'auto',
                  fontFamily: body, fontSize: 11, lineHeight: '15.6px',
                  color: 'var(--color-text-tertiary)',
                }}>
                  R1 · <span style={{ fontWeight: 500 }}>{ROUND1[t.key]}</span>
                </span>
              </div>
              <Input
                size="sm"
                value={current}
                placeholder={t.ic ? 'Ct / Neg. / N/A / Undetermined' : 'Ct / Neg. / N/A'}
                onChange={(e) => setValue(t.key, e.target.value)}
              />
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {quick.map((q) => (
                  <Tag
                    key={q}
                    size="sm"
                    label={q}
                    onClick={() => setValue(t.key, q)}
                    style={current === q
                      ? { borderColor: 'var(--color-brand-primary)', color: 'var(--color-brand-primary)' }
                      : undefined}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    ),
  }));

  const sheetFooter = round2Saved ? (
    <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Tutup</Button>
  ) : (
    <>
      <Button variant="neutral" size="sm" onClick={() => setOpen(false)}>Batal</Button>
      <Button
        variant="primary"
        size="sm"
        disabled={activeDiseases.length === 0 || !analyst || !reason}
        onClick={() => setConfirmOpen(true)}
      >
        Simpan Round 2
      </Button>
    </>
  );

  return (
    <TooltipProvider>
      {/* ── Sample page kept visible behind the sheet ──────────────────────── */}
      <SamplePageBackdrop onManage={() => setOpen(true)} />

      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        side="right"
        size={560}
        closeOnOverlayClick={false}
        title="Kelola Testing Round"
        description={`${SAMPLE_ID} · Panel AHPND, EHP, WSSV`}
        footer={sheetFooter}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Round progress — max 2 rounds */}
          <div style={{
            border: '1px solid var(--color-stroke-subtle, #D7D7D7)',
            borderRadius: 'var(--radius-lg, 8px)',
            padding: '16px 16px 12px',
            backgroundColor: 'var(--color-container-secondary, #F7F7F7)',
          }}>
            <Stepper
              steps={[
                { id: 'r1', label: 'Round 1', description: 'Tersimpan', status: 'completed' },
                {
                  id: 'r2',
                  label: 'Round 2',
                  description: round2Saved ? 'Tersimpan' : 'Sedang diisi',
                  status: round2Saved ? 'completed' : 'active',
                },
              ]}
            />
            <p style={{
              margin: '12px 0 0', fontFamily: body, fontSize: 12, lineHeight: '18px',
              color: 'var(--color-text-tertiary)',
            }}>
              Maks. 2 testing round per sample. Round yang tersimpan tidak bisa diedit maupun dihapus.
            </p>
          </div>

          {/* ── Node 1 — locked Round 1 ─────────────────────────────────────── */}
          <div style={{ display: 'flex', gap: 12 }}>
            <TimelineSpine status="done" />
            <div style={{
              flex: 1, minWidth: 0,
              border: '1px solid var(--color-stroke-subtle, #D7D7D7)',
              borderRadius: 'var(--radius-lg, 8px)',
              backgroundColor: 'var(--color-container-secondary, #F7F7F7)',
              padding: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontFamily: heading, fontWeight: 600, fontSize: 15, color: 'var(--color-text-primary)' }}>
                  Round 1
                </span>
                <Badge variant="green" size="sm" label="Tersimpan" />
                <Tooltip content="Round tersimpan tidak bisa diedit atau dihapus.">
                  <span style={{ display: 'inline-flex', color: 'var(--color-text-tertiary)' }}>
                    <Lock size={13} />
                  </span>
                </Tooltip>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <CalendarClock size={13} color="var(--color-text-tertiary)" />
                <span style={{ fontFamily: body, fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                  17 Jul 2026 10:00 · sales@nusantics.com
                </span>
              </div>
              <RoundResultTable values={ROUND1} />
            </div>
          </div>

          {/* ── Node 2 — active / saved Round 2 ─────────────────────────────── */}
          <div style={{ display: 'flex', gap: 12 }}>
            <TimelineSpine status={round2Saved ? 'done' : 'active'} last />
            <div style={{
              flex: 1, minWidth: 0,
              border: `1px solid ${round2Saved ? 'var(--color-stroke-subtle, #D7D7D7)' : 'var(--color-brand-primary)'}`,
              borderRadius: 'var(--radius-lg, 8px)',
              backgroundColor: round2Saved ? 'var(--color-container-secondary, #F7F7F7)' : 'var(--color-bg-page, #FFFFFF)',
              boxShadow: round2Saved ? 'none' : 'var(--shadow-sm)',
              padding: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span style={{ fontFamily: heading, fontWeight: 600, fontSize: 15, color: 'var(--color-text-primary)' }}>
                  Round 2
                </span>
                {round2Saved
                  ? <Badge variant="green" size="sm" label="Tersimpan" />
                  : <Badge variant="brand-subtle" size="sm" label="Retest" />}
              </div>

              {round2Saved ? (
                <>
                  <RoundResultTable values={values} />
                  <p style={{
                    margin: '12px 0 0', fontFamily: body, fontSize: 12, lineHeight: '18px',
                    color: 'var(--color-text-tertiary)',
                  }}>
                    Batas 2 testing round tercapai. Round ini terkunci dan tercatat di Lab KPI PathoCheck.
                  </p>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {/* ONE merged retest warning */}
                  <Alert
                    variant="warning"
                    title="Round 2 = retest — sample tidak First Time Right (FTR)"
                    description="Retest menurunkan FTR lab dan tercatat di Lab KPI PathoCheck. Perbaikan hasil Round 1 hanya lewat round ini."
                  />

                  {/* Petugas lab */}
                  <Select
                    label="Petugas lab"
                    required
                    placeholder="Pilih analis…"
                    options={ANALYSTS}
                    value={analyst || undefined}
                    onValueChange={setAnalyst}
                    helperText="Analis penanggung jawab round ini"
                  />

                  {/* Diseases to re-test */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <SectionLabel>Penyakit yang diuji ulang</SectionLabel>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {DISEASES.map((d) => (
                        <Tag
                          key={d.id}
                          size="md"
                          label={d.label}
                          checkbox
                          checked={retest[d.id]}
                          onCheckedChange={() => toggleDisease(d.id)}
                        />
                      ))}
                    </div>
                    <span style={{ fontFamily: body, fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                      Hanya penyakit terpilih yang butuh input hasil di bawah.
                    </span>
                  </div>

                  {/* Reason */}
                  <Select
                    label="Alasan retest"
                    required
                    placeholder="Pilih alasan…"
                    options={REASONS}
                    value={reason || undefined}
                    onValueChange={setReason}
                  />

                  <Divider />

                  {/* Results */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <SectionLabel>Hasil Round 2</SectionLabel>
                      <Tooltip content="Angka = nilai Ct. IC (Internal Control) juga menerima Undetermined.">
                        <span style={{ display: 'inline-flex', color: 'var(--color-text-tertiary)' }}>
                          <Info size={14} />
                        </span>
                      </Tooltip>
                    </div>
                    {/* ONE format legend for the whole form */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: body, fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                        Format:
                      </span>
                      <Badge variant="gray" size="sm" label="angka (Ct)" />
                      <Badge variant="gray" size="sm" label="Neg." />
                      <Badge variant="gray" size="sm" label="N/A" />
                      <span style={{ fontFamily: body, fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                        · IC + Undetermined
                      </span>
                    </div>

                    {activeDiseases.length === 0 ? (
                      <div style={{
                        border: '1px dashed var(--color-stroke-subtle, #D7D7D7)',
                        borderRadius: 'var(--radius-lg, 8px)',
                        padding: '20px 16px',
                        textAlign: 'center',
                        fontFamily: body, fontSize: 13,
                        color: 'var(--color-text-tertiary)',
                      }}>
                        Pilih minimal satu penyakit untuk mengisi hasil.
                      </div>
                    ) : (
                      <Accordion
                        key={activeDiseases.map((d) => d.id).join('-')}
                        type="multiple"
                        accordionStyle="card"
                        defaultValue={activeDiseases.map((d) => d.id)}
                        items={accordionItems}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Sheet>

      {/* ── Save confirmation with the "sudah cek ulang" acknowledgement ────── */}
      <AlertDialog
        open={confirmOpen}
        variant="default"
        title="Simpan Round 2?"
        description="Round yang tersimpan tidak bisa diedit maupun dihapus. Pastikan semua nilai sudah benar sebelum menyimpan."
        checkboxAction={{
          label: 'Saya sudah cek ulang hasil sebelum menyimpan',
          checked: ack,
          onChange: setAck,
        }}
        confirmAction={{ label: 'Simpan', onClick: handleSave }}
        cancelAction={{ label: 'Batal', onClick: () => { setConfirmOpen(false); setAck(false); } }}
        onClose={() => { setConfirmOpen(false); setAck(false); }}
      />
    </TooltipProvider>
  );
}

/* ─── faux sample page shown behind the sheet ───────────────────────────────── */

function SamplePageBackdrop({ onManage }: { onManage: () => void }) {
  return (
    <div style={{
      minHeight: 520,
      fontFamily: body,
      color: 'var(--color-text-primary)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontFamily: heading, fontWeight: 700, fontSize: 18, color: 'var(--color-brand-primary)' }}>
          CeKolam
        </span>
        <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>Internal dashboard</span>
      </div>
      <p style={{ margin: '0 0 4px', fontSize: 12, color: 'var(--color-text-tertiary)' }}>
        Laboratory / Sample Processing / PathoCheck
      </p>
      <h1 style={{ margin: '0 0 16px', fontFamily: heading, fontWeight: 600, fontSize: 22 }}>
        Sample {SAMPLE_ID}
      </h1>

      <div style={{
        maxWidth: 640,
        border: '1px solid var(--color-stroke-subtle, #D7D7D7)',
        borderRadius: 'var(--radius-lg, 8px)',
        padding: 20,
        backgroundColor: 'var(--color-bg-page, #FFFFFF)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <Badge variant="brand-subtle" size="md" label="Benur" />
          <Badge variant="blue" size="md" label="PathoCheck" />
          <Badge variant="yellow" size="md" label="Processing" />
        </div>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--color-text-secondary)' }}>
          Panel AHPND, EHP, WSSV · 1 dari 2 testing round terpakai. Round 1 sudah dilaporkan
          dengan seluruh nilai N/A.
        </p>
        <Button
          variant="primary"
          size="sm"
          leadingIcon={<Plus size={14} />}
          onClick={onManage}
        >
          Kelola Testing Round
        </Button>
      </div>
    </div>
  );
}

/* ─── Storybook wiring ──────────────────────────────────────────────────────── */

const meta = {
  title: 'Prototypes/Testing Round Modal/A · Side Sheet Timeline',
  component: TestingRoundEditor,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TestingRoundEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SideSheetTimeline: Story = {
  render: () => (
    <div data-brand="cekolam" style={{ minHeight: '100vh', background: 'var(--color-bg-page)', padding: 24 }}>
      <TestingRoundEditor />
    </div>
  ),
};

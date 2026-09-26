import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
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
import { Lock, Info, ChevronLeft, ChevronRight, ClipboardCheck } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Prototypes / Testing Round Modal — "Stepped retest review"
   3 langkah: (1) Setup retest  (2) Input hasil  (3) Review diff → kunci.
   Semua komponen dari helix-design-system, warna hanya dari token tema.
   ───────────────────────────────────────────────────────────── */

const FONT = 'var(--font-family-body)';
const SAMPLE_ID = 'NUS-SK001-260603-Q0A';

type ValueMode = '' | 'ct' | 'neg' | 'na' | 'undetermined';
interface CellValue {
  mode: ValueMode;
  ct: string;
}
const EMPTY: CellValue = { mode: '', ct: '' };
const NA: CellValue = { mode: 'na', ct: '' };

interface TargetDef {
  id: string;
  label: string;
  ic: boolean;
}
interface DiseaseDef {
  id: 'AHPND' | 'EHP' | 'WSSV';
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

const ALL_TARGETS = DISEASES.flatMap((d) => d.targets.map((t) => ({ ...t, disease: d.id })));

const ANALYSTS = [
  { value: 'dewi', label: 'Dewi Kartika' },
  { value: 'rangga', label: 'Rangga Pratama' },
  { value: 'siti', label: 'Siti Aminah' },
  { value: 'bagus', label: 'Bagus Nugroho' },
];

const REASONS = [
  { value: 'ct-borderline', label: 'Ct borderline — perlu konfirmasi' },
  { value: 'ic-fail', label: 'IC gagal / Undetermined' },
  { value: 'kontaminasi', label: 'Dugaan kontaminasi' },
  { value: 'permintaan', label: 'Permintaan verifikator' },
  { value: 'sampel-ulang', label: 'Sampel ulang diterima' },
];

const valueOptions = (ic: boolean) => [
  { value: 'ct', label: 'Angka (Ct)' },
  { value: 'neg', label: 'Neg.' },
  ...(ic ? [{ value: 'undetermined', label: 'Undetermined' }] : []),
  { value: 'na', label: 'N/A' },
];

function labelOf(v: CellValue): string {
  switch (v.mode) {
    case 'ct':
      return v.ct.trim() ? `${v.ct.trim()} Ct` : '… Ct';
    case 'neg':
      return 'Neg.';
    case 'na':
      return 'N/A';
    case 'undetermined':
      return 'Undet.';
    default:
      return '—';
  }
}

function isFilled(v: CellValue): boolean {
  if (v.mode === '') return false;
  if (v.mode === 'ct') return v.ct.trim().length > 0;
  return true;
}

// Round 1 tersimpan: seluruh target = N/A
const ROUND1: Record<string, CellValue> = Object.fromEntries(ALL_TARGETS.map((t) => [t.id, NA]));

const STEPS = [
  { id: 'setup', label: 'Setup retest', description: 'Analis · penyakit · alasan' },
  { id: 'input', label: 'Input hasil', description: 'Nilai Round 2' },
  { id: 'review', label: 'Review & simpan', description: 'Bandingkan lalu kunci' },
];

/* ── kecil-kecil ── */

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: FONT,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--color-text-tertiary)',
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}

function R1Ref({ v }: { v: CellValue }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontFamily: FONT,
        fontSize: 11,
        color: 'var(--color-text-tertiary)',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ opacity: 0.7 }}>R1</span>
      <span style={{ fontWeight: 500, color: 'var(--color-text-secondary)' }}>{labelOf(v)}</span>
    </span>
  );
}

function TestingRoundFlow() {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(0);

  const [analyst, setAnalyst] = useState('');
  const [reason, setReason] = useState('');
  const [retest, setRetest] = useState<Record<string, boolean>>({ AHPND: true, EHP: false, WSSV: true });
  const [values, setValues] = useState<Record<string, CellValue>>(() =>
    Object.fromEntries(ALL_TARGETS.map((t) => [t.id, EMPTY])),
  );

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [saved, setSaved] = useState(false);

  const selectedDiseases = useMemo(() => DISEASES.filter((d) => retest[d.id]), [retest]);
  const activeTargets = useMemo(
    () => selectedDiseases.flatMap((d) => d.targets.map((t) => ({ ...t, disease: d.id }))),
    [selectedDiseases],
  );

  const setupValid = analyst !== '' && reason !== '' && selectedDiseases.length > 0;
  const inputValid = activeTargets.length > 0 && activeTargets.every((t) => isFilled(values[t.id]));

  const round2 = (targetId: string, diseaseId: string): CellValue => {
    if (!retest[diseaseId]) return ROUND1[targetId]; // tidak diuji ulang → ikut Round 1
    return values[targetId];
  };
  const changed = (targetId: string, diseaseId: string): boolean => {
    if (!retest[diseaseId]) return false;
    const v = values[targetId];
    return isFilled(v) && labelOf(v) !== labelOf(ROUND1[targetId]);
  };
  const changedCount = activeTargets.filter((t) => changed(t.id, t.disease)).length;

  const setValue = (id: string, patch: Partial<CellValue>) =>
    setValues((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));

  const stepStatus = (i: number) => {
    if (saved) return 'completed' as const;
    if (i < step) return 'completed' as const;
    if (i === step) return 'active' as const;
    return 'pending' as const;
  };
  const steps = STEPS.map((s, i) => ({ ...s, status: stepStatus(i) }));

  const doSave = () => {
    if (!confirmChecked) return;
    setSaved(true);
    setConfirmOpen(false);
  };

  /* ── review table ── */
  const reviewColumns: Column<Record<string, unknown>>[] = [
    {
      key: 'penyakit',
      header: 'Penyakit',
      width: 92,
      render: (row) =>
        (row.first as boolean) ? (
          <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 13, color: 'var(--color-text-primary)' }}>
            {row.disease as string}
          </span>
        ) : (
          <span />
        ),
    },
    {
      key: 'target',
      header: 'Target',
      render: (row) => (
        <span style={{ fontFamily: FONT, fontSize: 13, color: 'var(--color-text-secondary)' }}>
          {row.target as string}
        </span>
      ),
    },
    {
      key: 'r1',
      header: 'Round 1',
      align: 'center',
      width: 96,
      render: (row) => (
        <span style={{ fontFamily: FONT, fontSize: 13, color: 'var(--color-text-tertiary)' }}>{row.r1 as string}</span>
      ),
    },
    {
      key: 'r2',
      header: 'Round 2',
      align: 'left',
      render: (row) => row.r2 as ReactNode,
    },
  ];

  const reviewData: Record<string, unknown>[] = DISEASES.flatMap((d) =>
    d.targets.map((t, ti) => {
      const inherited = !retest[d.id];
      const v = round2(t.id, d.id);
      const isChanged = changed(t.id, d.id);
      return {
        key: t.id,
        first: ti === 0,
        disease: d.label,
        target: t.label,
        r1: labelOf(ROUND1[t.id]),
        r2: inherited ? (
          <span style={{ fontFamily: FONT, fontSize: 12, color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>
            Ikut Round 1 ({labelOf(ROUND1[t.id])})
          </span>
        ) : (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {labelOf(v)}
            </span>
            {isChanged ? (
              <Badge size="sm" variant="yellow" label="berubah" />
            ) : (
              <Badge size="sm" variant="gray" label="sama" />
            )}
          </span>
        ),
      };
    }),
  );

  return (
    <TooltipProvider>
      <div style={{ fontFamily: FONT, padding: 40 }}>
        {!open && <Button onClick={() => setOpen(true)}>Buka modal Testing Round</Button>}

        <Dialog
          open={open}
          onOpenChange={setOpen}
          size="lg"
          showClose
          title={
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              Testing Round
              <Tag size="sm" label={SAMPLE_ID} leadingIcon={<ClipboardCheck size={12} />} />
            </span>
          }
          description="PathoCheck · maks 2 testing round per sample · Round 1 sudah tersimpan"
          footer={
            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              {/* kiri */}
              {saved ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: FONT, fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                  <Lock size={12} /> Round terkunci — tidak bisa diedit / dihapus
                </span>
              ) : step > 0 ? (
                <Button variant="neutral" size="sm" leadingIcon={<ChevronLeft size={14} />} onClick={() => setStep(step - 1)}>
                  Kembali
                </Button>
              ) : (
                <Button variant="neutral" size="sm" onClick={() => setOpen(false)}>
                  Batal
                </Button>
              )}

              {/* kanan */}
              {saved ? (
                <div style={{ display: 'flex', gap: 8 }}>
                  <Tooltip content="Sample ini sudah memakai 2 dari 2 round.">
                    <span>
                      <Button variant="neutral" size="sm" disabled>
                        Maks 2 round tercapai
                      </Button>
                    </span>
                  </Tooltip>
                  <Button size="sm" onClick={() => setOpen(false)}>
                    Selesai
                  </Button>
                </div>
              ) : step === 0 ? (
                <Button size="sm" trailingIcon={<ChevronRight size={14} />} disabled={!setupValid} onClick={() => setStep(1)}>
                  Lanjut ke input
                </Button>
              ) : step === 1 ? (
                <Button size="sm" trailingIcon={<ChevronRight size={14} />} disabled={!inputValid} onClick={() => setStep(2)}>
                  Lanjut ke review
                </Button>
              ) : (
                <Button size="sm" leadingIcon={<Lock size={14} />} onClick={() => setConfirmOpen(true)}>
                  Simpan Round 2
                </Button>
              )}
            </div>
          }
        >
          {/* Stepper header */}
          <div style={{ marginBottom: 4 }}>
            <Stepper
              steps={steps}
              activeStep={saved ? undefined : step}
              onStepClick={saved ? undefined : (i) => i < step && setStep(i)}
            />
          </div>

          <div
            style={{
              marginTop: 16,
              maxHeight: '58vh',
              overflowY: 'auto',
              paddingRight: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            {/* ─────────── SAVED / LOCKED STATE ─────────── */}
            {saved && (
              <>
                <Alert
                  variant="success"
                  title="Round 2 tersimpan permanen"
                  description={`${changedCount} nilai berubah dari Round 1. Kedua round kini terkunci untuk sample ini.`}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <SectionTitle>Hasil akhir — Round 1 → Round 2</SectionTitle>
                    <span style={{ display: 'inline-flex', gap: 6 }}>
                      <Tag size="sm" label="Round 1 terkunci" leadingIcon={<Lock size={11} />} />
                      <Tag size="sm" label="Round 2 terkunci" leadingIcon={<Lock size={11} />} />
                    </span>
                  </div>
                  <Table columns={reviewColumns} data={reviewData} size="sm" getRowKey={(r) => r.key as string} cellBorders />
                </div>
              </>
            )}

            {/* ─────────── STEP 0 · SETUP ─────────── */}
            {!saved && step === 0 && (
              <>
                <Alert
                  variant="info"
                  title="Round 2 = retest sample ini"
                  description="Menambah Round 2 menandai sample tidak First Time Right (FTR) dan tercatat di Lab KPI PathoCheck. Isi setup di bawah untuk mulai."
                />
                <div>
                  <SectionTitle>Petugas lab</SectionTitle>
                  <Select
                    options={ANALYSTS}
                    value={analyst || undefined}
                    onValueChange={setAnalyst}
                    placeholder="Pilih analis penanggung jawab round…"
                    size="sm"
                  />
                </div>
                <div>
                  <SectionTitle>Penyakit yang diuji ulang</SectionTitle>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {DISEASES.map((d) => (
                      <Tag
                        key={d.id}
                        size="md"
                        label={d.label}
                        checkbox
                        checked={!!retest[d.id]}
                        onCheckedChange={(c) => setRetest((prev) => ({ ...prev, [d.id]: c }))}
                      />
                    ))}
                  </div>
                  <p style={{ fontFamily: FONT, fontSize: 12, color: 'var(--color-text-tertiary)', margin: '8px 0 0' }}>
                    Penyakit yang tidak dicentang otomatis memakai hasil Round 1.
                  </p>
                </div>
                <div>
                  <SectionTitle>Alasan retest</SectionTitle>
                  <Select
                    options={REASONS}
                    value={reason || undefined}
                    onValueChange={setReason}
                    placeholder="Pilih alasan…"
                    size="sm"
                  />
                </div>
              </>
            )}

            {/* ─────────── STEP 1 · INPUT ─────────── */}
            {!saved && step === 1 && (
              <>
                <Accordion
                  type="single"
                  accordionStyle="border"
                  items={[
                    {
                      id: 'format',
                      title: 'Format nilai yang diterima',
                      content: (
                        <div style={{ fontFamily: FONT, fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                          <div>
                            <b>Semua target:</b> Angka (Ct) · Neg. · N/A
                          </div>
                          <div>
                            <b>Target IC:</b> tambahan <b>Undetermined</b>
                          </div>
                          <div style={{ marginTop: 4, color: 'var(--color-text-tertiary)' }}>
                            Nilai Round 1 muncul sebagai referensi di tiap baris.
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />

                {selectedDiseases.map((d) => (
                  <div key={d.id}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {d.label}
                      </span>
                      <Badge size="sm" variant="brand-subtle" label={`${d.targets.length} target`} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {d.targets.map((t) => {
                        const v = values[t.id];
                        return (
                          <div
                            key={t.id}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '150px 1fr',
                              alignItems: 'center',
                              gap: 12,
                            }}
                          >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                              <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>
                                {t.label}
                                {t.ic && (
                                  <Tooltip content="Internal Control — boleh bernilai Undetermined.">
                                    <span style={{ marginLeft: 4, color: 'var(--color-text-tertiary)', cursor: 'help' }}>
                                      <Info size={12} style={{ verticalAlign: 'middle' }} />
                                    </span>
                                  </Tooltip>
                                )}
                              </span>
                              <R1Ref v={ROUND1[t.id]} />
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                              <Select
                                options={valueOptions(t.ic)}
                                value={v.mode || undefined}
                                onValueChange={(m) => setValue(t.id, { mode: m as ValueMode })}
                                placeholder="Pilih nilai…"
                                size="sm"
                                style={{ flex: 1 }}
                              />
                              {v.mode === 'ct' && (
                                <Input
                                  size="sm"
                                  inputMode="decimal"
                                  placeholder="mis. 28.4"
                                  value={v.ct}
                                  onChange={(e) => setValue(t.id, { ct: e.target.value })}
                                  style={{ width: 120 }}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* ─────────── STEP 2 · REVIEW ─────────── */}
            {!saved && step === 2 && (
              <>
                <Alert
                  variant="warning"
                  title="Cek sebelum menyimpan — aksi ini permanen"
                  description={`Round 2 menurunkan FTR lab & tercatat di Lab KPI PathoCheck. ${changedCount} nilai berubah dari Round 1. Setelah disimpan, Round 1 & Round 2 tidak bisa diedit atau dihapus.`}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <SectionTitle>Perbandingan Round 1 → Round 2</SectionTitle>
                    <Badge size="sm" variant="yellow" label={`${changedCount} berubah`} />
                  </div>
                  <Table columns={reviewColumns} data={reviewData} size="sm" getRowKey={(r) => r.key as string} cellBorders />
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 12,
                    fontFamily: FONT,
                    fontSize: 12,
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>Petugas lab</span>
                    <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>
                      {ANALYSTS.find((a) => a.value === analyst)?.label ?? '—'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>Alasan retest</span>
                    <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>
                      {REASONS.find((r) => r.value === reason)?.label ?? '—'}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </Dialog>

        <AlertDialog
          open={confirmOpen}
          variant="default"
          title="Simpan Round 2 secara permanen?"
          description="Round yang tersimpan tidak bisa diedit maupun dihapus. Pastikan seluruh nilai sudah benar."
          onClose={() => setConfirmOpen(false)}
          checkboxAction={{
            label: 'Saya sudah cek ulang seluruh hasil',
            checked: confirmChecked,
            onChange: setConfirmChecked,
          }}
          confirmAction={{ label: 'Kunci & simpan', onClick: doSave }}
          cancelAction={{ label: 'Batal', onClick: () => setConfirmOpen(false) }}
        />
      </div>
    </TooltipProvider>
  );
}

const meta = {
  title: 'Prototypes/Testing Round Modal/B · Stepped Review',
  component: TestingRoundFlow,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TestingRoundFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SteppedRetestReview: Story = {
  render: () => <TestingRoundFlow />,
};

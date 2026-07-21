import { PageLayout, Section } from './PageLayout';
import { InputOTP, Button, Dialog } from '../../components';

const toc = [
  { id: 'otp-variants', label: 'Variants & States' },
  { id: 'otp-usage',    label: 'Usage Example' },
];

export function InputOTPSection() {
  return (
    <PageLayout
      category="Components"
      title="Input OTP"
      description="The OTP input lets users enter verification codes. It supports 6-digit and alphanumeric (3+3) layouts with automatic focus management, paste handling, and keyboard navigation."
      tocItems={toc}
    >
      {/* Variants & States */}
      <Section id="otp-variants" title="Variants & States">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Two layout variants — Digits Only (6 continuous cells) and Alphanumeric (two groups of 3 separated by a dash). Each can appear in Default or Invalid state.
        </p>
        <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE', display: 'flex', flexDirection: 'column', gap: 24, overflowX: 'auto' }}>
          <InputOTP variant="Digits Only" state="Default" label="Digits Only" />
          <InputOTP variant="Digits Only" state="Invalid"  label="Digits Only" />
          <InputOTP variant="Alphanumeric" state="Default" label="Alphanumeric" />
          <InputOTP variant="Alphanumeric" state="Invalid"  label="Alphanumeric" />
        </div>
      </Section>

      {/* Usage Example */}
      <Section id="otp-usage" title="Usage Example">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Typical login verification dialog — pair the OTP field with a clear title, description, and a primary action button.
        </p>
        <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
          <Dialog
            size="sm"
            trigger={<Button variant="primary" size="sm">Open Verification Dialog</Button>}
            title="Verify your login"
            description="Enter the verification code we sent to your email address: m@example.com."
            footer={
              <Button variant="primary" size="md" style={{ width: '100%' }}>
                Verify
              </Button>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <InputOTP variant="Alphanumeric" state="Default" label="Alphanumeric" />
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '20px', color: '#49494A' }}>
                I no longer have access to this email address.
              </p>
            </div>
          </Dialog>
        </div>
      </Section>
    </PageLayout>
  );
}

import { ComponentDocPage } from './ComponentDocPage';
import { Input, TextArea, FieldMessage, VerificationCodeInput } from '../../components';
import { Search, ChevronDown } from 'lucide-react';

const col = (children: React.ReactNode, width = 320) => <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width }}>{children}</div>;

export function InputSection() {
  return (
    <ComponentDocPage
      slug="input"
      title="Input"
      description="Single-line text input with a label, optional leading and trailing content, and a hint or error message. This page covers the Input page in Figma: Input, Text Area, Field Message and Verification Code Input Field."
      usage={[
        { heading: 'Always label it', body: 'Use the label, or the floating label, so the field is named even once it is filled.' },
        { heading: 'Hint, then error', body: 'Show a hint to help; replace it with an error message when validation fails.' },
        { heading: 'Text Area for long text', body: 'Use Text Area when the answer may span several lines.' },
      ]}
      demos={[
        { id: 'states', title: 'Input states', description: 'Default, filled, error and disabled. Hover and focus appear when you interact.',
          node: col(<>
            <Input label="Label" placeholder="Placeholder" hint="This is a hint text to help user." />
            <Input label="Label" defaultValue="Filled text" hint="This is a hint text to help user." />
            <Input label="Label" placeholder="Placeholder" error="This is an error message." />
            <Input label="Label" placeholder="Placeholder" disabled hint="This is a hint text to help user." />
          </>) },
        { id: 'floating', title: 'Floating label', node: col(<><Input floating label="Label" placeholder="Placeholder" /><Input floating label="Label" defaultValue="Filled text" /><Input floating label="Label" error="This is an error message." /></>) },
        { id: 'layout', title: 'Horizontal layout', node: col(<Input layout="horizontal" label="Label" placeholder="Placeholder" />, 360) },
        { id: 'slots', title: 'Leading and trailing', node: col(<>
          <Input label="Search" placeholder="Search" leading={<Search size={16} />} />
          <Input label="Country" placeholder="812 3456 7890" leading="+62" leadingDivider trailing={<ChevronDown size={16} />} />
          <Input label="Website" placeholder="helix.com" required leading="https://" leadingDivider />
        </>) },
        { id: 'textarea', title: 'Text Area', node: col(<><TextArea label="Notes" placeholder="Placeholder" hint="This is a hint text to help user." /><TextArea label="Notes" placeholder="Placeholder" error="This is an error message." /></>) },
        { id: 'message', title: 'Field Message', node: col(<><FieldMessage>This is a hint text to help user.</FieldMessage><FieldMessage state="error">This is an error message.</FieldMessage></>) },
        { id: 'code', title: 'Verification Code Input Field', node: <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}><VerificationCodeInput hint="This is a hint text to help user." /><VerificationCodeInput layout="6-digit-split" /></div> },
      ]}
    />
  );
}

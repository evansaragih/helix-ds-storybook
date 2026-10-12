import { ComponentDocPage } from './ComponentDocPage';
import { Tooltip, TooltipProvider, Button } from '../../components';

const trigger = (label: string) => <Button hierarchy="secondary" appearance="outline" size="sm">{label}</Button>;

export function TooltipSection() {
  return (
    <ComponentDocPage
      slug="tooltip"
      title="Tooltip"
      description="A contextual popup that labels or explains an element on hover or focus. Use for short helper text (Simple) or a longer explanation (Two-Block, Detailed). Don’t put interactive content in it."
      usage={[
        { heading: 'Describe, don’t instruct', body: 'A tooltip explains the element it is on — it is not a place for steps or required reading.' },
        { heading: 'Keyboard too', body: 'Tooltips open on focus as well as hover, so they work without a mouse.' },
        { heading: 'No actions inside', body: 'If it needs a link or button, use a Popover instead.' },
      ]}
      demos={[
        { id: 'simple', title: 'Simple, Two-Block and Detailed', description: 'Hover or focus a button to see its tooltip.',
          node: (
            <TooltipProvider>
              <div style={{ display: 'flex', gap: 24, padding: '40px 0' }}>
                <Tooltip content="Tooltip text">{trigger('Simple')}</Tooltip>
                <Tooltip content="Tooltip text" additionalContent="Additional Text">{trigger('Two-Block')}</Tooltip>
                <Tooltip title="This is a tooltip" content="Tooltips are used to describe or identify an element, or to help the user understand its function.">{trigger('Detailed')}</Tooltip>
              </div>
            </TooltipProvider>
          ) },
        { id: 'sides', title: 'Side and arrow',
          node: (
            <TooltipProvider>
              <div style={{ display: 'flex', gap: 24, padding: '40px 0', flexWrap: 'wrap' }}>
                {(['top', 'right', 'bottom', 'left'] as const).map((s) => <Tooltip key={s} side={s} content={`Side: ${s}`}>{trigger(s)}</Tooltip>)}
                <Tooltip arrow={false} content="No arrow">{trigger('arrow=false')}</Tooltip>
              </div>
            </TooltipProvider>
          ) },
      ]}
    />
  );
}

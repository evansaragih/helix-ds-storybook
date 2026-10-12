import type { Meta, StoryObj } from '@storybook/react-vite';
import { FooterActions, Button, Checkbox } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Footer Action',
  component: FooterActions,
  tags: ['autodocs'],
  argTypes: { alignment: { control: 'select', options: ['fill', 'right'] } },
  args: {
    alignment: 'right',
    children: (
      <>
        <Button hierarchy="secondary" appearance="outline" size="sm">Cancel</Button>
        <Button hierarchy="primary" appearance="solid" size="sm">Save</Button>
      </>
    ),
  },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
} satisfies Meta<typeof FooterActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Fill: Story = { args: { alignment: 'fill' } };

export const SingleAction: Story = {
  args: { children: <Button hierarchy="primary" appearance="solid" size="sm">Done</Button> },
};

export const ThreeActions: Story = {
  args: {
    children: (
      <>
        <Button hierarchy="secondary" appearance="ghost" size="sm">Reset</Button>
        <Button hierarchy="secondary" appearance="outline" size="sm">Cancel</Button>
        <Button hierarchy="primary" appearance="solid" size="sm">Apply</Button>
      </>
    ),
  },
};

export const WithLeftContent: Story = {
  args: { leftContent: <Checkbox size="sm" label="Don't ask again" /> },
};

export const WithLeftLink: Story = {
  args: { leftContent: <Button hierarchy="primary" appearance="link" size="sm">Learn more</Button> },
};

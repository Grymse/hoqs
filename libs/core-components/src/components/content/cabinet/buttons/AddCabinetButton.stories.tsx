import type { Meta, StoryObj } from '@storybook/react';
import { AddCabinetButton } from './AddCabinetButton';

const meta: Meta<typeof AddCabinetButton> = {
  component: AddCabinetButton,
  title: 'AddCabinetButton',
};
export default meta;
type Story = StoryObj<typeof AddCabinetButton>;

export const Primary = {
  args: {},
};

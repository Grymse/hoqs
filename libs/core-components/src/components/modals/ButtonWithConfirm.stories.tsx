import type { Meta, StoryObj } from '@storybook/react';
import { ButtonWithConfirm } from './ButtonWithConfirm';

const meta: Meta<typeof ButtonWithConfirm> = {
  component: ButtonWithConfirm,
  title: 'ButtonWithConfirm',
};
export default meta;
type Story = StoryObj<typeof ButtonWithConfirm>;

export const Primary = {
  args: {},
};

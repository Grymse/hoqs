import type { Meta, StoryObj } from '@storybook/react';
import { Cabinet } from './cabinet';

const meta: Meta<typeof Cabinet> = {
  component: Cabinet,
  title: 'Cabinet',
};
export default meta;
type Story = StoryObj<typeof Cabinet>;

export const Primary = {
  args: {},
};

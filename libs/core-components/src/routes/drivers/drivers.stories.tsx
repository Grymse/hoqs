import type { Meta, StoryObj } from '@storybook/react';
import { Drivers } from './drivers';

const meta: Meta<typeof Drivers> = {
  component: Drivers,
  title: 'Drivers',
};
export default meta;
type Story = StoryObj<typeof Drivers>;

export const Primary = {
  args: {},
};

import type { Meta, StoryObj } from '@storybook/react';
import { Cabinets } from './cabinets';

const meta: Meta<typeof Cabinets> = {
  component: Cabinets,
  title: 'Cabinets',
};
export default meta;
type Story = StoryObj<typeof Cabinets>;

export const Primary = {
  args: {},
};

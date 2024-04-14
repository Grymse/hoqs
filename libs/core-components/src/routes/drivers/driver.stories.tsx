import type { Meta, StoryObj } from '@storybook/react';
import { Driver } from './driver';

const meta: Meta<typeof Driver> = {
  component: Driver,
  title: 'Driver',
};
export default meta;
type Story = StoryObj<typeof Driver>;

export const Primary = {
  args: {},
};

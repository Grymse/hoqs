import type { Meta, StoryObj } from '@storybook/react';
import { DriverBadge } from './DriverBadge';

const meta: Meta<typeof DriverBadge> = {
  component: DriverBadge,
  title: 'DriverBadge',
};
export default meta;
type Story = StoryObj<typeof DriverBadge>;

export const Primary = {
  args: {},
};

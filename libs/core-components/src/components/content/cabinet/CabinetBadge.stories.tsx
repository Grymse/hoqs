import type { Meta, StoryObj } from '@storybook/react';
import { CabinetBadge } from './CabinetBadge';

const meta: Meta<typeof CabinetBadge> = {
  component: CabinetBadge,
  title: 'CabinetBadge',
};
export default meta;
type Story = StoryObj<typeof CabinetBadge>;

export const Primary = {
  args: {},
};

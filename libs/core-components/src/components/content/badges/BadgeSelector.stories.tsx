import type { Meta, StoryObj } from '@storybook/react';
import { BadgeSelector } from './BadgeSelector';

const meta: Meta<typeof BadgeSelector> = {
  component: BadgeSelector,
  title: 'BadgeSelector',
};
export default meta;
type Story = StoryObj<typeof BadgeSelector>;

export const Primary = {
  args: {},
};

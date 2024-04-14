import type { Meta, StoryObj } from '@storybook/react';
import { BadgeList } from './BadgeList';

const meta: Meta<typeof BadgeList> = {
  component: BadgeList,
  title: 'BadgeList',
};
export default meta;
type Story = StoryObj<typeof BadgeList>;

export const Primary = {
  args: {},
};

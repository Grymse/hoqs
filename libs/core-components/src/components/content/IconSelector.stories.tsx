import type { Meta, StoryObj } from '@storybook/react';
import { IconSelector } from './IconSelector';
import { TIMELINE_ICONS } from '../../lib/variables';

const meta: Meta<typeof IconSelector> = {
  component: IconSelector,
  title: 'IconSelector',
};
export default meta;
type Story = StoryObj<typeof IconSelector>;

export const Primary = {
  args: {
    icons: TIMELINE_ICONS,
    icon: 'sparkles',
  },
};

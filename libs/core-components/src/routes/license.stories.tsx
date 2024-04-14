import type { Meta, StoryObj } from '@storybook/react';
import { License } from './license';

const meta: Meta<typeof License> = {
  component: License,
  title: 'License',
};
export default meta;
type Story = StoryObj<typeof License>;

export const Primary = {
  args: {},
};

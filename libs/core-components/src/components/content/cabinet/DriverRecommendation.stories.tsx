import type { Meta, StoryObj } from '@storybook/react';
import { DriverRecommendation } from './DriverRecommendation';

const meta: Meta<typeof DriverRecommendation> = {
  component: DriverRecommendation,
  title: 'DriverRecommendation',
};
export default meta;
type Story = StoryObj<typeof DriverRecommendation>;

export const Primary = {
  args: {},
};

import type { Meta, StoryObj } from '@storybook/react';
import { DriverRecommendationRank } from './DriverRecommendationRank';

const meta: Meta<typeof DriverRecommendationRank> = {
  component: DriverRecommendationRank,
  title: 'DriverRecommendationRank',
};
export default meta;
type Story = StoryObj<typeof DriverRecommendationRank>;

export const Primary = {
  args: {},
};

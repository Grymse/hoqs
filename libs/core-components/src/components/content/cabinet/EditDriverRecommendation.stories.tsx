import type { Meta, StoryObj } from '@storybook/react';
import { EditDriverRecommendation } from './EditDriverRecommendation';

const meta: Meta<typeof EditDriverRecommendation> = {
  component: EditDriverRecommendation,
  title: 'EditDriverRecommendation',
};
export default meta;
type Story = StoryObj<typeof EditDriverRecommendation>;

export const Primary = {
  args: {},
};

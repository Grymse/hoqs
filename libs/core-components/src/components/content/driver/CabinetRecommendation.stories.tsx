import type { Meta, StoryObj } from '@storybook/react';
import { CabinetRecommendation } from './CabinetRecommendation';

const meta: Meta<typeof CabinetRecommendation> = {
  component: CabinetRecommendation,
  title: 'CabinetRecommendation',
};
export default meta;
type Story = StoryObj<typeof CabinetRecommendation>;

export const Primary = {
  args: {},
};

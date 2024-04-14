import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './Timeline';

const meta: Meta<typeof Timeline> = {
  component: Timeline,
  title: 'Timeline',
};
export default meta;
type Story = StoryObj<typeof Timeline>;

export const Primary = {
  args: {},
};

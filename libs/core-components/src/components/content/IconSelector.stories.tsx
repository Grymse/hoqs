import type { Meta, StoryObj } from '@storybook/react';
import { IconSelector } from './IconSelector';

const meta: Meta<typeof IconSelector> = {
  component: IconSelector,
  title: 'IconSelector',
};
export default meta;
type Story = StoryObj<typeof IconSelector>;

export const Primary = {
  args: {},
};

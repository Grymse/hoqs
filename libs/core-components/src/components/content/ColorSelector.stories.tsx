import type { Meta, StoryObj } from '@storybook/react';
import { ColorSelector } from './ColorSelector';

const meta: Meta<typeof ColorSelector> = {
  component: ColorSelector,
  title: 'ColorSelector',
};
export default meta;
type Story = StoryObj<typeof ColorSelector>;

export const Primary = {
  args: {},
};

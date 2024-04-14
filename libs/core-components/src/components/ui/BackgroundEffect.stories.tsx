import type { Meta, StoryObj } from '@storybook/react';
import { BackgroundEffect } from './BackgroundEffect';

const meta: Meta<typeof BackgroundEffect> = {
  component: BackgroundEffect,
  title: 'BackgroundEffect',
};
export default meta;
type Story = StoryObj<typeof BackgroundEffect>;

export const Primary = {
  args: {},
};

import type { Meta, StoryObj } from '@storybook/react';
import { Contributors } from './Contributors';

const meta: Meta<typeof Contributors> = {
  component: Contributors,
  title: 'Contributors',
};
export default meta;
type Story = StoryObj<typeof Contributors>;

export const Primary = {
  args: {},
};

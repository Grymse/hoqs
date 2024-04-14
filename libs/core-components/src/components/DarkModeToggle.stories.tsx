import type { Meta, StoryObj } from '@storybook/react';
import { DarkModeToggle } from './DarkModeToggle';

const meta: Meta<typeof DarkModeToggle> = {
  component: DarkModeToggle,
  title: 'DarkModeToggle',
};
export default meta;
type Story = StoryObj<typeof DarkModeToggle>;

export const Primary = {
  args: {},
};

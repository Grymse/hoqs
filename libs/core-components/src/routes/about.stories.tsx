import type { Meta, StoryObj } from '@storybook/react';
import { About } from './about';

const meta: Meta<typeof About> = {
  component: About,
  title: 'About',
};
export default meta;
type Story = StoryObj<typeof About>;

export const Primary = {
  args: {},
};

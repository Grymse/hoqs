import type { Meta, StoryObj } from '@storybook/react';
import { FacebookIcon } from './FacebookIcon';

const meta: Meta<typeof FacebookIcon> = {
  component: FacebookIcon,
  title: 'FacebookIcon',
};
export default meta;
type Story = StoryObj<typeof FacebookIcon>;

export const Primary = {
  args: {},
};

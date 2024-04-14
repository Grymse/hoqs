import type { Meta, StoryObj } from '@storybook/react';
import { HoqsLogo } from './HoqsLogo';

const meta: Meta<typeof HoqsLogo> = {
  component: HoqsLogo,
  title: 'HoqsLogo',
};
export default meta;
type Story = StoryObj<typeof HoqsLogo>;

export const Primary = {
  args: {},
};

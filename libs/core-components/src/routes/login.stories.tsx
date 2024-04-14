import type { Meta, StoryObj } from '@storybook/react';
import { Login } from './login';

const meta: Meta<typeof Login> = {
  component: Login,
  title: 'Login',
};
export default meta;
type Story = StoryObj<typeof Login>;

export const Primary = {
  args: {},
};

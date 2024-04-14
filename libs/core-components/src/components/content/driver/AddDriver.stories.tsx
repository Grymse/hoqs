import type { Meta, StoryObj } from '@storybook/react';
import { AddDriverButton } from './AddDriver';

const meta: Meta<typeof AddDriverButton> = {
  component: AddDriverButton,
  title: 'AddDriverButton',
};
export default meta;
type Story = StoryObj<typeof AddDriverButton>;

export const Primary = {
  args: {},
};

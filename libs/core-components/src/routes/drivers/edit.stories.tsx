import type { Meta, StoryObj } from '@storybook/react';
import { EditDriver } from './edit';

const meta: Meta<typeof EditDriver> = {
  component: EditDriver,
  title: 'EditDriver',
};
export default meta;
type Story = StoryObj<typeof EditDriver>;

export const Primary = {
  args: {},
};

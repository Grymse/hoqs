import type { Meta, StoryObj } from '@storybook/react';
import { EditCabinet } from './edit';

const meta: Meta<typeof EditCabinet> = {
  component: EditCabinet,
  title: 'EditCabinet',
};
export default meta;
type Story = StoryObj<typeof EditCabinet>;

export const Primary = {
  args: {},
};

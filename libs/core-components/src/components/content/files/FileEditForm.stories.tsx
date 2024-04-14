import type { Meta, StoryObj } from '@storybook/react';
import { FileEditForm } from './FileEditForm';

const meta: Meta<typeof FileEditForm> = {
  component: FileEditForm,
  title: 'FileEditForm',
};
export default meta;
type Story = StoryObj<typeof FileEditForm>;

export const Primary = {
  args: {},
};

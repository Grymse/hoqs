import type { Meta, StoryObj } from '@storybook/react';
import { ImageEditForm } from './ImageEditForm';

const meta: Meta<typeof ImageEditForm> = {
  component: ImageEditForm,
  title: 'ImageEditForm',
};
export default meta;
type Story = StoryObj<typeof ImageEditForm>;

export const Primary = {
  args: {},
};

import type { Meta, StoryObj } from '@storybook/react';
import { ImageUploader } from './ImageUploader';

const meta: Meta<typeof ImageUploader> = {
  component: ImageUploader,
  title: 'ImageUploader',
};
export default meta;
type Story = StoryObj<typeof ImageUploader>;

export const Primary = {
  args: {},
};

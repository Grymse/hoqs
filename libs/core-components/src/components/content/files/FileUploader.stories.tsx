import type { Meta, StoryObj } from '@storybook/react';
import { FileUploader } from './FileUploader';

const meta: Meta<typeof FileUploader> = {
  component: FileUploader,
  title: 'FileUploader',
};
export default meta;
type Story = StoryObj<typeof FileUploader>;

export const Primary = {
  args: {},
};

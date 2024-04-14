import type { Meta, StoryObj } from '@storybook/react';
import { Uploader } from './Uploader';

const meta: Meta<typeof Uploader> = {
  component: Uploader,
  title: 'Uploader',
};
export default meta;
type Story = StoryObj<typeof Uploader>;

export const Primary = {
  args: {},
};

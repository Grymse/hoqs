import type { Meta, StoryObj } from '@storybook/react';
import { ImageFullscreen } from './ImageFullscreen';

const meta: Meta<typeof ImageFullscreen> = {
  component: ImageFullscreen,
  title: 'ImageFullscreen',
};
export default meta;
type Story = StoryObj<typeof ImageFullscreen>;

export const Primary = {
  args: {},
};

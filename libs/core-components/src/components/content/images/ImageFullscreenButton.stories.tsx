import type { Meta, StoryObj } from '@storybook/react';
import { ImageFullscreenButton } from './ImageFullscreenButton';

const meta: Meta<typeof ImageFullscreenButton> = {
  component: ImageFullscreenButton,
  title: 'ImageFullscreenButton',
};
export default meta;
type Story = StoryObj<typeof ImageFullscreenButton>;

export const Primary = {
  args: {},
};

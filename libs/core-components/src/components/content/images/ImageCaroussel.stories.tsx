import type { Meta, StoryObj } from '@storybook/react';
import { ImageCaroussel } from './ImageCaroussel';

const meta: Meta<typeof ImageCaroussel> = {
  component: ImageCaroussel,
  title: 'ImageCaroussel',
};
export default meta;
type Story = StoryObj<typeof ImageCaroussel>;

export const Primary = {
  args: {},
};

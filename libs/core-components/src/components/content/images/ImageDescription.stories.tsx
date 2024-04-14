import type { Meta, StoryObj } from '@storybook/react';
import { ImageDescription } from './ImageDescription';

const meta: Meta<typeof ImageDescription> = {
  component: ImageDescription,
  title: 'ImageDescription',
};
export default meta;
type Story = StoryObj<typeof ImageDescription>;

export const Primary = {
  args: {},
};

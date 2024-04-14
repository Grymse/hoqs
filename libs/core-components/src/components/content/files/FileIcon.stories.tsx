import type { Meta, StoryObj } from '@storybook/react';
import { FileIcon } from './FileIcon';

const meta: Meta<typeof FileIcon> = {
  component: FileIcon,
  title: 'FileIcon',
};
export default meta;
type Story = StoryObj<typeof FileIcon>;

export const Primary = {
  args: {},
};

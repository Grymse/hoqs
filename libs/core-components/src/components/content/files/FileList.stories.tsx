import type { Meta, StoryObj } from '@storybook/react';
import { FileList } from './FileList';

const meta: Meta<typeof FileList> = {
  component: FileList,
  title: 'FileList',
};
export default meta;
type Story = StoryObj<typeof FileList>;

export const Primary = {
  args: {},
};

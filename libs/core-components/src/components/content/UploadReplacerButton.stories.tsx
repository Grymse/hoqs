import type { Meta, StoryObj } from '@storybook/react';
import { UploaderReplacerButton } from './UploadReplacerButton';

const meta: Meta<typeof UploaderReplacerButton> = {
  component: UploaderReplacerButton,
  title: 'UploaderReplacerButton',
};
export default meta;
type Story = StoryObj<typeof UploaderReplacerButton>;

export const Primary = {
  args: {},
};

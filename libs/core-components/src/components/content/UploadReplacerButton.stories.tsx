import type { Meta, StoryObj } from '@storybook/react';
import { UploaderReplacerButton } from './UploadReplacerButton';

const meta: Meta<typeof UploaderReplacerButton> = {
  component: UploaderReplacerButton,
  title: 'UploaderReplacerButton',
};
export default meta;
type Story = StoryObj<typeof UploaderReplacerButton>;

const fileExample = {
  title: 'Example Title',
  url: 'https://example.com/image.jpg',
  updatedAt: '2022-01-01',
  createdAt: '2021-12-31',
  size: 1024,
  mimetype: 'image/jpeg',
};

export const Primary = {
  args: {
    children: 'Replace Image',
    file: fileExample,
    allowedTypes: ['image/jpeg', 'image/png', 'image/svg'],
  },
};

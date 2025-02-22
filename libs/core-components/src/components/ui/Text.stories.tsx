import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'Text',
};
export default meta;
type Story = StoryObj<typeof Text>;

export const Primary = {
  args: {},
};

import type { Meta, StoryObj } from '@storybook/react';
import { ContributorsEditor } from './ContributorEditor';

const meta: Meta<typeof ContributorsEditor> = {
  component: ContributorsEditor,
  title: 'ContributorsEditor',
};
export default meta;
type Story = StoryObj<typeof ContributorsEditor>;

export const Primary = {
  args: {},
};

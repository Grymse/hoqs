import type { Meta, StoryObj } from '@storybook/react';
import { PageContainer } from './PageContainer';

const meta: Meta<typeof PageContainer> = {
  component: PageContainer,
  title: 'PageContainer',
};
export default meta;
type Story = StoryObj<typeof PageContainer>;

export const Primary = {
  args: {},
};

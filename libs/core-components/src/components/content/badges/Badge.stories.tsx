import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Badge',
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary = {
  args: {
    badgeTitle: 'Primary',
    size: 'md',
    badgeTypes: [
      {
        title: 'Primary',
        color: 'primary',
        variant: 'solid',
        icon: undefined,
      },
    ],
  },
};

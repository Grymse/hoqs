import type { Meta, StoryObj } from '@storybook/react';
import { DriverMiniSpecList } from './DriverMiniSpecList';

const meta: Meta<typeof DriverMiniSpecList> = {
  component: DriverMiniSpecList,
  title: 'DriverMiniSpecList',
};
export default meta;
type Story = StoryObj<typeof DriverMiniSpecList>;

export const Primary = {
  args: {},
};

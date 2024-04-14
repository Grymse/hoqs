import type { Meta, StoryObj } from '@storybook/react';
import { DriverImporter } from './DriverImporter';

const meta: Meta<typeof DriverImporter> = {
  component: DriverImporter,
  title: 'DriverImporter',
};
export default meta;
type Story = StoryObj<typeof DriverImporter>;

export const Primary = {
  args: {},
};

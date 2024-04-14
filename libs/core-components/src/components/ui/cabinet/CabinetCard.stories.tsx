import type { Meta, StoryObj } from '@storybook/react';
import { CabinetCard } from './CabinetCard';

const meta: Meta<typeof CabinetCard> = {
  component: CabinetCard,
  title: 'CabinetCard',
};
export default meta;
type Story = StoryObj<typeof CabinetCard>;

export const Primary = {
  args: {},
};

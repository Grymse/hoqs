import type { Meta, StoryObj } from '@storybook/react';
import { EditTimelineEntryButton } from './EditTimelineEntry';

const meta: Meta<typeof EditTimelineEntryButton> = {
  component: EditTimelineEntryButton,
  title: 'EditTimelineEntryButton',
};
export default meta;
type Story = StoryObj<typeof EditTimelineEntryButton>;

export const Primary = {
  args: {},
};

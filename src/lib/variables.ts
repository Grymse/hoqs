import { BadgeType, ContributorRole } from '@/types/types';
import {
  Box,
  DraftingCompass,
  IterationCcw,
  Ship,
  Sparkles,
  ThumbsUp,
  Unplug,
  Zap,
} from 'lucide-react';

export const CABINET_TYPES = [
  'Kick',
  'Top',
  'Kick/Top',
  'Subwoofer',
  'Full-Range',
];
export const MAX_SPL_COUNT = ['1 cab', '2 cabs', '4 cabs', '8 cabs', '16 cabs'];
export const WOOD_THICKNESS = [
  '6mm',
  '9mm',
  '12mm',
  '15mm',
  '18mm',
  '21mm',
  '24mm',
];

export const DRIVER_SIZES = [
  '8"',
  '10"',
  '12"',
  '15"',
  '18"',
  '21"',
  '2x8"',
  '2x10"',
  '2x12"',
  '2x15"',
  '2x18"',
  '2x21"',
  '4x8"',
  '4x10"',
  '4x12"',
  '4x15"',
  '4x18"',
  '4x21"',
];

export const CABINET_BADGES = [
  { title: 'Popular', color: 'primary', variant: 'shadow', icon: Zap },
  { title: 'Recommended', color: 'primary', variant: 'shadow', icon: ThumbsUp },
  { title: 'Compact', color: 'danger', variant: 'shadow', icon: Box },
  { title: 'Flagship', color: 'danger', variant: 'shadow', icon: Ship },
  { title: 'New', color: 'secondary', variant: 'shadow', icon: Sparkles },
  {
    title: 'Updated',
    color: 'secondary',
    variant: 'shadow',
    icon: IterationCcw,
  },
  { title: 'Discontinued', color: 'warning', variant: 'shadow', icon: Unplug },
  {
    title: 'Prototype',
    color: 'warning',
    variant: 'shadow',
    icon: DraftingCompass,
  },
] satisfies BadgeType[];

export const FILE_BADGES = [
  { title: 'Popular', color: 'primary', variant: 'shadow', icon: Zap },
  { title: 'Recommended', color: 'primary', variant: 'shadow', icon: ThumbsUp },
  { title: 'Compact', color: 'danger', variant: 'shadow', icon: Box },
  { title: 'Flagship', color: 'danger', variant: 'shadow', icon: Ship },
  { title: 'New', color: 'secondary', variant: 'shadow', icon: Sparkles },
  {
    title: 'Updated',
    color: 'secondary',
    variant: 'shadow',
    icon: IterationCcw,
  },
  { title: 'Discontinued', color: 'warning', variant: 'shadow', icon: Unplug },
  {
    title: 'Prototype',
    color: 'warning',
    variant: 'shadow',
    icon: DraftingCompass,
  },
] satisfies BadgeType[];

export const CONTRIBUTOR_ROLES = [
  'Scientist',
  'Optimizer',
  'Prototyper',
  'Lead',
  'Helpful',
  'Writer',
] satisfies ContributorRole[];

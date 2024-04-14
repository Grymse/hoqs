import { Chip } from '@nextui-org/react';
import { BadgeType } from '@core/types/types';

interface BadgeProps {
  badgeTitle?: string | undefined;
  size?: 'sm' | 'md' | 'lg';
  badgeTypes: BadgeType[];
}

export function Badge({ badgeTitle, size, badgeTypes }: BadgeProps) {
  const badge = badgeTypes.find((badge) => badge.title === badgeTitle);
  if (!badge) return null;
  return (
    <Chip
      color={badge.color}
      variant={badge.variant}
      startContent={
        badge.icon && (
          <badge.icon
            className="ml-1"
            size={size === 'lg' ? 20 : size === 'md' ? 16 : 12}
          />
        )
      }
      size={size}
    >
      {badge.title}
    </Chip>
  );
}

export default Badge;
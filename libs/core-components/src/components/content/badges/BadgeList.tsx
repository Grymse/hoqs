import { cn } from '@nextui-org/react';
import { BadgeType } from '@core/types/types';
import Badge from './Badge';
interface ListProps {
  badges?: string[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  badgeTypes: BadgeType[];
}

export function BadgeList({
  badges,
  size,
  className,
  badgeTypes,
}: ListProps) {
  if (!badges) return null;
  return (
    <div className={cn('flex gap-2', className)}>
      {badges.map((badge) => (
        <Badge
          size={size}
          key={badge}
          badgeTitle={badge}
          badgeTypes={badgeTypes}
        />
      ))}
    </div>
  );
}

export default BadgeList;

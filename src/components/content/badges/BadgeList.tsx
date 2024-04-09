import { cn } from '@/components/ui/util';
import Badge from './Badge';
import { BadgeType } from '@/types/types';

interface ListProps {
  badges?: string[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  badgeTypes: BadgeType[];
}

export default function BadgeList({
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

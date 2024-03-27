import { cn } from '@/components/ui/util';
import { CABINET_BADGES } from '@/lib/variables';
import { Chip } from '@nextui-org/react';

interface Props {
  badgeTitle?: string | undefined;
  size?: 'sm' | 'md' | 'lg';
}

export default function CabinetBadge({ badgeTitle, size }: Props) {
  const badge = CABINET_BADGES.find((badge) => badge.title === badgeTitle);
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

interface ListProps {
  badges: string[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CabinetBadgeList({ badges, size, className }: ListProps) {
  return (
    <div className={cn('flex gap-2', className)}>
      {badges.map((badge) => (
        <CabinetBadge size={size} key={badge} badgeTitle={badge} />
      ))}
    </div>
  );
}

import { CABINET_BADGES } from '@core/lib/variables';
import Badge from '../badges/Badge';
import BadgeList from '../badges/BadgeList';

interface Props {
  badgeTitle?: string | undefined;
  size?: 'sm' | 'md' | 'lg';
}

export default function CabinetBadge({ badgeTitle, size }: Props) {
  return (
    <Badge badgeTitle={badgeTitle} size={size} badgeTypes={CABINET_BADGES} />
  );
}

interface ListProps {
  badges: string[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CabinetBadgeList({ badges, size, className }: ListProps) {
  return (
    <BadgeList
      badges={badges}
      className={className}
      size={size}
      badgeTypes={CABINET_BADGES}
    />
  );
}

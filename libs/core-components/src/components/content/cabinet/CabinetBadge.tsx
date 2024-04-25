import { CABINET_BADGES } from 'libs/core-components/src/lib/variables';
import Badge from '../badges/Badge';
import BadgeList from '../badges/BadgeList';

interface Props {
  badgeTitle?: string | undefined;
  size?: 'sm' | 'md' | 'lg';
}

export function CabinetBadge({ badgeTitle, size }: Props) {
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

export default CabinetBadge;

import { Chip } from '@nextui-org/react';
import { ColorVariant, DriverRank } from '@/types/types';

interface Props {
  rank: DriverRank;
}

export default function DriverRecommendationRank({ rank }: Props) {
  return (
    <Chip
      className="capitalize"
      color={getRankColor(rank)}
      classNames={
        getRankColor(rank) !== 'secondary'
          ? undefined
          : {
              base: 'bg-gradient-to-br from-success-500 to-primary-300 shadow-lg shadow-secondary/40',
              content: 'drop-shadow shadow-black text-white',
            }
      }
      size="sm"
      variant="flat"
    >
      {rank}
    </Chip>
  );
}

export function rankToRankNumber(rank: DriverRank): number {
  switch (rank) {
    case 'Optimal':
      return 5;
    case 'Excellent':
      return 4;
    case 'Good':
      return 3;
    case 'Okay':
      return 2;
    case 'Bad':
      return 1;
  }
}

function getRankColor(rank: DriverRank): ColorVariant {
  switch (rank) {
    case 'Optimal':
      return 'secondary';
    case 'Excellent':
      return 'success';
    case 'Good':
      return 'primary';
    case 'Okay':
      return 'warning';
    case 'Bad':
      return 'danger';
  }
}

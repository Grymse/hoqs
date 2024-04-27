import { SortDescriptor } from '@nextui-org/react';
import { DriverRank } from '../types/types';
import { rankToRankNumber } from './translations';

type RankedObject = { rank: DriverRank };

export function compareRank<T extends RankedObject>(a: T, b: T) {
  return rankToRankNumber(b.rank) - rankToRankNumber(a.rank);
}

type BrandedObject = { brand: string };

export function isHoqsBrand<T extends BrandedObject>(object: T) {
  return object.brand.toLowerCase() === 'hoqs';
}

type SortableObject = {
  [key: string]: object | string | number | undefined | null;
};

export function sortByDescriptor<T extends SortableObject>(
  sortDescriptor: SortDescriptor
) {
  const column = sortDescriptor.column;
  const direction = sortDescriptor.direction;

  if (column === undefined) return () => 0;

  return (a: T, b: T) => {
    const valA = a[column];
    const valB = b[column];

    if (typeof valA === 'string' && typeof valB === 'string') {
      return direction === 'ascending'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    if (typeof valA === 'number' && typeof valB === 'number') {
      return direction === 'ascending' ? valA - valB : valB - valA;
    }

    return 0;
  };
}

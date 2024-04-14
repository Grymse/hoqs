import { useSupabaseRequest } from '@core/components/SupabaseRequest';
import { supabase } from '@core/lib/supabase';
import { DriverRank } from '@core/types/types';
import {
  Input,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import React, { useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { rankToRankNumber } from './DriverRecommendationRank';
import DriverRecommendationRank from './DriverRecommendationRank';

interface Props {
  driverId: string;
}

interface CabinetRecommendation {
  notes: string;
  rank: DriverRank;
  cabinet_id: string;
  cabinets: {
    id: string;
    brand: string;
    model: string;
    frequency_start: number;
    frequency_end: number;
    sensitivity: number;
  };
}

export default function CabinetRecommendation({ driverId }: Props) {
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = React.useState('');
  const cabinetReqRef = useRef(
    supabase
      .from('driver_recommendations')
      .select(
        `
        notes,
        rank,
        cabinet_id,
        cabinets (
          id, brand, model, frequency_start, frequency_end, sensitivity
        )`
      )
      .eq('driver_id', driverId)
  );

  const { StatusComponent, data: cabinetRecommendations, isLoading } =
    // @ts-expect-error - Injecting the type of the request makes it complain
    useSupabaseRequest<CabinetRecommendation[]>(cabinetReqRef.current, true);

  function containsName(cabinet: CabinetRecommendation) {
    const filter = filterValue.toLowerCase();
    return (
      cabinet.cabinets.brand.toLowerCase().match(filter) !== null ||
      cabinet.cabinets.model.toLowerCase().match(filter) !== null
    );
  }

  return (
    <>
      {cabinetRecommendations && (
        <div className="flex flex-col gap-4">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<Search />}
            value={filterValue}
            size="sm"
            onClear={() => setFilterValue('')}
            onValueChange={setFilterValue}
          />
          <Table
            isHeaderSticky
            aria-label="A table showing all driver recommendations for the cabinet"
            classNames={{
              base: 'max-h-[520px]',
            }}
            selectionMode="single"
          >
            <TableHeader>
              <TableColumn key="name">Driver</TableColumn>
              <TableColumn key="specs">Specs</TableColumn>
              <TableColumn key="height">Rank</TableColumn>
            </TableHeader>
            <TableBody
              isLoading={isLoading}
              items={cabinetRecommendations}
              emptyContent="No driver recommendations found"
              loadingContent={<Spinner label="Loading..." />}
            >
              {cabinetRecommendations
                .filter(containsName)
                .sort(compareRank)
                .map((cabinet, i) => (
                  <TableRow
                    key={i}
                    onClick={() => navigate(`/cabinets/${cabinet.cabinet_id}`)}
                    className="cursor-pointer"
                  >
                    <TableCell className="flex gap-2 h-10 items-center">
                      {cabinet.cabinets.brand} {cabinet.cabinets.model}
                    </TableCell>
                    <TableCell>
                      {cabinet.cabinets.frequency_start}"{' '}
                      {cabinet.cabinets.frequency_end}W{' '}
                      {cabinet.cabinets.sensitivity}mm xmax{' '}
                    </TableCell>
                    <TableCell>
                      <DriverRecommendationRank rank={cabinet.rank} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}

function compareRank(a: CabinetRecommendation, b: CabinetRecommendation) {
  return rankToRankNumber(b.rank) - rankToRankNumber(a.rank);
}

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
import HoqsLogo from '@core/components/brands/HoqsLogo';
import { useNavigate } from 'react-router-dom';
import { rankToRankNumber } from '../driver/DriverRecommendationRank';
import DriverRecommendationRank from '../driver/DriverRecommendationRank';

interface Props {
  id: string;
}

interface DriverRecommendation {
  notes: string;
  rank: DriverRank;
  driver_id: string;
  drivers: {
    id: string;
    brand: string;
    model: string;
    size_inches: number;
    p_max: number;
    x_max: number;
  };
}

export default function DriverRecommendation({ id }: Props) {
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = React.useState('');
  const driverReqRef = useRef(
    supabase
      .from('driver_recommendations')
      .select(
        `
        notes,
        rank,
        driver_id,
        drivers (
          id, brand, model, size_inches, p_max, x_max
        )`
      )
      .eq('cabinet_id', id)
  );

  const { StatusComponent, data: driverRecommendations } =
    // @ts-expect-error - Injecting the type of the request makes it complain
    useSupabaseRequest<DriverRecommendation[]>(driverReqRef.current);

  function containsName(driver: DriverRecommendation) {
    const filter = filterValue.toLowerCase();
    return (
      driver.drivers.brand.toLowerCase().match(filter) !== null ||
      driver.drivers.model.toLowerCase().match(filter) !== null
    );
  }

  return (
    <>
      <StatusComponent />
      {driverRecommendations && (
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
            aria-label="A table showing all drivers that fit the cabinet"
            classNames={{
              base: 'max-h-[520px] overflow-scroll',
            }}
            selectionMode="single"
          >
            <TableHeader>
              <TableColumn key="name">Driver</TableColumn>
              <TableColumn key="specs">Specs</TableColumn>
              <TableColumn key="height">Rank</TableColumn>
            </TableHeader>
            <TableBody
              /* isLoading={isLoading}
        items={list.items} */
              loadingContent={<Spinner label="Loading..." />}
            >
              {/* {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )} */}

              {driverRecommendations
                .filter(containsName)
                .sort(compareRank)
                .map((driver, i) => (
                  <TableRow
                    key={i}
                    onClick={() => navigate(`/drivers/${driver.driver_id}`)}
                    className="cursor-pointer"
                  >
                    <TableCell className="flex gap-2 h-10 items-center">
                      {driver.drivers.brand.toLowerCase() === 'hoqs' && (
                        <HoqsLogo size={20} />
                      )}
                      {driver.drivers.brand} {driver.drivers.model}
                    </TableCell>
                    <TableCell>
                      {driver.drivers.size_inches}" {driver.drivers.p_max}W{' '}
                      {driver.drivers.x_max}mm xmax{' '}
                    </TableCell>
                    <TableCell>
                      <DriverRecommendationRank rank={driver.rank} />
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

function compareRank(a: DriverRecommendation, b: DriverRecommendation) {
  return rankToRankNumber(b.rank) - rankToRankNumber(a.rank);
}

import { useSupabaseRequest } from 'libs/core-components/src/components/helpers/SupabaseRequest';
import { supabase } from 'libs/core-components/src/lib/supabase';
import { DriverRank } from 'libs/core-components/src/types/types';
import {
  Input,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react';
import React, { useRef } from 'react';
import { MessageSquareTextIcon, Search } from 'lucide-react';
import HoqsLogo from 'libs/core-components/src/components/brands/HoqsLogo';
import { useNavigate } from 'react-router-dom';
import DriverRecommendationRank from '../driver/DriverRecommendationRank';
import {
  compareRank,
  containsName,
  isHoqsBrand,
} from 'libs/core-components/src/lib/helpers';

interface Props {
  id: string;
}

interface DriverRecommendationProps {
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

export function DriverRecommendation({ id }: Props) {
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

  const { StatusComponent, data: driverRecommendations, isLoading } =
    // @ts-expect-error - Injecting the type of the request makes it complain
    useSupabaseRequest<DriverRecommendationProps[]>(driverReqRef.current);

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
              base: 'max-h-[520px]',
            }}
            selectionMode="single"
          >
            <TableHeader>
              <TableColumn key="name">Driver</TableColumn>
              <TableColumn key="specs">Specs</TableColumn>
              <TableColumn key="height">Rank</TableColumn>
              <TableColumn key="height">Notes</TableColumn>
            </TableHeader>
            <TableBody
              isLoading={isLoading}
              items={driverRecommendations}
              emptyContent="No driver recommendations found"
              loadingContent={<Spinner label="Loading..." />}
            >
              {driverRecommendations
                .filter((d) =>
                  containsName([d.drivers.brand, d.drivers.model], filterValue)
                )
                .sort(compareRank)
                .map((driver, i) => (
                  <TableRow
                    key={i}
                    onClick={() => navigate(`/drivers/${driver.driver_id}`)}
                    className="cursor-pointer"
                  >
                    <TableCell className="flex gap-2 h-10 items-center">
                      {isHoqsBrand(driver.drivers) && <HoqsLogo size={20} />}
                      {driver.drivers.brand} {driver.drivers.model}
                    </TableCell>
                    <TableCell>
                      {driver.drivers.size_inches}" {driver.drivers.p_max}W{' '}
                      {driver.drivers.x_max}mm xmax{' '}
                    </TableCell>
                    <TableCell>
                      <DriverRecommendationRank rank={driver.rank} />
                    </TableCell>
                    <TableCell>
                      {driver.notes && driver.notes.length !== 0 && (
                        <Tooltip
                          content={driver.notes}
                          closeDelay={0}
                          classNames={{
                            base: 'max-w-md',
                          }}
                        >
                          <MessageSquareTextIcon />
                        </Tooltip>
                      )}
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

export default DriverRecommendation;

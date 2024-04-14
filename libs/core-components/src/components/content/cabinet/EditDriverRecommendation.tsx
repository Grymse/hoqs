import { useSupabaseRequest } from '@core/components/helpers/SupabaseRequest';
import { supabase } from '@core/lib/supabase';
import { DriverRank } from '@core/types/types';
import {
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import React, { useEffect, useRef } from 'react';
import { Search, Trash } from 'lucide-react';
import HoqsLogo from '@core/components/brands/HoqsLogo';
import { useNavigate } from 'react-router-dom';
import { rankToRankNumber } from '../driver/DriverRecommendationRank';
import DriverRecommendation from './DriverRecommendation';
import { DRIVER_RANK } from '@core/lib/variables';

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

export default function EditDriverRecommendation({ id }: Props) {
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

  const [recommendations, setRecommendations] = React.useState<
    DriverRecommendation[] | null
  >(null);

  useEffect(() => {
    if (driverRecommendations) {
      setRecommendations(driverRecommendations);
    }
  }, [driverRecommendations]);

  return (
    <>
      <StatusComponent />
      {recommendations && (
        <EditTable
          recommendations={recommendations}
          setRecommendations={setRecommendations}
        />
      )}
    </>
  );
}

interface EditTableProps {
  recommendations: DriverRecommendation[];
  setRecommendations: React.Dispatch<
    React.SetStateAction<DriverRecommendation[] | null>
  >;
}

function EditTable({ recommendations, setRecommendations }: EditTableProps) {
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = React.useState('');

  function containsName(driver: DriverRecommendation) {
    const filter = filterValue.toLowerCase();
    return (
      driver.drivers.brand.toLowerCase().match(filter) !== null ||
      driver.drivers.model.toLowerCase().match(filter) !== null
    );
  }

  function remove(index: number) {
    const newRecommendations = recommendations.slice();
    newRecommendations.splice(index, 1);
    setRecommendations(newRecommendations);
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        isClearable
        className="w-full sm:max-w-[44%]"
        placeholder="Search by name..."
        aria-label="Search by name"
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
          <TableColumn key="driver">Driver</TableColumn>
          <TableColumn key="specs">Specs</TableColumn>
          <TableColumn key="rank">Rank</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {recommendations
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
                  <Select
                    radius="full"
                    aria-label="Select Rank"
                    className="w-32"
                    classNames={{ base: 'm-2' }}
                    size="sm"
                    placeholder="Select Rank"
                    selectionMode="single"
                    isRequired
                    defaultSelectedKeys={[driver.rank]}
                  >
                    {DRIVER_RANK.map((rank) => (
                      <SelectItem key={rank} value={rank}>
                        {rank}
                        {/* <DriverRecommendationRank rank={rank} /> */}
                      </SelectItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell className="flex gap-4">
                  {/* <Button size="sm" isIconOnly>
                    <Pencil />
                  </Button> */}
                  <Button
                    size="sm"
                    onPress={() => remove(i)}
                    isIconOnly
                    color="danger"
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

function compareRank(a: DriverRecommendation, b: DriverRecommendation) {
  return rankToRankNumber(b.rank) - rankToRankNumber(a.rank);
}

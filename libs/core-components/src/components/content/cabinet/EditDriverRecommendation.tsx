import { supabase } from 'libs/core-components/src/lib/supabase.ts';
import { DriverRank } from 'libs/core-components/src/types/types.ts';
import { useEffect, useRef, useState } from 'react';
import { useSupabaseRequest } from '../../helpers/SupabaseRequest';
import { useNavigate } from 'react-router-dom';
import {
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
import { Search } from 'lucide-react';
import { containsName } from 'libs/core-components/src/lib/search.ts';
import HoqsLogo from '../../brands/HoqsLogo';
import DriverRecommendationRank, {
  rankToRankNumber,
} from '../driver/DriverRecommendationRank';
import { DRIVER_RANK } from 'libs/core-components/src/lib/variables.ts';

interface Props {
  id: string;
}

interface DriverRecommendation {
  notes: string;
  rank: DriverRank;
  driver_id: string;
  driver: {
    id: string;
    brand: string;
    model: string;
    size_inches: number;
    p_max: number;
    x_max: number;
  };
}

export function EditDriverRecommendation({ id }: Props) {
  const recommendedReqRef = useRef(
    supabase
      .from('driver_recommendations')
      .select(
        `
        notes,
        rank,
        driver_id`
      )
      .eq('cabinet_id', id)
  );

  const allDriversReqRef = useRef(
    supabase
      .from('drivers')
      .select(`id, brand, model, size_inches, p_max, x_max`)
  );

  const {
    StatusComponent: StatusComponentRecommendations,
    data: driverRecommendations,
  } = useSupabaseRequest(recommendedReqRef.current);

  const { StatusComponent: StatusComponentDrivers, data: drivers } =
    useSupabaseRequest(allDriversReqRef.current);

  const [recommendations, setRecommendations] = useState<
    DriverRecommendation[] | null
  >(null);

  useEffect(() => {
    if (driverRecommendations && drivers) {
      const mappedRecommendations = driverRecommendations.reduce(
        (map, recommendation) => {
          map.set(recommendation.driver_id, recommendation);
          return map;
        },
        new Map<string, any>()
      );

      setRecommendations(
        drivers.map((d) => ({
          notes: '',
          rank: 'None',
          driver_id: d.id,
          driver: d,
          ...mappedRecommendations.get(d.id),
        }))
      );
    }
  }, [driverRecommendations, drivers]);

  return (
    <>
      {StatusComponentDrivers ? (
        <StatusComponentDrivers />
      ) : (
        StatusComponentRecommendations && <StatusComponentRecommendations />
      )}

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
  const [filterValue, setFilterValue] = useState('');
  const [selectedDriverSizes, setSelectedDriverSizes] = useState<number[]>([]);

  const driverSizes = Array.from(
    new Set(recommendations.map((r) => r.driver.size_inches))
  ).sort((a, b) => a - b);

  console.log(selectedDriverSizes);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          aria-label="Search by name"
          startContent={<Search />}
          value={filterValue}
          onClear={() => setFilterValue('')}
          onValueChange={setFilterValue}
        />
        <Select
          aria-label="Select Speaker Size"
          className="w-48"
          placeholder="Select Speaker Size"
          selectionMode="multiple"
          onChange={(e) =>
            setSelectedDriverSizes(
              e.target.value === '' ? [] : e.target.value.split(',').map(Number)
            )
          }
          value={selectedDriverSizes.map(String).join(',')}
          renderValue={(value) => (
            <span className="truncate">
              {value.map((v) => `${v.key}"`).join(', ')}
            </span>
          )}
        >
          {driverSizes.map((size) => (
            <SelectItem key={size} value={size} textValue={String(size)}>
              {size}"
            </SelectItem>
          ))}
        </Select>
      </div>
      <Table
        isHeaderSticky
        aria-label="A table showing all drivers that fit the cabinet"
        classNames={{
          base: 'max-h-[520px]',
        }}
      >
        <TableHeader>
          <TableColumn key="driver">Driver</TableColumn>
          <TableColumn key="specs">Specs</TableColumn>
          <TableColumn key="rank">Rank</TableColumn>
        </TableHeader>
        <TableBody>
          {recommendations
            .filter(
              (d) =>
                selectedDriverSizes.length === 0 ||
                selectedDriverSizes.includes(d.driver.size_inches)
            )
            .filter((d) =>
              containsName([d.driver.brand, d.driver.model], filterValue)
            )
            .sort(compareRank)
            .map((driver, i) => (
              <TableRow key={i}>
                <TableCell
                  className="flex gap-2 h-10 items-center cursor-pointer hover:bg-default-100"
                  onClick={() => navigate(`/drivers/${driver.driver_id}`)}
                >
                  {driver.driver.brand.toLowerCase() === 'hoqs' && (
                    <HoqsLogo size={20} />
                  )}
                  {driver.driver.brand} {driver.driver.model}
                </TableCell>
                <TableCell>
                  {driver.driver.size_inches}" {driver.driver.p_max}W{' '}
                  {driver.driver.x_max}mm xmax{' '}
                </TableCell>
                <TableCell>
                  <Select
                    radius="full"
                    aria-label="Select Rank"
                    className="w-32"
                    classNames={{ base: 'm-0' }}
                    size="sm"
                    placeholder="Select Rank"
                    selectionMode="single"
                    variant="underlined"
                    isRequired
                    defaultSelectedKeys={[driver.rank]}
                    renderValue={(value) => (
                      <DriverRecommendationRank
                        rank={
                          (value[0].key as DriverRank | undefined) ?? 'None'
                        }
                      />
                    )}
                  >
                    {DRIVER_RANK.map((rank) => (
                      <SelectItem key={rank} value={rank} textValue={rank}>
                        <DriverRecommendationRank rank={rank} />
                      </SelectItem>
                    ))}
                  </Select>
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

export default EditDriverRecommendation;

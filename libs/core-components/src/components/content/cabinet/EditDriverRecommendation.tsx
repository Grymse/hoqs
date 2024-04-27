import { supabase } from 'libs/core-components/src/lib/supabase';
import { DriverRank } from 'libs/core-components/src/types/types';
import { useEffect, useState, useMemo } from 'react';
import { useSupabaseRequestOnce } from '../../helpers/SupabaseRequest';
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
import { containsName } from 'libs/core-components/src/lib/search';
import HoqsLogo from '../../brands/HoqsLogo';
import DriverRecommendationRank from '../driver/DriverRecommendationRank';
import { DRIVER_RANK } from 'libs/core-components/src/lib/variables';
import { toMap } from 'libs/core-components/src/lib/translations';
import { compareRank, isHoqsBrand } from 'libs/core-components/src/lib/helpers';
import { DriverSizeSelector } from '../driver/DriverSizesSelector';

interface Props {
  id: string;
  setRecommendationChanges: (changes: DriverRecommendation[]) => void;
}

export type DriverRecommendation = {
  id?: string;
  notes: string;
  rank: DriverRank;
  driver_id: string;
};

type DriverRecommendationWithDriver = DriverRecommendation & {
  driver: {
    id: string;
    brand: string;
    model: string;
    size_inches: number;
    p_max: number;
    x_max: number;
  };
};

export function EditDriverRecommendation({
  id,
  setRecommendationChanges,
}: Props) {
  const {
    StatusComponent: StatusComponentRecommendations,
    data: driverRecommendations,
  } = useSupabaseRequestOnce(
    supabase
      .from('driver_recommendations')
      .select(`id, notes, rank, driver_id`)
      .eq('cabinet_id', id)
  );

  const { StatusComponent: StatusComponentDrivers, data: drivers } =
    useSupabaseRequestOnce(
      supabase
        .from('drivers')
        .select(`id, brand, model, size_inches, p_max, x_max`)
    );

  const [recommendations, setRecommendations] = useState<
    DriverRecommendationWithDriver[] | null
  >(null);

  const [originalRecommendationsMap, setOriginalRecommendationsMap] =
    useState<Map<string, DriverRecommendation> | null>(null);

  useEffect(() => {
    if (!driverRecommendations || !drivers) return;

    const mappedRecommendations = toMap(driverRecommendations, 'driver_id');
    setOriginalRecommendationsMap(mappedRecommendations);

    setRecommendations(
      drivers
        .map((d) => ({
          notes: '',
          rank: 'None',
          driver_id: d.id,
          driver: d,
          ...mappedRecommendations.get(d.id),
        }))
        .sort(compareRank)
    );
  }, [driverRecommendations, drivers]);

  useEffect(() => {
    if (!recommendations || !originalRecommendationsMap) return;

    const newChanges = recommendations.filter(
      (r) =>
        originalRecommendationsMap.get(r.driver_id)?.rank !== r.rank &&
        !(r.rank === 'None' && !r.id)
    );

    setRecommendationChanges(newChanges);
  }, [recommendations]);

  if (!drivers) return <StatusComponentDrivers />;
  if (!driverRecommendations) return <StatusComponentRecommendations />;
  if (!recommendations) return null;

  return (
    <EditTable
      recommendations={recommendations}
      setRecommendations={setRecommendations}
    />
  );
}

interface EditTableProps {
  recommendations: DriverRecommendationWithDriver[];
  setRecommendations: React.Dispatch<
    React.SetStateAction<DriverRecommendationWithDriver[] | null>
  >;
}

function EditTable({ recommendations, setRecommendations }: EditTableProps) {
  const [filterValue, setFilterValue] = useState('');
  const [selectedDriverSizes, setSelectedDriverSizes] = useState<number[]>([]);

  useEffect(() => {
    if (recommendations) {
      setRecommendations(recommendations.sort(compareRank));
    }
  }, [selectedDriverSizes, filterValue]);

  const drivers = useMemo(
    () => recommendations.map((r) => r.driver),
    [recommendations]
  );

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
        <DriverSizeSelector
          drivers={drivers}
          selectedDriverSizes={selectedDriverSizes}
          setSelectedDriverSizes={setSelectedDriverSizes}
        />
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
            .map((driver, i) => (
              <TableRow key={i}>
                <TableCell className="flex gap-2 h-10 items-center">
                  {isHoqsBrand(driver.driver) && <HoqsLogo size={20} />}
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
                    onChange={(e) =>
                      setRecommendations((r) => {
                        if (!r) return null;
                        const index = r.findIndex(
                          (rec) => rec.driver_id === driver.driver_id
                        );
                        r[index].rank = e.target.value as DriverRank;
                        return [...r];
                      })
                    }
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

export default EditDriverRecommendation;

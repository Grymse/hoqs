import PageContainer from 'libs/core-components/src/components/ui/PageContainer';
import { supabase } from 'libs/core-components/src/lib/supabase';
import { useSupabaseRequest } from 'libs/core-components/src/components/helpers/SupabaseRequest';
import { useEffect, useMemo, useState } from 'react';
import {
  TableHeader,
  Table,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  SelectItem,
  Input,
  SortDescriptor,
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import ProtectedFeature from 'libs/core-components/src/components/auth/ProtectedFeature';
import { CabinetBadgeList } from 'libs/core-components/src/components/content/cabinet/CabinetBadge';
import AddDriverButton from 'libs/core-components/src/components/content/driver/AddDriver';
import { Driver } from 'libs/core-components/src/types/types';
import { Select } from '@nextui-org/react';
import { Search } from 'lucide-react';
import { containsName } from '../../lib/search';

export function Drivers() {
  const navigate = useNavigate();
  const [fetchSettings] = useState({
    active: true,
  });

  const cabFetch = useMemo(() => fetchDrivers(fetchSettings), [fetchSettings]);

  const { data: d, StatusComponent } = useSupabaseRequest(cabFetch);
  const [drivers, setDrivers] = useState<Driver[] | null>(null);
  const [filterValue, setFilterValue] = useState('');
  const [selectedDriverSizes, setSelectedDriverSizes] = useState<number[]>([]);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'model',
    direction: 'ascending',
  });

  const driverSizes = useMemo(
    () =>
      Array.from(
        new Set(drivers?.map((r) => r.size_inches).filter((d) => d !== null))
      ).sort((a, b) => a - b),
    [drivers]
  );

  useEffect(() => {
    if (d) {
      // @ts-expect-error - Does not return the right type
      setDrivers(d.map((d) => ({ ...d, name: d.brand + ' ' + d.model })));
    }
  }, [d]);

  function goToDriver(id: string) {
    navigate(`/drivers/${id}`);
  }

  function addDriver(driver: Driver) {
    // @ts-expect-error - Does not return the right type
    setDrivers((drivers) => [driver, ...drivers]);
  }

  return (
    <PageContainer className="relative">
      <StatusComponent />
      <ProtectedFeature>
        <div className="flex justify-between mb-4">
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
                e.target.value === ''
                  ? []
                  : e.target.value.split(',').map(Number)
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
          <AddDriverButton onNewDriver={addDriver} />
        </div>
      </ProtectedFeature>
      {drivers && (
        <Table
          onSortChange={setSortDescriptor}
          sortDescriptor={sortDescriptor}
          aria-label="Example empty table"
          selectionMode="single"
        >
          <TableHeader>
            <TableColumn key="name" allowsSorting>
              Model
            </TableColumn>
            <TableColumn key="size_inches" allowsSorting>
              Size
            </TableColumn>
            <TableColumn key="p_w" allowsSorting>
              Power
            </TableColumn>
            <TableColumn key="spl" allowsSorting>
              Sensitivity
            </TableColumn>
            <TableColumn key="bl" allowsSorting>
              Bl
            </TableColumn>
            <TableColumn key="x_max" allowsSorting>
              Xmax
            </TableColumn>
          </TableHeader>
          <TableBody emptyContent={'No rows to display.'}>
            {drivers
              ? drivers
                  .sort(sortByDescriptor(sortDescriptor))
                  .filter(
                    (d) =>
                      selectedDriverSizes.length === 0 ||
                      selectedDriverSizes.includes(d.size_inches ?? 0)
                  )
                  .filter((d) => containsName([d.brand, d.model], filterValue))
                  .map((driver) => (
                    <TableRow
                      key={driver.id}
                      onClick={() => goToDriver(driver.id)}
                      className="cursor-pointer"
                    >
                      <TableCell>
                        {driver.brand + ' ' + driver.model}{' '}
                        <CabinetBadgeList size="sm" badges={driver.badges} />
                      </TableCell>
                      <TableCell>{driver.size_inches}"</TableCell>
                      <TableCell>{driver.p_w}w</TableCell>
                      <TableCell>{driver.spl}dB</TableCell>
                      <TableCell>{driver.bl}</TableCell>
                      <TableCell>{driver.x_max}mm</TableCell>
                    </TableRow>
                  ))
              : []}
          </TableBody>
        </Table>
      )}
    </PageContainer>
  );
}

interface FetchSettings {
  active: boolean;
}

type SortableObject = { [key: string]: any };

function sortByDescriptor<T extends SortableObject>(
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

function sortByColumnOld(a: Driver, b: Driver, sortDescriptor: SortDescriptor) {
  const column = sortDescriptor.column;
  const direction = sortDescriptor.direction;

  if (column === 'model') {
    const aName = a.brand + ' ' + a.model;
    const bName = b.brand + ' ' + b.model;
    return direction === 'ascending'
      ? aName.localeCompare(bName)
      : bName.localeCompare(aName);
  } else if (column === 'size_inches') {
    return direction === 'ascending'
      ? (a.size_inches ?? 0) - (b.size_inches ?? 0)
      : (b.size_inches ?? 0) - (a.size_inches ?? 0);
  } else if (column === 'p_w') {
    if (a.p_w === null || b.p_w === null) return 0;
    return direction === 'ascending' ? a.p_w - b.p_w : b.p_w - a.p_w;
  } else if (column === 'spl') {
    if (a.spl === null || b.spl === null) return 0;
    return direction === 'ascending' ? a.spl - b.spl : b.spl - a.spl;
  }

  return 0;
}

function fetchDrivers(settings: FetchSettings) {
  const fetch = supabase
    .from('drivers')
    .select('id, brand, badges, model, size_inches, p_w, spl, bl, x_max');

  return fetch;
}

export default Drivers;

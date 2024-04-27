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
  Input,
  SortDescriptor,
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import ProtectedFeature from 'libs/core-components/src/components/auth/ProtectedFeature';
import { CabinetBadgeList } from 'libs/core-components/src/components/content/cabinet/CabinetBadge';
import AddDriverButton from 'libs/core-components/src/components/content/driver/AddDriver';
import { Driver } from 'libs/core-components/src/types/types';
import { Search } from 'lucide-react';
import { containsName } from '../../lib/search';
import { sortByDescriptor } from '../../lib/helpers';
import { DriverSizeSelector } from '../../components/content/driver/DriverSizesSelector';

export function Drivers() {
  const navigate = useNavigate();
  const [fetchSettings] = useState({
    active: true,
  });
  const [selectedDriverSizes, setSelectedDriverSizes] = useState<number[]>([]);

  const cabFetch = useMemo(() => fetchDrivers(fetchSettings), [fetchSettings]);

  const { data: d, StatusComponent } = useSupabaseRequest(cabFetch);
  const [drivers, setDrivers] = useState<Driver[] | null>(null);
  const [filterValue, setFilterValue] = useState('');
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'model',
    direction: 'ascending',
  });

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
          <DriverSizeSelector
            drivers={drivers}
            selectedDriverSizes={selectedDriverSizes}
            setSelectedDriverSizes={setSelectedDriverSizes}
          />
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

function fetchDrivers(settings: FetchSettings) {
  const fetch = supabase
    .from('drivers')
    .select('id, brand, badges, model, size_inches, p_w, spl, bl, x_max');

  return fetch;
}

export default Drivers;

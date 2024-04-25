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
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import ProtectedFeature from 'libs/core-components/src/components/auth/ProtectedFeature';
import { CabinetBadgeList } from 'libs/core-components/src/components/content/cabinet/CabinetBadge';
import AddDriverButton from 'libs/core-components/src/components/content/driver/AddDriver';
import { Driver } from 'libs/core-components/src/types/types';

export function Drivers() {
  const navigate = useNavigate();
  const [fetchSettings] = useState({
    active: true,
  });

  const cabFetch = useMemo(() => fetchDrivers(fetchSettings), [fetchSettings]);

  const { data: d, StatusComponent } = useSupabaseRequest(cabFetch);
  const [drivers, setDrivers] = useState<Driver[] | null>(null);
  useEffect(() => {
    if (d) {
      // @ts-expect-error - Does not return the right type
      setDrivers(d);
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
        <div className="flex w-full justify-end mb-4">
          <AddDriverButton onNewDriver={addDriver} />
        </div>
      </ProtectedFeature>
      {drivers && (
        <Table aria-label="Example empty table" selectionMode="single">
          <TableHeader>
            <TableColumn>Model</TableColumn>
            <TableColumn>Size</TableColumn>
            <TableColumn>Power</TableColumn>
            <TableColumn>Sensitivity</TableColumn>
          </TableHeader>
          <TableBody emptyContent={'No rows to display.'}>
            {drivers
              ? drivers.map((driver) => (
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
    .select('id, brand, badges, model, size_inches, p_w, spl');

  return fetch;
}

export default Drivers;

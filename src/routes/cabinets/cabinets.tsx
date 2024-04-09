import PageContainer from '../../components/ui/PageContainer';
import CabinetCard from '../../components/ui/cabinet/CabinetCard';
import { supabase } from '@/lib/supabase';
import { useSupabaseRequest } from '@/components/SupabaseRequest';
import { useMemo, useState } from 'react';
import AddCabinetButton from '../../components/content/cabinet/AddCabinetButton';
import { CabinetBadgeList } from '../../components/content/cabinet/CabinetBadge';
import {
  Tab,
  TableHeader,
  Tabs,
  Table,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Switch,
} from '@nextui-org/react';
import { formatFrequency } from '@/lib/translations';
import { useNavigate } from 'react-router-dom';
import ProtectedFeature from '@/components/auth/ProtectedFeature';

export function Cabinets() {
  const navigate = useNavigate();
  const [fetchSettings, setFetchSettings] = useState({
    active: true,
  });

  const cabFetch = useMemo(() => fetchCabinets(fetchSettings), [fetchSettings]);

  const { data: cabinets, StatusComponent } = useSupabaseRequest(cabFetch);

  function goToCabinet(id: string) {
    navigate(`/cabinets/${id}`);
  }

  return (
    <PageContainer>
      <StatusComponent />
      <ProtectedFeature>
        <div className="w-full mb-4 flex justify-end gap-4">
          <Switch
            value={String(!fetchSettings.active)}
            onValueChange={(isSelected) =>
              setFetchSettings({ ...fetchSettings, active: !isSelected })
            }
          >
            Show hidden
          </Switch>
          <AddCabinetButton />
        </div>
      </ProtectedFeature>
      {cabinets && (
        <div className="flex w-full flex-col">
          <Tabs aria-label="Views">
            <Tab key="gallery" title="Gallery">
              <div className="flex gap-4 justify-center">
                {cabinets?.map((cabinet) => (
                  <CabinetCard key={cabinet.id} cabinet={cabinet} />
                ))}
              </div>
            </Tab>
            <Tab key="table" title="Table">
              <Table aria-label="Example empty table" selectionMode="single">
                <TableHeader>
                  <TableColumn>Cabinet</TableColumn>
                  <TableColumn>Type</TableColumn>
                  <TableColumn>Range</TableColumn>
                  <TableColumn>Sensitivity</TableColumn>
                </TableHeader>
                <TableBody emptyContent={'No rows to display.'}>
                  {cabinets
                    ? cabinets.map((cabinet) => (
                        <TableRow
                          key={cabinet.id}
                          onClick={() => goToCabinet(cabinet.id)}
                          className="cursor-pointer"
                        >
                          <TableCell>
                            {cabinet.brand + ' ' + cabinet.model}{' '}
                            <CabinetBadgeList
                              size="sm"
                              badges={cabinet.badges}
                            />
                          </TableCell>
                          <TableCell>{cabinet.type}</TableCell>
                          <TableCell>
                            {formatFrequency(cabinet.frequency_start)}-
                            {formatFrequency(cabinet.frequency_end)}
                          </TableCell>
                          <TableCell>{cabinet.sensitivity}dB</TableCell>
                        </TableRow>
                      ))
                    : []}
                </TableBody>
              </Table>
            </Tab>
          </Tabs>
        </div>
      )}
    </PageContainer>
  );
}

interface FetchSettings {
  active: boolean;
}

function fetchCabinets(settings: FetchSettings) {
  let fetch = supabase
    .from('cabinets')
    .select(
      'id, brand, model, images, type, badges, frequency_start, frequency_end, sensitivity'
    );

  if (settings.active) fetch = fetch.eq('active', true);

  return fetch;
}

export default Cabinets;

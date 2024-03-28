import PageContainer from '../../components/ui/PageContainer';
/* import { TableBody, TableColumn, TableHeader } from '@nextui-org/react';
import { Table } from 'lucide-react'; */
import CabinetCard from '../../components/ui/cabinet/CabinetCard';
import { supabase } from '@/lib/supabase';
import { useSupabaseRequest } from '@/components/SupabaseRequest';
import { useState } from 'react';
import AdminOnly from '@/components/AdminOnly';
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
} from '@nextui-org/react';
import { formatFrequency } from '@/lib/translations';
import { useNavigate } from 'react-router-dom';

export function Cabinets() {
  const navigate = useNavigate();

  // Setup as useState in case we want to add filters later
  const [cabFetch] = useState(
    supabase
      .from('cabinets')
      .select(
        'id, brand, model, images, type, badges, frequency_start, frequency_end, sensitivity'
      )
      .eq('active', true)
  );

  const { data: cabinets, StatusComponent } = useSupabaseRequest(cabFetch);

  function goToCabinet(id: string) {
    navigate(`/cabinets/${id}`);
  }

  return (
    <PageContainer>
      <StatusComponent />
      <div className="w-full mb-4 flex justify-end">
        <AdminOnly>
          <AddCabinetButton />
        </AdminOnly>
      </div>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Views">
          <Tab key="gallary" title="Gallery">
            {cabinets?.map((cabinet) => (
              <CabinetCard key={cabinet.id} cabinet={cabinet} />
            ))}
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
                          <CabinetBadgeList size="sm" badges={cabinet.badges} />
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
    </PageContainer>
  );
}

export default Cabinets;

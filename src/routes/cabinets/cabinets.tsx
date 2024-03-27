import PageContainer from '../../components/ui/PageContainer';
/* import { TableBody, TableColumn, TableHeader } from '@nextui-org/react';
import { Table } from 'lucide-react'; */
import CabinetCard from '../../components/ui/cabinet/CabinetCard';
import { supabase } from '@/lib/supabase';
import { useSupabaseRequest } from '@/components/SupabaseRequest';
import { useState } from 'react';
import AdminOnly from '@/components/AdminOnly';
import AddCabinetButton from '../../components/content/cabinet/AddCabinetButton';

/* export function Cabinets() {
  return (
    <PageContainer>
      <Table aria-label="Example empty table">
        <TableHeader>
          <TableColumn>Cabinet</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No rows to display.'}>{[]}</TableBody>
      </Table>
    </PageContainer>
  );
} */

export function Cabinets() {
  const [cabFetch] = useState(
    supabase
      .from('cabinets')
      .select('id, brand, model, images, type, badges')
      .eq('active', true)
  );

  const { data: cabinets, StatusComponent } = useSupabaseRequest(cabFetch);

  return (
    <PageContainer>
      <StatusComponent />
      <div className="w-full mb-4 flex justify-end">
        <AdminOnly>
          <AddCabinetButton />
        </AdminOnly>
      </div>
      {cabinets?.map((cabinet) => (
        <CabinetCard key={cabinet.id} cabinet={cabinet} />
      ))}
    </PageContainer>
  );
}

export default Cabinets;

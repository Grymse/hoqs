import { TableBody, TableColumn, TableHeader } from '@nextui-org/react';
import { PageContainer } from 'core-components';
import { Table } from 'lucide-react';

export function Cabinets() {
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
}

export default Cabinets;

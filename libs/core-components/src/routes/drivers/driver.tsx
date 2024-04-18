import { useSupabaseRequest } from 'libs/core-components/src/components/helpers/SupabaseRequest.tsx';
import PageContainer from 'libs/core-components/src/components/ui/PageContainer.tsx';
import { supabase } from 'libs/core-components/src/lib/supabase.ts';
import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from 'libs/core-components/src/components/ui/Header.tsx';
import Text from 'libs/core-components/src/components/ui/Text.tsx';
import {
  Button,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Table,
} from '@nextui-org/react';
import ProtectedFeature from 'libs/core-components/src/components/auth/ProtectedFeature.tsx';
import { Driver as DriverType } from 'libs/core-components/src/types/types.ts';
import { DriverBadgeList } from 'libs/core-components/src/components/content/driver/DriverBadge.tsx';
import { formatFrequency } from 'libs/core-components/src/lib/translations.ts';
import CabinetRecommendation from 'libs/core-components/src/components/content/driver/CabinetRecommendation.tsx';
import { driverAttributes } from 'libs/core-components/src/lib/driverAttributes.ts';

export function Driver() {
  const { id } = useParams();
  const cabReq = useRef(supabase.from('drivers').select('*').eq('id', id));
  const { StatusComponent, data } = useSupabaseRequest(cabReq.current);
  const driver = data?.[0] as DriverType;

  return (
    <PageContainer>
      <StatusComponent />
      {driver && (
        <>
          <div className="flex justify-between">
            <Header>{driver.brand + ' ' + driver.model}</Header>
            <DriverBadgeList badges={driver.badges} />
            <ProtectedFeature>
              <Button as={Link} disabled to={'./edit'} color="primary">
                Edit
              </Button>
            </ProtectedFeature>
          </div>
          <Text>{driver.description}</Text>
          <Header variant="subtitle">Attributes</Header>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <Header variant="sub-subtitle">Primary</Header>
              <Table
                hideHeader
                aria-label="A table showing all attributes for the driver"
              >
                <TableHeader>
                  <TableColumn>ATTRIBUTE</TableColumn>
                  <TableColumn>VALUE</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="0">
                    <TableCell>Model</TableCell>
                    <TableCell>
                      {driver.brand} {driver.model}
                    </TableCell>
                  </TableRow>
                  <TableRow key="1">
                    <TableCell>Sensitivity (1w, 1m) (SPL 1w)</TableCell>
                    <TableCell>{driver.spl}dB</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Frequency response (fr)</TableCell>
                    <TableCell>
                      {formatFrequency(driver.fr_start)} -{' '}
                      {formatFrequency(driver.fr_end)}
                    </TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Type</TableCell>
                    <TableCell>{driver.type}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            {driverAttributes.map((category) => (
              <div key={category.name}>
                <Header variant="sub-subtitle">{category.name}</Header>
                <Table
                  hideHeader
                  aria-label="A table showing all attributes for the driver"
                >
                  <TableHeader>
                    <TableColumn>ATTRIBUTE</TableColumn>
                    <TableColumn>VALUE</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(category.attributes)
                      .filter((a) => !!driver[a[0] as keyof DriverType])
                      .map(([key, value], i) => (
                        <TableRow key={i + 4}>
                          <TableCell>
                            {value.name}{' '}
                            {value.symbol ? `(${value.symbol})` : ''}
                          </TableCell>
                          <TableCell>
                            {driver[key as keyof DriverType]}
                            {value.units}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
          {id && (
            <>
              <Header variant="subtitle">Cabinet Recommendations</Header>
              <CabinetRecommendation driverId={id} />
            </>
          )}
        </>
      )}
    </PageContainer>
  );
}

export default Driver;

import { useSupabaseRequest } from '@/components/SupabaseRequest';
import PageContainer from '@/components/ui/PageContainer';
import { supabase } from '@/lib/supabase';
import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/ui/Header';
import Text from '@/components/ui/Text';
import {
  Button,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Table,
} from '@nextui-org/react';
import { CabinetBadgeList } from '@/components/content/cabinet/CabinetBadge';
import ProtectedFeature from '@/components/auth/ProtectedFeature';
import { Driver as DriverType } from '@/types/types';
import { DriverBadgeList } from '@/components/content/driver/DriverBadge';
import { formatFrequency } from '../../lib/translations';

export default function Driver() {
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
          <CabinetBadgeList badges={driver.badges} />
          <Text>{driver.description}</Text>
          <Header variant="subtitle">Attributes</Header>
          <div className="grid grid-cols-2 gap-4">
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
            {attributes.map((category) => (
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
        </>
      )}
    </PageContainer>
  );
}

export const attributes: AttributeCategory[] = [
  {
    name: 'Thiele & Small parameters',
    attributes: {
      fs: {
        name: 'Resonance frequency (free air)',
        symbol: 'fS',
        units: 'Hz',
      },
      qms: {
        name: 'Mechanical quality factor',
        symbol: 'QMS',
      },
      qes: {
        name: 'Electrical quality factor',
        symbol: 'QES',
      },
      qts: {
        name: 'Total quality factor',
        symbol: 'QTS',
      },
    },
  },
  {
    name: 'Large signal parameters',
    attributes: {
      x_max: {
        name: 'Maximum linear excursion',
        symbol: 'xmax',
        units: 'mm',
      },
      x_lim: {
        name: 'Maximum excursion before damage',
        symbol: 'xlim',

        units: 'mm',
      },
      vd: {
        name: 'Air volume displaced at xmax',
        symbol: 'VD',
        units: 'cm³',
      },
      p_w: { name: 'Power handling', symbol: 'P', units: 'W' },
      p_max: { name: 'Program power', symbol: 'Pmax', units: 'W' },
    },
  },
  {
    name: 'Voice Coil',
    attributes: {
      z: { name: 'Nominal impedance', symbol: 'Z', units: 'Ω' },
      re: { name: 'DC resistance', symbol: 'RE', units: 'Ω' },
      le: {
        name: 'Inductance (1kHz)',
        symbol: 'LE',

        units: 'mH',
      },
      vc_diam: { name: 'VC Diameter', units: 'mm' },
      vc_material: { name: 'Winding material', type: 'string' },
      vc_former: { name: 'Former material', type: 'string' },
    },
  },
  {
    name: 'Magnet',
    attributes: {
      bl: { name: 'Force factor', symbol: 'Bl', units: 'N/A' },
      blre: {
        name: 'Motor constant',
        symbol: 'Bl/√RE',
        units: 'N/√W',
      },
      air_gap: { name: 'Air gap height', symbol: 'HAG', units: 'mm' },
      magnet_weight_kg: { name: 'Weight', units: 'kg' },
      magnet: { name: 'Material', type: 'string' },
    },
  },
  {
    name: 'Diaphragm',
    attributes: {
      dd: { name: 'Effective diameter', units: 'mm' },
      sd: { name: 'Effective area', symbol: 'SD', units: 'cm²' },
      mms: { name: 'Moving mass', symbol: 'MMS', units: 'g' },
      mmd: {
        name: 'Moving mass (without air load)',
        symbol: 'MMD',
        units: 'g',
      },
      diaphragm_material: { name: 'Material', type: 'string' },
    },
  },
  {
    name: 'Suspensions',
    attributes: {
      kms: { name: 'Stiffness', symbol: 'KMS', units: 'N/mm' },
      cms: { name: 'Compliance', symbol: 'CMS', units: 'µm/N' },
      vas: {
        name: 'Equivalent volume to the compliance',
        symbol: 'VAS',
        units: 'L',
      },
      rms: {
        name: 'Mechanical resistance',
        symbol: 'RMS',

        units: 'N·s/m',
      },
      surround_material: { name: 'Surround material', type: 'string' },
    },
  },
  {
    name: 'Dimensions',
    attributes: {
      size: { name: 'Size', units: 'mm' },
      size_inches: { name: 'Size', units: '"' },
      diam: { name: 'Overall diameter', units: 'mm' },
      mounting_diam: { name: 'Baffle cutout diameter', units: 'mm' },
      depth: { name: 'Overall depth', units: 'mm' },
      volume: { name: 'Volume occupied by the driver', units: 'L' },
      weight_kg: { name: 'Net weight', units: 'kg' },
      frame_material: { name: 'Frame material', type: 'string' },
    },
  },
];

interface AttributeCategory {
  name: string;
  attributes: Record<string, Attribute>;
}

interface Attribute {
  name: string;
  symbol?: string;
  units?: string;
  type?: string;
}

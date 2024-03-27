import {
  formatFrequency,
  kgsToPounds,
  woodThicknessToInches,
} from '@/lib/translations';
import { Tables } from '@/types/supabase';
import { WithImages } from '@/types/types';
import { mmToInches } from '../../../lib/translations';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tooltip,
} from '@nextui-org/react';
import React from 'react';
import { MAX_SPL_COUNT } from '@/lib/variables';
import { HelpCircleIcon } from 'lucide-react';

interface Props {
  cabinet: WithImages<Tables<'cabinets'>>;
}

interface Attribute {
  name: string;
  value: string | null;
  active: boolean;
  help?: string;
}

export default function Specifications({ cabinet }: Props) {
  const attributes: Attribute[] = [
    {
      name: 'Model',
      value: `${cabinet.brand} - ${cabinet.model}`,
      active: false,
    },
    { name: 'Type', value: cabinet.type, active: cabinet.type !== null },
    {
      name: 'Driver size',
      value: cabinet.driver_size.join(', '),
      active: false,
    },
    {
      name: 'Directivity',
      value: `${cabinet.directivity_horizontal}° x ${cabinet.directivity_vertical}°`,
      active:
        cabinet.directivity_horizontal !== null &&
        cabinet.directivity_vertical !== null,
    },
    {
      name: 'Frequency range',
      value: `${formatFrequency(cabinet.frequency_start)} - ${formatFrequency(
        cabinet.frequency_end
      )} (-3dB)`,
      active:
        cabinet.frequency_end !== null && cabinet.frequency_start !== null,
    },
    {
      name: 'Sensitivity (1W/1m)',
      value: `${cabinet.sensitivity}dB`,
      active: cabinet.sensitivity !== null,
      help: '8ohm @ 2.83V/1m. 4ohm @ 2V/1m.',
    },
    {
      name: 'Max SPL',
      value: cabinet.max_spl
        .map((max_spl, i) => `${max_spl}dB (${MAX_SPL_COUNT[i]})`)
        .join(` \n`),
      active: cabinet.max_spl.length !== 0,
    },
    {
      name: 'Weight (Unloaded)',
      value: `${cabinet.weight_kg} kg - ${kgsToPounds(
        cabinet.weight_kg
      )} pounds`,
      active: cabinet.weight_kg !== null,
    },
    {
      name: 'Dimensions',
      value: `${(cabinet.width_mm ?? 0) / 10} x ${
        (cabinet.height_mm ?? 0) / 10
      } x ${(cabinet.depth_mm ?? 0) / 10}cm. \n ${mmToInches(
        cabinet.width_mm
      )} x ${mmToInches(cabinet.height_mm)} x ${mmToInches(
        cabinet.depth_mm
      )} inches \n (W x H x D)`,
      active:
        cabinet.width_mm !== null &&
        cabinet.height_mm !== null &&
        cabinet.depth_mm !== null,
    },
    {
      name: 'Wood thickness',
      value: `${cabinet.wood_thickness_mm} - ${woodThicknessToInches(
        cabinet.wood_thickness_mm ?? ''
      )}`,
      active: cabinet.wood_thickness_mm !== null,
    },
  ];

  return (
    <Table hideHeader aria-label="A Table of specification of cabinet">
      <TableHeader>
        <TableColumn>Attribute</TableColumn>
        <TableColumn>Value</TableColumn>
      </TableHeader>
      <TableBody>
        {attributes
          .filter((attribute) => attribute.active)
          .map((attribute, index) => (
            <TableRow key={index}>
              <TableCell className="flex gap-2">
                {attribute.name}{' '}
                {attribute.help && (
                  <Tooltip
                    color="primary"
                    content={attribute.help}
                    closeDelay={300}
                  >
                    <HelpCircleIcon className="text-default-500" size={20} />
                  </Tooltip>
                )}
              </TableCell>
              <TableCell>
                {attribute.value?.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

/* 
export default function Specifications({ cabinet }: Props) {
  return (
    <Table hideHeader aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Attribute</TableColumn>
        <TableColumn>Value</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="2">
          <TableCell>Model</TableCell>
          <TableCell>
            {cabinet.brand} - {cabinet.model}
          </TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Type</TableCell>
          <TableCell>{cabinet.type}</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>Driver size</TableCell>
          <TableCell>{cabinet.driver_size.join(', ')}</TableCell>
        </TableRow>
        <TableRow key="5">
          <TableCell>Directivity</TableCell>
          <TableCell>
            {cabinet.directivity_horizontal}° x {cabinet.directivity_vertical}°
          </TableCell>
        </TableRow>
        <TableRow key="6">
          <TableCell>Frequency range</TableCell>
          <TableCell>
            {formatFrequency(cabinet.frequency_start)} -{' '}
            {formatFrequency(cabinet.frequency_end)}
          </TableCell>
        </TableRow>
        <TableRow key="7">
          <TableCell>Max SPL</TableCell>
          <TableCell>{cabinet.max_spl}</TableCell>
        </TableRow>
        <TableRow key="8">
          <TableCell>Sensitivity</TableCell>
          <TableCell>{cabinet.sensitivity}</TableCell>
        </TableRow>
        {cabinet.weight_kg && (
          <TableRow key="9">
            <TableCell>Weight (Unloaded)</TableCell>
            <TableCell>
              {cabinet.weight_kg} kg - {kgsToPounds(cabinet.weight_kg)} pounds
            </TableCell>
          </TableRow>
        )}
        <TableRow key="10">
          <TableCell>Dimensions</TableCell>
          <TableCell>
            {(cabinet.width_mm ?? 0) / 10} x {(cabinet.height_mm ?? 0) / 10} x{' '}
            {(cabinet.depth_mm ?? 0) / 10}cm. <br />
            {mmToInches(cabinet.width_mm)} x {mmToInches(cabinet.height_mm)} x{' '}
            {mmToInches(cabinet.depth_mm)} inches
            <br />
            (W x H x D)
          </TableCell>
        </TableRow>
        <TableRow key="11">
          <TableCell>Wood thickness</TableCell>
          <TableCell>
            {cabinet.wood_thickness_mm} /{' '}
            {woodThicknessToInches(cabinet.wood_thickness_mm ?? '')}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
 */

import {
  formatFrequency,
  kgsToPounds,
  woodThicknessToInches,
} from 'libs/core-components/src/lib/translations';
import { SpeakerCabinet } from 'libs/core-components/src/types/types';
import { mmToInches } from 'libs/core-components/src/lib/translations';
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
import { MAX_SPL_COUNT } from 'libs/core-components/src/lib/variables';
import { HelpCircleIcon } from 'lucide-react';

interface Props {
  cabinet: SpeakerCabinet;
}

interface Attribute {
  name: string;
  value: string | null;
  active: boolean;
  help?: string;
}

export function Specifications({ cabinet }: Props) {
  const attributes: Attribute[] = [
    {
      name: 'Model',
      value: `${cabinet.brand} - ${cabinet.model}`,
      active: true,
    },
    { name: 'Type', value: cabinet.type, active: cabinet.type !== null },
    {
      name: 'Driver size',
      value: cabinet.driver_size.join(', '),
      active: cabinet.driver_size.length !== 0,
    },
    {
      name: 'Release date',
      value: new Date(cabinet.created_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      active: true,
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

export default Specifications;

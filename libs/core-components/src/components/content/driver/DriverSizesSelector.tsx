import { Select, SelectItem } from '@nextui-org/react';
import { useMemo } from 'react';

type ObjectWithDriverSize = {
  size_inches: number | null;
};

type Props<T extends ObjectWithDriverSize> = {
  drivers: T[] | null;
  setSelectedDriverSizes: React.Dispatch<React.SetStateAction<number[]>>;
  selectedDriverSizes: number[];
};

export function DriverSizeSelector<T extends ObjectWithDriverSize>({
  drivers,
  setSelectedDriverSizes,
  selectedDriverSizes,
}: Props<T>) {
  const driverSizes = useMemo(
    () =>
      Array.from(
        new Set(drivers?.map((r) => r.size_inches).filter((d) => d !== null))
      ).sort((a, b) => a - b),
    [drivers]
  );

  return (
    <Select
      aria-label="Select Speaker Size"
      className="w-48"
      placeholder="Select Speaker Size"
      selectionMode="multiple"
      onChange={(e) =>
        setSelectedDriverSizes(
          e.target.value === '' ? [] : e.target.value.split(',').map(Number)
        )
      }
      value={selectedDriverSizes.map(String).join(',')}
      renderValue={(value) => (
        <span className="truncate">
          {value.map((v) => `${v.key}"`).join(', ')}
        </span>
      )}
    >
      {driverSizes.map((size) => (
        <SelectItem key={size} value={size} textValue={String(size)}>
          {size}"
        </SelectItem>
      ))}
    </Select>
  );
}

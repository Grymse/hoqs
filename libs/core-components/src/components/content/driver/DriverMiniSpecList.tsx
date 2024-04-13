import { Driver } from '@core/types/types';
import { formatFrequency } from '@core/lib/translations';
import { driverAttributes } from '@core/lib/driverAttributes';

interface Props {
  driver: Partial<Driver>;
}

export default function DriverMiniSpecList({ driver }: Props) {
  return (
    <div className="grid-cols-2 gap-x-4 grid-flow-col">
      <p className="text-tiny text-foreground-400">
        Model:{' '}
        <span className="text-foreground-600">
          {driver.brand} {driver.model}
        </span>
      </p>
      {driver.fr_start && driver.fr_end && (
        <p className="text-tiny text-foreground-400">
          Frequency response:{' '}
          <span className="text-foreground-600">
            {formatFrequency(driver.fr_start)} -{' '}
            {formatFrequency(driver.fr_end)}
          </span>
        </p>
      )}

      {(driver.spl || driver.qes || driver.p_max || driver.bl || driver.blre) &&
        driverAttributes.map((category) => (
          <>
            <p className="text-tiny text-primary-500">{category.name}</p>
            {Object.entries(category.attributes)
              .filter((a) => !!driver[a[0] as keyof Driver])
              .map(([key, value], i) => (
                <p className="text-tiny text-foreground-400">
                  {value.name} {value.symbol ? `(${value.symbol})` : ''}:
                  <span className="text-foreground-600">
                    {driver[key as keyof Driver]} {value.units}
                  </span>
                </p>
              ))}
          </>
        ))}
    </div>
  );
}

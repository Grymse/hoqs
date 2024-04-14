import { SelectItem, Select } from '@nextui-org/react';
import Badge from './Badge';
import { BadgeType } from 'libs/core-components/src/types/types.ts';

type BadgeSelectorProps = {
  badges: string[];
  setBadges: (badges: string[]) => void;
  badgeTypes: BadgeType[];
  className?: string;
} & Omit<React.ComponentProps<typeof Select>, 'children'>;

export function BadgeSelector({
  badges,
  setBadges,
  badgeTypes,
  ...props
}: BadgeSelectorProps) {
  return (
    <Select
      items={badgeTypes.map((badge) => badge.title)}
      label="Badges"
      selectionMode="multiple"
      aria-label="Select badges"
      placeholder="Select badges"
      variant="bordered"
      selectedKeys={badges}
      isMultiline
      {...props}
      onChange={(e) => setBadges(e.target.value.split(','))}
      renderValue={(badges) => {
        return (
          <div className="flex flex-wrap gap-2 -my-2">
            {badges.map((badge) => (
              <Badge
                size="sm"
                badgeTitle={badge.textValue}
                key={badge.key}
                badgeTypes={badgeTypes}
              />
            ))}
          </div>
        );
      }}
    >
      {badgeTypes.map((badge) => (
        <SelectItem
          key={badge.title}
          value={badge.title}
          textValue={badge.title}
        >
          <Badge
            size="sm"
            badgeTitle={badge.title}
            key={badge.title}
            badgeTypes={badgeTypes}
          />
        </SelectItem>
      ))}
    </Select>
  );
}

export default BadgeSelector;

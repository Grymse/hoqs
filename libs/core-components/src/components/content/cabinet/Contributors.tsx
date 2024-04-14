import Text from '@core/components/ui/Text';
import { Contributor as ContributorType } from '@core/types/types';
import { ContributorIcon, contributorIconRoles } from './ContributorEditor';

interface ContributorsProps {
  contributors: ContributorType[];
}

export function Contributors({ contributors }: ContributorsProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {contributors.sort(contributorSorter).map((contributor, index) => (
        <Contributor key={index} contributor={contributor} />
      ))}
    </div>
  );
}

const contributorSorter = (a: ContributorType, b: ContributorType) => {
  return contributorIconRoles[a.role].rank - contributorIconRoles[b.role].rank;
};

interface ContributorProps {
  contributor: ContributorType;
}

function Contributor({ contributor }: ContributorProps) {
  const Icon = contributorIconRoles[contributor.role];
  const bgColor = `bg-${Icon.className}-100`;
  return (
    <div className="flex gap-2 items-center">
      <div
        className={`w-10 h-10 rounded-full flex justify-center items-center ${bgColor}`}
      >
        <ContributorIcon role={contributor.role} />
      </div>
      <div className="flex flex-col gap-2">
        <Text variant="small" className="my-0">
          {contributor.name}
        </Text>
        <Text variant="extra-small" color="muted" className="mb-0 -mt-2">
          {contributor.description}
        </Text>
      </div>
    </div>
  );
}

export default Contributors;
import Text from '@/components/ui/Text';
import { Contributor as ContributorType } from '@/types/types';
import { ContributorIcon } from './ContributorEditor';

interface ContributorsProps {
  contributors: ContributorType[];
}

export default function Contributors({ contributors }: ContributorsProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {contributors.map((contributor, index) => (
        <Contributor key={index} contributor={contributor} />
      ))}
    </div>
  );
}

interface ContributorProps {
  contributor: ContributorType;
}

function Contributor({ contributor }: ContributorProps) {
  return (
    <div className="flex gap-2 items-center">
      <ContributorIcon role={contributor.role} />
      <div className="flex flex-col gap-2">
        <Text variant="small" className="my-0 font-medium">
          {contributor.name}
        </Text>
        <Text variant="extra-small" className="mb-0 -mt-1">
          {contributor.description}
        </Text>
      </div>
    </div>
  );
}

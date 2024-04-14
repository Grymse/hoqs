import { ColorVariant } from '@core/types/types';
import { LucideIcon } from 'lucide-react';
import { cn } from './util';

interface Props {
  color: ColorVariant;
  Icon: LucideIcon;
  size?: 'md';
}

export function Icon({ color, Icon, size = 'md' }: Props) {
  const bgColor = 'bg-' + color + '-100';
  const iconColor = 'text-' + color + '-500';
  return (
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${bgColor}`}
    >
      <Icon className={cn(iconColor, 'w-6 h-6')} />
    </div>
  );
}

export default Icon;

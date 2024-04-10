import { Button } from '@nextui-org/react';
import { LucideIcon } from 'lucide-react';

interface Props<T extends Record<string, LucideIcon>> {
  icon?: keyof T;
  setIcon: (color: keyof T) => void;
  icons: T;
}

export default function IconSelector<T extends Record<string, LucideIcon>>({
  icon,
  setIcon,
  icons,
}: Props<T>) {
  return (
    <div>
      <label
        data-slot="label"
        className="absolute z-10 pointer-events-none origin-top-left subpixel-antialiased block text-foreground-500 cursor-text will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px_-_theme(borderWidth.medium))] pe-2 max-w-full text-ellipsis overflow-hidden"
      >
        Icon
      </label>
      <div className="flex flex-wrap gap-2 mt-6">
        {Object.entries(icons).map(([title, Icon]) => (
          <Button
            size="sm"
            color={title === icon ? 'primary' : 'default'}
            isIconOnly
            onPress={() => setIcon(title)}
          >
            <Icon />
          </Button>
        ))}
      </div>
    </div>
  );
}

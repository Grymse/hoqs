import { COLORS } from 'libs/core-components/src/lib/variables';
import { ColorVariant } from 'libs/core-components/src/types/types';
import { Button } from '@nextui-org/react';
import { Check } from 'lucide-react';

interface Props {
  color: ColorVariant;
  setColor: (color: ColorVariant) => void;
}

export function ColorSelector({ color, setColor }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLORS.map((c) => (
        <Button size="sm" color={c} isIconOnly onPress={() => setColor(c)}>
          {color === c && <Check />}
        </Button>
      ))}
    </div>
  );
}

export default ColorSelector;

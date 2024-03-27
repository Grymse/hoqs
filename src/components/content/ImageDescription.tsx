import { StorageImage } from '@/types/types';
import Header from '../ui/Header';
import Text from '../ui/Text';
import { useState, useEffect, useRef } from 'react';
import { MapPin, Volume2 } from 'lucide-react';
import { Chip } from '@nextui-org/react';

interface Props {
  image: StorageImage | undefined;
}

export default function ImageDescription({ image }: Props) {
  const [showContent, setShowContent] = useState(true);
  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleMouseMovement = (e: MouseEvent) => {
      if (e.movementX <= 0 || e.movementY <= 0) return;

      clearTimer();
      setShowContent(true);
      timeoutId.current = setTimeout(() => {
        setShowContent(false);
      }, 1000);
    };

    document.addEventListener('mousemove', handleMouseMovement);

    return () => {
      document.removeEventListener('mousemove', handleMouseMovement);
      clearTimer();
    };
  }, []);

  function clearTimer() {
    clearTimeout(timeoutId.current);
  }

  if (!image) return null;

  return (
    <div
      className={`overflow-hidden bg-opacity-50 max-w-[30vw] px-4 pb-4 bg-background rounded-md bottom-4 right-10 absolute z-10 w-fit ${
        showContent ? 'opacity-100' : 'opacity-0'
      } duration-150`}
      onMouseMove={(e) => {
        e.stopPropagation();
        e.preventDefault();
        clearTimer();
      }}
      onMouseLeave={() => setShowContent(false)}
    >
      <Header variant="sub-subtitle">{image.title}</Header>
      <div className="flex gap-2">
        {image.driver && (
          <Chip
            color="primary"
            startContent={<Volume2 size={16} className="ml-1" />}
          >
            {image.driver}
          </Chip>
        )}
        {image.location && (
          <Chip
            color="primary"
            variant="bordered"
            startContent={<MapPin size={16} className="ml-1" />}
          >
            {image.location}
          </Chip>
        )}
      </div>
      {image.description && <Text>{image.description}</Text>}
    </div>
  );
}

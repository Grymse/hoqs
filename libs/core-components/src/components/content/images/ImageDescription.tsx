import { StorageImage } from '@/types/types';
import Header from '../../ui/Header';
import Text from '../../ui/Text';
import { useState, useEffect, useRef } from 'react';
import { MapPin, Volume2 } from 'lucide-react';
import { Chip, CircularProgress } from '@nextui-org/react';

interface Props {
  image: StorageImage | undefined;
}

export default function ImageDescription({ image }: Props) {
  const [showContent, setShowContent] = useState(true);
  const [showContentDuration, setShowContentDuration] = useState<number | null>(
    3000
  );
  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleMouseMovement = (e: MouseEvent) => {
      if (e.movementX <= 0 || e.movementY <= 0) return;
      displayContent(1500);
    };
    displayContent();

    document.addEventListener('mousemove', handleMouseMovement);

    return () => {
      document.removeEventListener('mousemove', handleMouseMovement);
      clearTimer();
    };
  }, []);

  function displayContent(displayLength = 3000) {
    setShowContent(true);
    setShowContentDuration((v) =>
      v === displayLength ? displayLength + 1 : displayLength
    );
    clearTimer();
    timeoutId.current = setTimeout(() => {
      setShowContent(false);
    }, displayLength);
  }

  function clearTimer() {
    clearTimeout(timeoutId.current);
  }

  if (!image) return null;

  return (
    <div
      className={`overflow-hidden bg-opacity-50 max-w-[30vw] px-4 pb-4 bg-background rounded-md bottom-4 right-10 absolute z-10 w-fit ${
        showContent ? 'opacity-100' : 'opacity-0'
      } duration-300`}
      onMouseMove={(e) => {
        e.stopPropagation();
        e.preventDefault();
        clearTimer();
        setShowContentDuration(null);
      }}
      onMouseLeave={() => setShowContent(false)}
    >
      <Header variant="sub-subtitle" className="mt-10">
        {image.title}
      </Header>
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
      <CountdownVisualizer duration={showContentDuration} />
    </div>
  );
}

interface CountdownVisualizerProps {
  duration: number | null;
}

function CountdownVisualizer({ duration }: CountdownVisualizerProps) {
  const [localDuration, setLocalDuration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      localDuration > 0 && setLocalDuration(localDuration - 33);
    }, 33);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    setLocalDuration(duration || 0);
  }, [duration]);

  return (
    <div className="flex justify-end">
      <CircularProgress
        aria-label="Image Description hiding countdown"
        size="md"
        disableAnimation
        value={duration ? localDuration : 1}
        maxValue={duration ?? 1}
      />
    </div>
  );
}

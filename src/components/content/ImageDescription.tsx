import { StorageImage } from '@/types/types';
import Header from '../ui/Header';
import Text from '../ui/Text';
import { useState, useEffect, useRef } from 'react';

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
      className={`bg-opacity-40 px-4 pb-2 bg-background rounded-md bottom-4 right-4 absolute z-10 w-fit ${
        showContent ? 'opacity-100' : 'opacity-10'
      } duration-150`}
      onMouseMove={(e) => {
        e.stopPropagation();
        e.preventDefault();
        clearTimer();
      }}
      onMouseLeave={() => setShowContent(false)}
    >
      <Header variant="sub-subtitle">{image.title}</Header>
      {image.description && <Text>{image.description}</Text>}
    </div>
  );
}

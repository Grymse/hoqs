// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { StorageImage } from '@/types/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useDisclosure } from '@nextui-org/react';
import ImageFullscreen from './ImageFullscreen';
import { useState } from 'react';

// import required modules

interface Props {
  images: StorageImage[] | null;
  disableFullscreen?: boolean;
  initialSlide?: number;
}

export default function ImageCaroussel({
  images,
  disableFullscreen = false,
  initialSlide = 0,
}: Props) {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const [slideIndex, setSlideIndex] = useState(initialSlide);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        initialSlide={initialSlide}
        onSlideChange={(swiper) => setSlideIndex(swiper.activeIndex)}
        className="w-full h-full rounded-lg"
        onClick={onOpen}
      >
        {images?.map((image) => (
          <SwiperSlide
            key={image.url}
            style={{
              display: 'flex',
              justifyContent: 'center',
              objectFit: 'contain',
            }}
          >
            <img src={image.url} alt={'image of ' + image.title} />
          </SwiperSlide>
        ))}
      </Swiper>
      {images && !disableFullscreen && (
        <ImageFullscreen
          images={images}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          initialSlide={slideIndex}
        />
      )}
    </>
  );
}

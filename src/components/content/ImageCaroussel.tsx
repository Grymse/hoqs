// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { StorageImage } from '@/types/types';
import { Trash2 } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useDisclosure } from '@nextui-org/react';
import ImageFullscreen from './ImageFullscreen';
import { useState } from 'react';
import ConfirmModal from '../modals/ConfirmModal';

// import required modules

interface Props {
  images: StorageImage[] | null;
  disableFullscreen?: boolean;
  initialSlide?: number;
  onDelete?: (index: number) => void;
}

export default function ImageCaroussel({
  images,
  disableFullscreen = false,
  initialSlide = 0,
  onDelete,
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
        {images?.map((image, i) => (
          <SwiperSlide
            key={i + image.url}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src={image.url}
              className="object-contain"
              alt={'image of ' + image.title}
            />
          </SwiperSlide>
        ))}
        {onDelete && (
          <div className="absolute top-2 right-2 z-10">
            <ConfirmModal
              title="Are you sure?"
              description="Are you sure you want to delete this image? This action cannot be undone."
              cancelText="Cancel"
              color="danger"
              onConfirm={() => onDelete(slideIndex)}
              isIconOnly
            >
              <Trash2 />
            </ConfirmModal>
          </div>
        )}
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

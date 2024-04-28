// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { StorageImage } from 'libs/core-components/src/types/types';
import { Pencil, Trash2 } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useDisclosure } from '@nextui-org/react';
import ImageFullscreen from './ImageFullscreen';
import { useEffect, useState } from 'react';
import ButtonWithConfirm from 'libs/core-components/src/components/modals/ButtonWithConfirm';
import ImageDescription from './ImageDescription';
import ImageEditForm from './ImageEditForm';
import { sendAnalyticsEvent } from '../../Analytics';

interface Props {
  images: StorageImage[] | null;
  isFullscreen?: boolean;
  initialSlide?: number;
  setImages?: (images: StorageImage[]) => void;
}

export function ImageCaroussel({
  images,
  isFullscreen = false,
  initialSlide = 0,
  setImages,
}: Props) {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const [slideIndex, setSlideIndex] = useState(initialSlide);
  const currentImage = images?.[slideIndex];

  function deleteImage(index: number) {
    setImages?.(images?.filter((_, i) => i !== index) || []);
  }

  function setImage(index: number, image: StorageImage) {
    setImages?.(images?.map((img, i) => (i === index ? image : img)) || []);
  }

  useEffect(() => {
    if (isFullscreen) {
      sendAnalyticsEvent({
        category: 'Image',
        action: 'Fullscreen',
        label: currentImage?.title,
      });
    }
  }, []);

  return (
    <>
      {isFullscreen && <ImageDescription image={currentImage} />}
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        initialSlide={initialSlide}
        onSlideChange={(swiper) => {
          setSlideIndex(swiper.activeIndex);
        }}
        className={`w-full h-full rounded-lg ${
          isFullscreen ? '' : 'max-h-[30rem]'
        }`}
        onClick={onOpen}
      >
        {images?.map((image, i) => (
          <SwiperSlide
            key={i + image.url}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              minHeight: '100%',
            }}
          >
            <img
              src={image.url}
              className="w-full object-contain h-full max-w-full max-h-full"
              alt={'image of ' + image.title}
            />
          </SwiperSlide>
        ))}
        {setImages && currentImage && (
          <div className="absolute flex gap-2 top-2 right-2 z-10">
            <ImageEditForm
              isIconOnly
              color="secondary"
              initialImage={currentImage}
              onChange={(image) => setImage(slideIndex, image)}
            >
              <Pencil />
            </ImageEditForm>
            <ButtonWithConfirm
              title="Are you sure?"
              description="Are you sure you want to delete this image? This action cannot be undone."
              cancelText="Cancel"
              color="danger"
              onConfirm={() => deleteImage(slideIndex)}
              isIconOnly
            >
              <Trash2 />
            </ButtonWithConfirm>
          </div>
        )}
      </Swiper>
      {images && !isFullscreen && (
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

export default ImageCaroussel;

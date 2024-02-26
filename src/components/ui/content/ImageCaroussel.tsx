// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { StorageImage } from '@/types/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules

interface Props {
  images: StorageImage[];
}

export default function ImageCaroussel({ images }: Props) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      className="w-full h-full rounded-lg"
    >
      {images.map((image) => (
        <SwiperSlide
          key={image.url}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={image.url} alt={'image of ' + image.title} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

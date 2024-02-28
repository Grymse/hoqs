import { StorageImage } from '@/types/types';
import ImageCaroussel from './ImageCaroussel';
import Uploader from './Uploader';

interface Props {
  images: StorageImage[] | null;
  updateImages: (fn: (images: StorageImage[] | null) => StorageImage[]) => void;
  bucket: string;
  path: string;
}

export default function ImageUploader({
  images,
  updateImages,
  path,
  bucket,
}: Props) {
  function addImage(url: string, title: string) {
    updateImages((images) => {
      if (!Array.isArray(images)) return [{ url, title }];
      return [...images, { url, title }];
    });
  }

  function deleteImage(index: number) {
    updateImages((images) => {
      if (!Array.isArray(images)) return [];
      return images.filter((_, i) => i !== index);
    });
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Uploader
        bucket={bucket}
        path={path}
        onFileUploaded={addImage}
        suggestedFiles="PNG, JPG or SVG"
        allowedTypes={allowedFileTypes}
      />
      <ImageCaroussel images={images} onDelete={deleteImage} />
    </div>
  );
}

const allowedFileTypes = [
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'image/jpg',
  'image/svg',
];

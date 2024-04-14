import { AbstractStorageFile, StorageImage } from '@core/types/types';
import ImageCaroussel from './ImageCaroussel';
import Uploader from '../Uploader';

interface Props {
  images: StorageImage[] | null;
  setImages: (images: StorageImage[]) => void;
  bucket: string;
  path: string;
}

export default function ImageUploader({
  images,
  setImages,
  path,
  bucket,
}: Props) {
  function addImage(file: AbstractStorageFile) {
    if (!images) {
      setImages([{ ...file }]);
      return;
    }

    setImages([...images, { ...file }]);
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
      <ImageCaroussel images={images} setImages={setImages} />
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

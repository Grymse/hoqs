import { StorageImage } from '@/types/types';
import React from 'react';
import ImageCaroussel from './ImageCaroussel';
import Uploader from './Uploader';

interface Props {
  images: StorageImage[];
  bucket: string;
  path: string;
}
export default function ImageUploader({
  images: inputImages,
  path,
  bucket,
}: Props) {
  const [images, setImages] = React.useState(inputImages);

  function addImage(url: string, title: string) {
    setImages((images) => [...images, { url, title }]);
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
      <ImageCaroussel images={images} />
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

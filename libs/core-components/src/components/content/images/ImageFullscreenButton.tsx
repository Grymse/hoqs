import { StorageImage } from 'libs/core-components/src/types/types';
import { Modal, ModalContent, Button } from '@nextui-org/react';
import React from 'react';
import ImageCaroussel from './ImageCaroussel';

interface ImageFullscreenButtonProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  images: StorageImage[];
  initialSlide?: number;
}

export function ImageFullscreenButton({
  isOpen,
  onOpenChange,
  images,
  initialSlide = 0,
}: ImageFullscreenButtonProps) {
  function onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // @ts-expect-error className is not in the EventTarget type
    if (e.target.className.startsWith('swiper-slide')) onOpenChange(false);
  }

  return (
    <Modal
      size="full"
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      id="modal-fullscreen"
    >
      <ModalContent
        id="modal-content"
        className="bg-transparent shadow-none m-4 max-h-full max-w-full"
        onClick={onClick}
      >
        {(onClose) => (
          <>
            <ImageCaroussel
              images={images}
              isFullscreen
              initialSlide={initialSlide}
            />
            <Button
              className="absolute top-4 z-10 right-4"
              isIconOnly
              variant="ghost"
              color="primary"
              aria-label="Close image fullscreen"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ImageFullscreenButton;

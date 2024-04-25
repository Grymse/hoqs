import { StorageImage } from 'libs/core-components/src/types/types';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import Text from 'libs/core-components/src/components/ui/Text';
import {
  formatBytes,
  formatDateTime,
} from 'libs/core-components/src/lib/translations';

type ImageEditFormProps = {
  initialImage: StorageImage;
  onChange: (image: StorageImage) => void;
} & Omit<React.ComponentProps<typeof Button>, 'onChange'>;

export function ImageEditForm({
  initialImage,
  onChange,
  children,
  ...props
}: ImageEditFormProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [image, setImage] = useState(initialImage);

  useEffect(() => {
    setImage(initialImage);
  }, [initialImage]);

  function saveChanges() {
    onChange(image);
  }

  return (
    <>
      <Button onPress={onOpen} {...props} color="primary">
        {children}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit image
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Title"
                  placeholder="Enter the title of the image"
                  value={image.title}
                  onChange={(e) =>
                    setImage({ ...image, title: e.target.value })
                  }
                  variant="bordered"
                />

                <Textarea
                  label="Description"
                  placeholder="Enter the description of the image"
                  value={image.description}
                  onChange={(e) =>
                    setImage({
                      ...image,
                      description:
                        e.target.value.length > 0 ? e.target.value : undefined,
                    })
                  }
                  variant="bordered"
                  minRows={10}
                  maxRows={20}
                />

                <Input
                  autoFocus
                  label="Location"
                  placeholder="Enter the location of the image"
                  value={image.location}
                  onChange={(e) =>
                    setImage({
                      ...image,
                      location:
                        e.target.value.length > 0 ? e.target.value : undefined,
                    })
                  }
                  variant="bordered"
                />

                <Input
                  autoFocus
                  label="Driver"
                  placeholder="Enter the name of the driver"
                  value={image.driver}
                  onChange={(e) =>
                    setImage({
                      ...image,
                      driver:
                        e.target.value.length > 0 ? e.target.value : undefined,
                    })
                  }
                  variant="bordered"
                />

                <div className="flex justify-between w-full">
                  <Text variant="small" color="muted">
                    {image.mimetype} - {formatBytes(image.size)}
                  </Text>
                </div>
                <Text variant="small" color="muted">
                  Created at {formatDateTime(image.createdAt)}
                  <br /> Updated at {formatDateTime(image.updatedAt)}
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    saveChanges();
                    onClose();
                  }}
                >
                  Continue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageEditForm;

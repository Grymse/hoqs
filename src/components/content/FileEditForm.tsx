import { StorageFile } from '@/types/types';
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
import Text from '../ui/Text';
import { formatBytes } from '../../lib/translations';

type FileEditFormProps = {
  initialFile: StorageFile;
  onChange: (file: StorageFile) => void;
} & Omit<React.ComponentProps<typeof Button>, 'onChange'>;

export default function FileEditForm({
  initialFile,
  onChange,
  children,
  ...props
}: FileEditFormProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [file, setFile] = useState(initialFile);

  useEffect(() => {
    setFile(initialFile);
  }, [initialFile]);

  function saveChanges() {
    onChange(file);
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
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Title"
                  placeholder="Enter the title of the file"
                  value={file.title}
                  onChange={(e) => setFile({ ...file, title: e.target.value })}
                  variant="bordered"
                />

                <Textarea
                  label="Description"
                  placeholder="Enter the description of the file"
                  value={file.description}
                  onChange={(e) =>
                    setFile({ ...file, description: e.target.value })
                  }
                  variant="bordered"
                  minRows={10}
                  maxRows={20}
                />
                <Text variant="small" color="muted">
                  {file.mimetype} - {formatBytes(file.size)}
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
                  Save changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

import { TimelineEntry } from '@/types/types';
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import { ComponentProps, useEffect, useState } from 'react';
import ColorChooser from '../ColorChooser';

type Props = {
  entry: TimelineEntry;
  setEntry: (entry: TimelineEntry | null) => void;
} & ComponentProps<typeof Button>;

export default function EditTimelineEntryButton({
  entry: initialEntry,
  setEntry: setInitialEntry,
  children,
  ...props
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [entry, setEntry] = useState(initialEntry);

  useEffect(() => {
    setEntry(initialEntry);
  }, [initialEntry]);

  function saveChanges() {
    setInitialEntry(entry);
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
                Edit file
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Title"
                  placeholder="Enter the title of the file"
                  value={entry.title}
                  onChange={(e) =>
                    setEntry({ ...entry, title: e.target.value })
                  }
                  endContent={
                    entry.badge &&
                    entry.badge.length > 0 && (
                      <Chip size="sm" variant="flat" color={entry.color}>
                        {entry.badge}
                      </Chip>
                    )
                  }
                  variant="bordered"
                />

                <Textarea
                  label="Description"
                  placeholder="Enter the description of the file"
                  value={entry.description}
                  onChange={(e) =>
                    setEntry({ ...entry, description: e.target.value })
                  }
                  variant="bordered"
                  minRows={6}
                  maxRows={10}
                />

                <Input
                  type="date"
                  variant="bordered"
                  label="Date"
                  value={entry.date.slice(0, 10)}
                  onChange={(e) =>
                    setEntry({
                      ...entry,
                      date: new Date(e.target.value).toISOString(),
                    })
                  }
                />

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Badge (Optional)"
                    placeholder="Enter text for a badge"
                    value={entry.badge}
                    onChange={(e) =>
                      setEntry({ ...entry, badge: e.target.value })
                    }
                    variant="bordered"
                  />

                  <ColorChooser
                    color={entry.color}
                    setColor={(color) => setEntry({ ...entry, color })}
                  />
                </div>
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
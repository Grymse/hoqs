import { TimelineEntry } from 'libs/core-components/src/types/types';
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
import ColorSelector from '../ColorSelector';
import IconSelector from '../IconSelector';
import { TIMELINE_ICOMS } from 'libs/core-components/src/lib/variables';

type Props = {
  entry: TimelineEntry;
  setEntry: (entry: TimelineEntry | null) => void;
} & ComponentProps<typeof Button>;

export function EditTimelineEntryButton({
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
                  aria-label="Edit title"
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
                  aria-label="Edit description"
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
                  aria-label="Enter Date of entry"
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
                    aria-label="Edit badge text"
                    value={entry.badge}
                    onChange={(e) =>
                      setEntry({ ...entry, badge: e.target.value })
                    }
                    variant="bordered"
                  />

                  <ColorSelector
                    color={entry.color}
                    setColor={(color) => setEntry({ ...entry, color })}
                  />
                </div>
                <IconSelector
                  icons={TIMELINE_ICOMS}
                  selectColor={entry.color}
                  setIcon={(icon) => setEntry({ ...entry, icon })}
                  icon={entry.icon || 'flag'}
                />
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

export default EditTimelineEntryButton;

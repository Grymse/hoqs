import { supabase, toPromise } from 'libs/core-components/src/lib/supabase.ts';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Text from 'libs/core-components/src/components/ui/Text.tsx';
import slugify from 'slugify';
import { useNavigate } from 'react-router-dom';
import DriverImporter from './DriverImporter';
import DriverMiniSpecList from './DriverMiniSpecList';
import { Driver } from 'libs/core-components/src/types/types.ts';
import { MergeWithOverwrite } from 'libs/core-components/src/types/types.ts';

type DriverState = MergeWithOverwrite<
  Partial<Driver>,
  { brand: string; model: string }
>;

interface Props {
  onNewDriver?: (driver: Driver) => void;
}

export function AddDriverButton({ onNewDriver }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [driver, setDriver] = useState<DriverState>({
    brand: 'Eminence',
    model: 'Kappalite 3015',
  });
  const navigate = useNavigate();
  const slug = slugify(driver.model, { lower: true, strict: true });

  function createDriver(onSuccess?: () => void) {
    const driverWithId = { ...driver, id: slug };
    const uploader = toPromise(supabase.from('drivers').insert([driverWithId]));

    toast.promise(uploader, {
      loading: 'Saving driver to database',
      success: (c) => {
        if (onSuccess) {
          onSuccess();
          onNewDriver?.(driverWithId as Driver);
        } else navigate(`/drivers/${slug}/edit`);
        return `Successfully saved driver ${driver.brand} - ${driver.model}`;
      },
      error: (e) => `Error saving driver ${e.message}`,
    });
  }

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create new driver
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Brand"
                  placeholder="Enter driver brand"
                  variant="bordered"
                  value={driver.brand}
                  onChange={(e) =>
                    setDriver((c) => ({ ...c, brand: e.target.value }))
                  }
                />
                <Input
                  autoFocus
                  label="Model"
                  placeholder="Enter driver model"
                  variant="bordered"
                  value={driver.model}
                  onChange={(e) =>
                    setDriver((c) => ({ ...c, model: e.target.value }))
                  }
                />
                <Text color="muted">ID: {slug}</Text>
                <DriverImporter driver={driver} setDriver={setDriver} />
                <DriverMiniSpecList driver={driver} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => createDriver(onClose)}>
                  Quick Create
                </Button>
                <Button color="primary" onPress={() => createDriver()}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddDriverButton;

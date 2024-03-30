import React, { useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { getCookie, setCookie } from '@/lib/cookies';

export default function CookieBanner() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const accepted = getCookie('cookie-accepted') === 'true';
    if (accepted) return;
    onOpen();
  }, []);

  function accept() {
    setCookie('cookie-accepted', 'true');
  }

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        backdrop:
          'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Do you accept our cookies?
            </ModalHeader>
            <ModalBody>
              <p>
                We use cookies to improve your experience on our site. By using
                our site, you agree to our use of cookies.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Do not accept
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onClose();
                  accept();
                }}
              >
                Accept
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

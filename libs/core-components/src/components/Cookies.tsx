import { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';

export function openCookieModal() {
  onOpenListenerObject.listener();
}

const onOpenListenerObject = {
  listener: () => {
    console.log('No listener set');
  },
};

export function Cookies() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const location = useLocation();
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    onOpenListenerObject.listener = () => {
      onOpen();
    };

    initTracking();
    const acceptCookie = getCookie('cookie-accepted');
    if (acceptCookie === 'true') {
      accept();
      return;
    }
    if (acceptCookie === 'false') {
      decline();
      return;
    }

    onOpen();
  }, []);

  useEffect(() => {
    if (!accepted) return;

    ReactGA.pageview(location.pathname + location.search);
  }, [location, accepted]);

  function accept() {
    setAccepted(true);
    setCookie('cookie-accepted', 'true');
  }

  function decline() {
    setAccepted(false);
    setCookie('cookie-accepted', 'false');
  }

  return (
    <Modal
      backdrop="opaque"
      isDismissable={false}
      isKeyboardDismissDisabled
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
              <Button
                color="default"
                variant="light"
                onPress={() => {
                  onClose();
                  decline();
                }}
              >
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

export const initTracking = () => {
  ReactGA.set({ anonymizeIp: true });

  ReactGA.initialize('G-X85CL65GX1', {
    debug: process.env.NODE_ENV === 'development',
  });
};

function setCookie(cname: string, cvalue: string, exdays = 365) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname: string) {
  const name = cname + '=';
  const ca = document.cookie.split(';');
  for (let c of ca) {
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

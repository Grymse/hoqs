import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
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
import { UaEventOptions } from 'react-ga4/types/ga4';

export function openCookieModal() {
  linkingObject.listener();
}

export function sendAnalyticsEvent(optionsOrName: UaEventOptions | string) {
  linkingObject.event(optionsOrName);
}

const linkingObject = {
  listener: () => {
    console.error('No listener set');
  },
  event: (optionsOrName: UaEventOptions | string) => {
    console.error('No send function set');
  },
};

export function Analytics() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const location = useLocation();
  const [accepted, setAccepted] = useState(false);
  const [prevPage, setPrevPage] = useState<null | string>(null);

  useEffect(() => {
    linkingObject.listener = () => {
      onOpen();
    };

    linkingObject.event = (optionsOrName: UaEventOptions | string) => {
      if (!accepted) return;
      ReactGA.event(optionsOrName);
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
    const page = location.pathname + location.search;
    if (prevPage === page || !accepted) return;
    setPrevPage(page);
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
    });
  }, [location, accepted, prevPage]);

  function accept() {
    if (window.location.hostname === 'localhost') {
      setAccepted(false);
    }
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

  ReactGA.initialize('G-X85CL65GX1');
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

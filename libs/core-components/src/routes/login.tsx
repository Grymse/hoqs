import { useState } from 'react';
import {
  Card,
  Input,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmail, useAuth } from '../lib/auth';
import Text from '../components/ui/Text';
import { z } from 'zod';
import { validate } from '../lib/zod';
import toast from 'react-hot-toast';
import { FormattedMessage } from 'react-intl';
import Header from '../components/ui/Header';

export function Login() {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [zodError, setZodError] = useState('');
  const navigate = useNavigate();
  const user = useAuth();

  if (user) navigate('/');

  async function signIn() {
    const { error } = validate(z.string().email())(email);

    if (error) {
      setZodError(error.issues[0].message);
      return;
    }
    setZodError('');

    const location = window.location;
    setLoading(true);
    const result = await signInWithEmail(email, location.href);
    setLoading(false);

    if (result.error === null) {
      onOpen();
    } else {
      toast.error(result.error?.message || 'Something went wrong');
    }
  }

  return (
    <>
      <form className="flex grow justify-center items-center">
        <Card className="<sm:w-full sm:w-96">
          <CardHeader className="flex flex-col gap-3">
            <Header variant="sub-subtitle" id="login.signIn" />
            <Text
              variant="small"
              color="muted"
              id="login.signInDescription"
              className="my-0"
            />
          </CardHeader>
          <CardBody>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              aria-label="Enter email for login"
              label={<FormattedMessage id="login.emailLabel" />}
              errorMessage={zodError}
            />
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              isLoading={isLoading}
              color="primary"
              fullWidth
              onClick={signIn}
            >
              <FormattedMessage id="login.signInButton" />
            </Button>
          </CardFooter>
        </Card>
      </form>
      <EmailSentModal
        error="error"
        email={email}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}

interface EmailModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  error: string;
}

function EmailSentModal({
  isOpen,
  onOpenChange,
  email,
  error,
}: EmailModalProps) {
  const emailProvider = getEmailProvider(email);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex text-default-foreground flex-col gap-1">
              <FormattedMessage id="login.magicLinkSent" />
            </ModalHeader>
            <ModalBody>
              <Text
                className="my-0 text-default-foreground"
                id="login.magicLinkSentDescription"
              />
            </ModalBody>
            <ModalFooter className="flex justify-between flex-row-reverse">
              {emailProvider && (
                <Button
                  color="primary"
                  onClick={() => window.open(emailProvider.url, '_self')}
                >
                  Go to {emailProvider.name}
                </Button>
              )}
              <Button
                color={emailProvider ? 'default' : 'primary'}
                variant={emailProvider ? 'bordered' : 'solid'}
                onPress={onClose}
              >
                <FormattedMessage id="login.close" />
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

const emailProviders = [
  {
    domainName: 'gmail',
    url: 'https://mail.google.com',
    name: 'Gmail',
  },
  {
    domainName: 'hotmail',
    url: 'https://outlook.live.com',
    name: 'Outlook',
  },
  {
    url: 'https://outlook.live.com',
    domainName: 'live',
    name: 'Outlook',
  },
  {
    url: 'https://outlook.live.com',
    domainName: 'outlook',
    name: 'Outlook',
  },
  {
    url: 'https://mail.yahoo.com',
    domainName: 'yahoo',
    name: 'Yahoo Mail',
  },
  {
    url: 'https://mail.aol.com',
    domainName: 'aol',
    name: 'AOL Mail',
  },
  {
    url: 'https://mail.protonmail.com',
    domainName: 'protonmail',
    name: 'ProtonMail',
  },
  {
    url: 'https://www.icloud.com/mail',
    domainName: 'icloud',
    name: 'iCloud Mail',
  },
  {
    url: 'https://mail.yandex.com',
    domainName: 'yandex',
    name: 'Yandex Mail',
  },
  {
    url: 'https://mail.zoho.com',
    domainName: 'zoho',
    name: 'Zoho Mail',
  },
] satisfies EmailProvider[];

interface EmailProvider {
  domainName: string;
  url: string;
  name: string;
}

function getEmailProvider(email: string): EmailProvider | undefined {
  const domain = email.split('@')?.[1];
  const domainName = domain?.split('.')?.[0]?.toLowerCase();

  return emailProviders.find((provider) => provider.domainName === domainName);
}

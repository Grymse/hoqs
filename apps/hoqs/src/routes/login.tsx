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
import { z } from 'zod';
import toast from 'react-hot-toast';
import { signInWithEmail, useAuth, validate } from 'service';

export default function Login() {
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

    if (result.data.session) {
      onOpen();
    } else {
      toast.error(result.error?.message || 'Something went wrong');
    }
  }

  return (
    <form className="flex grow justify-center items-center">
      <Card className="<sm:w-full sm:w-96">
        <CardHeader className="flex flex-col gap-3">
          <h2 className="text-md text-lg">Sign in</h2>
          <p className="text-small text-center text-default-500">
            Write in your email, and we will send you a magic link to sign in!
          </p>
        </CardHeader>
        <CardBody>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            label="Email"
            errorMessage={zodError}
          />
        </CardBody>
        <CardFooter>
          <Button
            isLoading={isLoading}
            onClick={signIn}
            color="primary"
            fullWidth
          >
            Sign In!
          </Button>
        </CardFooter>
      </Card>
      <EmailSentModal
        error="error"
        email={email}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      ></EmailSentModal>
    </form>
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
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex text-default-foreground flex-col gap-1">
              We've sent a magic link to your email!
            </ModalHeader>
            <ModalBody>
              <Text className="my-0 text-default-foreground">
                Check your inbox. If you don't see our email in your inbox
                within a few minutes, please check your spam or junk folder
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

import {
  Card,
  Input,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
} from '@nextui-org/react';

export default function login() {
  return (
    <div className="flex grow justify-center items-center">
      <Card className="<sm:w-full sm:w-96">
        <CardHeader className="flex flex-col gap-3">
          <h2 className="text-md text-lg">Login</h2>
          <p className="text-small text-center text-default-500">
            Write in your email, and we will send you a magic link to login!
          </p>
        </CardHeader>
        <CardBody>
          <Input type="email" label="Email" />
        </CardBody>
        <CardFooter>
          <Button color="primary" fullWidth>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

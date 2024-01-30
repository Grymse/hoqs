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
        <CardHeader className="flex gap-3">
          <h2 className="">Login using your Email</h2>
        </CardHeader>
        <CardBody>
          <Input type="email" label="Email" />
        </CardBody>
        <CardFooter>
          <Button fullWidth>Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

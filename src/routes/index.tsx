import { Button } from '@nextui-org/react';
import toast from 'react-hot-toast';

export function Index() {
  return (
    <div className="w-96 h-96 flex justify-center items-center">
      <p>Index page!</p>
      <Button onClick={() => toast('Hello')}>Toast</Button>
    </div>
  );
}

export default Index;

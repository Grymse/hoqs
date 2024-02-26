import { useAuth } from '@/lib/auth';
import { Button } from '@nextui-org/react';
import toast from 'react-hot-toast';

export function Index() {
  const user = useAuth();

  return (
    <div className="w-96 h-96 flex justify-center items-center">
      <p>Index page!</p>
      <Button
        variant="shadow"
        style={{
          animation: 'calmAnimation 2s ease-in-out infinite',
        }}
        color="primary"
        onClick={() => toast('Hello')}
      >
        Toast
      </Button>
      {JSON.stringify(user)}
    </div>
  );
}

export default Index;

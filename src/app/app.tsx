import { NextUIProvider } from '@nextui-org/react';
import { Button } from '@nextui-org/button';

export function App() {
  return (
    <NextUIProvider>
      <Button>Hello NextUI</Button>
    </NextUIProvider>
  );
}

export default App;

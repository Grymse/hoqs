import React, { PropsWithChildren } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter } from 'react-router-dom';

export default function Providers({ children }: PropsWithChildren<unknown>) {
  return (
    <NextUIProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </NextUIProvider>
  );
}

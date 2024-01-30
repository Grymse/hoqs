import React, { PropsWithChildren } from 'react';
import { NextUIProvider } from '@nextui-org/react';

export default function Providers({ children }: PropsWithChildren<unknown>) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

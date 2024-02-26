import React, { PropsWithChildren } from 'react';
import { cn } from './util';

type Props = PropsWithChildren<{ className?: string }>;

export default function PageContainer({ children, className }: Props) {
  return (
    <main
      className={cn('md:w-[700px] sm:w-[640px] w-full px-8 my-10', className)}
    >
      {children}
    </main>
  );
}

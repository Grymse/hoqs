import React, { PropsWithChildren } from 'react';
import { cn } from './util';

type Props = PropsWithChildren<{ className?: string }>;

export default function PageContainer({ children, className }: Props) {
  return (
    <main
      className={cn('xl:w-[1024px] lg:w-[700px] sm:w-[640px] w-full px-0 my-10 px-sm-6', className)}
    >
      {children}
    </main>
  );
}

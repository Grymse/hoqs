import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<unknown>;

export function PageContainer({ children }: Props) {
  return (
    <main className="md:w-[700px] sm:w-[640px] w-full px-8 my-10">
      {children}
    </main>
  );
}

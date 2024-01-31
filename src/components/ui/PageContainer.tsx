import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<unknown>;

export default function PageContainer({ children }: Props) {
  return <div className="w-[700px] mt-10">{children}</div>;
}

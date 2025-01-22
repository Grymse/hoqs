import { Link as LinkUI } from '@nextui-org/react';

export default function Link({
  href,
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  const isExternal = href?.startsWith('http');

  return (
    <LinkUI href={href} isExternal={isExternal} showAnchorIcon={isExternal}>
      {children}
    </LinkUI>
  );
}

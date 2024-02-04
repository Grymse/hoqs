
import { Link } from '@nextui-org/react';

export function Drivers() {
  return (
    <PageContainer>
      <Header>Routing</Header>
      <Text>
        NextUI Components such as Tabs, Listbox, Dropdown and many others offer
        the flexibility to be rendered as HTML links. Explore this page to learn
        how to integrate them with client side routing.
      </Text>
      <Header variant="subtitle">Introduction</Header>
      <Text>
        By default, links perform native browser navigation when they are
        interacted with. However, many apps and frameworks use client side
        routers to avoid a full page reload when navigating between pages. The
        NextUIProvider component configures all NextUI components within it to
        navigate using the client side router you provide. Set this up once in
        the root of your app, and any NextUI component with the href prop will
        automatically navigate using your router.
      </Text>
      <Header variant="sub-subtitle">The beginning</Header>
      <Text color="muted">
        By default, links perform native browser navigation when they are
        interacted with. However, many apps and frameworks use client side
        routers to avoid a full page reload when navigating between pages.{' '}
        <Link showAnchorIcon>The NextUIProvider component</Link>
        NextUIProvider component configures all NextUI components within it to
        navigate using the client side router you provide. Set this up once in
        the root of your app, and any NextUI component with the href prop will
        automatically navigate using your router.
      </Text>
      <Text variant="small">
        By default, links perform native browser navigation when they are
        interacted with. However, many apps and frameworks use client side
        routers to avoid a full page reload when navigating between pages. The
        NextUIProvider component configures all NextUI components within it to
        navigate using the client side router you provide. Set this up once in
        the root of your app, and any NextUI component with the href prop will
        automatically navigate using your router.
      </Text>
      <Text variant="extra-small" color="muted">
        By default, links perform native browser navigation when they are
        interacted with. However, many apps and frameworks use client side
        routers to avoid a full page reload when navigating between pages. The
        NextUIProvider component configures all NextUI components within it to
        navigate using the client side router you provide. Set this up once in
        the root of your app, and any NextUI component with the href prop will
        automatically navigate using your router.
      </Text>
      <Text variant="thick">
        By default, links perform native browser navigation when they are
        interacted with. However, many apps and frameworks use client side
        routers to avoid a full page reload when navigating between pages. The
        NextUIProvider component configures all NextUI components within it to
        navigate using the client side router you provide. Set this up once in
        the root of your app, and any NextUI component with the href prop will
        automatically navigate using your router.
      </Text>
    </PageContainer>
  );
}

export default Drivers;

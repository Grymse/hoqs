import { Link, useLocation } from 'react-router-dom';
import {
  Navbar as NavbarUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import HoqsLogo from './HoqsLogo';
import Header from './ui/Header';
import Text from './ui/Text';
import { signOut, useAuth } from '@/lib/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/cabinets',
    name: 'Cabinets',
  },
  {
    path: '/drivers',
    name: 'Drivers',
  },
];

export default function Navbar() {
  const location = useLocation();
  const activeRouteIndex = routes.findIndex((route) =>
    route.path.startsWith(location.pathname)
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavbarUI
      shouldHideOnScroll
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand className="gap-2">
          <HoqsLogo size={48} />
          <Header variant="subtitle" className="my-0">
            HOQS
          </Header>
        </NavbarBrand>
      </NavbarContent>

      <NavbarBrand className="hidden sm:flex gap-2">
        <HoqsLogo size={48} />
        <div>
          <Header variant="subtitle" className="my-0">
            HOQS
          </Header>
          <Text
            variant="extra-small"
            color="muted"
            className="my-0 hidden md:block"
          >
            High Order Quarterwave Society
          </Text>
        </div>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {routes.map((route, i) => (
          <NavbarItem key={route.path} isActive={i === activeRouteIndex}>
            <Link to={route.path}>{route.name}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <DarkModeToggle />
        <NavbarItem>
          <UserSection />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="dark">
        {routes.map((route, index) => (
          <NavbarMenuItem key={route.path}>
            <Link
              className={
                index === activeRouteIndex
                  ? 'text-primary'
                  : 'text-default-foreground'
              }
              onClick={() => setIsMenuOpen(false)}
              to={route.path}
            >
              {route.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarUI>
  );
}

function UserSection() {
  const auth = useAuth();
  const [isLoading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await signOut();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  if (auth) {
    return (
      <Button
        isLoading={isLoading}
        onClick={logout}
        color="primary"
        variant="flat"
      >
        Log out
      </Button>
    );
  }

  return (
    <Button as={Link} to="/login" color="primary" variant="flat">
      Login
    </Button>
  );
}

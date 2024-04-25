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
import HoqsLogo from './brands/HoqsLogo';
import Header from './ui/Header';
import Text from './ui/Text';
import { signOut, useAuth } from '../lib/auth';
import FacebookIcon from './brands/FacebookIcon';
import { FormattedMessage } from 'react-intl';

const routes = [
  {
    path: '/cabinets',
    name: 'Cabinets',
  },
  {
    path: '/drivers',
    name: 'Drivers',
  },
  {
    path: '/guides',
    name: 'Guides',
    disabled: true,
  },
  {
    path: '/about',
    name: 'About Us',
  },
];

export function Navbar() {
  const location = useLocation();
  const activeRouteIndex =
    location.pathname !== '/' &&
    routes.findIndex((route) => location.pathname.startsWith(route.path));
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
        <Link to="/">
          <NavbarBrand className="gap-2">
            <HoqsLogo size={48} />
            <Header variant="subtitle" className="my-0" id="brand.hoqs" />
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarBrand className="hidden sm:block">
        <Link to="/" className="gap-2 flex">
          <HoqsLogo size={48} />
          <div className="flex justify-center flex-col">
            <Header variant="subtitle" className="my-0" id="brand.hoqs" />
            <Text
              variant="extra-small"
              color="muted"
              className="my-0 hidden md:block"
              id="brand.hoqs-full"
            />
          </div>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {routes.map((route, i) => (
          <NavbarItem key={route.path} isActive={i === activeRouteIndex}>
            {route.disabled ? (
              <Text color="muted" aria-disabled>
                {route.name}
              </Text>
            ) : (
              <Link to={route.path}>{route.name}</Link>
            )}
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <div className="flex justify-center">
          <Button
            as={Link}
            isIconOnly
            variant="light"
            target="_blank"
            to="https://www.facebook.com/groups/bassaz"
          >
            <FacebookIcon />
          </Button>
          <DarkModeToggle />
        </div>
        <NavbarItem>
          <UserSection />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {routes.map((route, index) => (
          <NavbarMenuItem key={route.path}>
            {route.disabled ? (
              <Text color="muted" aria-disabled className="my-0">
                {route.name}
              </Text>
            ) : (
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
            )}
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
        <FormattedMessage id="navbar.logout" />
      </Button>
    );
  }

  return (
    <Button as={Link} to="/login" color="primary" variant="flat">
      <FormattedMessage id="navbar.login" />
    </Button>
  );
}

export default Navbar;

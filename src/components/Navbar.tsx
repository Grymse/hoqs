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
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">HOQS</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarBrand className="hidden sm:flex">
        {/* <AcmeLogo /> */}
        <p className="font-bold text-inherit">HOQS</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {routes.map((route, i) => (
          <NavbarItem key={route.path} isActive={i === activeRouteIndex}>
            <Link to={route.path}>{route.name}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link to="/login">
            <Button color="primary" href="#" variant="flat">
              Login
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {routes.map((route, index) => (
          <NavbarMenuItem key={route.path}>
            <Link
              className={index === activeRouteIndex ? 'text-primary' : ''}
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

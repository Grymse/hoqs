/* import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

export const initTracking = () => {
  ReactGA.set({ anonymizeIp: true });

  ReactGA.initialize('G-X85CL65GX1', {
    debug: process.env.NODE_ENV === 'development',
  });
};

export function useRouteTracking() {
  const location = useLocation();
  useEffect(() => {
    if (!trackObject.accepted) return;

    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
} */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './routes';
import NotFound from './routes/not-found';
import Cabinet from './routes/cabinet';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/cabinet',
    element: <Cabinet />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

// NotFound

export default () => <RouterProvider router={router} />;

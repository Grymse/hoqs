import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import Providers from './Providers';
import Router from './Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Providers>
      <Router />
    </Providers>
  </StrictMode>
);

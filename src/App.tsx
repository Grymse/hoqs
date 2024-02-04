import Navbar from './components/Navbar';
import Routes from './Routes';
import { AuthProvider } from './lib/auth';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter } from 'react-router-dom';
import { DefaultToastOptions, Toaster } from 'react-hot-toast';
import { DarkModeProvider } from './lib/darkmode';
import { IntlProvider } from 'react-intl';
import BackgroundEffect from './components/BackgroundEffect';
import { messages } from './lib/text';

export default function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <IntlProvider defaultLocale="en" locale="en" messages={messages}>
          <NextUIProvider>
            <BrowserRouter>
              <div className="min-w-screen min-h-screen flex relative items-center flex-col">
                <Toaster toastOptions={toastOptions} />
                <Navbar />
                <Routes />
                <BackgroundEffect />
              </div>
            </BrowserRouter>
          </NextUIProvider>
        </IntlProvider>
      </DarkModeProvider>
    </AuthProvider>
  );
}

const toastOptions: DefaultToastOptions = {
  duration: 5000,
  style: {
    background:
      'hsl(var(--nextui-content1) / var(--nextui-content1-opacity, var(--tw-bg-opacity)))',
    color:
      'color: hsl(var(--nextui-default) / var(--nextui-default-opacity, var(--tw-text-opacity)))',
    borderRadius: 'var(--nextui-radius-medium)',
  },
};

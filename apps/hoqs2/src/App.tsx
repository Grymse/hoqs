import Navbar from './components/Navbar';
import Routes from './Routes';
import { AuthProvider } from './lib/auth';
import { NextUIProvider } from '@nextui-org/react';
import { HashRouter, useNavigate } from 'react-router-dom';
import { DefaultToastOptions, Toaster } from 'react-hot-toast';
import { DarkModeProvider } from './lib/darkmode';
import { IntlProvider } from 'react-intl';
import BackgroundEffect from './components/BackgroundEffect';
import { messages } from './lib/text';
import Footer from './components/Footer';
import Cookies from './components/Cookies';

export default function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <IntlProvider defaultLocale="en" locale="en" messages={messages}>
          <HashRouter>
            <UIProvider>
              <div className="min-w-screen min-h-screen flex relative items-center flex-col">
                <Toaster toastOptions={toastOptions} />
                <Cookies />
                <Navbar />
                <Routes />
                <Footer />
                <BackgroundEffect />
              </div>
            </UIProvider>
          </HashRouter>
        </IntlProvider>
      </DarkModeProvider>
    </AuthProvider>
  );
}

function UIProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return NextUIProvider({ children, navigate });
}

const toastOptions: DefaultToastOptions = {
  duration: 5000,
  style: {
    background: 'hsl(var(--nextui-content1))',
    color:
      'color: hsl(var(--nextui-default) / var(--nextui-default-opacity, var(--tw-text-opacity)))',
    borderRadius: 'var(--nextui-radius-medium)',
  },
};

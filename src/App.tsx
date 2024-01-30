import Navbar from './components/Navbar';
import { useDarkMode } from 'usehooks-ts';
import Providers from './Providers';
import Routes from './Routes';

export default function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <Providers>
      <main
        className={`${
          isDarkMode ? 'dark' : ''
        } min-w-screen min-h-screen flex items-center flex-col text-foreground bg-background`}
      >
        <Navbar />
        <Routes />
      </main>
    </Providers>
  );
}

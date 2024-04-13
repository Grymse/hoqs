import { PropsWithChildren } from 'react';
import { useDarkMode } from 'usehooks-ts';

/**
 * AuthProvider component that handles authentication state changes and updates the user state.
 * @param children - The child components to render.
 */
export function DarkModeProvider({ children }: PropsWithChildren<unknown>) {
  const { isDarkMode } = useDarkMode();

  if (isDarkMode) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.add('bg-background');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.remove('bg-background');
  }

  return <div className={isDarkMode ? 'dark' : ''}>{children}</div>;
}

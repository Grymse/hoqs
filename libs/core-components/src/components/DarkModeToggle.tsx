import { Button } from '@nextui-org/react';
import { useDarkMode } from 'usehooks-ts';
import { Sun, Moon } from 'lucide-react';

export function DarkModeToggle() {
  const { toggle, isDarkMode } = useDarkMode();

  return (
    <Button isIconOnly variant="light" onClick={toggle}>
      {isDarkMode ? <Sun /> : <Moon />}
    </Button>
  );
}

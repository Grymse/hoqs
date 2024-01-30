import { Button } from '@nextui-org/react';
import { useDarkMode } from 'usehooks-ts';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
  const { toggle, isDarkMode } = useDarkMode();

  return (
    <Button isIconOnly variant="ghost" onClick={toggle}>
      {isDarkMode ? <Sun /> : <Moon />}
    </Button>
  );
}

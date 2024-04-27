import { useEffect } from 'react';

type KeySubscriberProps = {
  onEnter?: () => void;
  onEscape?: () => void;
  onKey?: (key: string) => void;
};

// This is a component that subscribes to key events and calls the appropriate
// It is a component and not a hook because it sometimes needs values from nested components
export function KeySubscriber({
  onEnter,
  onEscape,
  onKey,
}: KeySubscriberProps) {
  useEffect(() => {
    function onKeyInternal(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        onEnter?.();
      }

      if (e.key === 'Escape') {
        onEscape?.();
      }

      onKey?.(e.key);
    }
    window.addEventListener('keydown', onKeyInternal);
    return () => window.removeEventListener('keydown', onKeyInternal);
  }, [onEnter, onEscape, onKey]);

  return null;
}

import { lazy, Suspense, useEffect, useState } from 'react';
import { OPEN_COMMAND_MENU } from '@/lib/events';

const CommandMenuDialog = lazy(() => import('./CommandMenuDialog'));

/**
 * Listens for ⌘K / Ctrl+K (or the OPEN_COMMAND_MENU event) and loads the
 * palette the first time it is needed, so it costs nothing on first paint.
 */
const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    const show = () => {
      setRequested(true);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setRequested(true);
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_COMMAND_MENU, show);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_COMMAND_MENU, show);
    };
  }, []);

  if (!requested) return null;
  return (
    <Suspense fallback={null}>
      <CommandMenuDialog open={open} setOpen={setOpen} />
    </Suspense>
  );
};

export default CommandMenu;

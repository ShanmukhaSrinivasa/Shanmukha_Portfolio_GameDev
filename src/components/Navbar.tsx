import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Search } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { playClick } from '@/hooks/useSoundEffects';
import MuteToggle from './MuteToggle';
import { OPEN_COMMAND_MENU } from '@/lib/events';

const links = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
  { label: 'itch.io', href: 'https://shanmukha.itch.io/' },
];

const external = (href: string) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {};

const openCommandMenu = () => window.dispatchEvent(new Event(OPEN_COMMAND_MENU));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? 'border-b border-line bg-background/75 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            playClick();
            if (lenis) lenis.scrollTo(0);
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-sm font-bold tracking-tight text-foreground"
          aria-label="Back to top"
        >
          Shanmukha<span className="text-primary">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={playClick}
              {...external(link.href)}
              className="px-3 py-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              playClick();
              openCommandMenu();
            }}
            className="hidden items-center gap-2 border border-line px-2.5 py-1.5 text-[12px] text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground sm:flex"
            aria-label="Open command menu"
          >
            <Search size={13} />
            Search
            <kbd className="font-mono text-[10px] text-muted-foreground/70">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
          </button>
          <MuteToggle size={15} />
          <button
            type="button"
            onClick={() => {
              playClick();
              setOpen((o) => !o);
            }}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...external(link.href)}
                  onClick={() => {
                    playClick();
                    setOpen(false);
                  }}
                  className="border-b border-line py-4 font-display text-2xl font-semibold tracking-tight text-foreground last:border-b-0"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openCommandMenu();
                }}
                className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Search size={14} /> Search everything
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

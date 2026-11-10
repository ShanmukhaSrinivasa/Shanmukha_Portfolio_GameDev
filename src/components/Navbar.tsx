import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, Search, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { playClick } from '@/hooks/useSoundEffects';
import MuteToggle from './MuteToggle';
import { OPEN_COMMAND_MENU } from '@/lib/events';

const links = [
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

const ITCH = 'https://shanmukha.itch.io/';

const openCommandMenu = () => window.dispatchEvent(new Event(OPEN_COMMAND_MENU));

/** Floating "island" navigation: a centered glass capsule with a sliding active indicator. */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMac, setIsMac] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight whichever section crosses the middle of the viewport.
  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    const top = () => window.scrollY < 300 && setActive(null);
    window.addEventListener('scroll', top, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', top);
    };
  }, []);

  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    playClick();
    setOpen(false);
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // The pill sits under the hovered link, falling back to the active section.
  const pill = hovered ?? active;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-4">
      <motion.nav
        aria-label="Primary"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`pointer-events-auto relative w-full max-w-[50rem] rounded-2xl border border-white/10 backdrop-blur-xl transition-[background-color,box-shadow,max-width] duration-500 ${
          scrolled || open
            ? 'bg-surface/85 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9),0_8px_30px_-12px_hsl(var(--glow)/0.35),inset_0_1px_0_rgba(255,255,255,0.06)] md:max-w-[46rem]'
            : 'bg-surface/70 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.8),0_6px_28px_-14px_hsl(var(--glow)/0.3),inset_0_1px_0_rgba(255,255,255,0.06)]'
        }`}
      >
        {/* Top highlight for a glassy edge */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />

        <div className={`flex items-center gap-2 pl-2 pr-2 transition-[padding] duration-300 ${scrolled ? 'py-1.5' : 'py-2'}`}>
          {/* Brand */}
          <a
            href="#top"
            onClick={toTop}
            aria-label="Back to top"
            className="group flex shrink-0 items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors hover:bg-surface-2/70"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg border border-primary/40 bg-primary/15 font-mono text-[11px] font-bold text-primary shadow-[0_0_14px_hsl(var(--glow)/0.35)]">
              S_
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight text-foreground sm:block">
              Shanmukha<span className="text-primary">.</span>
            </span>
          </a>

          {/* Desktop links with a sliding pill */}
          <ul
            className="mx-auto hidden items-center md:flex"
            onPointerLeave={() => setHovered(null)}
          >
            {links.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id} className="relative">
                  {pill === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl border border-line bg-surface-2/90"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <a
                    href={link.href}
                    onClick={playClick}
                    onPointerEnter={() => setHovered(link.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative z-10 flex items-center gap-1.5 px-3.5 py-2 text-[13px] transition-colors ${
                      isActive || hovered === link.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {isActive && (
                      <span className="h-1 w-1 rounded-full bg-term shadow-[0_0_6px_hsl(var(--term))]" aria-hidden="true" />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="ml-auto flex shrink-0 items-center gap-1.5 md:ml-0">
            <a
              href={ITCH}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="hidden items-center gap-1 rounded-xl px-3 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-surface-2/70 hover:text-foreground lg:flex"
            >
              itch.io <ArrowUpRight size={13} className="opacity-60" />
            </a>
            <button
              type="button"
              onClick={() => {
                playClick();
                openCommandMenu();
              }}
              aria-label="Open command menu"
              className="hidden items-center gap-2 rounded-xl border border-line bg-surface-2/60 px-2.5 py-1.5 text-[12px] text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground sm:flex"
            >
              <Search size={13} />
              <span className="hidden lg:inline">Search</span>
              <kbd className="rounded-md border border-line bg-background/60 px-1.5 py-px font-mono text-[10px] text-muted-foreground/80">
                {isMac ? '⌘K' : 'Ctrl K'}
              </kbd>
            </button>
            <MuteToggle size={14} className="rounded-xl" />
            <button
              type="button"
              onClick={() => {
                playClick();
                setOpen((o) => !o);
              }}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-9 w-9 place-items-center rounded-xl border border-line text-foreground transition-colors hover:border-primary/60 md:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile menu: expands inside the island */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden md:hidden"
            >
              <div className="mx-2 mb-2 border-t border-line pt-2">
                {[...links, { label: 'itch.io', href: ITCH, id: 'itch' }].map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    onClick={() => {
                      playClick();
                      setOpen(false);
                    }}
                    className="flex items-center justify-between rounded-xl px-3 py-3 font-display text-lg font-semibold tracking-tight text-foreground transition-colors hover:bg-surface-2/70"
                  >
                    <span>
                      <span className="mr-2 font-mono text-xs text-primary">{String(i + 1).padStart(2, '0')}</span>
                      {link.label}
                    </span>
                    {active === link.id && <span className="h-1.5 w-1.5 rounded-full bg-term" aria-hidden="true" />}
                  </motion.a>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openCommandMenu();
                  }}
                  className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-surface-2/70"
                >
                  <Search size={14} /> Search everything
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Navbar;

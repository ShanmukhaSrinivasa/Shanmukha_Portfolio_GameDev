import { useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';
import { getMasterVolume, playClick, subscribeVolume } from '@/hooks/useSoundEffects';
import { OPEN_COMMAND_MENU } from '@/lib/events';

const WINDOWS = [
  { id: 'top', label: 'home' },
  { id: 'featured', label: 'featured' },
  { id: 'projects', label: 'games' },
  { id: 'about', label: 'about' },
  { id: 'education', label: 'edu' },
  { id: 'skills', label: 'skills' },
  { id: 'contact', label: 'contact' },
];

const clock = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

/** A tmux-style status line pinned to the bottom of the home page (desktop only). */
const StatusBar = () => {
  const [active, setActive] = useState('top');
  const [time, setTime] = useState(clock);
  const [muted, setMuted] = useState(() => getMasterVolume() === 0);
  const lenis = useLenis();

  useEffect(() => subscribeVolume((v) => setMuted(v === 0)), []);

  useEffect(() => {
    const t = window.setInterval(() => setTime(clock()), 15_000);
    return () => window.clearInterval(t);
  }, []);

  // The active window is whichever section crosses the middle of the viewport.
  useEffect(() => {
    const els = WINDOWS.map((w) => document.getElementById(w.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    playClick();
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(id === 'top' ? 0 : el, { offset: -72 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 hidden h-7 items-center justify-between border-t border-line bg-background/85 px-3 font-mono text-[11px] backdrop-blur-md md:flex"
      role="navigation"
      aria-label="Section status bar"
    >
      <div className="flex min-w-0 items-center gap-1">
        <span className="bg-term px-2 font-semibold text-background">shanmukha</span>
        {WINDOWS.map((w, i) => {
          const on = w.id === active;
          return (
            <button
              key={w.id}
              type="button"
              onClick={() => go(w.id)}
              aria-current={on ? 'location' : undefined}
              className={`px-2 transition-colors ${
                on ? 'bg-primary/20 text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {i}:{w.label}
              {on ? <span className="text-primary">*</span> : <span className="opacity-0">*</span>}
            </button>
          );
        })}
      </div>
      <div className="flex shrink-0 items-center gap-3 text-muted-foreground">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_MENU))}
          className="transition-colors hover:text-foreground"
        >
          ⌘K search
        </button>
        <span className="text-line">│</span>
        <span>sfx:{muted ? 'off' : 'on'}</span>
        <span className="text-line">│</span>
        <span className="text-term">● online</span>
        <span className="text-line">│</span>
        <span className="text-foreground/80">{time}</span>
      </div>
    </div>
  );
};

export default StatusBar;

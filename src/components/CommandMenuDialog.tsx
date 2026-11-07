import { useEffect, type ReactNode } from 'react';
import { Command } from 'cmdk';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import {
  ArrowRight,
  Copy,
  FileDown,
  Gamepad2,
  Github,
  Hash,
  Linkedin,
  Terminal as TerminalIcon,
  Volume2,
  Youtube,
} from 'lucide-react';
import { projectsData } from '@/data/projectsData';
import { OPEN_TERMINAL } from '@/lib/events';
import { getMasterVolume, playClick, setMasterVolume } from '@/hooks/useSoundEffects';

const SECTIONS = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Technical skills' },
  { id: 'contact', label: 'Contact' },
];

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/ShanmukhaSrinivasa', Icon: Github },
  { label: 'itch.io', href: 'https://shanmukha.itch.io/', Icon: Gamepad2 },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shanmukhasrinivasa/', Icon: Linkedin },
  { label: 'YouTube', href: 'https://www.youtube.com/@shanmukha3445', Icon: Youtube },
];

const EMAIL = 'shannugopa@gmail.com';

const itemClass =
  'flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground cursor-pointer select-none ' +
  'data-[selected=true]:bg-surface-2 data-[selected=true]:text-foreground transition-colors';

const groupClass =
  '[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-4 [&_[cmdk-group-heading]]:pb-2 ' +
  '[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] ' +
  '[&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.25em] ' +
  '[&_[cmdk-group-heading]]:text-muted-foreground/70';

const Item = ({
  onSelect,
  icon,
  children,
  hint,
  keywords,
}: {
  onSelect: () => void;
  icon: ReactNode;
  children: ReactNode;
  hint?: string;
  keywords?: string[];
}) => (
  <Command.Item onSelect={onSelect} className={itemClass} keywords={keywords}>
    <span className="text-primary/80">{icon}</span>
    <span className="flex-1 truncate">{children}</span>
    {hint && <span className="font-mono text-[10px] text-muted-foreground/60">{hint}</span>}
  </Command.Item>
);

interface CommandMenuDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

/** The ⌘K palette itself. Loaded on demand by CommandMenu. */
const CommandMenuDialog = ({ open, setOpen }: CommandMenuDialogProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const lenis = useLenis();

  // Pause smooth scrolling while the palette is open so its list scrolls normally.
  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  const run = (fn: () => void) => {
    setOpen(false);
    playClick();
    fn();
  };

  const scrollToSection = (id: string) => {
    const go = () => {
      const el = document.getElementById(id);
      if (!el) return false;
      if (lenis) lenis.scrollTo(el, { offset: -80 });
      else el.scrollIntoView({ behavior: 'smooth' });
      return true;
    };
    if (pathname === '/' && go()) return;
    navigate('/');
    // Wait for the home page to finish its page transition, then scroll.
    let tries = 0;
    const timer = window.setInterval(() => {
      if (go() || ++tries > 30) window.clearInterval(timer);
    }, 60);
  };

  const toggleSound = () => setMasterVolume(getMasterVolume() === 0 ? 0.8 : 0);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      overlayClassName="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[15vh] z-[95] w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 border border-line bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <span className="font-mono text-xs text-primary">&gt;</span>
        <Command.Input
          placeholder="Search projects, sections, links…"
          className="h-14 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
        />
        <kbd className="hidden sm:block font-mono text-[10px] text-muted-foreground/60 border border-line px-1.5 py-0.5">
          ESC
        </kbd>
      </div>

      <Command.List data-lenis-prevent className="max-h-[60vh] overflow-y-auto overscroll-contain pb-2">
        <Command.Empty className="px-4 py-10 text-center text-sm text-muted-foreground">
          No results.
        </Command.Empty>

        <Command.Group heading="Projects" className={groupClass}>
          {projectsData.map((p) => (
            <Item
              key={p.slug}
              icon={<ArrowRight size={15} />}
              hint={p.metadata.genre}
              keywords={[p.type, ...p.tech]}
              onSelect={() => run(() => navigate(`/projects/${p.slug}`))}
            >
              {p.title}
            </Item>
          ))}
        </Command.Group>

        <Command.Group heading="Jump to" className={groupClass}>
          {SECTIONS.map((s) => (
            <Item key={s.id} icon={<Hash size={15} />} onSelect={() => run(() => scrollToSection(s.id))}>
              {s.label}
            </Item>
          ))}
        </Command.Group>

        <Command.Group heading="Actions" className={groupClass}>
          <Item
            icon={<FileDown size={15} />}
            keywords={['cv']}
            onSelect={() => run(() => window.open('/Shanmukha_Srinivasa_Resume.pdf', '_blank'))}
          >
            Open resume
          </Item>
          <Item
            icon={<Copy size={15} />}
            hint={EMAIL}
            onSelect={() => run(() => navigator.clipboard?.writeText(EMAIL).catch(() => {}))}
          >
            Copy email address
          </Item>
          <Item icon={<Volume2 size={15} />} keywords={['mute', 'audio']} onSelect={() => run(toggleSound)}>
            Toggle sound effects
          </Item>
          <Item
            icon={<TerminalIcon size={15} />}
            hint="Ctrl+`"
            onSelect={() => run(() => window.dispatchEvent(new Event(OPEN_TERMINAL)))}
          >
            Open terminal
          </Item>
        </Command.Group>

        <Command.Group heading="Elsewhere" className={groupClass}>
          {LINKS.map(({ label, href, Icon }) => (
            <Item
              key={label}
              icon={<Icon size={15} />}
              onSelect={() => run(() => window.open(href, '_blank', 'noopener,noreferrer'))}
            >
              {label}
            </Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
};

export default CommandMenuDialog;

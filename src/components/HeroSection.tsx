import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { playClick, playHover } from '@/hooks/useSoundEffects';
import {
  ArrowDown,
  FileDown,
  Gamepad2,
  Github,
  InstagramIcon,
  Linkedin,
  Mail,
  Twitter,
  YoutubeIcon,
} from 'lucide-react';
import { revealChild, revealParent } from '@/lib/motion';
import BootLog from './BootLog';

const HeroScene = lazy(() => import('./HeroScene'));

const roles = ['Game Developer', 'C# Programmer', 'C++ Programmer', 'Unity Developer'];
const tech = ['C#', 'C++', 'Unity', 'Unreal Engine 5', 'Gameplay Systems', 'QA Testing'];
const socials = [
  { Icon: Github, href: 'https://github.com/ShanmukhaSrinivasa', label: 'GitHub' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/shanmukhasrinivasa/', label: 'LinkedIn' },
  { Icon: Gamepad2, href: 'https://shanmukha.itch.io/', label: 'itch.io' },
  { Icon: YoutubeIcon, href: 'https://www.youtube.com/@shanmukha3445', label: 'YouTube' },
  { Icon: Twitter, href: 'https://x.com/Shanmukha_3445', label: 'X (Twitter)' },
  { Icon: InstagramIcon, href: 'https://www.instagram.com/shk_shanmukha/', label: 'Instagram' },
  { Icon: Mail, href: 'mailto:shannugopa@gmail.com', label: 'Email' },
];

const hasWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
};

/** Cycles through `roles` with a typing effect (plain swaps for reduced motion). */
const useTypewriter = (reduce: boolean | null) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) {
      const t = window.setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600);
      return () => window.clearInterval(t);
    }
    const role = roles[roleIndex];
    let delay = deleting ? 40 : 80;
    if (!deleting && text === role) delay = 2000;
    const t = window.setTimeout(() => {
      if (!deleting && text === role) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      } else setText(role.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => window.clearTimeout(t);
  }, [text, deleting, roleIndex, reduce]);

  return reduce ? roles[roleIndex] : text;
};

const HeroSection = () => {
  const reduce = useReducedMotion();
  const role = useTypewriter(reduce);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  const [webgl] = useState(hasWebGL);
  const [playing, setPlaying] = useState(false);
  const onPlayingChange = useCallback((p: boolean) => setPlaying(p), []);

  // Leaving the hero hands the cabinet back to demo mode.
  useEffect(() => {
    if (!inView) setPlaying(false);
  }, [inView]);

  // Stop rendering the 3D scene while the hero is scrolled offscreen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-24 pt-32"
    >
      {/* Ambient light + faint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-primary/20 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="grid-pan pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(hsl(var(--line))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--line))_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />

      {/* 3D scene: an arcade cabinet running a playable mini-game */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35 lg:pointer-events-auto lg:left-[45%] lg:opacity-100"
      >
        {webgl ? (
          <Suspense fallback={null}>
            <motion.div
              className="h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, delay: 0.3 }}
            >
              <HeroScene
                animate={!reduce}
                active={inView}
                playing={playing}
                onPlayingChange={onPlayingChange}
              />
            </motion.div>
          </Suspense>
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,hsl(var(--glow)/0.25),transparent_60%)]" />
        )}
      </div>

      {webgl && (
        <div className="pointer-events-none absolute bottom-16 right-[16%] z-10 hidden font-mono text-[11px] lg:block">
          {playing ? (
            <p className="border border-term/40 bg-background/80 px-3 py-1.5 text-term backdrop-blur-sm">
              ← → move · space fire · esc quit
            </p>
          ) : (
            <p className="text-muted-foreground">
              <span className="text-term">▶</span> click the cabinet to play
              <span className="cursor-block" aria-hidden="true" />
            </p>
          )}
        </div>
      )}

      {/* Code-comment details */}
      <p className="absolute bottom-8 left-6 z-10 hidden font-mono text-[11px] leading-relaxed text-muted-foreground/60 md:left-10 lg:block">
        // portfolio.cs
        <br />
        // version: 1.0.4
        <br />
        // status: early_access
      </p>

      <motion.div
        className="pointer-events-none relative z-10 mx-auto w-full max-w-6xl"
        initial="hidden"
        animate="show"
        variants={revealParent}
      >
        <div className="pointer-events-auto max-w-2xl">
          <motion.div variants={revealChild}>
            <BootLog />
          </motion.div>

          <motion.h1
            variants={revealChild}
            className="heading-brutal leading-[0.88]"
            style={{ fontSize: 'clamp(3.25rem, 9vw, 8rem)' }}
          >
            Shanmukha
            <br />
            <span className="text-foreground/25">Srinivasa</span>
            <span className="text-primary glow-text">_</span>
          </motion.h1>

          <motion.p
            variants={revealChild}
            className="mt-8 flex h-7 items-center font-mono text-sm tracking-[0.12em] text-muted-foreground md:text-base"
            aria-label={`Roles: ${roles.join(', ')}`}
          >
            <span className="text-primary" aria-hidden="true">&lt;</span>
            <span className="mx-1.5 text-foreground" aria-hidden="true">{role}</span>
            <span
              className="inline-block h-5 w-[2px] animate-pulse bg-primary motion-reduce:animate-none"
              aria-hidden="true"
            />
            <span className="ml-1.5 text-primary" aria-hidden="true">/&gt;</span>
          </motion.p>

          <motion.p variants={revealChild} className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            I build gameplay systems in Unity and Unreal, from idle economies and wave spawners to
            multiplayer networking, and ship them as polished, playable games.
          </motion.p>

          <motion.ul variants={revealChild} className="mt-8 flex flex-wrap gap-2" aria-label="Core skills">
            {tech.map((t) => (
              <li
                key={t}
                onMouseEnter={playHover}
                className="border border-line px-3 py-1 font-mono text-[11px] tracking-wider text-foreground/80 transition-colors hover:border-primary/60 hover:text-foreground"
              >
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={revealChild} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              onClick={playClick}
              className="group inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View my work
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="/Shanmukha_Srinivasa_Resume.pdf"
              download="Shanmukha_Srinivasa_Resume.pdf"
              onClick={playClick}
              className="inline-flex items-center gap-2 border border-line px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary"
            >
              <FileDown size={16} />
              Resume
            </a>
          </motion.div>

          <motion.div variants={revealChild} className="mt-12 flex flex-wrap gap-1">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                onClick={playClick}
                className="grid h-10 w-10 place-items-center text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom details */}
      <div className="absolute bottom-8 right-6 z-10 hidden text-right font-mono text-[11px] leading-relaxed text-muted-foreground/60 md:right-10 lg:block">
        <p>const games_built = "30+";</p>
        <p>const engines = ["Unity", "UE5"];</p>
        <p>const languages = ["C#", "C++"];</p>
        <p>const passion = Infinity;</p>
      </div>
      <a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground/50 transition-colors hover:text-foreground"
      >
        <ArrowDown className="h-5 w-5 animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  );
};

export default HeroSection;

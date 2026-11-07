import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { playClick } from '@/hooks/useSoundEffects';
import useSpotlight from '@/hooks/useSpotlight';
import TerminalWindow from './TerminalWindow';

const SLIDE_MS = 6000;
const featuredProjects = projectsData.filter((project) => project.showcase);

const FeaturedProject = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const onPointerMove = useSpotlight<HTMLDivElement>();
  const count = featuredProjects.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % count), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, count]);

  const project = featuredProjects[index];
  if (!project) return null;

  const go = (next: number) => {
    playClick();
    setIndex((next + count) % count);
  };

  return (
    <section
      id="featured"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      className="border-y border-line bg-surface/60 px-6 py-24 md:py-32"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header row */}
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-primary/60" />
              01 — Featured
            </p>
            <p className="mb-3 font-mono text-sm text-muted-foreground">
              <span className="text-term">$</span> ./showcase --autoplay
            </p>
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-foreground">{String(index + 1).padStart(2, '0')}</span>
              {' / '}
              {String(count).padStart(2, '0')}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous project"
              className="grid h-11 w-11 place-items-center border border-line text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next project"
              className="grid h-11 w-11 place-items-center border border-line text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
          {/* Copy */}
          <div className="min-h-[22rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {project.type} · {project.metadata.year}
                </p>
                <h2 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-[-0.045em] text-foreground md:text-7xl">
                  {project.title}
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                  {project.shortDesc}
                </p>

                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground/80">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    to={`/projects/${project.slug}`}
                    onClick={playClick}
                    className="group inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    View case study
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="group inline-flex items-center gap-2 border border-line px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary"
                  >
                    <Play size={14} className="fill-current" />
                    Play
                    <ArrowUpRight size={14} className="text-muted-foreground" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Media */}
          <TerminalWindow
            title={`now_playing: ~/games/${project.slug}.exe`}
            status={<span className="text-term">● live</span>}
            className="shadow-[0_30px_80px_-40px_hsl(var(--glow)/0.7)]"
          >
            <div
              onPointerMove={onPointerMove}
              className="spotlight relative aspect-video overflow-hidden bg-black"
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={project.slug}
                  src={project.images[0]}
                  alt={`${project.title} cover`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </TerminalWindow>
        </div>

        {/* Progress indicator */}
        <div className="mt-12 flex gap-2" role="tablist" aria-label="Choose a featured project">
          {featuredProjects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={p.title}
              onClick={() => go(i)}
              className="relative h-1 flex-1 overflow-hidden bg-line"
            >
              {i === index && (
                <motion.span
                  key={`${p.slug}-${paused}`}
                  className="absolute inset-y-0 left-0 bg-primary"
                  initial={{ width: paused ? '100%' : '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: paused ? 0 : SLIDE_MS / 1000, ease: 'linear' }}
                />
              )}
              {i < index && <span className="absolute inset-0 bg-primary/40" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;

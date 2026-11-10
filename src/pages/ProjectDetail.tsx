import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import { ArrowLeft, ArrowUpRight, Github, Loader2, Maximize2, Play } from 'lucide-react';

import { projectsData } from '../data/projectsData';
import { playClick, playTerminalOpen } from '@/hooks/useSoundEffects';
import useSpotlight from '@/hooks/useSpotlight';
import { Reveal } from '@/components/SectionBlock';
import { revealChild, revealParent } from '@/lib/motion';
import CaseBlock from '@/components/case-study/CaseBlock';
import CaseList from '@/components/case-study/CaseList';
import RelatedProjects from '@/components/RelatedProjects';
import MuteToggle from '@/components/MuteToggle';
import TerminalWindow from '@/components/TerminalWindow';
import { OPEN_COMMAND_MENU } from '@/lib/events';

// The boot splash plays only on the first project opened per visit,
// so browsing between projects afterwards is instant.
const BOOT_MS = 700;
let hasBooted = false;

const SectionLabel = ({ index, children }: { index: string; children: string }) => (
  <p className="mb-8 font-mono text-xs text-muted-foreground">
    <span className="text-term"># {index}</span> <span className="text-foreground/90">{children.toLowerCase()}</span>
    <span className="text-muted-foreground/50"> ──────────</span>
  </p>
);

export const ProjectDetail = () => {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(() => !hasBooted);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const onPointerMove = useSpotlight<HTMLButtonElement>();

  const project = projectsData.find((p) => p.slug === slug);

  useEffect(() => {
    playTerminalOpen();

    if (hasBooted) return;
    const timer = setTimeout(() => {
      hasBooted = true;
      setIsLoading(false);
    }, BOOT_MS);
    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    if (project) document.title = `${project.title} | Shanmukha Srinivasa`;
    return () => {
      document.title = 'Shanmukha Srinivasa | Game Developer';
    };
  }, [project]);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
        <p className="eyebrow">404 — Project not found</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">
          There's no project called "{slug}".
        </h1>
        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-2 border border-line px-6 py-3 text-sm text-foreground transition-colors hover:border-primary"
        >
          <ArrowLeft size={14} /> Back to all projects
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background font-mono">
        <div className="w-64 space-y-4">
          <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] text-primary">
            <span>Loading build</span>
            <span className="text-muted-foreground">{slug}</span>
          </div>
          <div className="relative h-px w-full overflow-hidden bg-line">
            <motion.div
              className="absolute inset-y-0 left-0 bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: BOOT_MS / 1000, ease: 'easeInOut' }}
            />
          </div>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground/60">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>Fetching manifest v1.0.4</span>
          </div>
        </div>
      </div>
    );
  }

  const facts = [
    { label: 'Role', value: project.metadata.role },
    { label: 'Year', value: project.metadata.year },
    { label: 'Genre', value: project.metadata.genre },
    { label: 'Platform', value: project.metadata.platform },
    { label: 'Dev time', value: project.developmentTime ?? '—' },
    { label: 'Team', value: project.teamSize ?? 'Solo Developer' },
    { label: 'Engine', value: project.tech[0] },
  ];

  const gallery = project.images.slice(1);
  const slides = project.images.map((src, i) => ({
    src,
    alt: `${project.title} screenshot ${i + 1}`,
  }));

  const caseLists = [
    { title: 'Design goals', items: project.designGoals },
    { title: 'Technical challenges', items: project.technicalChallenges },
    { title: 'Solutions', items: project.solutions },
    { title: 'Results', items: project.results },
  ].filter((c): c is { title: string; items: string[] } => !!c.items?.length);

  let sectionNo = 0;
  const nextNo = () => String(++sectionNo).padStart(2, '0');

  return (
    <div className="min-h-screen text-foreground">
      {/* Top bar */}
      <nav className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link
            to="/"
            onClick={playClick}
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            All projects
          </Link>
          <span className="hidden truncate font-display text-sm font-semibold text-foreground/80 md:block">
            {project.title}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_MENU))}
              className="hidden items-center gap-2 border border-line px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground sm:flex"
              aria-label="Open command menu"
            >
              Search <kbd className="text-muted-foreground/70">⌘K</kbd>
            </button>
            <MuteToggle size={14} />
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <motion.header
          className="pb-12 pt-16 md:pb-16 md:pt-24"
          initial="hidden"
          animate="show"
          variants={revealParent}
        >
          <motion.p variants={revealChild} className="mb-6 font-mono text-sm text-muted-foreground">
            <span className="text-term glow-term">shanmukha@dev</span>
            <span className="text-muted-foreground/60">:</span>
            <span className="text-primary">~/games</span>
            <span className="text-muted-foreground/60">$ </span>
            <span className="text-foreground/90">./{project.slug} --case-study</span>
          </motion.p>
          <motion.p variants={revealChild} className="eyebrow mb-4">
            {project.type} · {project.metadata.year}
          </motion.p>
          <motion.h1
            variants={revealChild}
            className="font-display text-5xl font-bold leading-[0.9] tracking-[-0.05em] md:text-8xl"
          >
            {project.title}
            <span className="cursor-block" aria-hidden="true" />
          </motion.h1>
          <motion.p variants={revealChild} className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            {project.tagline}
          </motion.p>
          <motion.div variants={revealChild} className="mt-10 flex flex-wrap gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="group inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Play size={14} className="fill-current" /> Play the game
              <ArrowUpRight size={14} className="opacity-70" />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="inline-flex items-center gap-2 border border-line px-6 py-3.5 text-sm font-semibold transition-colors hover:border-primary"
            >
              <Github size={16} /> Source
            </a>
          </motion.div>
        </motion.header>

        {/* Cover */}
        <Reveal>
          <TerminalWindow
            title={`~/games/${project.slug}/cover.webp`}
            status={`${project.images.length} captures`}
          >
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            onPointerMove={onPointerMove}
            className="spotlight group relative block aspect-video w-full overflow-hidden bg-black"
            aria-label="Open screenshot gallery"
          >
            <img
              src={project.images[0]}
              alt={`${project.title} cover`}
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            />
            <span className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/90 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              <Maximize2 size={12} /> View gallery
            </span>
          </button>
          </TerminalWindow>
        </Reveal>

        {/* Facts bar */}
        <Reveal className="mt-px">
          <dl className="grid grid-cols-2 gap-px border-x border-b border-line bg-line sm:grid-cols-4 lg:grid-cols-7">
            {facts.map((f) => (
              <div key={f.label} className="bg-background px-5 py-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">{f.label}</dt>
                <dd className="mt-2 text-sm font-medium text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Overview */}
        <section className="grid grid-cols-1 gap-10 py-24 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:py-32 [&>*]:min-w-0">
          <Reveal>
            <SectionLabel index={nextNo()}>Overview</SectionLabel>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">The game</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">{project.fullDescription}</p>
          </Reveal>
        </section>

        {/* Trailer / playable build */}
        {(project.videoUrl || project.embedId) && (
          <section className="border-t border-line py-24 md:py-32">
            <Reveal>
              <SectionLabel index={nextNo()}>{project.embedId ? 'Play in browser' : 'Trailer'}</SectionLabel>
            </Reveal>
            <div className="space-y-10">
              {project.videoUrl && (
                <Reveal className="aspect-video border border-line bg-black">
                  <iframe
                    src={project.videoUrl}
                    title={`${project.title} trailer`}
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Reveal>
              )}
              {project.embedId && (
                <Reveal className="aspect-video border border-line bg-black">
                  <iframe
                    src={`https://itch.io/embed-upload/${project.embedId}?color=0a0f1a`}
                    title={`Play ${project.title}`}
                    className="h-full w-full border-none"
                    loading="lazy"
                    allowFullScreen
                  />
                </Reveal>
              )}
            </div>
          </section>
        )}

        {/* Case study */}
        {project.problem && (
          <section className="border-t border-line py-24 md:py-32">
            <Reveal>
              <SectionLabel index={nextNo()}>Case study</SectionLabel>
            </Reveal>
            <Reveal>
              <CaseBlock title="The problem" content={project.problem} />
            </Reveal>
            <div className="mt-20 grid gap-x-16 gap-y-16 md:grid-cols-2">
              {caseLists.map((c, i) => (
                <Reveal key={c.title} delay={(i % 2) * 0.08}>
                  <CaseList title={c.title} items={c.items} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {gallery.length > 0 && (
          <section className="border-t border-line py-24 md:py-32">
            <Reveal>
              <SectionLabel index={nextNo()}>Gallery</SectionLabel>
            </Reveal>
            <motion.div
              className="grid gap-4 md:grid-cols-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              variants={revealParent}
            >
              {gallery.map((img, i) => (
                <motion.button
                  key={img}
                  type="button"
                  variants={revealChild}
                  onClick={() => setLightboxIndex(i + 1)}
                  className={`group relative aspect-video overflow-hidden border border-line bg-black ${
                    gallery.length % 2 === 1 && i === gallery.length - 1 ? 'md:col-span-2 md:aspect-[21/9]' : ''
                  }`}
                  aria-label={`Open screenshot ${i + 2} of ${project.images.length}`}
                >
                  <img
                    src={img}
                    alt={`${project.title} screenshot ${i + 2}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                </motion.button>
              ))}
            </motion.div>
          </section>
        )}

        {/* Technical log + code */}
        <section className="grid grid-cols-1 gap-16 border-t border-line py-24 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:py-32 [&>*]:min-w-0">
          <Reveal>
            <SectionLabel index={nextNo()}>Under the hood</SectionLabel>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">Technical log</h2>
            <div className="mt-10 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ol className="divide-y divide-line border-y border-line">
              {project.technicalDeepDive.map((point, i) => (
                <li key={i} className="flex gap-6 py-5 text-[15px] leading-relaxed text-muted-foreground">
                  <span className="pt-0.5 font-mono text-xs text-primary">{String(i + 1).padStart(2, '0')}</span>
                  <span>{point}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          {project.codeSnippet && (
            <Reveal className="md:col-span-2">
              <figure className="border border-line bg-surface">
                <figcaption className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-[11px] text-muted-foreground">
                  <span className="text-foreground">{project.codeSnippet.title}</span>
                  <span className="uppercase tracking-[0.2em]">{project.codeSnippet.language}</span>
                </figcaption>
                <pre data-lenis-prevent className="overflow-x-auto p-6 font-mono text-[13px] leading-relaxed text-foreground/90">
                  <code>{project.codeSnippet.code}</code>
                </pre>
                {project.codeSnippet.caption && (
                  <p className="border-t border-line px-5 py-4 text-sm text-muted-foreground">
                    {project.codeSnippet.caption}
                  </p>
                )}
              </figure>
            </Reveal>
          )}
        </section>

        {/* Lessons */}
        {project.lessonsLearned?.length ? (
          <section className="border-t border-line py-24 md:py-32">
            <Reveal>
              <SectionLabel index={nextNo()}>Takeaways</SectionLabel>
            </Reveal>
            <Reveal>
              <CaseList title="Lessons learned" items={project.lessonsLearned} large />
            </Reveal>
          </section>
        ) : null}

        <RelatedProjects currentSlug={project.slug} />
      </main>

      <Lightbox
        open={lightboxIndex >= 0}
        index={Math.max(lightboxIndex, 0)}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        plugins={[Zoom, Counter]}
        controller={{ closeOnBackdropClick: true }}
        styles={{ container: { backgroundColor: 'rgba(5, 8, 15, 0.96)' } }}
      />
    </div>
  );
};

export default ProjectDetail;

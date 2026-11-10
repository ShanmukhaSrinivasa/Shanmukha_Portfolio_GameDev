import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Github, Maximize2, Monitor, Smartphone } from 'lucide-react';

import { allSoftwareImages, softwareProjects, type Caption } from '@/data/softwareProjects';
import { playClick, playTerminalOpen } from '@/hooks/useSoundEffects';
import { revealChild, revealParent } from '@/lib/motion';
import { OPEN_COMMAND_MENU } from '@/lib/events';
import { Reveal } from '@/components/SectionBlock';
import CaseBlock from '@/components/case-study/CaseBlock';
import CaseList from '@/components/case-study/CaseList';
import MuteToggle from '@/components/MuteToggle';
import TerminalWindow from '@/components/TerminalWindow';
import SoftwareCard from '@/components/SoftwareCard';

const GalleryLightbox = lazy(() => import('@/components/GalleryLightbox'));

const STATUS_LABEL = { live: '● live', 'in-progress': '● in progress', archived: '● archived' } as const;

const SectionLabel = ({ index, children }: { index: string; children: string }) => (
  <p className="mb-8 font-mono text-xs text-muted-foreground">
    <span className="text-term"># {index}</span> <span className="text-foreground/90">{children.toLowerCase()}</span>
    <span className="text-muted-foreground/50"> ──────────</span>
  </p>
);

/** Case-study page for a non-game software project: /software/:slug */
const SoftwareDetail = () => {
  const { slug } = useParams();
  const reduce = useReducedMotion();
  const project = softwareProjects.find((p) => p.slug === slug);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [lightboxRequested, setLightboxRequested] = useState(false);

  const images = useMemo(() => (project ? allSoftwareImages(project) : []), [project]);

  useEffect(() => {
    playTerminalOpen();
  }, [slug]);

  useEffect(() => {
    if (project) document.title = `${project.title} | Shanmukha Srinivasa`;
    return () => {
      document.title = 'Shanmukha Srinivasa | Game Developer';
    };
  }, [project]);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="eyebrow">404 — Project not found</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">
          There's no software project called "{slug}".
        </h1>
        <Link
          to="/#software"
          className="mt-4 inline-flex items-center gap-2 border border-line px-6 py-3 text-sm text-foreground transition-colors hover:border-primary"
        >
          <ArrowLeft size={14} /> Back to software
        </Link>
      </div>
    );
  }

  /** Open the lightbox on a specific image (matched by its src). */
  const openImage = (img: Caption) => {
    playClick();
    setLightboxRequested(true);
    setLightboxIndex(Math.max(0, images.findIndex((i) => i.src === img.src)));
  };

  const facts = [
    { label: 'Role', value: project.role ?? 'Developer' },
    { label: 'Year', value: project.year },
    { label: 'Type', value: project.type },
    { label: 'Platform', value: project.platform ?? '—' },
    { label: 'Dev time', value: project.developmentTime ?? '—' },
    { label: 'Team', value: project.teamSize ?? 'Solo' },
    { label: 'Built with', value: project.stack[0] },
  ];

  const caseLists = [
    { title: 'Design goals', items: project.designGoals },
    { title: 'Technical challenges', items: project.technicalChallenges },
    { title: 'Solutions', items: project.solutions },
    { title: 'Results', items: project.results },
  ].filter((c): c is { title: string; items: string[] } => !!c.items?.length);

  const desktop = project.screenshots?.desktop ?? [];
  const phone = project.screenshots?.phone ?? [];
  const showcase = (project.gallery ?? []).filter((g) => g.src !== project.image);
  const others = softwareProjects.filter((p) => p.slug !== project.slug).slice(0, 2);

  let sectionNo = 0;
  const nextNo = () => String(++sectionNo).padStart(2, '0');

  return (
    <div className="min-h-screen text-foreground">
      {/* Top bar */}
      <nav className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link
            to="/#software"
            onClick={playClick}
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            All software
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
        <motion.header className="pb-12 pt-16 md:pb-16 md:pt-24" initial="hidden" animate="show" variants={revealParent}>
          <motion.p variants={revealChild} className="mb-6 font-mono text-sm text-muted-foreground">
            <span className="text-term glow-term">shanmukha@dev</span>
            <span className="text-muted-foreground/60">:</span>
            <span className="text-primary">~/dev</span>
            <span className="text-muted-foreground/60">$ </span>
            <span className="text-foreground/90">./{project.slug} --case-study</span>
          </motion.p>
          <motion.p variants={revealChild} className="eyebrow mb-4">
            {project.type} · {project.year}
            {project.status && <span className="ml-3 text-term">{STATUS_LABEL[project.status]}</span>}
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
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="group inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Open the app
                <ArrowUpRight size={14} className="opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="inline-flex items-center gap-2 border border-line px-6 py-3.5 text-sm font-semibold transition-colors hover:border-primary"
              >
                <Github size={16} /> Source
              </a>
            )}
            {images.length > 0 && (
              <button
                type="button"
                onClick={() => openImage(images[0])}
                className="inline-flex items-center gap-2 border border-line px-6 py-3.5 text-sm font-semibold transition-colors hover:border-primary"
              >
                <Maximize2 size={14} /> {images.length} screens
              </button>
            )}
          </motion.div>
        </motion.header>

        {/* Cover: the demo loop plays here (a still image for reduced motion) */}
        {project.image && (
          <Reveal>
            <TerminalWindow
              title={project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : `~/dev/${project.slug}`}
              status={project.previewVideo && !reduce ? <span className="text-term">● demo</span> : undefined}
            >
              <button
                type="button"
                onClick={() => project.gallery?.[0] && openImage(project.gallery[0])}
                className="group relative block aspect-video w-full overflow-hidden bg-black"
                aria-label="Open screenshot gallery"
              >
                {project.previewVideo && !reduce ? (
                  <video
                    src={project.previewVideo}
                    poster={project.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img src={project.image} alt={`${project.title} cover`} className="h-full w-full object-cover" />
                )}
                <span className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/90 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <Maximize2 size={12} /> View gallery
                </span>
              </button>
            </TerminalWindow>
          </Reveal>
        )}

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

        {/* Overview + modules */}
        <section className="grid gap-10 py-24 md:grid-cols-[1fr_2fr] md:py-32">
          <Reveal>
            <SectionLabel index={nextNo()}>Overview</SectionLabel>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">The app</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              {project.fullDescription ?? project.description}
            </p>
            {project.modules?.length ? (
              <div className="mt-10">
                <p className="mb-4 font-mono text-[11px] text-muted-foreground">
                  <span className="text-term">$</span> ls modules/ <span className="text-muted-foreground/60">— {project.modules.length} items</span>
                </p>
                <ul className="flex flex-wrap gap-2">
                  {project.modules.map((m) => (
                    <li
                      key={m}
                      className="border border-line bg-surface/70 px-3 py-1.5 font-mono text-[11px] text-foreground/85"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Reveal>
        </section>

        {/* Showcase images */}
        {showcase.length > 0 && (
          <section className="border-t border-line py-24 md:py-32">
            <Reveal>
              <SectionLabel index={nextNo()}>Highlights</SectionLabel>
            </Reveal>
            <motion.div
              className="grid gap-6 md:grid-cols-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              variants={revealParent}
            >
              {showcase.map((g, i) => (
                <motion.figure
                  key={g.src}
                  variants={revealChild}
                  className={showcase.length % 2 === 1 && i === showcase.length - 1 ? 'md:col-span-2' : ''}
                >
                  <button
                    type="button"
                    onClick={() => openImage(g)}
                    className="group block w-full overflow-hidden border border-line bg-black"
                    aria-label={`Open image: ${g.caption}`}
                  >
                    <img
                      src={g.src}
                      alt={g.caption}
                      loading="lazy"
                      decoding="async"
                      className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </button>
                  <figcaption className="mt-3 font-mono text-[11px] text-muted-foreground">
                    <span className="text-primary">&gt;</span> {g.caption}
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </section>
        )}

        {/* Full walkthrough (optional) */}
        {project.videoUrl && (
          <section className="border-t border-line py-24 md:py-32">
            <Reveal>
              <SectionLabel index={nextNo()}>Walkthrough</SectionLabel>
            </Reveal>
            <Reveal className="aspect-video border border-line bg-black">
              <iframe
                src={project.videoUrl}
                title={`${project.title} walkthrough`}
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Reveal>
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

        {/* Screens */}
        {(desktop.length > 0 || phone.length > 0) && (
          <section className="border-t border-line py-24 md:py-32">
            <Reveal>
              <SectionLabel index={nextNo()}>Screens</SectionLabel>
            </Reveal>

            {desktop.length > 0 && (
              <>
                <Reveal>
                  <h3 className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <Monitor size={14} className="text-primary" /> Desktop · {desktop.length}
                  </h3>
                </Reveal>
                <motion.div
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  variants={revealParent}
                >
                  {desktop.map((s) => (
                    <motion.figure key={s.src} variants={revealChild}>
                      <button
                        type="button"
                        onClick={() => openImage(s)}
                        className="group relative block aspect-[16/10] w-full overflow-hidden border border-line bg-black"
                        aria-label={`Open screenshot: ${s.caption}`}
                      >
                        <img
                          src={s.src}
                          alt={s.caption}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                      </button>
                      <figcaption className="mt-2 text-[13px] leading-snug text-muted-foreground">{s.caption}</figcaption>
                    </motion.figure>
                  ))}
                </motion.div>
              </>
            )}

            {phone.length > 0 && (
              <>
                <Reveal>
                  <h3 className="mb-6 mt-16 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <Smartphone size={14} className="text-primary" /> Phone · {phone.length}
                  </h3>
                </Reveal>
                <motion.div
                  className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  variants={revealParent}
                >
                  {phone.map((s) => (
                    <motion.figure key={s.src} variants={revealChild}>
                      <button
                        type="button"
                        onClick={() => openImage(s)}
                        className="group relative block aspect-[9/19.5] w-full overflow-hidden rounded-[1.4rem] border border-line bg-black p-1"
                        aria-label={`Open screenshot: ${s.caption}`}
                      >
                        <img
                          src={s.src}
                          alt={s.caption}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full rounded-[1.1rem] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                      </button>
                      <figcaption className="mt-2 text-[12px] leading-snug text-muted-foreground">{s.caption}</figcaption>
                    </motion.figure>
                  ))}
                </motion.div>
              </>
            )}
          </section>
        )}

        {/* Technical log + stack + code */}
        <section className="grid gap-16 border-t border-line py-24 md:grid-cols-[1fr_1.4fr] md:py-32">
          <Reveal>
            <SectionLabel index={nextNo()}>Under the hood</SectionLabel>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">Technical log</h2>
            <div className="mt-10 flex flex-wrap gap-2">
              {project.stack.map((t) => (
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
              {(project.technicalDeepDive ?? project.highlights ?? []).map((point, i) => (
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
                  <p className="border-t border-line px-5 py-4 text-sm text-muted-foreground">{project.codeSnippet.caption}</p>
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

        {/* Keep exploring */}
        <section className="border-t border-line py-24 md:py-32">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-primary/60" />
              Keep exploring
            </p>
            <h2 className="font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl">
              {others.length ? 'More software' : 'See the games too'}
            </h2>
          </Reveal>
          {others.length > 0 ? (
            <motion.div
              className="mt-14 grid gap-6 md:grid-cols-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              variants={revealParent}
            >
              {others.map((p) => (
                <SoftwareCard key={p.slug} project={{ ...p, featured: false }} />
              ))}
            </motion.div>
          ) : (
            <Reveal className="mt-10">
              <Link
                to="/#projects"
                onClick={playClick}
                className="group inline-flex items-center gap-3 border border-line px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <span className="text-term group-hover:text-primary-foreground">$</span> cd ~/games
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          )}
        </section>
      </main>

      {lightboxRequested && (
        <Suspense fallback={null}>
          <GalleryLightbox slides={images} index={lightboxIndex} onClose={() => setLightboxIndex(-1)} />
        </Suspense>
      )}
    </div>
  );
};

export default SoftwareDetail;

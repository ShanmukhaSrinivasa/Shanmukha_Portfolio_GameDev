import { lazy, Suspense, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Github, Images, Play } from 'lucide-react';
import type { SoftwareProject } from '@/data/softwareProjects';
import { playClick } from '@/hooks/useSoundEffects';
import useSpotlight from '@/hooks/useSpotlight';
import { revealChild } from '@/lib/motion';

const GalleryLightbox = lazy(() => import('./GalleryLightbox'));

const STATUS = {
  live: { label: 'live', className: 'text-term' },
  'in-progress': { label: 'wip', className: 'text-[#febc2e]' },
  archived: { label: 'archived', className: 'text-muted-foreground/70' },
} as const;

interface SoftwareCardProps {
  project: SoftwareProject;
}

/** Terminal-window card for a non-game software project. */
const SoftwareCard = ({ project }: SoftwareCardProps) => {
  const onPointerMove = useSpotlight<HTMLElement>();
  const status = project.status ? STATUS[project.status] : null;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(-1);
  const [galleryRequested, setGalleryRequested] = useState(false);
  const gallery = project.gallery ?? [];
  // Thumbnails skip the first gallery image, which is the cover.
  const thumbs = gallery.slice(1, 4);

  const startPreview = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };
  const stopPreview = () => videoRef.current?.pause();

  const detailHref = `/software/${project.slug}`;

  const openGallery = (i = 0) => {
    if (!gallery.length) return;
    playClick();
    setGalleryRequested(true);
    setGalleryIndex(i);
  };

  return (
    <motion.article
      variants={revealChild}
      onPointerMove={onPointerMove}
      onPointerEnter={startPreview}
      onPointerLeave={stopPreview}
      className={`spotlight group flex h-full flex-col border border-line bg-surface/90 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-[0_0_0_1px_hsl(var(--glow)/0.25),0_20px_60px_-25px_hsl(var(--glow)/0.45)] ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Window title bar */}
      <div className="flex items-center gap-3 border-b border-line bg-surface-2/80 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70 transition-colors group-hover:bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70 transition-colors group-hover:bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70 transition-colors group-hover:bg-[#28c840]" />
        </span>
        <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground">
          ~/dev/<span className="text-foreground/90">{project.slug}</span>
        </span>
        {status && (
          <span className={`shrink-0 font-mono text-[10px] ${status.className}`}>● {status.label}</span>
        )}
      </div>

      <div className={`flex flex-1 flex-col ${project.featured && project.image ? 'md:flex-row' : ''}`}>
        {project.image && (
          <div
            className={`flex flex-col border-b border-line ${
              project.featured ? 'md:w-[55%] md:shrink-0 md:border-b-0 md:border-r' : ''
            }`}
          >
            {/* Cover keeps its true 16:9 ratio so nothing in it gets cropped */}
            <Link
              to={detailHref}
              onClick={playClick}
              aria-label={`${project.title} case study`}
              className="relative block aspect-video w-full overflow-hidden bg-black"
            >
              <img
                src={project.image}
                alt={`${project.title} cover`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              {project.previewVideo && (
                <video
                  ref={videoRef}
                  src={project.previewVideo}
                  muted
                  loop
                  playsInline
                  preload="none"
                  onPlaying={() => setVideoReady(true)}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                    videoReady ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
                  }`}
                />
              )}
              {project.previewVideo && (
                <span className="absolute right-3 top-3 hidden items-center gap-1.5 bg-black/60 px-2 py-1 font-mono [@media(hover:hover)]:flex text-[10px] uppercase tracking-[0.15em] text-white/85 backdrop-blur-sm transition-opacity group-hover:opacity-0">
                  <Play size={10} className="fill-current" /> Hover to play
                </span>
              )}
            </Link>

            {/* Thumbnail strip into the gallery (featured cards only) */}
            {project.featured && thumbs.length > 0 && (
              <div className="grid flex-1 grid-cols-3 gap-px border-t border-line bg-line">
                {thumbs.map((g, i) => {
                  const remaining = gallery.length - 1 - thumbs.length;
                  const isLast = i === thumbs.length - 1 && remaining > 0;
                  return (
                    <button
                      key={g.src}
                      type="button"
                      onClick={() => openGallery(i + 1)}
                      aria-label={`Open image: ${g.caption}`}
                      className="group/thumb relative min-h-[5.5rem] overflow-hidden bg-black"
                    >
                      <img
                        src={g.src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-[opacity,transform] duration-500 group-hover/thumb:scale-105 group-hover/thumb:opacity-100"
                      />
                      {isLast && (
                        <span className="absolute inset-0 grid place-items-center bg-black/55 font-mono text-xs text-white">
                          +{remaining} more
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-1 flex-col p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {project.type} · <span className="text-term/80">[{project.year}]</span>
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-foreground">
            <Link to={detailHref} onClick={playClick} className="transition-colors hover:text-primary">
              <span className="mr-2 font-mono text-lg text-primary">&gt;</span>
              {project.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-foreground/80">{project.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

          {project.highlights?.length ? (
            <ul className="mt-5 space-y-1.5 font-mono text-[12px] text-muted-foreground">
              {project.highlights.slice(0, 4).map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="text-term">+</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-auto pt-6">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                <Link
                  to={detailHref}
                  onClick={playClick}
                  className="group/cs inline-flex items-center gap-1.5 bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Case study <ArrowRight size={13} className="transition-transform group-hover/cs:translate-x-0.5" />
                </Link>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="inline-flex items-center gap-1.5 border border-line px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary"
                  >
                    {project.liveLabel ?? 'Open app'} <ArrowUpRight size={13} />
                  </a>
                )}
                {gallery.length > 0 && (
                  <button
                    type="button"
                    onClick={() => openGallery(0)}
                    className="inline-flex items-center gap-1.5 border border-line px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary"
                  >
                    <Images size={13} /> Gallery <span className="text-muted-foreground">({gallery.length})</span>
                  </button>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="inline-flex items-center gap-1.5 border border-line px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary"
                  >
                    <Github size={13} /> Source
                  </a>
                )}
            </div>
          </div>
        </div>
      </div>
      {galleryRequested && (
        <Suspense fallback={null}>
          <GalleryLightbox slides={gallery} index={galleryIndex} onClose={() => setGalleryIndex(-1)} />
        </Suspense>
      )}
    </motion.article>
  );
};

export default SoftwareCard;

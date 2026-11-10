import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';
import type { Project } from '@/data/projectsData';
import { playClick } from '@/hooks/useSoundEffects';
import useSpotlight from '@/hooks/useSpotlight';
import { revealChild } from '@/lib/motion';

interface ProjectCardProps {
  project: Project;
  index: number;
}

/** Grid card: full-colour cover, optional hover gameplay clip, pointer spotlight. */
const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const onPointerMove = useSpotlight<HTMLAnchorElement>();

  const startPreview = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };
  const stopPreview = () => videoRef.current?.pause();

  return (
    <motion.div variants={revealChild}>
      <Link
        to={`/projects/${project.slug}`}
        onClick={playClick}
        onPointerMove={onPointerMove}
        onPointerEnter={startPreview}
        onPointerLeave={stopPreview}
        onFocus={startPreview}
        onBlur={stopPreview}
        className="spotlight group block h-full border border-line bg-surface/90 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-[0_0_0_1px_hsl(var(--glow)/0.25),0_20px_60px_-25px_hsl(var(--glow)/0.45)]"
      >
        {/* Window title bar */}
        <div className="flex items-center gap-3 border-b border-line bg-surface-2/80 px-3 py-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70 transition-colors group-hover:bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70 transition-colors group-hover:bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70 transition-colors group-hover:bg-[#28c840]" />
          </span>
          <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground">
            ~/games/<span className="text-foreground/90">{project.slug}</span>.exe
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/60">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="p-3">
        {/* Media */}
        <div className="relative aspect-[16/9] overflow-hidden bg-black">
          <img
            src={project.images[0]}
            alt={`${project.title} cover`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
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
                videoReady ? 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100' : 'opacity-0'
              }`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {project.previewVideo && (
            <span className="absolute right-3 top-3 hidden items-center gap-1.5 bg-black/50 px-2 py-1 font-mono [@media(hover:hover)]:flex text-[10px] uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm">
              <Play size={10} className="fill-current" /> Hover to play
            </span>
          )}
          <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/85">
            {project.type}
          </span>
        </div>

        {/* Body */}
        <div className="px-2 pb-3 pt-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl md:text-[1.75rem] font-semibold tracking-[-0.03em] leading-tight text-foreground">
              <span className="mr-2 font-mono text-lg text-primary transition-[text-shadow] group-hover:glow-text">&gt;</span>
              {project.title}
            </h3>
            <ArrowUpRight
              className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
              aria-hidden="true"
            />
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {project.shortDesc}
          </p>

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4">
            <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/80">
              {project.tech.slice(0, 3).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] text-term/80">
              [{project.metadata.year}]
            </span>
          </div>
        </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;

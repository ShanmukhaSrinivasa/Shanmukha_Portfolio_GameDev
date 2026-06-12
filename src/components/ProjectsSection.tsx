import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { ArrowRight, ExternalLink, Gamepad2 } from 'lucide-react';
import SectionBlock from './SectionBlock';
import { Badge } from './ui/badge';
import { playClick } from '@/hooks/useSoundEffects';

const ProjectsSection = () => {
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 6);

  return (
    <SectionBlock id="projects" title="My Projects">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {featuredProjects.map((project) => (
        <div
          key={project.slug}
          className="group relative border-4 border-blue-500 bg-[#161e2d] p-5 transition-all duration-300 hover:shadow-[12px_12px_0px_0px_rgba(59,130,246,1)] hover:-translate-x-1 hover:-translate-y-1"
        >
          {/* GAME IMAGE */}
          <div className="relative mb-4 overflow-hidden border-2 border-blue-500/20 bg-black aspect-[16/8] transition-all duration-300 group-hover:border-blue-500/50">
            <img
              src={project.images[0]}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <div className="absolute bottom-3 left-3">
              <span className="font-mono text-[9px] text-blue-400 uppercase tracking-[0.3em] bg-black/60 px-2 py-1 border border-blue-500/20">
                {project.type}
              </span>
            </div>
          </div>

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <span className="font-mono text-[10px] text-blue-500/60 uppercase tracking-[0.3em] font-black">
              // {project.metadata.genre}
            </span>

            <Gamepad2 className="w-5 h-5 text-blue-500/20 group-hover:text-blue-500/60 transition-colors" />
          </div>

          {/* TITLE */}
          <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic mb-4 group-hover:text-blue-400 transition-colors leading-none">
            {project.title}_
          </h3>

          {/* DESCRIPTION */}
          <p className="text-slate-400 text-sm font-medium leading-relaxed mb-5">
            {project.shortDesc}
          </p>

          {/* TECH TAGS */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-none"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* FOOTER */}
          <div className="mt-10 pt-6 border-t border-blue-500/10">
            <Link
              to={`/projects/${project.slug}`}
              onClick={playClick}
              className="flex items-center justify-center gap-3 px-4 py-4 bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Initialize Deep Dive
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ))}
        </div>

      {/* Primary Action Button */}
      <div className="mt-24 flex justify-center">
        <a
          href="https://shanmukha.itch.io/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClick}
          className="group flex items-center gap-4 px-12 py-6 border-2 border-blue-600 bg-transparent text-blue-600 font-mono text-xs font-black uppercase tracking-[0.4em] transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-[15px_15px_0px_0px_rgba(59,130,246,0.1)] active:translate-y-1"
        >
          Explore All Games <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </div>
    </SectionBlock>
  );
};

export default ProjectsSection;
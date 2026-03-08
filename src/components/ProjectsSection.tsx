import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { ArrowRight, ExternalLink, Gamepad2 } from 'lucide-react';
import SectionBlock from './SectionBlock';
import { Badge } from './ui/badge';
import { playClick } from '@/hooks/useSoundEffects';

const ProjectsSection = () => {
  const featuredProjects = projectsData.filter(p => p.featured);

  return (
    <SectionBlock id="projects" title="My Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project) => (
          <div
            key={project.slug}
            className="group relative border-4 border-blue-500 bg-[#161e2d] p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[12px_12px_0px_0px_rgba(59,130,246,1)] hover:-translate-x-1 hover:-translate-y-1"
          >
            <div>
              <div className="flex justify-between items-start mb-8">
                <span className="font-mono text-[10px] text-blue-500/60 uppercase tracking-[0.3em] font-black">
                  // {project.type}
                </span>
                <Gamepad2 className="w-5 h-5 text-blue-500/20 group-hover:text-blue-500/60 transition-colors" />
              </div>

              {/* Title Section: Pure Typography */}
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter italic mb-6 group-hover:text-blue-400 transition-colors leading-none">
                {project.title}_
              </h3>

              <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-3 mb-8">
                {project.shortDesc}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((tag) => (
                  <Badge 
                    key={tag} 
                    className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-none"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-blue-500/10">
              <Link
                to={`/projects/${project.slug}`}
                onClick={playClick}
                className="flex items-center justify-center gap-3 px-4 py-4 bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                Initialize Deep Dive <ArrowRight className="w-4 h-4" />
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
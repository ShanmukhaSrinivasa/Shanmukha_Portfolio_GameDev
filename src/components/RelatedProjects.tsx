import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import { playClick } from "@/hooks/useSoundEffects";

interface RelatedProjectsProps {
  currentSlug: string;
}

const RelatedProjects = ({currentSlug,
}: RelatedProjectsProps) => {const relatedProjects = projectsData.filter((project) => project.slug !== currentSlug && project.featured).slice(0, 3);

  return (
    <section className="mt-40 border-t border-blue-500/10 pt-20">
      <div className="mb-12">
        <p className="font-mono text-blue-500 text-xs uppercase tracking-[0.4em] mb-4">
          Continue Exploring
        </p>

        <h2 className="text-4xl md:text-6xl font-black uppercase italic text-white">
          Related Projects
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {relatedProjects.map((project) => (
          <Link
            key={project.slug}
            to={`/projects/${project.slug}`}
            onClick={playClick}
            className="group border-2 border-blue-500/20 bg-[#161e2d] p-6 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
          >
            <p className="font-mono text-[10px] text-blue-500/60 uppercase tracking-[0.3em] mb-4">
              {project.type}
            </p>

            <h3 className="text-2xl font-black uppercase italic text-white group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>

            <p className="mt-4 text-sm text-slate-400 line-clamp-3">
              {project.shortDesc}
            </p>

            <div className="mt-6 flex items-center gap-2 text-blue-500 font-mono text-xs uppercase tracking-widest">
              View Project
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
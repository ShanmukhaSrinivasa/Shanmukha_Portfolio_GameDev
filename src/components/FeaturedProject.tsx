// src/components/FeaturedProject.tsx

import { Link } from "react-router-dom";
import { projectsData } from "../data/projectsData";
import { ArrowRight, Play } from "lucide-react";
import { playClick } from "@/hooks/useSoundEffects";

const FeaturedProject = () => {
  const project =
    projectsData.find((p) => p.slug === "orbit-rogue") ||
    projectsData.find((p) => p.featured);

  if (!project) return null;

  return (
    <section className="py-32 px-6 bg-[#111827] border-y border-blue-500/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="font-mono text-blue-500 text-xs uppercase tracking-[0.4em]">
            Featured Project
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-6xl md:text-8xl font-black uppercase italic leading-none text-white">
              {project.title}
            </h2>

            <p className="mt-6 text-xl text-slate-400 leading-relaxed">
              {project.fullDescription}
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 border border-blue-500/20 text-blue-400 font-mono text-xs uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 mt-10">
              <Link
                to={`/projects/${project.slug}`}
                onClick={playClick}
                className="px-8 py-4 bg-blue-600 text-white font-black uppercase text-sm flex items-center gap-2"
              >
                Case Study
                <ArrowRight size={18} />
              </Link>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="px-8 py-4 border border-blue-500 text-blue-400 font-black uppercase text-sm flex items-center gap-2"
              >
                Play Game
                <Play size={18} />
              </a>
            </div>
          </div>

          <div>
            <div className="aspect-video border-4 border-blue-500 overflow-hidden">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
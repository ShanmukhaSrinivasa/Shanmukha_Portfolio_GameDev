// src/components/FeaturedProject.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { projectsData } from "../data/projectsData";
import { ArrowRight, Play } from "lucide-react";
import { playClick } from "@/hooks/useSoundEffects";


const FeaturedProject = () => {
  const featuredProjects = projectsData.filter((project) => project.showcase);

  console.log(featuredProjects);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentIndex((prev) =>
        prev === featuredProjects.length - 1 ? 0 : prev + 1
        );
    }, 5000);

    return () => clearInterval(interval);
    }, [featuredProjects.length]);

  const project = featuredProjects[currentIndex] || featuredProjects[0];

  if (!project) return null;

  return (
    <section className="py-32 px-6 bg-[#111827] border-y border-blue-500/10">
      <div className="max-w-7xl mx-auto">

        {/* SECTION LABEL */}
        <div className="mb-10">
          <p className="font-mono text-blue-500 text-xs uppercase tracking-[0.4em]">
            Featured Projects
          </p>
        </div>

        <div className="flex items-center justify-between mb-12">

        <div className="font-mono text-blue-500 text-sm">
            {String(currentIndex + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}
        </div>

        <div className="flex gap-3">

            <button
            onClick={() =>
                setCurrentIndex(
                currentIndex === 0
                    ? featuredProjects.length - 1
                    : currentIndex - 1
                )
            }
            className="w-10 h-10 border border-blue-500/20 text-blue-400 hover:border-blue-500 transition-all"
            >
            ←
            </button>

            <button
            onClick={() =>
                setCurrentIndex(
                currentIndex === featuredProjects.length - 1
                    ? 0
                    : currentIndex + 1
                )
            }
            className="w-10 h-10 border border-blue-500/20 text-blue-400 hover:border-blue-500 transition-all"
            >
            →
            </button>

        </div>

        </div>

        {/* MAIN CONTENT */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            <h2 className="text-6xl md:text-8xl font-black uppercase italic leading-none text-white">
              {project.title}
            </h2>

            <p className="mt-6 text-xl text-slate-400 leading-relaxed">
              {project.shortDesc}
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

            <div className="flex flex-wrap gap-4 mt-10">

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

            <div className="flex gap-3 mt-10">
                {featuredProjects.map((_, index) => (
                    <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                        currentIndex === index
                        ? "w-10 bg-blue-500"
                        : "w-2 bg-blue-500/30"
                    }`}
                    />
                ))}
                </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="aspect-video border-4 border-blue-500 overflow-hidden">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
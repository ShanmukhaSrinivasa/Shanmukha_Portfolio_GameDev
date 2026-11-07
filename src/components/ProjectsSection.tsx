import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import SectionBlock from './SectionBlock';
import { revealParent } from '@/lib/motion';
import ProjectCard from './ProjectCard';
import { playClick } from '@/hooks/useSoundEffects';

const ProjectsSection = () => {
  const projects = projectsData.filter((p) => p.featured);

  return (
    <SectionBlock id="projects" eyebrow="02 — All work" command="ls -la ~/games" title="Projects" wide>
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -5% 0px' }}
        variants={revealParent}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </motion.div>

      <div className="mt-20 flex justify-center">
        <a
          href="https://shanmukha.itch.io/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClick}
          className="group inline-flex items-center gap-3 border border-line px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-foreground transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          More on itch.io
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </SectionBlock>
  );
};

export default ProjectsSection;

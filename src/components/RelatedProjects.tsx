import { motion } from 'motion/react';
import { projectsData } from '@/data/projectsData';
import ProjectCard from './ProjectCard';
import { Reveal } from './SectionBlock';
import { revealParent } from '@/lib/motion';

interface RelatedProjectsProps {
  currentSlug: string;
}

/** The next three projects after this one, wrapping around the list. */
const RelatedProjects = ({ currentSlug }: RelatedProjectsProps) => {
  const featured = projectsData.filter((p) => p.featured);
  const start = Math.max(0, featured.findIndex((p) => p.slug === currentSlug));
  const related = [1, 2, 3]
    .map((offset) => featured[(start + offset) % featured.length])
    .filter((p, i, arr) => p && p.slug !== currentSlug && arr.indexOf(p) === i);

  if (related.length === 0) return null;

  return (
    <section className="border-t border-line py-24 md:py-32">
      <Reveal>
        <p className="eyebrow mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-primary/60" />
          Keep exploring
        </p>
        <h2 className="font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl">More projects</h2>
      </Reveal>
      <motion.div
        className="mt-14 grid gap-6 md:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        variants={revealParent}
      >
        {related.map((p) => (
          <ProjectCard key={p.slug} project={p} index={featured.indexOf(p)} />
        ))}
      </motion.div>
    </section>
  );
};

export default RelatedProjects;

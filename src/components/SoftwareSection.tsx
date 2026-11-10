import { motion } from 'motion/react';
import { softwareProjects } from '@/data/softwareProjects';
import { revealParent } from '@/lib/motion';
import SectionBlock from './SectionBlock';
import SoftwareCard from './SoftwareCard';
import TerminalWindow from './TerminalWindow';

/** Non-game software projects: apps, tools, libraries. */
const SoftwareSection = () => (
  <SectionBlock id="software" eyebrow="03 — Software" command="ls -la ~/dev" title="Software" wide>
    {softwareProjects.length > 0 ? (
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -5% 0px' }}
        variants={revealParent}
      >
        {softwareProjects.map((p) => (
          <SoftwareCard key={p.slug} project={p} />
        ))}
      </motion.div>
    ) : (
      <TerminalWindow
        title="~/dev"
        status="zsh"
        className="max-w-2xl"
        bodyClassName="px-5 py-4 font-mono text-[13px] leading-[1.9]"
      >
        <p>
          <span className="text-term">$ </span>
          <span className="text-foreground">ls -la ~/dev</span>
        </p>
        <p className="text-muted-foreground">total 0</p>
        <p>
          <span className="text-primary">&gt;&gt;</span>{' '}
          <span className="text-foreground">software projects are compiling — check back soon</span>
        </p>
        <p>
          <span className="text-term">$ </span>
          <span className="cursor-block" aria-hidden="true" />
        </p>
      </TerminalWindow>
    )}
  </SectionBlock>
);

export default SoftwareSection;

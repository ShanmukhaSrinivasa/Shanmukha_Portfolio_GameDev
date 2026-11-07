import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { revealChild, revealParent } from '@/lib/motion';

interface SectionBlockProps {
  id: string;
  title: string;
  /** Small label above the title, e.g. "02 — Selected work". */
  eyebrow?: string;
  /** Shell command shown as a prompt above the title, e.g. "ls ~/projects". */
  command?: string;
  /** Use the wider container (for grids). */
  wide?: boolean;
  children: ReactNode;
}

/** Wrap any block to fade/slide it in once it scrolls into view. */
export const Reveal = ({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    variants={revealChild}
    transition={{ delay }}
  >
    {children}
  </motion.div>
);

const SectionBlock = ({ id, title, eyebrow, command, wide = false, children }: SectionBlockProps) => (
  <section
    id={id}
    className={`${wide ? 'max-w-6xl' : 'max-w-4xl'} mx-auto px-6 py-24 md:py-36 scroll-mt-20`}
  >
    <motion.header
      className="mb-14 md:mb-20"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      variants={revealParent}
    >
      {eyebrow && (
        <motion.p variants={revealChild} className="eyebrow mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-primary/60" />
          {eyebrow}
        </motion.p>
      )}
      {command && (
        <motion.p variants={revealChild} className="mb-5 font-mono text-sm text-muted-foreground">
          <span className="text-term glow-term">shanmukha@dev</span>
          <span className="text-muted-foreground/60">:</span>
          <span className="text-primary">~</span>
          <span className="text-muted-foreground/60">$ </span>
          <span className="text-foreground/90">{command}</span>
        </motion.p>
      )}
      <motion.h2 variants={revealChild} className="section-title">
        <span className="text-primary glow-text">&gt;</span> {title}
        <span className="cursor-block" aria-hidden="true" />
      </motion.h2>
    </motion.header>

    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={revealChild}
    >
      {children}
    </motion.div>
  </section>
);

export default SectionBlock;

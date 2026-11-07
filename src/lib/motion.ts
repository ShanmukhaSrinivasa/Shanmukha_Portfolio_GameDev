import type { Variants } from 'motion/react';

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Parent variant: staggers its children in when shown. */
export const revealParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Child variant: fade and rise into place. */
export const revealChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

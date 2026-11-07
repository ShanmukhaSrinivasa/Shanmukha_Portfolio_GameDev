import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react';
import { ReactLenis, useLenis } from 'lenis/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import CommandMenu from '@/components/CommandMenu';
import AsciiField from '@/components/AsciiField';
import Index from './pages/Index';

// Only the home page ships in the first bundle; other routes load on demand.
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));
import { EASE_OUT } from '@/lib/motion';

/** Smooth scrolling, skipped entirely for visitors who prefer reduced motion. */
const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -80 } }}>
      {children}
    </ReactLenis>
  );
};

/** Jump to the top whenever the route changes (hash links scroll themselves). */
const ScrollReset = () => {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (hash) return;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash, lenis]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        className="relative z-[1]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
      >
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <MotionConfig reducedMotion="user" transition={{ ease: EASE_OUT }}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SmoothScroll>
        <BrowserRouter>
          <ScrollReset />
          <AsciiField />
          <CommandMenu />
          <AnimatedRoutes />
        </BrowserRouter>
      </SmoothScroll>

      <div className="grain" aria-hidden="true" />
      <div className="crt-overlay" aria-hidden="true" />
      <SpeedInsights />
      <Analytics />
    </TooltipProvider>
  </MotionConfig>
);

export default App;

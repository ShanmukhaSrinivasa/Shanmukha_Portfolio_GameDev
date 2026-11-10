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
const SoftwareDetail = lazy(() => import('./pages/SoftwareDetail'));
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

/**
 * On route change: jump to the top, or — for links like "/#software" — wait for
 * the new page to render (it fades in after the old one leaves) and scroll to
 * that section.
 */
const ScrollReset = () => {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (!hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    const timer = window.setInterval(() => {
      const el = document.getElementById(id);
      if (el) {
        window.clearInterval(timer);
        if (lenis) lenis.scrollTo(el, { offset: -80, immediate: true, force: true });
        else el.scrollIntoView();
      } else if (++tries > 40) window.clearInterval(timer);
    }, 50);
    return () => window.clearInterval(timer);
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
            <Route path="/software/:slug" element={<SoftwareDetail />} />
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

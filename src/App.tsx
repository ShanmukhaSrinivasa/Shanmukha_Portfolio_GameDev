import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import { ProjectDetail } from './pages/ProjectDetail'; 
import NotFound from './pages/NotFound';

// FIX: Change '/next' to '/react' for Vite/React projects
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        
        {/* DYNAMIC PROJECT ROUTE */}
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

    {/* 🚀 TELEMETRY UPLINK: Add these here so they run in the background */}
    <SpeedInsights />
    <Analytics />
  </TooltipProvider>
);

export default App;
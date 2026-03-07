import React from 'react';
import {GitHubCalendar} from 'react-github-calendar';

const GithubGraph = () => {
  return (
    <div className="border-4 border-blue-500 p-6 bg-[#161e2d] text-white shadow-[8px_8px_0px_0px_rgba(59,130,246,1)] transition-all duration-300">
      <h3 className="font-mono text-xl font-bold mb-6 border-b-2 border-blue-500 pb-2 uppercase tracking-tighter text-blue-400">
        GitHub Activity_
      </h3>
      
      {/* SINGLE SCROLLBAR CONTAINER */}
      <div className="overflow-x-auto pb-6 pt-2 
        [&::-webkit-scrollbar]:h-1.5
        [&::-webkit-scrollbar-track]:bg-[#0f172a]
        [&::-webkit-scrollbar-thumb]:bg-blue-600
        [&::-webkit-scrollbar-thumb]:rounded-none
        hover:[&::-webkit-scrollbar-thumb]:bg-blue-400">
        
        <div className="min-w-max px-2">
          <GitHubCalendar
            username="ShanmukhaSrinivasa"
            colorScheme="dark"
            labels={{
              totalCount: "", 
            }}
            style={{
              fontFamily: 'monospace',
              color: '#60a5fa', 
            }}
            theme={{
              dark: ['#1e293b', '#1e3a8a', '#2563eb', '#3b82f6', '#60a5fa'],
            }}
            // PERFECTED ZOOM: Maintained at 11 for ideal clarity
            blockSize={11}
            blockMargin={4}
            fontSize={12}
          />
        </div>
      </div>
      
      {/* ADJUSTED HUD FOOTER (Company names removed) */}
      <div className="mt-4 flex flex-col lg:flex-row justify-between items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] pt-4 border-t border-blue-500/10">
        <div className="flex items-center gap-3 text-blue-400">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span>Commit Sync: Active_</span>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-blue-500/40">
          <span>// SYSTEM: [OPTIMIZED]</span>
          <span>// DATABASE: [SYNCED]</span>
          
          <div className="flex gap-2 items-center text-blue-500/60">
            <span>MIN</span>
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 bg-[#1e293b]" />
              <div className="w-2.5 h-2.5 bg-[#1e3a8a]" />
              <div className="w-2.5 h-2.5 bg-[#60a5fa]" />
            </div>
            <span>MAX</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubGraph;
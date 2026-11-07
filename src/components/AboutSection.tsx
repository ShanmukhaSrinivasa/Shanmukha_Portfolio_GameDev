import SectionBlock from './SectionBlock';
import { Gamepad2 } from 'lucide-react';

const AboutSection = () => (
  <SectionBlock id="about" eyebrow="03 — About" command="cat about.md" title="About me">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
      {/* New Styled Avatar Container */}
      <div className="relative w-64 h-64 flex-shrink-0 group">
        {/* The Blue "Ghost" Shadow */}
        <div className="absolute inset-0 border border-line bg-blue-500/10 translate-x-4 translate-y-4 transition-transform duration-300 group- group-"></div>
        
        {/* The Image Frame */}
        <div className="relative w-full h-full border border-line overflow-hidden bg-surface">
          <img 
            src="/images/avatar.webp" 
            alt="Shanmukha Srinivasa"
            className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
          />
          {/* Visible Overlay Text (The "Alt Text" replacement) */}
          <div className="absolute inset-x-0 bottom-0 bg-blue-600 py-1.5 text-center translate-y-full group- transition-transform duration-300 ease-out">
            <span className="font-mono text-[10px] font-semibold text-foreground tracking-[0.3em] uppercase">
              SHANMUKHA.EXE
            </span>
          </div>
        </div>
        
        {/* The "Available" Status Badge - Fixed position without blue background */}
        <div className="absolute -bottom-5 -right-2 bg-black border-2 border-white flex items-center gap-2 px-3 py-1 z-10">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="font-mono text-[10px] font-semibold text-foreground tracking-widest uppercase">
            Available
          </span>
        </div>
      </div>
      

      <div className="flex-1">
        <p className="body-text max-w-2xl">
          I'm a passionate game development student currently focused on mastering C#, C++, Unreal Engine, and Unity for creating both 2D and 3D games.
        </p>
        <p className="body-text max-w-2xl mt-6">
          My primary development focus is within Unity, where I specialize in building robust gameplay systems and ensuring top-tier playability. Additionally, I have foundational experience exploring and building within Unreal Engine, allowing me to adapt quickly to diverse development pipelines and technical challenges.
        </p>
        <p className="body-text max-w-2xl mt-6 mb-8">
          To push my creative boundaries, I recently completed a "30 Days 30 Games" challenge, building and prototyping a new interactive experience every single day. This rapid development cycle sharpened my problem-solving skills and reinforced my ability to translate complex ideas into fluid, polished gameplay.
        </p>
        <a
          href="https://shanmukha.itch.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 px-6 py-3 border border-line bg-transparent text-blue-400 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-surface-2 hover:text-foreground"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Play My Games</span>
        </a>
      </div>
    </div>
  </SectionBlock>
);

export default AboutSection;
import SectionBlock from './SectionBlock';
import AnimatedAvatar from './AnimatedAvatar';
import { Gamepad2 } from 'lucide-react';

const AboutSection = () => (
  <SectionBlock id="about" title="About me">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
      <AnimatedAvatar />
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
          className="group relative inline-flex items-center gap-3 px-6 py-3 border-2 border-blue-500 bg-transparent text-blue-400 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(59,130,246,0.5)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-blue-600 hover:text-white"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Play My Games</span>
        </a>
      </div>
    </div>
  </SectionBlock>
);

export default AboutSection;
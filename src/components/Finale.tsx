import {
  Github,
  Linkedin,
  InstagramIcon,
  Mail,
  Heart,
  Gamepad2,
  Terminal,
  Code2,
} from 'lucide-react';
import { playClick } from '@/hooks/useSoundEffects';

const Finale = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/ShanmukhaSrinivasa', 
      label: 'GitHub' 
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/shanmukha-gopa-1599748a/',
      label: 'LinkedIn',
    },
    {
      icon: Gamepad2,
      href: 'https://shanmukha.itch.io/',
      label: 'Itch.io',
    },
    {
      icon: Mail,
      href: 'mailto:shannugopa@gmail.com',
      label: 'Email',
    },
    {
      icon: InstagramIcon,
      href: 'https://instagram.com/shk_shanmukha/',
      label: 'Instagram',
    },
  ];

  const marqueeTags = [
    'Shanmukha Srinivasa 🕹️',
    'Unity | Unreal Engine 5 | C++ | C#',
    'Crafting High-Performance Gameplay Systems',
    'Deployment Status: 100% Success',
    'Building the Next Level_',
  ];

  return (
    <section className="relative w-full bg-[#0f172a] border-t-8 border-blue-600 pt-20 overflow-hidden">
      {/* System Marquee */}
      <div className="absolute top-0 left-0 w-full py-4 bg-blue-600 overflow-hidden flex whitespace-nowrap shadow-[0_4px_20px_rgba(37,99,235,0.4)]">
        <div className="animate-marquee flex items-center shrink-0">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center">
              {marqueeTags.map((tag) => (
                <span
                  key={tag}
                  className="text-white font-mono text-xs uppercase tracking-[0.3em] mx-10 font-black"
                >
                  {tag}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center">
        {/* End Game Message */}
        <div className="relative mb-24 text-center">
          <h2 className="text-[12vw] md:text-[8vw] font-black uppercase leading-none tracking-tighter text-blue-500/5 absolute -top-1/2 left-1/2 -translate-x-1/2 select-none pointer-events-none">
            LEVEL COMPLETE
          </h2>
          <p className="text-xl md:text-3xl font-black uppercase tracking-tight italic z-10 relative text-white">
            Let's build the{' '}
            <span className="text-white bg-blue-600 px-4 py-1 not-italic shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              next level
            </span>{' '}
            together.
          </p>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-24">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="group flex flex-col items-center justify-center p-8 border-2 border-blue-500/30 bg-[#161e2d] hover:bg-blue-600 hover:border-white transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(59,130,246,0.3)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              <link.icon className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors duration-300" />
              <span className="mt-4 font-mono text-[10px] uppercase tracking-widest font-black text-blue-500 group-hover:text-white">
                {link.label}
              </span>
            </a>
          ))}
        </div>

        {/* System Status Footer */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-center">
          <div className="flex items-center gap-2 px-6 py-2 bg-blue-500/10 border-2 border-blue-500 rounded-none">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,1)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
              Open for Game Dev Roles & Collaborations
            </span>
          </div>
          <p className="text-[10px] font-mono text-blue-500/50 uppercase tracking-[0.2em] leading-loose max-w-sm">
            Optimized for Web • Compiled with C# Discipline • Delivered from India 🇮🇳
          </p>
        </div>
      </div>

      {/* Extreme Bottom Bar: The Legal Code */}
      <div className="w-full bg-[#0c1220] pt-10 pb-24 md:pb-10 px-6 mt-auto border-t border-blue-500/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
          <p className="text-[10px] font-mono text-blue-500/40 uppercase tracking-[0.2em] text-center md:text-left">
            © {currentYear} Shanmukha Srinivasa // ALL_RIGHTS_RESERVED
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] font-mono text-blue-500/40 uppercase tracking-[0.2em] font-medium">
            <span>Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-blue-600 fill-blue-600 animate-pulse inline-block mx-1" />
            <span>by Shanmukha</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Finale;
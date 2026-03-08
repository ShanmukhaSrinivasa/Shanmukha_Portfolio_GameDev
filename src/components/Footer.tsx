import {
  Github,
  Linkedin,
  ArrowUp,
  Heart,
  InstagramIcon,
  Gamepad2,
  Mail,
} from 'lucide-react';
import { playClick } from '@/hooks/useSoundEffects';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
  ];

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="w-full bg-[#0f172a] border-t-4 border-blue-600 pt-16 pb-32 px-6 md:pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic text-white">
              SHANMUKHA SRINIVASA<span className="text-blue-500 animate-pulse">_</span>
            </h2>
            <p className="text-blue-100/60 max-w-sm leading-relaxed font-mono text-sm">
              // Game Development student focused on building high-performance 
              systems in Unity & Unreal Engine 5. Currently optimizing gameplay 
              mechanics and physics logic.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border-2 border-blue-500/30 text-blue-400 bg-[#161e2d] hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(59,130,246,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Subroutines Column */}
          <div className="space-y-6">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] font-black text-blue-500/40">
              System Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-y-4 gap-x-8">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs font-mono uppercase tracking-widest text-blue-100/70 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Return Column */}
          <div className="space-y-6 flex flex-col items-start md:items-end">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] font-black text-blue-500/40">
              Back to Start
            </h3>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 px-6 py-3 border-2 border-blue-500 bg-[#161e2d] text-blue-400 font-mono text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(59,130,246,0.3)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:bg-blue-600 active:text-white"
            >
              UP_LINK{' '}
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="pt-8 border-t border-blue-500/10 flex flex-col md:flex-row justify-between items-center gap-6 px-4">
          <p className="text-[10px] font-mono text-blue-500/30 uppercase tracking-[0.2em] text-center md:text-left">
            © {currentYear} SHANMUKHA SRINIVASA // BUILD_V1.0.4
          </p>
          <div className="text-[10px] font-mono text-blue-500/30 flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-center md:text-right">
            <span>Optimized with</span>
            <Heart className="w-3.5 h-3.5 text-blue-600 fill-blue-600 animate-pulse inline-block" />
            <span>by Shanmukha</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
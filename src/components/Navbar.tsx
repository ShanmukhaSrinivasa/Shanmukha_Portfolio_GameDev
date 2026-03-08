import { useState } from 'react';
import { playClick, getMasterVolume, setMasterVolume } from '@/hooks/useSoundEffects';
import { Volume2, VolumeX } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Shipped Titles', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Technical Skills', href: '#skills' },
  { label: 'Itch.io', href: 'https://shanmukha.itch.io/' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  // Track if system is muted based on the current master volume
  const [isMuted, setIsMuted] = useState(getMasterVolume() === 0);

  const toggleMute = () => {
    const newVolume = isMuted ? 0.8 : 0;
    setMasterVolume(newVolume);
    setIsMuted(!isMuted);
    // Play a click only if we are unmuting
    if (newVolume > 0) playClick();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-6 bg-background/80 backdrop-blur-sm border-b border-blue-500/5">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Placeholder for left-side balance if needed, or just spacers */}
        <div className="w-10 hidden md:block" />

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex items-center justify-center gap-0 flex-grow">
          {links.map((link, i) => (
            <span key={link.label} className="flex items-center">
              <a
                href={link.href}
                className="nav-link px-4 py-1 font-mono text-[10px] uppercase tracking-widest text-slate-400 hover:text-blue-500 transition-colors"
                onClick={playClick}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
              {i < links.length - 1 && (
                <span className="text-foreground/20 text-xs">|</span>
              )}
            </span>
          ))}
        </div>

        {/* System Audio Toggle - Right Aligned */}
        <div className="hidden md:flex items-center justify-end w-10">
          <button 
            onClick={toggleMute}
            className="text-blue-500/40 hover:text-blue-500 transition-colors p-2"
            title={isMuted ? "Unmute System" : "Mute System"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex justify-between w-full items-center">
          <button
            onClick={() => {
              playClick();
              setOpen(!open);
            }}
            className="nav-link font-mono text-[10px] uppercase tracking-widest text-blue-500"
          >
            {open ? '[ Close ]' : '[ Menu ]'}
          </button>
          
          <button onClick={toggleMute} className="text-blue-500/40 p-2">
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden absolute top-full left-0 right-0 flex flex-col items-center gap-4 py-8 bg-[#0f172a] border-b border-blue-500/10 animate-in slide-in-from-top-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link font-mono text-[10px] uppercase tracking-widest text-slate-300"
                onClick={() => {
                  playClick();
                  setOpen(false);
                }}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
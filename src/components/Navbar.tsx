import { useState } from 'react';
import { playClick } from '@/hooks/useSoundEffects';

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-6 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-0">
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

        {/* Mobile Toggle */}
        <div className="md:hidden flex justify-center">
          <button
            onClick={() => {
              playClick();
              setOpen(!open);
            }}
            className="nav-link font-mono text-[10px] uppercase tracking-widest text-blue-500"
          >
            {open ? '[ Close ]' : '[ Menu ]'}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden flex flex-col items-center gap-4 mt-6 bg-[#0f172a] p-6 border border-blue-500/10">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link font-mono text-[10px] uppercase tracking-widest"
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
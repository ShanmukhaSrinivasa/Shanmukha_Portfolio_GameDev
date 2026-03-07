import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Terminal as TerminalIcon,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import {
  playTerminalOpen,
  playTerminalClose,
  playKeyTick,
  playSuccess,
  playError,
  playClick,
} from '@/hooks/useSoundEffects';

interface CommandOutput {
  id: number;
  type: 'command' | 'response' | 'error';
  content: React.ReactNode;
}

const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 0,
      type: 'response',
      content: (
        <div className="mb-2 text-xs md:text-sm">
          <p className="text-blue-400 font-bold">WELCOME TO SHANMUKHA_OS v1.0.4</p>
          <p className="text-white/60">System status: <span className="text-green-500 underline">OPTIMIZED</span></p>
          <p className="mt-2 text-white/80 font-medium">
            Type <span className="text-blue-400 font-bold">help</span> to view available subroutines.
          </p>
        </div>
      ),
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          if (next) playTerminalOpen();
          else playTerminalClose();
          return next;
        });
      }
      if (e.key === 'Escape' && isOpen) {
        playTerminalClose();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const getCommandResponse = (cmd: string): React.ReactNode | null => {
    switch (cmd) {
      case 'help':
        return (
          <div className="grid grid-cols-[100px_1fr] gap-2 text-[11px] md:text-xs">
            <span className="text-blue-400 font-bold uppercase">about</span> <span>Credentials & Background</span>
            <span className="text-blue-400 font-bold uppercase">skills</span> <span>Technical Arsenal</span>
            <span className="text-blue-400 font-bold uppercase">projects</span> <span>Shipped Titles</span>
            <span className="text-blue-400 font-bold uppercase">contact</span> <span>Signal Frequency</span>
            <span className="text-blue-400 font-bold uppercase">clear</span> <span>Wipe Buffer</span>
            <span className="text-blue-400 font-bold uppercase">exit</span> <span>Terminate Session</span>
          </div>
        );
      case 'about':
        return "Game Development student specialized in Unity and Unreal Engine 5. I focus on high-performance C++ systems and robust C# gameplay mechanics. Currently focused on building polished, player-centric experiences.";
      case 'skills':
        return (
          <div className="text-[11px] md:text-xs leading-relaxed">
            <p className="text-blue-400 font-bold mb-1">CORE_ENGINE_STRENGTHS:</p>
            <p>• Unity & Unreal Engine 5</p>
            <p>• C# & C++ Optimization</p>
            <p>• Physics-Based Gameplay Systems</p>
            <p>• VFX Graph & Shader Logic</p>
          </div>
        );
      case 'projects':
        return (
          <div className="flex flex-col gap-1 text-[11px] md:text-xs">
            <a href="https://shanmukha.itch.io/orbit-rogue" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">1. Orbit Rogue (Boss Rush)</a>
            <a href="https://shanmukha.itch.io/arcane-ascent" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">2. Arcane Ascent (Platformer)</a>
            <a href="https://shanmukha.itch.io/pixel-dash" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">3. Pixel Dash (Endless Runner)</a>
          </div>
        );
      case 'contact':
        return (
          <div className="text-[11px] md:text-xs leading-relaxed">
            <p>Email: <a href="mailto:shannugopa@gmail.com" className="text-blue-400 hover:underline">shannugopa@gmail.com</a></p>
            <p>GitHub: <a href="https://github.com/ShanmukhaSrinivasa" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">github.com/ShanmukhaSrinivasa</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/shanmukha-gopa-1599748a/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">linkedin.com/in/shanmukha-gopa</a></p>
          </div>
        );
      default:
        return null;
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const newHistory: CommandOutput[] = [
      ...history,
      { id: Date.now(), type: 'command', content: `USER@SHANMUKHA_OS:~$ ${cmd}` },
    ];

    if (trimmedCmd.toLowerCase() === 'clear') {
      playClick();
      setHistory([]);
      return;
    }
    if (trimmedCmd.toLowerCase() === 'exit') {
      playTerminalClose();
      setIsOpen(false);
      return;
    }

    let response = getCommandResponse(trimmedCmd.toLowerCase());
    if (!response) {
      const lower = trimmedCmd.toLowerCase();
      if (lower.match(/^(hi|hello|hey)/)) response = "Connection established. How can I assist with your deployment today?";
      else if (lower.match(/(who|about|dev)/)) response = getCommandResponse('about');
      else if (lower.match(/(skill|engine|unity|unreal|cpp|c#)/)) response = getCommandResponse('skills');
      else if (lower.match(/(project|game|itch|work)/)) response = getCommandResponse('projects');
      else if (lower.match(/(contact|hire|email|reach)/)) response = getCommandResponse('contact');
    }

    if (!response) {
      playError();
      response = <span className="text-red-500">Error: Subroutine '{cmd}' not found. Type 'help'.</span>;
    } else {
      playSuccess();
    }

    newHistory.push({ id: Date.now() + 1, type: 'response', content: response });
    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput('');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-8 right-8 z-50 group">
        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-blue-600 text-white text-[9px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          EXEC (CTRL+K)
        </div>
        <button
          onClick={() => { playTerminalOpen(); setIsOpen(true); }}
          className="p-2.5 bg-[#161e2d] border-2 border-blue-500 text-blue-400 shadow-[4px_4px_0px_0px_rgba(59,130,246,0.5)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300"
          aria-label="Open Terminal"
        >
          <TerminalIcon className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4" onClick={() => setIsOpen(false)}>
      <div
        className={`bg-[#0c0c0c] border-2 border-blue-500/30 shadow-[12px_12px_0px_0px_rgba(59,130,246,0.2)] w-full transition-all duration-300 flex flex-col font-mono ${
          isMaximized ? 'h-[95vh] w-[95vw]' : 'max-w-2xl h-[550px]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b-2 border-blue-500/20 bg-[#161e2d]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-red-500/80 rounded-full cursor-pointer hover:bg-red-500" onClick={() => { playTerminalClose(); setIsOpen(false); }} />
            <div className="w-2.5 h-2.5 bg-yellow-500/80 rounded-full cursor-pointer hover:bg-yellow-500" onClick={() => setIsMaximized(!isMaximized)} />
            <div className="w-2.5 h-2.5 bg-green-500/80 rounded-full" />
            <span className="ml-3 text-blue-400/60 text-[9px] font-black uppercase tracking-widest">SESSION_ACTIVE: SHANMUKHA.EXE</span>
          </div>
          <button onClick={() => { playTerminalClose(); setIsOpen(false); }} className="text-blue-500/40 hover:text-white transition-colors">
            <X size={14} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 text-blue-100/90 selection:bg-blue-500/30 custom-scrollbar" ref={scrollRef} onClick={handleTerminalClick}>
          {history.map((entry) => (
            <div key={entry.id} className="mb-3 break-words leading-relaxed font-medium">
              {entry.content}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
            <span className="text-blue-500 font-black shrink-0">USER@SHANMUKHA_OS:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => { setInput(e.target.value); playKeyTick(); }}
              className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 font-bold"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
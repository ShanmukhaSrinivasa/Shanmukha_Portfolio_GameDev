import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { projectsData } from '@/data/projectsData';
import TerminalWindow from './TerminalWindow';

type Line = { kind: 'cmd' | 'ok' | 'info'; text: string };

const LINES: Line[] = [
  { kind: 'cmd', text: './boot shanmukha.os --profile=gamedev' },
  { kind: 'ok', text: 'engines loaded: unity, unreal-5' },
  { kind: 'ok', text: 'languages linked: c#, c++' },
  { kind: 'ok', text: `${projectsData.length} games shipped · 30+ prototyped` },
  { kind: 'info', text: 'status: available for work' },
];

const LINE_MS = 380;

/** A short "boot log" that prints line by line in the hero. */
const BootLog = () => {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? LINES.length : 0);

  useEffect(() => {
    if (reduce || shown >= LINES.length) return;
    const t = window.setTimeout(() => setShown((n) => n + 1), shown === 0 ? 250 : LINE_MS);
    return () => window.clearTimeout(t);
  }, [shown, reduce]);

  const renderLine = (line: Line) => {
    if (line.kind === 'cmd')
      return (
        <>
          <span className="text-term">$ </span>
          <span className="text-foreground">{line.text}</span>
        </>
      );
    if (line.kind === 'ok')
      return (
        <>
          <span className="text-term">[ OK ]</span> <span className="text-muted-foreground">{line.text}</span>
        </>
      );
    return (
      <>
        <span className="text-primary">&gt;&gt;</span> <span className="text-foreground">{line.text}</span>
        <span className="ml-2 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-term shadow-[0_0_8px_hsl(var(--term))]" />
      </>
    );
  };

  return (
    <TerminalWindow
      title="shanmukha@dev: ~"
      status="zsh"
      className="mb-10 max-w-md shadow-[0_20px_60px_-30px_hsl(var(--glow)/0.6)]"
      bodyClassName="px-4 py-3 font-mono text-[12px] leading-[1.75]"
    >
      {/*
        Every line (plus the final prompt) is rendered from the first paint, so the
        window has its final size immediately. Lines are revealed in place and the
        cursor steps down row by row — nothing around the window moves.
      */}
      <div aria-label="Boot log" role="log">
        {LINES.map((line, i) => (
          <p key={i} className="relative truncate" aria-hidden={i >= shown}>
            <span
              className={`transition-opacity duration-200 ${i < shown ? 'opacity-100' : 'invisible opacity-0'}`}
            >
              {renderLine(line)}
            </span>
            {i === shown && <span className="cursor-block absolute left-0 top-[0.42em]" aria-hidden="true" />}
          </p>
        ))}
        <p className={shown >= LINES.length ? '' : 'invisible'} aria-hidden={shown < LINES.length}>
          <span className="text-term">$ </span>
          <span className="cursor-block" aria-hidden="true" />
        </p>
      </div>
    </TerminalWindow>
  );
};

export default BootLog;

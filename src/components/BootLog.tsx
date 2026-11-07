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

  return (
    <TerminalWindow
      title="shanmukha@dev: ~"
      status="zsh"
      className="mb-10 max-w-md shadow-[0_20px_60px_-30px_hsl(var(--glow)/0.6)]"
      bodyClassName="px-4 py-3 font-mono text-[12px] leading-[1.75]"
    >
      <div aria-label="Boot log" role="log">
        {LINES.slice(0, shown).map((line, i) => (
          <p key={i} className="truncate">
            {line.kind === 'cmd' && (
              <>
                <span className="text-term">$ </span>
                <span className="text-foreground">{line.text}</span>
              </>
            )}
            {line.kind === 'ok' && (
              <>
                <span className="text-term">[ OK ]</span>{' '}
                <span className="text-muted-foreground">{line.text}</span>
              </>
            )}
            {line.kind === 'info' && (
              <>
                <span className="text-primary">&gt;&gt;</span>{' '}
                <span className="text-foreground">{line.text}</span>
                <span className="ml-2 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-term shadow-[0_0_8px_hsl(var(--term))]" />
              </>
            )}
          </p>
        ))}
        {shown < LINES.length && <span className="cursor-block" aria-hidden="true" />}
        {shown >= LINES.length && (
          <p>
            <span className="text-term">$ </span>
            <span className="cursor-block" aria-hidden="true" />
          </p>
        )}
      </div>
    </TerminalWindow>
  );
};

export default BootLog;

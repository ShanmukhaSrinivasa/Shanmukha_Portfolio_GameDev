import type { HTMLAttributes, ReactNode } from 'react';

interface TerminalWindowProps extends HTMLAttributes<HTMLDivElement> {
  /** Path or process name shown in the title bar, e.g. "~/games/last-bunker". */
  title: string;
  /** Optional right-hand status in the title bar. */
  status?: ReactNode;
  bodyClassName?: string;
  children: ReactNode;
}

/** A terminal-style window frame: traffic-light dots, a path title and a body. */
const TerminalWindow = ({
  title,
  status,
  className = '',
  bodyClassName = '',
  children,
  ...rest
}: TerminalWindowProps) => (
  <div className={`border border-line bg-surface/90 backdrop-blur-sm ${className}`} {...rest}>
    <div className="flex items-center gap-3 border-b border-line bg-surface-2/80 px-3 py-2">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
      </span>
      <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground">{title}</span>
      {status && <span className="shrink-0 font-mono text-[10px] text-muted-foreground/70">{status}</span>}
    </div>
    <div className={bodyClassName}>{children}</div>
  </div>
);

export default TerminalWindow;

interface CaseBlockProps {
  title: string;
  content: string;
}

/** A single statement, set large — used for "The problem". */
const CaseBlock = ({ title, content }: CaseBlockProps) => (
  <div className="max-w-4xl">
    <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{title}</h3>
    <p className="mt-6 font-display text-2xl font-medium leading-snug tracking-[-0.02em] text-foreground md:text-4xl">
      {content}
    </p>
  </div>
);

export default CaseBlock;

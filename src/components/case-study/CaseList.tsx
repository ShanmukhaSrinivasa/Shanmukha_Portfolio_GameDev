interface CaseListProps {
  title: string;
  items: string[];
  /** Larger type, for a standalone list. */
  large?: boolean;
}

const CaseList = ({ title, items, large = false }: CaseListProps) => (
  <div>
    <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-foreground md:text-2xl">{title}</h3>
    <ul className="mt-6 divide-y divide-line border-t border-line">
      {items.map((item, index) => (
        <li
          key={index}
          className={`flex gap-5 py-4 leading-relaxed text-muted-foreground ${large ? 'text-lg' : 'text-[15px]'}`}
        >
          <span className="pt-1 font-mono text-[11px] text-primary">{String(index + 1).padStart(2, '0')}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default CaseList;

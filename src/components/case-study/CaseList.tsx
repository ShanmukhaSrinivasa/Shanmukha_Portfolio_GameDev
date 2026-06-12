interface CaseListProps {
  title: string;
  items: string[];
}

const CaseList = ({ title, items }: CaseListProps) => {
  return (
    <div className="border-l-4 border-blue-500 pl-6 py-2">
      <h3 className="font-mono text-blue-400 text-xs uppercase tracking-[0.4em] font-black mb-6">
        {title}
      </h3>

      <ul className="space-y-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex gap-4 text-slate-300"
          >
            <span className="text-blue-500 font-black">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaseList;
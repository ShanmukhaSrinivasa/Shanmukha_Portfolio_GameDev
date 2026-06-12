interface CaseBlockProps {
  title: string;
  content: string;
}

const CaseBlock = ({ title, content }: CaseBlockProps) => {
  return (
    <div className="border-l-4 border-blue-500 pl-6 py-2">
      <h3 className="font-mono text-blue-400 text-xs uppercase tracking-[0.4em] font-black mb-4">
        {title}
      </h3>

      <p className="text-slate-300 leading-relaxed text-base">
        {content}
      </p>
    </div>
  );
};

export default CaseBlock;
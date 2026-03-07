import SectionBlock from './SectionBlock';

const education = [
  {
    degree: 'B.Sc Hons. in Game Design and Animation',
    school: 'Arena Animation Jayanagar, Bengaluru',
    year: '2023 – 2026 (Pursuing)',
  },
  {
    degree: 'Diploma in Animation and VFX', // Fixed typo: Animation
    school: 'Arena Animation Jayanagar, Bengaluru',
    year: '2021 – 2023',
  },
];

const EducationSection = () => (
  <SectionBlock id="education" title="Education">
    <div className="space-y-10">
      {education.map((item) => (
        <div
          key={item.degree}
          className="group border-l-2 border-blue-500/20 pl-6 py-2 hover:border-blue-500 transition-all duration-300 relative"
        >
          {/* Subtle glow dot on the timeline line that appears on hover */}
          <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_8px_rgba(59,130,246,1)] transition-opacity duration-300" />

          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
            {item.degree}
          </h3>
          
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mt-2">
            <span className="text-slate-300 font-medium">{item.school}</span>
            <span className="hidden md:inline text-blue-500/30">•</span>
            <span className="font-mono text-sm text-blue-400/60 uppercase tracking-widest">
              {item.year}
            </span>
          </div>
        </div>
      ))}
    </div>
  </SectionBlock>
);

export default EducationSection;
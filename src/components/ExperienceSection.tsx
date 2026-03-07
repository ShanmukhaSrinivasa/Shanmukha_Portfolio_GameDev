import SectionBlock from './SectionBlock';

const experiences = [
  {
    role: 'Solo Developer | Arcane Ascent',
    company: 'itch.io / Independent Release',
    period: 'NOV 2025 – DEC 2025',
    description:
      '🏰 Atmospheric Platformer – Designed and published a vertical climber featuring unique movement abilities and stylized environmental storytelling. Mastered 2D character controllers, custom physics, and vertical level progression.',
  },
  {
    role: 'Lead Developer | Orbit Rogue',
    company: 'itch.io / Independent Release',
    period: 'JAN 2026 – PRESENT',
    description:
      '🚀 Arcade Boss Rush – Developed a high-intensity space shooter focused on challenging boss encounters. Implemented advanced C# gameplay systems, custom VFX using Unity VFX Graph, and fluid physics-based movement mechanics.',
  },
  {
    role: 'Game Developer | itch.io Collection',
    company: 'Personal Portfolio Production',
    period: '2025 – PRESENT',
    description:
      '🛠️ Portfolio Development – Built and deployed multiple interactive experiences including "Battle of the Board" and "Balloon Ascent." Focused on mastering level design, platforming physics, and thematic UI/UX implementation.',
  },
];

const ExperienceSection = () => (
  <SectionBlock id="experience" title="Shipped Titles">
    <div className="space-y-12">
      {experiences.map((exp) => (
        <div
          key={exp.role}
          className="group relative pl-8 md:pl-0 border-l md:border-l-0 border-blue-500/20 md:grid md:grid-cols-[1fr_2fr] md:gap-8 pb-12 last:pb-0"
        >
          {/* Timeline Connector & Info */}
          <div className="md:text-right md:pr-8 md:border-r border-blue-500/20 relative">
            {/* The Glowing Dot */}
            <div className="hidden md:block absolute top-1 -right-[5px] w-[9px] h-[9px] rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)] group-hover:scale-125 transition-transform duration-300"></div>
            <div className="md:hidden absolute top-1 -left-[5px] w-[9px] h-[9px] rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]"></div>

            <h4 className="font-mono text-sm tracking-[0.2em] text-blue-400/60 uppercase mb-1">
              {exp.period}
            </h4>
            <h3 className="font-bold text-lg md:text-xl text-white">{exp.company}</h3>
          </div>

          {/* Role Description */}
          <div className="mt-2 md:mt-0">
            <h3 className="text-lg font-bold text-blue-400 md:hidden mb-2">
              {exp.role}
            </h3>
            <h3 className="text-xl font-bold text-blue-400 hidden md:block mb-3 transition-colors group-hover:text-white">
              {exp.role}
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
              {exp.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </SectionBlock>
);

export default ExperienceSection;
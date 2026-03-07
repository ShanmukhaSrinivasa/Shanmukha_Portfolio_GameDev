import {
  Code2,
  Cpu,
  Wrench,
  Zap,
  Layers,
  Gamepad,
  Terminal,
  Activity,
} from 'lucide-react';
import SectionBlock from './SectionBlock';
import GithubGraph from './GithubGraph';

const skillCategories = [
  {
    title: 'Engine Mastery',
    icon: <Gamepad className="w-5 h-5" />,
    skills: [
      'Unity (Primary)',
      'Unreal Engine 5',
      'PC / Console Game Dev',
      'Mobile Game Dev',
      'Physics Systems',
    ],
  },
  {
    title: 'Programming Core',
    icon: <Code2 className="w-5 h-5" />,
    skills: [
      'C# (Advanced)',
      'C++ (Advanced)',
      'Object-Oriented Programming',
      'Memory Management',
    ],
  },
  {
    title: 'Creative Suite',
    icon: <Layers className="w-5 h-5" />,
    skills: [
      '2D/3D Animation',
      'Maya / Blender',
      'Level Design',
      'UI/UX for Games',
      'Adobe Creative Cloud',
    ],
  },
  {
    title: 'Systems & Intelligence',
    icon: <Cpu className="w-5 h-5" />,
    skills: [
      'Gameplay Systems',
      'AI & Pathfinding',
      'State Machines',
      'Multiplayer Logic',
    ],
  },
  {
    title: 'Ecosystem & QA',
    icon: <Wrench className="w-5 h-5" />,
    skills: [
      'Git / GitHub',
      'Itch.io Publishing',
      'Unit Testing (Unity)',
      'Build Pipelines',
      'QA Testing (Manual/Auto)',
    ],
  },
];

const SkillsSection = () => {
  return (
    <SectionBlock id="skills" title="Technical Arsenal">
      <div className="flex flex-col gap-16">
        {/* Skill Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              className="group border-2 border-blue-500/30 p-6 bg-[#161e2d] hover:-translate-y-2 hover:border-blue-500 hover:shadow-[8px_8px_0px_0px_rgba(59,130,246,0.5)] transition-all duration-300 relative"
              style={{
                animationDelay: `${idx * 100}ms`,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 border-2 border-blue-500 bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  {category.icon}
                </div>
                <h3 className="font-mono text-sm font-black uppercase tracking-widest text-white">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 border border-blue-500/20 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider hover:border-blue-400 hover:bg-blue-400/10 hover:text-blue-400 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Final "Load" Card */}
          <div className="border-2 border-blue-500/20 p-6 bg-[#0f172a] flex flex-col items-center justify-center text-center opacity-50 hover:opacity-100 transition-all group">
            <Terminal className="w-8 h-8 mb-4 text-blue-500/40 group-hover:text-blue-500 transition-colors animate-pulse" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">
              // Syncing_Knowledge...
              <br />
              // 30+_Games_Prototyped
            </p>
          </div>
        </div>

        {/* Activity Section */}
        <div className="w-full pt-12 border-t-2 border-blue-500/20 border-dashed">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-[0.3em] flex items-center gap-3 text-blue-400">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                Live Build Feed
              </h3>
              <div className="h-[1px] flex-1 bg-blue-500/20"></div>
            </div>
            <div className="bg-[#161e2d] p-6 border-2 border-blue-500/20 rounded-sm">
               <GithubGraph />
            </div>
          </div>
        </div>
      </div>
    </SectionBlock>
  );
};

export default SkillsSection;
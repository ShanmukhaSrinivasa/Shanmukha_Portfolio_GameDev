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
    <SectionBlock id="skills" eyebrow="06 — Toolkit" command="neofetch --skills" title="Technical arsenal" wide>
      <div className="flex flex-col gap-16">
        {/* Skill Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              className="group border border-line p-6 bg-surface hover:border-primary/60 transition-all duration-300 relative"
              style={{
                animationDelay: `${idx * 100}ms`,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 border border-line bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-foreground transition-colors">
                  {category.icon}
                </div>
                <h3 className="font-mono text-sm font-semibold uppercase tracking-widest text-foreground">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 border border-line text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider hover:border-primary/60 hover:bg-blue-400/10 hover:text-blue-400 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Final "Load" Card */}
          <div className="border border-line p-6 bg-background flex flex-col items-center justify-center text-center opacity-50 hover:opacity-100 transition-all group">
            <Terminal className="w-8 h-8 mb-4 text-blue-500/40 group-hover:text-blue-500 transition-colors animate-pulse" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground/70">
              // Syncing_Knowledge...
              <br />
              // 30+_Games_Prototyped
            </p>
          </div>
        </div>

        {/* Activity Section */}
        <div className="w-full pt-12 border-t border-line">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-[0.3em] flex items-center gap-3 text-blue-400">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                Live Build Feed
              </h3>
              <div className="h-[1px] flex-1 bg-blue-500/20"></div>
            </div>
            <div className="bg-surface p-6 border border-line">
               <GithubGraph />
            </div>
          </div>
        </div>
      </div>
    </SectionBlock>
  );
};

export default SkillsSection;
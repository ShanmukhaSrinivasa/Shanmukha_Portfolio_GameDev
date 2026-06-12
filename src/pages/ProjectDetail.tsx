import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { projectsData } from '../data/projectsData';
import { ArrowLeft,Terminal,Gamepad2,Activity,Loader2,Clock,Users,Target,Github,} from 'lucide-react';
import { playClick, playTerminalOpen } from '@/hooks/useSoundEffects';
import CaseBlock from '@/components/case-study/CaseBlock';
import CaseList from '@/components/case-study/CaseList';
import RelatedProjects from "@/components/RelatedProjects";

export const ProjectDetail = () => {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  
  // Data-Safety Check: Finding the project based on the URL slug
  const project = projectsData.find(p => p.slug === slug);

  useEffect(() => {
    // Reset system position and trigger boot sequence
    window.scrollTo(0, 0);
    setIsLoading(true);
    
    // Play system boot synthesis
    playTerminalOpen();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [slug]);

  // Safety Return: Prevents crash if the project entry is missing or invalid
  if (!project) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center font-mono text-red-500">
        <h2 className="text-2xl font-black mb-4 underline uppercase tracking-widest">Error: Project_ID_Not_Found</h2>
        <p className="text-xs opacity-60 mb-8 tracking-widest uppercase italic">Attempted Access: {slug}</p>
        <Link to="/" className="px-6 py-2 border border-red-500 hover:bg-red-500/10 transition-colors uppercase text-[10px] font-black tracking-[0.3em]">
          Return_to_Dashboard
        </Link>
      </div>
    );
  }

  // --- BOOT SEQUENCE (SPLASH SCREEN) ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center font-mono">
        <div className="w-64 space-y-4">
          <div className="flex justify-between text-[10px] text-blue-500 uppercase tracking-[0.3em] font-black">
            <span>Initialising_Build</span>
            <span>{slug?.toUpperCase()}</span>
          </div>
          
          <div className="h-1 w-full bg-blue-900/30 relative overflow-hidden border border-blue-500/10">
            <div className="absolute top-0 left-0 h-full bg-blue-500 animate-loading-bar" style={{ width: '100%' }} />
          </div>
          
          <div className="flex items-center gap-3 text-blue-400/40 text-[9px] uppercase tracking-widest">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Fetching_Manifest_v1.0.4...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-blue-500/30 animate-in fade-in duration-1000">
      <nav className="p-6 border-b-2 border-blue-500/10 bg-[#161e2d] sticky top-0 z-50 backdrop-blur-md">
        <Link to="/" onClick={playClick} className="flex items-center gap-2 font-mono text-[14px] text-blue-400 uppercase tracking-[0.2em] hover:text-white transition-all">
          <ArrowLeft size={14} /> Back_to_Dashboard
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <header className="mb-20">
          <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter mb-12 text-white/95 leading-none">
            {project.title}_
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-blue-500/10 py-10 font-mono">
            {[
              { label: "Role", value: project.metadata.role },
              { label: "Year", value: project.metadata.year },
              { label: "Genre", value: project.metadata.genre },
              { label: "Platform", value: project.metadata.platform },
            ].map((item) => (
              <div key={item.label}>
                <h4 className="text-blue-500/40 text-[9px] uppercase font-black mb-3 tracking-[0.3em]">{item.label}</h4>
                <p className="text-sm font-bold text-blue-100">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="border-2 border-blue-500/20 bg-[#161e2d] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-500/60">
                Development Time
              </span>
            </div>

            <p className="text-white font-bold text-lg">
              {project.developmentTime || "N/A"}
            </p>
          </div>

          <div className="border-2 border-blue-500/20 bg-[#161e2d] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-500/60">
                Team Size
              </span>
            </div>

            <p className="text-white font-bold text-lg">
              {project.teamSize || "Solo Developer"}
            </p>
          </div>

          <div className="border-2 border-blue-500/20 bg-[#161e2d] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-500/60">
                Primary Engine
              </span>
            </div>

            <p className="text-white font-bold text-lg">
              {project.tech[0]}
            </p>
          </div>

        </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-20">
          <section className="space-y-16">
            {
              project.videoUrl && (
                <div className="space-y-4">

                  <div className="flex items-center gap-2 font-mono text-[8px] text-blue-500/40 uppercase tracking-widest">
                    <Activity size={10} />
                    Gameplay_Trailer
                  </div>

                  <div className="aspect-video border-4 border-blue-500 bg-black shadow-[25px_25px_0px_0px_rgba(59,130,246,0.1)]">

                    <iframe
                      src={project.videoUrl}
                      title={`${project.title} Trailer`}
                      className="w-full h-full"
                      allowFullScreen
                    />

                  </div>

                </div>
              )
            }
            <div className="space-y-6">
              <h3 className="text-blue-400 font-mono text-xs uppercase tracking-[0.4em] font-black italic underline decoration-blue-500/50 underline-offset-8">
                {project.tagline}
              </h3>
              <p className="text-xl text-slate-400 leading-relaxed font-medium italic">
                {project.fullDescription}
              </p>
              {
              project.problem && (
                <div className="mt-20 space-y-20">

                  <CaseBlock
                    title="The Problem"
                    content={project.problem}
                  />

                  {project.designGoals && (
                    <CaseList
                      title="Design Goals"
                      items={project.designGoals}
                    />
                  )}

                  {project.technicalChallenges && (
                    <CaseList
                      title="Technical Challenges"
                      items={project.technicalChallenges}
                    />
                  )}

                  {project.solutions && (
                    <CaseList
                      title="Solutions"
                      items={project.solutions}
                    />
                  )}

                  {project.results && (
                    <CaseList
                      title="Results"
                      items={project.results}
                    />
                  )}

                  {project.lessonsLearned && (
                    <CaseList
                      title="Lessons Learned"
                      items={project.lessonsLearned}
                    />
                  )}

                </div>
              )
            }
            </div>
            <div className="space-y-12">
              {/* DYNAMIC BUILD EMBED: Automatically detects and prioritizes WebGL builds */}
              {project.embedId ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 font-mono text-[8px] text-blue-500/40 uppercase tracking-widest">
                    <Activity size={10} className="animate-pulse" /> Live_Execution_Mode_Active
                  </div>
                  <div className="border-4 border-blue-600 bg-black aspect-video relative shadow-[25px_25px_0px_0px_rgba(59,130,246,0.1)] group">
                    <iframe 
                      src={`https://itch.io/embed-upload/${project.embedId}?color=0f172a`} 
                      className="w-full h-full border-none" 
                      allowFullScreen 
                      title={`Execute ${project.title}`}
                    />
                  </div>
                </div>
              ) : (
                <div className="border-4 border-blue-500 bg-[#161e2d] aspect-video relative shadow-[25px_25px_0px_0px_rgba(59,130,246,0.1)]">
                  <img 
                    src={project.images[0]} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                  />
                </div>
              )}
              
              {/* GALLERY ENGINE: Displays secondary captures and artifacts */}
              <div className="grid grid-cols-1 gap-10">
                {project.images.slice(project.embedId ? 0 : 1).map((img, idx) => (
                  <div key={idx} className="border-4 border-blue-500/20 bg-[#161e2d] aspect-video relative group overflow-hidden shadow-sm hover:shadow-blue-500/10 transition-all">
                    <div className="absolute top-4 left-4 z-10 bg-black/50 px-3 py-1 text-[8px] font-mono text-blue-400 uppercase border border-blue-500/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Capture_Buffer: 0{idx + 1}
                    </div>
                    <img 
                      src={img} 
                      alt={`${project.title} Artifact`} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-8">
            <div className="mb-10">

            <h4 className="font-mono text-[10px] uppercase text-blue-500 tracking-[0.2em] mb-4">
              Technology Stack
            </h4>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 border border-blue-500/20 text-blue-400 text-[9px] font-mono uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>
            <div className="border-2 border-blue-500/20 p-8 bg-[#161e2d] sticky top-32 shadow-[10px_10px_0px_0px_rgba(59,130,246,0.05)]">
              <h3 className="font-mono text-[10px] font-black uppercase text-blue-500 mb-8 tracking-[0.2em] flex items-center gap-2">
                <Terminal size={14} /> Technical_Log
              </h3>
              <ul className="space-y-8 mb-12">
                {project.technicalDeepDive.map((point, i) => (
                  <li key={i} className="flex gap-5 items-start text-[11px] font-mono text-slate-300 leading-relaxed group">
                    <span className="text-blue-600 font-black pt-0.5 group-hover:text-blue-400 transition-colors">0{i+1}_</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={playClick}
                className="w-full group relative flex items-center justify-center gap-4 py-5 bg-blue-600 text-white font-black uppercase text-xs tracking-[0.2em] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                <Gamepad2 size={18} />
                <span>Play Game</span>
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="mt-4 w-full flex items-center justify-center gap-4 py-5 border-2 border-blue-500 text-blue-400 font-black uppercase text-xs tracking-[0.2em] hover:bg-blue-500 hover:text-white transition-all"
              >
                <Github size={18} />
                <span>View Source</span>
              </a>

              <div className="mt-6 flex items-center justify-between font-mono text-[8px] text-blue-500/30 uppercase tracking-[0.3em]">
                <span>Status: Optimal</span>
                <Activity size={10} className="animate-pulse" />
              </div>
            </div>
          </aside>
        </div>
        <RelatedProjects currentSlug={project.slug} />
      </main>
    </div>
  );
};

export default ProjectDetail;
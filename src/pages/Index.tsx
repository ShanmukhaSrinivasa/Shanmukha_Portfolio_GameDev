import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedProject from '@/components/FeaturedProject';
import AboutSection from '@/components/AboutSection';
import EducationSection from '@/components/EducationSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import SoftwareSection from '@/components/SoftwareSection';
import ContactSection from '@/components/ContactSection';
import ScrollToTop from '@/components/ScrollToTop';
import Terminal from '@/components/Terminal';
import Finale from '@/components/Finale';
import StatusBar from '@/components/StatusBar';

const Index = () => {
  return (
    <div className="min-h-screen text-foreground">
      <Navbar />
      <ScrollToTop />
      <Terminal />
      <HeroSection />
      <FeaturedProject />
      <ProjectsSection />
      <SoftwareSection />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <ContactSection />
      <Finale />
      <StatusBar />
    </div>
  );
};

export default Index;
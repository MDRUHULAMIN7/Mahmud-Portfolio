import IntroAnimation from "@/components/animations/IntroAnimation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import Navigation from "@/components/ui/Navigation";

export default function Home() {
  return (
    <main className="relative w-full px-2 lg:max-w-7xl mx-auto min-h-screen">
      <IntroAnimation />
      <Navigation />
      
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      
      <footer className="py-8 text-center text-sm text-gray-500 border-t border-black/5 dark:border-white/5">
        &copy; {new Date().getFullYear()} MD Mahamud. All rights reserved.
      </footer>
    </main>
  );
}

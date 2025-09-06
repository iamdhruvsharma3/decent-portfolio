import { HeroSection } from "@/components/sections/hero-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <main className="min-h-screen pt-16">
      {" "}
      {/* Add padding-top for fixed navigation */}
      <HeroSection />
      <div id="work">
        <ExperienceSection />
        <ProjectsSection />
      </div>
      <div id="about">
        <SkillsSection />
        <TestimonialsSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </main>
  );
}

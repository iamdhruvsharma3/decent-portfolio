import { Badge } from "@/components/ui/badge";
import { Building, Code2 } from "lucide-react";

export function ExperienceSection() {
  const companies = [
    { name: "Cars24", period: "Jan 2025 - Present", title: "SDE-1" },
    {
      name: "Innobyte Services",
      period: "Sept 2024 - Nov 2024",
      title: "Web Developer Intern",
    },
    {
      name: "NullClass",
      period: "July 2023 - Aug 2023",
      title: "FullStack Web Developer Intern",
    },
  ];

  const technologies = [
    "HTML5",
    "CSS3 (Flexbox, Grid)",
    "JavaScript (ES6+)",
    "TypeScript",
    "React.js",
    "Next.js",
    "Zustand",
    "Redux",
    "Tailwind CSS",
    "Bootstrap",
    "Shadcn UI",
    "MUI",
    "Kendo UI",
    "REST APIs",
    "Axios",
    "Webpack",
    "Babel",
    "npm",
    "Yarn",
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
      <div className="text-center space-y-12">
        <h2 className="text-2xl md:text-3xl font-bold">
          Companies I&apos;ve
          <br />
          built with
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {companies.map((company) => (
            <div key={company.name} className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-semibold text-muted-foreground">
                <Building className="h-5 w-5" />
                {company.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {company.title}
              </div>
              <Badge variant="outline" className="text-xs">
                {company.period}
              </Badge>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="pt-12 space-y-8">
          <h3 className="text-lg font-medium text-muted-foreground flex items-center justify-center gap-2">
            <Code2 className="h-4 w-4" />
            Technologies I love working with
          </h3>

          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="px-4 py-2">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

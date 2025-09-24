import { Badge } from "@/components/ui/badge";
import {
  Building,
  Code2,
  FileCode2,
  Palette,
  Database,
  Package,
  Zap,
  Globe,
  Settings,
  Layers,
  Box,
  Github,
} from "lucide-react";
import { LogoLoop, LogoItem } from "@/components/reactbits/LogoLoop";

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

  const technologyLogos: LogoItem[] = [
    {
      node: (
        <div className="flex items-center gap-2 text-orange-500">
          <FileCode2 className="h-6 w-6" />
          <span className="font-medium">HTML5</span>
        </div>
      ),
      title: "HTML5",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-blue-500">
          <Palette className="h-6 w-6" />
          <span className="font-medium">CSS3</span>
        </div>
      ),
      title: "CSS3",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-yellow-500">
          <FileCode2 className="h-6 w-6" />
          <span className="font-medium">JavaScript</span>
        </div>
      ),
      title: "JavaScript (ES6+)",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-blue-600">
          <FileCode2 className="h-6 w-6" />
          <span className="font-medium">TypeScript</span>
        </div>
      ),
      title: "TypeScript",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-cyan-500">
          <Zap className="h-6 w-6" />
          <span className="font-medium">React.js</span>
        </div>
      ),
      title: "React.js",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-black dark:text-white">
          <Globe className="h-6 w-6" />
          <span className="font-medium">Next.js</span>
        </div>
      ),
      title: "Next.js",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-purple-500">
          <Database className="h-6 w-6" />
          <span className="font-medium">Zustand</span>
        </div>
      ),
      title: "Zustand",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-purple-600">
          <Database className="h-6 w-6" />
          <span className="font-medium">Redux</span>
        </div>
      ),
      title: "Redux",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-cyan-400">
          <Palette className="h-6 w-6" />
          <span className="font-medium">Tailwind CSS</span>
        </div>
      ),
      title: "Tailwind CSS",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-purple-500">
          <Layers className="h-6 w-6" />
          <span className="font-medium">Bootstrap</span>
        </div>
      ),
      title: "Bootstrap",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Box className="h-6 w-6" />
          <span className="font-medium">Shadcn UI</span>
        </div>
      ),
      title: "Shadcn UI",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-blue-500">
          <Layers className="h-6 w-6" />
          <span className="font-medium">MUI</span>
        </div>
      ),
      title: "MUI",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-green-500">
          <Layers className="h-6 w-6" />
          <span className="font-medium">Kendo UI</span>
        </div>
      ),
      title: "Kendo UI",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-green-600">
          <Globe className="h-6 w-6" />
          <span className="font-medium">REST APIs</span>
        </div>
      ),
      title: "REST APIs",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-blue-400">
          <Zap className="h-6 w-6" />
          <span className="font-medium">Axios</span>
        </div>
      ),
      title: "Axios",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-blue-500">
          <Package className="h-6 w-6" />
          <span className="font-medium">Webpack</span>
        </div>
      ),
      title: "Webpack",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-yellow-600">
          <Settings className="h-6 w-6" />
          <span className="font-medium">Babel</span>
        </div>
      ),
      title: "Babel",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-red-500">
          <Package className="h-6 w-6" />
          <span className="font-medium">npm</span>
        </div>
      ),
      title: "npm",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-blue-600">
          <Package className="h-6 w-6" />
          <span className="font-medium">Yarn</span>
        </div>
      ),
      title: "Yarn",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Github className="h-6 w-6" />
          <span className="font-medium">Github</span>
        </div>
      ),
    },
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

          <div className="w-full">
            <LogoLoop
              logos={technologyLogos}
              speed={80}
              direction="left"
              logoHeight={40}
              gap={48}
              pauseOnHover={true}
              fadeOut={true}
              scaleOnHover={true}
              className="py-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

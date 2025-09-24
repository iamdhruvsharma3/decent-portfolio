import { Badge } from "@/components/ui/badge";
import { Building, Code2, Github } from "lucide-react";
import { LogoLoop, LogoItem } from "@/components/reactbits/LogoLoop";
import {
  AxiosIcon,
  BabelIcon,
  BootstrapIcon,
  Css3Icon,
  GithubIcon,
  Html5Icon,
  JsIcon,
  KendoIcon,
  MuiIcon,
  NextIcon,
  NpmIcon,
  ReactIcon,
  ReduxIcon,
  RestApiIcon,
  ShadcnIcon,
  TailwindIcon,
  TsIcon,
  WebpackIcon,
  YarnIcon,
  ZustandIcon,
} from "../tech-icons";

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
        <div className="flex items-center gap-2 text-muted-foreground">
          <Html5Icon className="h-4 w-4" />
          <span className="font-medium">HTML5</span>
        </div>
      ),
      title: "HTML5",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Css3Icon className="h-4 w-4" />
          <span className="font-medium">CSS3</span>
        </div>
      ),
      title: "CSS3",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <JsIcon className="h-4 w-4" />
          <span className="font-medium">JavaScript</span>
        </div>
      ),
      title: "JavaScript (ES6+)",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <TsIcon className="h-4 w-4" />
          <span className="font-medium">TypeScript</span>
        </div>
      ),
      title: "TypeScript",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <ReactIcon className="h-4 w-4" />
          <span className="font-medium">React.js</span>
        </div>
      ),
      title: "React.js",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <NextIcon className="h-4 w-4" />
          <span className="font-medium">Next.js</span>
        </div>
      ),
      title: "Next.js",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <ZustandIcon className="h-4 w-4" />
          <span className="font-medium">Zustand</span>
        </div>
      ),
      title: "Zustand",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <ReduxIcon className="h-4 w-4" />
          <span className="font-medium">Redux</span>
        </div>
      ),
      title: "Redux",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <TailwindIcon className="h-4 w-4" />
          <span className="font-medium">Tailwind CSS</span>
        </div>
      ),
      title: "Tailwind CSS",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <BootstrapIcon className="h-4 w-4" />
          <span className="font-medium">Bootstrap</span>
        </div>
      ),
      title: "Bootstrap",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <ShadcnIcon className="h-4 w-4" />
          <span className="font-medium">Shadcn UI</span>
        </div>
      ),
      title: "Shadcn UI",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <MuiIcon className="h-4 w-4" />
          <span className="font-medium">MUI</span>
        </div>
      ),
      title: "MUI",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <KendoIcon className="h-4 w-4" />
          <span className="font-medium">Kendo UI</span>
        </div>
      ),
      title: "Kendo UI",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <RestApiIcon className="h-4 w-4" />
          <span className="font-medium">REST APIs</span>
        </div>
      ),
      title: "REST APIs",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <AxiosIcon className="h-4 w-4" />
          <span className="font-medium">Axios</span>
        </div>
      ),
      title: "Axios",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <WebpackIcon className="h-4 w-4" />
          <span className="font-medium">Webpack</span>
        </div>
      ),
      title: "Webpack",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <BabelIcon className="h-4 w-4" />
          <span className="font-medium">Babel</span>
        </div>
      ),
      title: "Babel",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <NpmIcon className="h-4 w-4" />
          <span className="font-medium">npm</span>
        </div>
      ),
      title: "npm",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <YarnIcon className="h-4 w-4" />
          <span className="font-medium">Yarn</span>
        </div>
      ),
      title: "Yarn",
    },
    {
      node: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Github className="h-4 w-4" />
          <span className="font-medium">Github</span>
        </div>
      ),
      title: "Github",
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
              logoHeight={24}
              gap={32}
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

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Bot,
  Zap,
  Github,
  ExternalLink,
  Monitor,
  Settings,
} from "lucide-react";

export function SkillsSection() {
  const getProjectIcon = (type: string) => {
    switch (type) {
      case "WEB APP":
        return Globe;
      case "AI APP":
      case "AI TOOL":
        return Bot;
      case "OPEN SOURCE":
        return Github;
      default:
        return Monitor;
    }
  };

  const sideProjects = [
    {
      type: "WEB APP",
      title: "NexusFlow",
      description:
        "Admin dashboard with real-time API integrations, data visualization, and ETL pipeline execution. Improved reporting efficiency by 30%.",
      status: "Live",
      linkText: "Coming Soon",
      url: null,
    },
    {
      type: "AI APP",
      title: "MixGenius",
      description:
        "Upload-based AI music mixing and mastering app with real-time feedback. Designed scalable frontend with React Hooks and Redux.",
      status: "In Progress",
      linkText: "Coming Soon",
      url: null,
    },
    {
      type: "AI TOOL",
      title: "Zerion",
      description:
        "AI-powered web performance monitoring tool inspired by DebugBear. Tracks site speed, analyzes core vitals, and suggests intelligent optimizations using machine learning.",
      status: "In Progress",
      linkText: "Coming Soon",
      url: null,
    },
    {
      type: "OPEN SOURCE",
      title: "UI Components Collection",
      description:
        "A set of beginner-friendly React components including pagination, typeahead, datagrid, and stopwatch. Focused on reusability, accessibility, and clean code for learning and production use.",
      status: "Active",
      linkText: "View on GitHub",
      url: "https://github.com/iamdhruvsharma3?tab=repositories", // Replace with your actual GitHub repo URL
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
      <div className="space-y-16">
        {/* Quote */}
        <div className="text-center">
          <blockquote className="text-lg md:text-xl font-medium">
            &quot;If the code runs fast and the
            <br />
            DX feels right, we&apos;re good.&quot;
          </blockquote>
        </div>

        {/* Side Projects */}
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Side quests & experiments
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {sideProjects.map((project, index) => {
              const IconComponent = getProjectIcon(project.type);
              return (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="space-y-3">
                      <Badge
                        variant="outline"
                        className="w-fit text-xs font-medium flex items-center gap-1">
                        <IconComponent className="h-3 w-3" />
                        {project.type}
                      </Badge>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center gap-2">
                        <IconComponent className="h-5 w-5" />
                        {project.title}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <CardDescription className="text-base leading-relaxed">
                      {project.description}
                    </CardDescription>

                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {project.status}
                      </Badge>

                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-auto p-0 text-sm font-medium flex items-center gap-1 ${
                          project.url
                            ? "cursor-pointer hover:text-primary"
                            : "cursor-default opacity-60"
                        }`}
                        onClick={() => {
                          if (project.url) {
                            window.open(project.url, "_blank");
                          }
                        }}
                        disabled={!project.url}>
                        {project.linkText}
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="space-y-8 pt-8">
          <h3 className="text-xl font-semibold text-center">
            Core Competencies
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className="space-y-4">
              <h4 className="font-medium text-muted-foreground flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Frontend
              </h4>
              <div className="space-y-2 text-sm">
                <div>React Ecosystem (React, Next.js, Remix)</div>
                <div>State Management (Zustand, Redux, React Hooks)</div>
                <div>Styling (Tailwind, Styled Components, CSS-in-JS)</div>
                <div>Responsive Design & Cross-Browser Compatibility</div>
              </div>
            </div>

            {/* Performance */}
            <div className="space-y-4">
              <h4 className="font-medium text-muted-foreground flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Performance
              </h4>
              <div className="space-y-2 text-sm">
                <div>Core Web Vitals & Accessibility (WCAG)</div>
                <div>Lazy Loading, Code Splitting & Dynamic Imports</div>
                <div>Bundle Optimization (Webpack, Babel)</div>
                <div>API Integration & Optimized State Management</div>
                <div>Server-Side Rendering (SSR/SSG) & Caching Strategies</div>
              </div>
            </div>

            {/* Developer Experience */}
            <div className="space-y-4">
              <h4 className="font-medium text-muted-foreground flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Developer Experience
              </h4>
              <div className="space-y-2 text-sm">
                <div>TypeScript & Modern JavaScript (ES6+)</div>
                <div>REST APIs (Axios, Fetch)</div>
                <div>Build Tools (npm, Yarn, Webpack, Babel)</div>
                <div>Agile Development & Stakeholder Communication</div>
                <div>Code Quality & Documentation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

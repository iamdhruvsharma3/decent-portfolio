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
import { FileText, ExternalLink, BookOpen, TrendingUp } from "lucide-react";

export function ProjectsSection() {
  const articles = [
    {
      platform: "Notion",
      year: "2025",
      title: "Design Patterns in Frontend Development",
      description:
        "Exploring reusable design patterns and architectures in frontend development to build scalable, maintainable apps.",
      impact: "Better code structure & reusability",
      technologies: ["React", "Component Patterns"],
      url: "https://www.notion.so/Design-Patterns-in-Frontend-248cb775e1238027ba95e5041342f63f?source=copy_link",
    },
    {
      platform: "Notion",
      year: "2025",
      title: "Node.js Learning With Me",
      description:
        "A beginner-friendly guide documenting my journey with Node.js — covering core modules, async patterns, and child processes.",
      impact: "Hands-on learning resource for Node.js",
      technologies: ["Node.js", "JavaScript", "Express"],
      url: "https://www.notion.so/Node-js-25dcb775e123802a8c8ced6a92100218?source=copy_link",
    },
    {
      platform: "Notion",
      year: "2025",
      title: "Rendering Patterns",
      description:
        "Deep dive into SSR, CSR, ISR, and streaming patterns in React and Next.js, with practical use cases and trade-offs.",
      impact: "Helps developers pick the right rendering strategy",
      technologies: ["React", "Next.js", "Rendering Strategies"],
      url: "https://www.notion.so/Rendering-Patterns-in-Frontend-Development-266cb775e1238075b94ac7b68e3aaa2c?source=copy_link",
    },
    {
      platform: "Notion",
      year: "2025",
      title: "Optimization Techniques",
      description:
        "Performance optimization techniques including lazy loading, code splitting, caching, and bundle analysis.",
      impact: "Faster and more performant web apps",
      technologies: ["React", "Webpack", "Performance APIs"],
      url: "https://www.notion.so/Optimization-Techniques-in-Frontend-Development-266cb775e1238072b885cb0027222ab8?source=copy_link",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ideas, Insights & Learnings / Notes From My Journey
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {articles.map((article, index) => (
          <Card
            key={index}
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-fit">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-3 w-3 shrink-0" />
                    <span className="font-medium">{article.platform}</span>
                    <span>•</span>
                    <span>{article.year}</span>
                  </div>
                  <CardTitle className="text-lg md:text-xl group-hover:text-primary transition-colors leading-tight">
                    {article.title}
                  </CardTitle>
                </div>
                <Badge
                  variant="secondary"
                  className="shrink-0 flex items-center gap-1 text-xs">
                  <TrendingUp className="h-3 w-3" />
                  <span className="hidden sm:inline">{article.impact}</span>
                  <span className="sm:hidden">Impact</span>
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <CardDescription className="text-sm md:text-base leading-relaxed">
                {article.description}
              </CardDescription>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex flex-wrap gap-2 flex-1 min-w-0">
                  {article.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="h-auto p-0 text-sm font-medium hover:no-underline hover:text-primary flex items-center gap-1 shrink-0 cursor-pointer"
                  onClick={() => {
                    if (article.url) {
                      window.open(article.url, "_blank");
                    }
                  }}>
                  <BookOpen className="h-3 w-3" />
                  Read Article
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="font-bold text-lg">DS</div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <button
              onClick={() => scrollToSection("work")}
              className="hover:text-primary transition-colors">
              Work
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-primary transition-colors">
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-primary transition-colors">
              Contact
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1llaRDTuCYY_PeDL_g4jlIftV3E0MtdSZ/view?usp=sharing",
                  "_blank"
                )
              }
              className="hover:text-primary transition-colors flex items-center gap-1">
              Resume
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="h-9 w-9">
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}

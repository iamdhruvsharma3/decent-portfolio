"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun, ExternalLink, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isHomePage = pathname === "/";

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavigation("/")}
            className="font-bold text-lg hover:text-primary transition-colors">
            DS
          </button>

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

            {/* Life Beyond Code Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:text-primary transition-colors flex items-center gap-1"
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}>
                Life Beyond Code
                <ChevronDown className="h-3 w-3" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2">
                  <button
                    onClick={() => handleNavigation("/life/blogs")}
                    className="w-full px-4 py-2 text-left hover:bg-accent hover:text-primary transition-colors">
                    Blogs
                  </button>
                  <button
                    onClick={() => handleNavigation("/life/travel")}
                    className="w-full px-4 py-2 text-left hover:bg-accent hover:text-primary transition-colors">
                    Travel
                  </button>
                  <button
                    onClick={() => handleNavigation("/life/gallery")}
                    className="w-full px-4 py-2 text-left hover:bg-accent hover:text-primary transition-colors">
                    Gallery
                  </button>
                  <button
                    onClick={() => handleNavigation("/life/hobbies")}
                    className="w-full px-4 py-2 text-left hover:bg-accent hover:text-primary transition-colors">
                    Hobbies
                  </button>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={() => handleNavigation("/life")}
                    className="w-full px-4 py-2 text-left hover:bg-accent hover:text-primary transition-colors font-medium">
                    View All
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigation("/now")}
              className="hover:text-primary transition-colors">
              Now
            </button>
            <button
              onClick={() => handleNavigation("/guestbook")}
              className="hover:text-primary transition-colors">
              Guestbook
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

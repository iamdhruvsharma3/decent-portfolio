"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun, ExternalLink, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLifeDropdownOpen, setIsMobileLifeDropdownOpen] =
    useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileLifeDropdownOpen(false);
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector("nav");
      if (nav && !nav.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setIsMobileLifeDropdownOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobileMenuOpen]);

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
    setIsMobileMenuOpen(false);
    setIsMobileLifeDropdownOpen(false);
  };

  const handleMobileScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
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

          {/* Desktop Navigation Links */}
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

          {/* Mobile Navigation & Theme Toggle */}
          <div className="flex items-center gap-2">
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

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-9 w-9 md:hidden">
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm animate-in slide-in-from-top-2 duration-200">
            <div className="px-6 py-4 space-y-3">
              <button
                onClick={() => handleMobileScrollToSection("work")}
                className="block w-full text-left py-2 hover:text-primary transition-colors">
                Work
              </button>
              <button
                onClick={() => handleMobileScrollToSection("about")}
                className="block w-full text-left py-2 hover:text-primary transition-colors">
                About
              </button>
              <button
                onClick={() => handleMobileScrollToSection("contact")}
                className="block w-full text-left py-2 hover:text-primary transition-colors">
                Contact
              </button>
              <button
                onClick={() => {
                  window.open(
                    "https://drive.google.com/file/d/1llaRDTuCYY_PeDL_g4jlIftV3E0MtdSZ/view?usp=sharing",
                    "_blank"
                  );
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-1 w-full text-left py-2 hover:text-primary transition-colors">
                Resume
                <ExternalLink className="h-3 w-3" />
              </button>

              {/* Mobile Life Beyond Code Section */}
              <div className="border-t border-border pt-3">
                <button
                  onClick={() =>
                    setIsMobileLifeDropdownOpen(!isMobileLifeDropdownOpen)
                  }
                  className="flex items-center justify-between w-full text-left py-2 hover:text-primary transition-colors">
                  Life Beyond Code
                  <ChevronDown
                    className={`h-3 w-3 transition-transform ${isMobileLifeDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isMobileLifeDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-2 animate-in slide-in-from-top-1 duration-150">
                    <button
                      onClick={() => handleNavigation("/life/blogs")}
                      className="w-full text-left py-2 text-sm hover:text-primary transition-colors">
                      Blogs
                    </button>
                    <button
                      onClick={() => handleNavigation("/life/travel")}
                      className="w-full text-left py-2 text-sm hover:text-primary transition-colors">
                      Travel
                    </button>
                    <button
                      onClick={() => handleNavigation("/life/gallery")}
                      className="w-full text-left py-2 text-sm hover:text-primary transition-colors">
                      Gallery
                    </button>
                    <button
                      onClick={() => handleNavigation("/life/hobbies")}
                      className="w-full text-left py-2 text-sm hover:text-primary transition-colors">
                      Hobbies
                    </button>
                    <button
                      onClick={() => handleNavigation("/life")}
                      className="w-full text-left py-2 text-sm hover:text-primary transition-colors font-medium">
                      View All
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavigation("/now")}
                className="block w-full text-left py-2 hover:text-primary transition-colors">
                Now
              </button>
              <button
                onClick={() => handleNavigation("/guestbook")}
                className="block w-full text-left py-2 hover:text-primary transition-colors">
                Guestbook
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

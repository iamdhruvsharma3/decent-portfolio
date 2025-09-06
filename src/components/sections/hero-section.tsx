"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useCallback, memo } from "react";
import { Clock, MapPin, Briefcase, ArrowRight } from "lucide-react";
import Image from "next/image";

const TimeDisplay = memo(() => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono flex items-center justify-end gap-1">
      <Clock className="h-3 w-3" />
      {currentTime || "00:00:00"}
    </div>
  );
});

TimeDisplay.displayName = "TimeDisplay";

export function HeroSection() {
  const handleViewWork = useCallback(() => {
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleConnect = useCallback(() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 max-w-7xl mx-auto py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row lg:items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
        <div className="flex-1 space-y-6 sm:space-y-8 lg:space-y-10">
          <div className="flex items-center justify-between gap-4">
            <Badge
              variant="secondary"
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm">
              <Briefcase className="h-3 w-3 shrink-0" />
              <span className="truncate">Available for new opportunities</span>
            </Badge>
            <div className="text-right text-xs sm:text-sm text-muted-foreground lg:hidden shrink-0">
              <TimeDisplay />
              <div className="flex items-center justify-end gap-1 mt-1">
                <MapPin className="h-3 w-3" />
                <span className="hidden xs:inline">New Delhi, India</span>
                <span className="xs:hidden">Delhi</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
              Hey, I&apos;m Dhruv!
            </h1>

            <p className="text-base xs:text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
              A Frontend Developer with a year of experience building interfaces
              that don&apos;t just work, they
              <span className="text-foreground font-medium"> perform</span>.
            </p>
          </div>

          <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
            When I&apos;m not crafting pixel-perfect UIs, I&apos;m usually
            exploring new frameworks, contributing to open source, or perfecting
            my coffee brewing technique.
          </p>

          <div className="flex gap-3 sm:gap-4 flex-col xs:flex-row">
            <Button
              size="lg"
              className="text-sm sm:text-base flex items-center justify-center gap-2 h-11 sm:h-12"
              onClick={handleViewWork}>
              View My Work
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-sm sm:text-base flex items-center justify-center gap-2 h-11 sm:h-12"
              onClick={handleConnect}>
              Let&apos;s Connect
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="pt-2">
            <p className="text-xs sm:text-sm text-muted-foreground italic">
              Secret spot unlocked. Let&apos;s build something amazing together?
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-end space-y-4 sm:space-y-6 mt-8 sm:mt-12 lg:mt-0">
          <div className="hidden lg:block text-right text-sm text-muted-foreground">
            <TimeDisplay />
            <div className="flex items-center justify-end gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              New Delhi, India
            </div>
          </div>

          <div className="relative group">
            <div className="relative w-56 h-56 xs:w-64 xs:h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-80 lg:h-80 xl:w-96 xl:h-96 transition-transform duration-500 ease-out group-hover:scale-105">
              <Image
                src="/profile-img.JPG"
                alt="Dhruv Sharma - Frontend Developer"
                fill
                className="object-cover rounded-2xl shadow-lg will-change-transform transition-all duration-500 ease-out group-hover:shadow-2xl"
                sizes="(max-width: 475px) 224px, (max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                priority
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>

            {/* Enhanced glow effects */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl -z-10 opacity-70 blur-sm transition-all duration-500 ease-out group-hover:opacity-100 group-hover:-inset-6 group-hover:blur-md"></div>
            <div className="absolute -inset-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl -z-20 opacity-50 blur-lg transition-all duration-500 ease-out group-hover:opacity-80 group-hover:-inset-8 group-hover:blur-xl"></div>
            <div className="absolute -inset-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl -z-30 opacity-30 blur-xl transition-all duration-500 ease-out group-hover:opacity-60 group-hover:-inset-10 group-hover:blur-2xl"></div>
          </div>
        </div>
      </div>

      <div className="mt-12 sm:mt-16 lg:mt-24 pt-6 sm:pt-8 border-t border-border">
        <blockquote className="text-base sm:text-lg md:text-xl font-medium text-center">
          &quot;Clean code is my favorite aesthetic.&quot;
        </blockquote>
      </div>
    </section>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Collaborating with Dhruv has been a positive experience. His enthusiasm for performance optimization and attention to detail make him a strong team contributor.",
      author: "Sakshat Lidhoo",
      role: "SENIOR DEVELOPER, Cars24",
      initials: "SL",
    },
    {
      quote:
        "Dhruv shows great promise in frontend development. He writes clean, structured code and is always eager to improve and take feedback constructively.",
      author: "Vidit Sharma",
      role: "TECH LEAD, Cars24",
      initials: "VS",
    },
    {
      quote:
        "What stands out about Dhruv is his curiosity and problem-solving mindset. He actively explores better UI/UX approaches and brings fresh ideas to the table.",
      author: "Manav Bhatt",
      role: "PRODUCT DESIGNER, Cars24",
      initials: "MB",
    },
    {
      quote:
        "Dhruv quickly grasps complex concepts and translates them into working features. His ability to learn fast and adapt to new tools has been impressive.",
      author: "Tara",
      role: "Freelance Project",
      initials: "T",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
      <div className="space-y-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Words from the ones
          <br />
          I&apos;ve built with
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-none bg-muted/30">
              <CardContent className="p-8 space-y-6">
                <div className="relative">
                  <Quote className="h-6 w-6 text-primary/30 absolute -top-2 -left-2" />
                  <blockquote className="text-base leading-relaxed pl-6">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                </div>

                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <div className="font-medium text-sm">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Code & Creativity Quote */}
        <div className="text-center pt-8 space-y-8">
          {/* Quote reflecting work + life */}
          <div className="relative inline-block">
            <span className="text-lg italic text-muted-foreground relative z-10">
              Work hard, play harder.{" "}
              <span className="text-primary">Balance fuels creativity.</span>
            </span>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-full blur-sm"></div>
          </div>

          {/* Emoji cards row */}
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              "💻", // coding / work
              "🎨", // design / creativity
              "⚡", // productivity / energy
              "🌐", // web / projects
              "☕", // coffee / fuel
              "🏍️", // bike / hobby
              "🚗", // car / travel
              "🏋️", // gym / fitness
              "🏏", // cricket / sport
              "🎵", // music / passion
            ].map((emoji, i) => (
              <div
                key={i}
                className="relative w-20 h-20 rounded-2xl shadow-lg bg-gradient-to-tr from-primary/30 via-background to-secondary/30 flex items-center justify-center"
                style={{
                  animation:
                    i === 9
                      ? `vibrate 1s infinite`
                      : `bounce-stagger 1s infinite`,
                  animationDelay: `${i * 0.15}s`,
                }}>
                {/* Glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-secondary/40 opacity-40 animate-pulse rounded-2xl"></div>
                {/* Emoji */}
                <div className="relative text-3xl">{emoji}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Linkedin,
  Github,
  Instagram,
  ArrowRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { ContactFormModal } from "@/components/contact-form-modal";

export function ContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getContactIcon = (platform: string) => {
    switch (platform) {
      case "Email":
        return Mail;
      case "LinkedIn":
        return Linkedin;
      case "GitHub":
        return Github;
      case "Instagram":
        return Instagram;
      default:
        return MessageCircle;
    }
  };

  const getContactUrl = (platform: string, handle: string) => {
    switch (platform) {
      case "Email":
        return `mailto:${handle}`;
      case "LinkedIn":
        return `https://linkedin.com${handle}`;
      case "GitHub":
        return `https://github.com${handle}`;
      case "Instagram":
        return `https://instagram.com/${handle.replace("@", "")}`;
      default:
        return "#";
    }
  };

  const handleContactClick = (platform: string, handle: string) => {
    const url = getContactUrl(platform, handle);
    window.open(url, "_blank");
  };

  const handleStartProject = () => {
    window.open(
      "mailto:iamdhruvsharma3@gmail.com?subject=Let's Start a Project&body=Hi Dhruv,%0A%0AI'd like to discuss a project opportunity with you.%0A%0AProject Details:%0A- %0A%0ALooking forward to hearing from you!%0A%0ABest regards,",
      "_blank"
    );
  };

  const contactMethods = [
    {
      platform: "Email",
      handle: "iamdhruvsharma3@gmail.com",
      description: "For collaboration and opportunities.",
    },
    {
      platform: "LinkedIn",
      handle: "/in/dhruvsharma0311",
      description: "Professional networking and career updates",
    },
    {
      platform: "GitHub",
      handle: "/iamdhruvsharma3",
      description: "Open source contributions and code samples",
    },
    {
      platform: "Instagram",
      handle: "@dhruvshxrmaa",
      description: "A glimpse into my life beyond the code",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
      <div className="text-center space-y-16">
        {/* Main CTA */}
        <div className="space-y-8">
          <h2 className="text-2xl text-muted-foreground">
            Thanks for scrolling
          </h2>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            We&apos;ve come too far
            <br />
            to not build together.
          </h1>

          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Button
              size="lg"
              className="text-base px-8 flex items-center gap-2"
              onClick={handleStartProject}>
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 flex items-center gap-2"
              onClick={() => setIsModalOpen(true)}>
              <Phone className="h-4 w-4" />
              Schedule a Call
            </Button>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="space-y-8">
          <div className="text-center">
            <Badge variant="secondary" className="px-4 py-2">
              Let&apos;s Connect
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {contactMethods.map((contact, index) => {
              const IconComponent = getContactIcon(contact.platform);
              return (
                <Card
                  key={index}
                  className="group hover:shadow-md transition-all duration-300 cursor-pointer"
                  onClick={() =>
                    handleContactClick(contact.platform, contact.handle)
                  }>
                  <CardContent className="p-4 text-center space-y-2">
                    <div className="flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="font-medium group-hover:text-primary transition-colors text-sm">
                      {contact.platform}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground truncate">
                      {contact.handle}
                    </div>
                    <div className="text-xs text-muted-foreground leading-tight line-clamp-2">
                      {contact.description}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Footer Info */}
        <div className="pt-16 space-y-4 text-sm text-muted-foreground">
          <div>Currently based in New Delhi, India</div>
          <div>
            Available for freelance projects and full-time opportunities
          </div>
          <div className="text-xs">
            Built with Next.js 15, Tailwind CSS, and shadcn/ui
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}

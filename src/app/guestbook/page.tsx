"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SplashCursor } from "@/components/reactbits";
import { sanityClient } from "@/lib/sanity/client";
import { GUESTBOOK_ENTRIES_QUERY } from "@/lib/sanity/queries";
import { toast, Toaster } from "sonner";
import { AdminAccess } from "@/components/admin-access";

interface GuestbookEntry {
  _id: string;
  name: string;
  message: string;
  website?: string;
  location?: string;
  submittedAt: string;
  featured: boolean;
}

// Memoized component for individual guestbook entries to prevent unnecessary re-renders
const GuestbookEntryItem = memo(
  ({
    entry,
    formatDate,
  }: {
    entry: GuestbookEntry;
    formatDate: (date: string) => string;
  }) => {
    const getInitials = useMemo(() => {
      return entry.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }, [entry.name]);

    const getInitialsColor = useMemo(() => {
      const colors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-indigo-500",
        "bg-teal-500",
        "bg-orange-500",
        "bg-cyan-500",
      ];
      let hash = 0;
      for (let i = 0; i < entry.name.length; i++) {
        hash = entry.name.charCodeAt(i) + ((hash << 5) - hash);
      }
      return colors[Math.abs(hash) % colors.length];
    }, [entry.name]);

    return (
      <div
        className={`group flex items-start gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-muted/50 ${
          entry.featured
            ? "bg-primary/5 border border-primary/20"
            : "hover:shadow-sm"
        }`}>
        {/* Profile Photo (Initials) */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${getInitialsColor}`}>
          {getInitials}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm truncate">{entry.name}</span>
              {entry.featured && (
                <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded-full flex-shrink-0">
                  ✨
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {formatDate(entry.submittedAt)}
            </span>
          </div>

          {/* Location and Website */}
          {(entry.location || entry.website) && (
            <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
              {entry.location && (
                <span className="flex items-center gap-1 truncate">
                  📍 {entry.location}
                </span>
              )}
              {entry.website && (
                <a
                  href={entry.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline flex-shrink-0">
                  🌐 Website
                </a>
              )}
            </div>
          )}

          {/* Message */}
          <p className="text-sm leading-relaxed text-foreground/90 break-words">
            {entry.message}
          </p>
        </div>
      </div>
    );
  }
);

GuestbookEntryItem.displayName = "GuestbookEntryItem";

export default function GuestbookPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
    location: "",
  });
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    async function fetchGuestbookEntries() {
      try {
        const entries = await sanityClient.fetch<GuestbookEntry[]>(
          GUESTBOOK_ENTRIES_QUERY
        );
        console.log("Fetched guestbook entries:", entries);
        setGuestbookEntries(entries);
      } catch (error) {
        console.error("Error fetching guestbook entries:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGuestbookEntries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Submit to API route instead of directly to Sanity
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          website: formData.website,
          location: formData.location,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit guestbook entry");
      }

      // Reset form and show success
      setFormData({
        name: "",
        email: "",
        message: "",
        website: "",
        location: "",
      });

      // Show success toast
      toast.success("Thank you for signing the guestbook!", {
        description:
          "Your message has been submitted and will appear after approval.",
        duration: 5000,
      });

      setShowSuccess(true);
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error: unknown) {
      console.error("Error submitting guestbook entry:", error);

      // Handle specific error types
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (errorMessage.includes("Permission denied")) {
        toast.error("Configuration Error", {
          description:
            "The guestbook server configuration needs to be updated. Please contact the site administrator.",
          duration: 8000,
        });
      } else if (errorMessage.includes("validation")) {
        toast.error("Validation Error", {
          description: errorMessage,
          duration: 5000,
        });
      } else {
        toast.error("Submission Failed", {
          description:
            "There was an error submitting your message. Please try again.",
          duration: 5000,
        });
      }
    } finally {
      // Add a small delay to prevent UI lag
      setTimeout(() => {
        setSubmitting(false);
      }, 500);
    }
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return `${Math.ceil(diffDays / 365)} years ago`;
  }, []);

  return (
    <main className="min-h-screen pt-16">
      <Toaster
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          style: {
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            color: "hsl(var(--foreground))",
          },
        }}
      />
      <SplashCursor />
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Guestbook</h1>
              <p className="text-lg text-muted-foreground">
                Leave a note, share your thoughts, or just say hello! Your
                message will be displayed below for others to see.
              </p>
            </div>
            <AdminAccess redirectTo="/admin/guestbook">
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
                🔒 Admin Panel
              </button>
            </AdminAccess>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-green-700 dark:text-green-300 text-sm">
              ✅ Thank you for signing the guestbook! Your message has been
              submitted and will appear after approval.
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-200px)]">
          {/* Form Section - Left Side */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                ✍️ Leave a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      disabled={submitting}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email (optional)
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      disabled={submitting}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website" className="text-sm font-medium">
                      Website (optional)
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://your-site.com"
                      disabled={submitting}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium">
                      Location (optional)
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                      disabled={submitting}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm font-medium">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your thoughts, feedback, or just say hello..."
                    disabled={submitting}
                    className="mt-1 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={submitting}>
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>📝</span>
                      <span>Sign the guestbook</span>
                    </div>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center bg-muted/30 rounded-lg p-2">
                  💡 Messages are reviewed before being published
                </p>
              </form>
            </div>
          </div>

          {/* Messages Section - Right Side (WhatsApp Style) */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="bg-card/50 backdrop-blur-sm border rounded-xl shadow-lg flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b bg-muted/20 rounded-t-xl">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  💬 Recent messages
                  <span className="text-sm font-normal bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {guestbookEntries.length}
                  </span>
                </h2>
              </div>

              {/* Messages List */}
              <div className="flex-1 overflow-hidden">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-3 border-primary border-t-transparent mb-4"></div>
                    <p className="text-muted-foreground text-sm animate-pulse">
                      Loading messages...
                    </p>
                  </div>
                ) : guestbookEntries.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <div className="text-6xl mb-4 opacity-50">💬</div>
                    <p className="text-muted-foreground text-lg mb-2">
                      No messages yet
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Be the first to sign the guestbook!
                    </p>
                  </div>
                ) : (
                  <div className="overflow-y-auto h-full p-2 space-y-2">
                    {guestbookEntries.map((entry) => {
                      return (
                        <GuestbookEntryItem
                          key={entry._id}
                          entry={entry}
                          formatDate={formatDate}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer Status */}
              {guestbookEntries.length > 0 && (
                <div className="p-3 border-t bg-muted/10 rounded-b-xl">
                  <p className="text-green-600 dark:text-green-400 text-xs text-center flex items-center justify-center gap-1">
                    ✅ Connected to CMS • Messages auto-approved
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

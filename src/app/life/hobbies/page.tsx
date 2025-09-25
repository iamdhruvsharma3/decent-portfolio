"use client";

import { useState, useEffect } from "react";
import {
  MagicBento,
  BentoItem,
  BookShelfBento,
  EnhancedMusicBento,
} from "@/components/reactbits";
import { sanityClient } from "@/lib/sanity/client";
import { HOBBIES_QUERY, NOW_PAGE_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/config";
import Link from "next/link";
import { AdminAccess } from "@/components/admin-access";

interface Hobby {
  _id: string;
  title: string;
  type:
    | "reading"
    | "music"
    | "fitness"
    | "photography"
    | "sports"
    | "gaming"
    | "other";
  description: string;
  currentStatus?: string;
  links?: Array<{
    title: string;
    url: string;
    type: string;
  }>;
  media?: Array<{
    asset: { _id: string; url: string };
    alt?: string;
    caption?: string;
  }>;
  stats?: {
    [key: string]: string | number;
  };
  featured: boolean;
}

interface BookData {
  title: string;
  author: string;
  cover?: {
    asset: { _id: string; url: string };
  };
  progress?: number;
  thoughts?: string;
  startedDate?: string;
  goodreadsLink?: string;
}

export default function HobbiesPage() {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHobbiesData() {
      try {
        // Fetch hobbies data
        const hobbiesData = await sanityClient.fetch<Hobby[]>(HOBBIES_QUERY);
        console.log("Fetched hobbies:", hobbiesData);
        setHobbies(hobbiesData);

        // Fetch now page data for books
        const nowData = await sanityClient.fetch(NOW_PAGE_QUERY);
        console.log("Fetched now data:", nowData);

        if (nowData?.currentBooks) {
          setBooks(nowData.currentBooks);
        }
      } catch (error) {
        console.error("Error fetching hobbies data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHobbiesData();
  }, []);

  const getHobbyIcon = (type: Hobby["type"]) => {
    const icons = {
      reading: "📚",
      music: "🎵",
      fitness: "🏋️",
      photography: "📷",
      sports: "🏏",
      gaming: "🎮",
      other: "🎯",
    };
    return icons[type] || "🎯";
  };

  const processBooks = (cmsBooks: BookData[]) => {
    return cmsBooks.map((book) => ({
      title: book.title,
      author: book.author,
      cover: book.cover
        ? urlFor(book.cover.asset).width(200).height(300).url()
        : "/profile-img.JPG",
      progress: book.progress || 0,
    }));
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading hobbies...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-16">
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Hobbies</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            My passions and interests beyond coding, organized in a magic bento
            grid layout.
          </p>
        </div>

        {/* Books Section */}
        {books.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">📚 Reading Corner</h2>
            <BookShelfBento books={processBooks(books)} />
          </div>
        )}

        {/* Music Section - Enhanced with Spotify */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🎵 Music Vibes</h2>
          <EnhancedMusicBento />
        </div>

        {/* Hobbies from CMS */}
        {hobbies.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">🎯 Current Interests</h2>
            <MagicBento useDefaultCards={false}>
              {hobbies.map((hobby, index) => (
                <BentoItem
                  key={hobby._id}
                  colSpan={hobby.featured ? 2 : 1}
                  delay={index}>
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">
                        {getHobbyIcon(hobby.type)}
                      </span>
                      <h3
                        className={`font-bold ${hobby.featured ? "text-xl" : "text-lg"}`}>
                        {hobby.title}
                      </h3>
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground text-sm mb-4">
                        {hobby.description}
                      </p>

                      {/* Current Status */}
                      {hobby.currentStatus && (
                        <p className="text-xs text-primary mb-2">
                          Status: {hobby.currentStatus}
                        </p>
                      )}

                      {/* Stats */}
                      {hobby.stats && Object.keys(hobby.stats).length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                          {Object.entries(hobby.stats)
                            .slice(0, 4)
                            .map(([key, value]) => (
                              <div
                                key={key}
                                className="text-center p-2 bg-muted rounded text-xs">
                                <p className="font-medium capitalize">{key}</p>
                                <p className="text-muted-foreground">
                                  {String(value)}
                                </p>
                              </div>
                            ))}
                        </div>
                      )}

                      {/* Links */}
                      {hobby.links && hobby.links.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {hobby.links.slice(0, 2).map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors">
                              {link.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </BentoItem>
              ))}
            </MagicBento>
          </div>
        ) : (
          // Empty state with placeholder
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">🎯 Current Interests</h2>
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4">No hobbies added yet</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Your hobby data will appear here once added through the CMS.
              </p>
              <AdminAccess>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  🔒 Admin: Go to Studio →
                </button>
              </AdminAccess>
            </div>
          </div>
        )}

        {/* Success message */}
        {hobbies.length > 0 && (
          <div className="p-6 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl text-center">
            <p className="text-green-700 dark:text-green-300 text-sm">
              ✅ Hobbies section is now connected to your CMS! Showing{" "}
              {hobbies.length} {hobbies.length === 1 ? "hobby" : "hobbies"}
              {books.length > 0 && `, ${books.length} books`}, and live Spotify
              music data.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

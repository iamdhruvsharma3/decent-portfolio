"use client";

import { useState, useEffect } from "react";
import {
  MagicBento,
  BentoItem,
  EnhancedMusicBento,
} from "@/components/reactbits";
import { sanityClient } from "@/lib/sanity/client";
import { HOBBIES_QUERY, NOW_PAGE_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/config";
import { AdminAccess } from "@/components/admin-access";
import Image from "next/image";

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

  if (loading) {
    return (
      <main className="min-h-screen pt-16">
        <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="h-16 md:h-20 lg:h-24 bg-muted rounded-lg animate-pulse mb-4"></div>
            <div className="h-6 bg-muted rounded w-2/3 animate-pulse"></div>
          </div>

          {/* Music Section Skeleton */}
          <div className="mb-12">
            <div className="h-8 bg-muted rounded w-32 mb-6 animate-pulse"></div>
            <div className="relative">
              <div className="bg-gradient-to-br from-muted to-muted/50 rounded-3xl p-8 min-h-[400px] animate-pulse">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">🎶</div>
                    <div className="h-8 bg-white/20 rounded w-32"></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="md:col-span-2 lg:col-span-1 rounded-2xl bg-black/20 p-6 min-h-[280px]">
                    <div className="h-4 bg-white/20 rounded mb-4 w-24"></div>
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-24 h-24 bg-white/20 rounded-xl"></div>
                      <div className="space-y-2 w-full">
                        <div className="h-4 bg-white/20 rounded"></div>
                        <div className="h-3 bg-white/20 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-black/20 p-6 min-h-[280px]">
                    <div className="h-4 bg-white/20 rounded mb-4 w-20"></div>
                    <div className="space-y-3">
                      <div className="h-3 bg-white/20 rounded"></div>
                      <div className="h-3 bg-white/20 rounded w-3/4"></div>
                      <div className="h-3 bg-white/20 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-black/20 p-6 min-h-[280px]">
                    <div className="h-4 bg-white/20 rounded mb-4 w-16"></div>
                    <div className="space-y-2">
                      <div className="h-8 bg-white/20 rounded"></div>
                      <div className="h-4 bg-white/20 rounded w-4/5"></div>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-black/20 p-6 min-h-[280px]">
                    <div className="h-4 bg-white/20 rounded mb-4 w-20"></div>
                    <div className="space-y-2">
                      <div className="h-6 bg-white/20 rounded"></div>
                      <div className="h-4 bg-white/20 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Books and Hobbies Section Skeleton */}
          <div className="mb-12">
            <div className="h-8 bg-muted rounded w-48 mb-6 animate-pulse"></div>
            <div className="grid gap-2 p-3 max-w-[54rem] select-none relative">
              <div className="card-responsive grid gap-2">
                {/* Book skeleton */}
                <div className="flex flex-col justify-between relative aspect-[4/3] min-h-[400px] md:min-h-[450px] lg:min-h-[500px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden bg-muted animate-pulse">
                  <div className="flex items-center gap-3 mb-6 md:mb-8">
                    <div className="text-3xl md:text-4xl lg:text-5xl">📚</div>
                    <div className="h-8 bg-muted-foreground/20 rounded w-32"></div>
                  </div>
                  <div className="flex-1 mb-4 md:mb-6 rounded-xl bg-muted-foreground/10 relative max-h-48 md:max-h-56 lg:max-h-64"></div>
                  <div className="space-y-3 md:space-y-4 mt-auto">
                    <div className="h-6 bg-muted-foreground/20 rounded"></div>
                    <div className="h-5 bg-muted-foreground/20 rounded w-2/3"></div>
                    <div className="h-4 bg-muted-foreground/20 rounded w-1/2"></div>
                  </div>
                </div>

                {/* Hobby skeleton 1 */}
                <div className="flex flex-col justify-between relative aspect-[4/3] min-h-[400px] md:min-h-[450px] lg:min-h-[500px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden bg-muted animate-pulse">
                  <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="text-3xl md:text-4xl lg:text-5xl">🎯</div>
                    <div className="h-8 bg-muted-foreground/20 rounded w-28"></div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center space-y-4">
                    <div className="p-4 bg-muted-foreground/10 rounded-xl">
                      <div className="h-4 bg-muted-foreground/20 rounded mb-2 w-16"></div>
                      <div className="h-4 bg-muted-foreground/20 rounded"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-muted-foreground/10 rounded-xl">
                        <div className="h-6 bg-muted-foreground/20 rounded mb-2"></div>
                        <div className="h-3 bg-muted-foreground/20 rounded"></div>
                      </div>
                      <div className="text-center p-3 bg-muted-foreground/10 rounded-xl">
                        <div className="h-6 bg-muted-foreground/20 rounded mb-2"></div>
                        <div className="h-3 bg-muted-foreground/20 rounded"></div>
                      </div>
                      <div className="text-center p-3 bg-muted-foreground/10 rounded-xl">
                        <div className="h-6 bg-muted-foreground/20 rounded mb-2"></div>
                        <div className="h-3 bg-muted-foreground/20 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hobby skeleton 2 */}
                <div className="flex flex-col justify-between relative aspect-[4/3] min-h-[400px] md:min-h-[450px] lg:min-h-[500px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden bg-muted animate-pulse">
                  <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="text-3xl md:text-4xl lg:text-5xl">🎮</div>
                    <div className="h-8 bg-muted-foreground/20 rounded w-36"></div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center space-y-4">
                    <div className="flex flex-wrap gap-3 justify-center">
                      <div className="h-8 bg-primary/20 rounded-lg w-20"></div>
                      <div className="h-8 bg-primary/20 rounded-lg w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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

        {/* Music Section - Enhanced with Spotify (Top Priority) */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🎵 Music Vibes</h2>
          <EnhancedMusicBento />
        </div>

        {/* Combined Interests Section - Books + Hobbies in MagicBento */}
        {books.length > 0 || hobbies.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              📚🎯 Interests & Hobbies
            </h2>
            <MagicBento useDefaultCards={false}>
              {/* Books as Bento Items */}
              {books.map((book, index) => (
                <BentoItem
                  key={`book-${index}`}
                  colSpan={2}
                  rowSpan={2}
                  delay={index}
                  className="min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
                  <div className="h-full flex flex-col p-4 md:p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                      <span className="text-3xl md:text-4xl lg:text-5xl">
                        📚
                      </span>
                      <h3 className="font-bold text-lg md:text-xl lg:text-2xl">
                        Currently Reading
                      </h3>
                    </div>

                    {book.cover && (
                      <div className="flex-1 mb-4 md:mb-6 rounded-xl overflow-hidden bg-muted relative max-h-48 md:max-h-56 lg:max-h-64">
                        <Image
                          src={urlFor(book.cover.asset)
                            .width(300)
                            .height(400)
                            .url()}
                          alt={book.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    <div className="space-y-3 md:space-y-4 mt-auto">
                      <h4 className="font-bold text-base md:text-lg lg:text-xl line-clamp-2">
                        {book.title}
                      </h4>
                      {book.author && (
                        <p className="text-base md:text-lg text-muted-foreground">
                          by {book.author}
                        </p>
                      )}
                      {book.progress !== undefined && (
                        <div className="mt-4 md:mt-6">
                          <div className="flex justify-between items-center mb-3 md:mb-4">
                            <span className="text-base md:text-lg text-muted-foreground font-medium">
                              Progress
                            </span>
                            <span className="text-base md:text-lg text-primary font-bold">
                              {book.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3 md:h-4">
                            <div
                              className="bg-primary h-3 md:h-4 rounded-full transition-all duration-300"
                              style={{ width: `${book.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </BentoItem>
              ))}

              {/* Hobbies as Bento Items */}
              {hobbies.map((hobby, index) => (
                <BentoItem
                  key={hobby._id}
                  colSpan={hobby.featured ? 3 : 2}
                  rowSpan={hobby.featured ? 2 : 1}
                  delay={books.length + index}
                  className={`${
                    hobby.featured
                      ? "min-h-[500px] md:min-h-[550px] lg:min-h-[600px]"
                      : "min-h-[400px] md:min-h-[450px] lg:min-h-[500px]"
                  }`}>
                  <div className="h-full flex flex-col p-4 md:p-6 lg:p-8">
                    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                      <span className="text-3xl md:text-4xl lg:text-5xl">
                        {getHobbyIcon(hobby.type)}
                      </span>
                      <h3
                        className={`font-bold ${
                          hobby.featured
                            ? "text-xl md:text-2xl lg:text-3xl"
                            : "text-lg md:text-xl lg:text-2xl"
                        }`}>
                        {hobby.title}
                      </h3>
                    </div>

                    <div className="flex-1 flex flex-col justify-center space-y-4 min-h-[200px]">
                      {/* Current Status - Always reserve space */}
                      <div className="min-h-[60px] flex items-center">
                        {hobby.currentStatus ? (
                          <div className="p-4 bg-primary/10 rounded-xl w-full">
                            <p className="text-sm md:text-base text-primary font-medium leading-relaxed break-words">
                              <span className="font-semibold">Status:</span>{" "}
                              {hobby.currentStatus}
                            </p>
                          </div>
                        ) : (
                          <div className="invisible p-4 bg-primary/10 rounded-xl w-full">
                            <p className="text-sm md:text-base text-primary font-medium leading-relaxed">
                              Status: Placeholder text
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Stats - Always reserve space */}
                      <div className="min-h-[80px] flex items-center">
                        {hobby.stats && Object.keys(hobby.stats).length > 0 ? (
                          <div className="grid grid-cols-3 gap-3 w-full">
                            {Object.entries(hobby.stats)
                              .slice(0, 3)
                              .map(([key, value]) => (
                                <div
                                  key={key}
                                  className="text-center p-3 bg-muted rounded-xl">
                                  <p className="font-bold text-lg md:text-xl mb-2 break-words">
                                    {String(value)}
                                  </p>
                                  <p className="text-xs md:text-sm text-muted-foreground capitalize leading-tight break-words">
                                    {key.replace(/([A-Z])/g, " $1").trim()}
                                  </p>
                                </div>
                              ))}
                            {/* Fill remaining slots if less than 3 stats */}
                            {Array.from({ length: Math.max(0, 3 - Object.keys(hobby.stats).length) }).map((_, index) => (
                              <div
                                key={`empty-${index}`}
                                className="text-center p-3 bg-muted/50 rounded-xl invisible">
                                <p className="font-bold text-lg md:text-xl mb-2">0</p>
                                <p className="text-xs md:text-sm text-muted-foreground">Empty</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 gap-3 w-full invisible">
                            <div className="text-center p-3 bg-muted rounded-xl">
                              <p className="font-bold text-lg md:text-xl mb-2">0</p>
                              <p className="text-xs md:text-sm text-muted-foreground">Stat</p>
                            </div>
                            <div className="text-center p-3 bg-muted rounded-xl">
                              <p className="font-bold text-lg md:text-xl mb-2">0</p>
                              <p className="text-xs md:text-sm text-muted-foreground">Stat</p>
                            </div>
                            <div className="text-center p-3 bg-muted rounded-xl">
                              <p className="font-bold text-lg md:text-xl mb-2">0</p>
                              <p className="text-xs md:text-sm text-muted-foreground">Stat</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Links - Always reserve space */}
                      <div className="min-h-[40px] flex items-center justify-center">
                        {hobby.links && hobby.links.length > 0 ? (
                          <div className="flex flex-wrap gap-3 justify-center">
                            {hobby.links.slice(0, 2).map((link, linkIndex) => (
                              <a
                                key={linkIndex}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium break-words">
                                {link.title}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-3 justify-center invisible">
                            <div className="text-sm px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium">
                              Link
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </BentoItem>
              ))}
            </MagicBento>
          </div>
        ) : (
          // Empty state with placeholder
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              📚🎯 Interests & Hobbies
            </h2>
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📚🎯</div>
              <h3 className="text-2xl font-bold mb-4">
                No interests added yet
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Your books and hobby data will appear here once added through
                the CMS.
              </p>
              <AdminAccess>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  🔒 Admin: Go to Studio →
                </button>
              </AdminAccess>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

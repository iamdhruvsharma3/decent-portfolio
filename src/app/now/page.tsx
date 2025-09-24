"use client";

import { useState, useEffect } from "react";
import { sanityClient } from "@/lib/sanity/client";
import { NOW_PAGE_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/config";

interface NowContent {
  _id: string;
  title: string;
  lastUpdated: string;
  currentWork: {
    title: string;
    description: string;
    progress?: number;
    link?: string;
  };
  currentLearning: Array<{
    skill: string;
    description: string;
  }>;
  currentBooks: Array<{
    title: string;
    author: string;
    progress?: number;
    thoughts?: string;
  }>;
  currentMusic: {
    topArtists?: string[];
    recentlyDiscovered?: string[];
    currentPlaylist?: {
      name: string;
      description: string;
    };
  };
  currentTravel: {
    status: string;
    currentLocation?: string;
    nextDestination?: {
      location: string;
      plannedDate: string;
    };
  };
  personalNote?: string;
  mood?: string;
}

export default function NowPage() {
  const [nowContent, setNowContent] = useState<NowContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNowContent() {
      try {
        const content = await sanityClient.fetch<NowContent>(NOW_PAGE_QUERY);
        setNowContent(content);
      } catch (error) {
        console.error("Error fetching now content:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNowContent();
  }, []);
  return (
    <main className="min-h-screen pt-16">
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {nowContent?.title || "What I'm doing now"}
          </h1>
          <p className="text-lg text-muted-foreground">
            Inspired by{" "}
            <a
              href="https://nownownow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline">
              nownownow.com
            </a>
            , here's what I'm focused on right now.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated:{" "}
            {nowContent?.lastUpdated
              ? new Date(nowContent.lastUpdated).toLocaleDateString()
              : new Date().toLocaleDateString()}
          </p>
          {nowContent?.mood && (
            <p className="text-sm text-muted-foreground mt-1">
              Current mood: {nowContent.mood}
            </p>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading current status...</p>
          </div>
        ) : nowContent ? (
          <div className="space-y-12">
            {/* Current Work Section */}
            {nowContent.currentWork && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="text-3xl mr-3">🔨</span>
                  Building
                </h2>
                <div className="p-6 bg-card rounded-xl border">
                  <h3 className="font-bold text-lg mb-2">
                    {nowContent.currentWork.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {nowContent.currentWork.description}
                  </p>

                  {nowContent.currentWork.progress !== undefined && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{nowContent.currentWork.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{
                            width: `${nowContent.currentWork.progress}%`,
                          }}></div>
                      </div>
                    </div>
                  )}

                  {nowContent.currentWork.link && (
                    <a
                      href={nowContent.currentWork.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline text-sm">
                      View Project →
                    </a>
                  )}
                </div>
              </section>
            )}

            {/* Learning Section */}
            {nowContent.currentLearning &&
              nowContent.currentLearning.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="text-3xl mr-3">🧠</span>
                    Learning
                  </h2>
                  <div className="space-y-4">
                    {nowContent.currentLearning.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 bg-card rounded-lg border">
                        <h3 className="font-medium mb-2">{item.skill}</h3>
                        <p className="text-muted-foreground text-sm">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {/* Reading Section */}
            {nowContent.currentBooks && nowContent.currentBooks.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="text-3xl mr-3">📚</span>
                  Reading
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nowContent.currentBooks.map((book, index) => (
                    <div
                      key={index}
                      className="p-4 bg-card rounded-lg border flex gap-4">
                      {book.cover && (
                        <div className="flex-shrink-0">
                          <img
                            src={urlFor(book.cover.asset)
                              .width(60)
                              .height(90)
                              .url()}
                            alt={book.title}
                            className="w-15 h-22 object-cover rounded shadow-sm"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm mb-1">
                          {book.title}
                        </h3>
                        <p className="text-muted-foreground text-xs mb-2">
                          by {book.author}
                        </p>

                        {book.progress !== undefined && (
                          <div className="mb-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{book.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1">
                              <div
                                className="bg-primary h-1 rounded-full"
                                style={{ width: `${book.progress}%` }}></div>
                            </div>
                          </div>
                        )}

                        {book.thoughts && (
                          <p className="text-muted-foreground text-xs italic">
                            "{book.thoughts}"
                          </p>
                        )}

                        {book.goodreadsLink && (
                          <a
                            href={book.goodreadsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline mt-1 inline-block">
                            View on Goodreads →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Music Section */}
            {nowContent.currentMusic && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="text-3xl mr-3">🎵</span>
                  Listening
                </h2>
                <div className="p-6 bg-card rounded-xl border space-y-4">
                  {nowContent.currentMusic.currentPlaylist && (
                    <div>
                      <h3 className="font-medium mb-2">Current Playlist</h3>
                      <p className="text-lg">
                        {nowContent.currentMusic.currentPlaylist.name}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {nowContent.currentMusic.currentPlaylist.description}
                      </p>
                    </div>
                  )}

                  {nowContent.currentMusic.topArtists &&
                    nowContent.currentMusic.topArtists.length > 0 && (
                      <div>
                        <h3 className="font-medium mb-2">Top Artists</h3>
                        <div className="flex flex-wrap gap-2">
                          {nowContent.currentMusic.topArtists.map(
                            (artist, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                {artist}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {nowContent.currentMusic.recentlyDiscovered &&
                    nowContent.currentMusic.recentlyDiscovered.length > 0 && (
                      <div>
                        <h3 className="font-medium mb-2">
                          Recently Discovered
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {nowContent.currentMusic.recentlyDiscovered.map(
                            (artist, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                                {artist}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </section>
            )}

            {/* Travel Section */}
            {nowContent.currentTravel && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="text-3xl mr-3">✈️</span>
                  Traveling
                </h2>
                <div className="p-6 bg-card rounded-xl border">
                  <p className="text-lg mb-4">
                    Status:{" "}
                    <span className="font-medium">
                      {nowContent.currentTravel.status}
                    </span>
                  </p>

                  {nowContent.currentTravel.currentLocation && (
                    <p className="text-muted-foreground mb-2">
                      📍 Currently in:{" "}
                      {nowContent.currentTravel.currentLocation}
                    </p>
                  )}

                  {nowContent.currentTravel.nextDestination && (
                    <p className="text-muted-foreground">
                      🎯 Next destination:{" "}
                      {nowContent.currentTravel.nextDestination.location}(
                      {new Date(
                        nowContent.currentTravel.nextDestination.plannedDate
                      ).toLocaleDateString()}
                      )
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Personal Note */}
            {nowContent.personalNote && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="text-3xl mr-3">💭</span>
                  Personal Note
                </h2>
                <div className="p-6 bg-card rounded-xl border">
                  <p className="text-muted-foreground italic">
                    "{nowContent.personalNote}"
                  </p>
                </div>
              </section>
            )}
          </div>
        ) : (
          // Fallback content when no CMS data
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-3xl mr-3">🔨</span>
                Building
              </h2>
              <div className="p-6 bg-card rounded-xl border">
                <p className="text-muted-foreground">
                  Currently working on Portfolio v2 with enhanced features, CMS
                  integration, and new sections to showcase life beyond code.
                </p>
              </div>
            </section>

            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                No current status data available. Add content through the CMS.
              </p>
              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Go to Studio →
              </a>
            </div>
          </div>
        )}

        {/* Success message */}
        {nowContent && (
          <div className="mt-12 p-6 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl text-center">
            <p className="text-green-700 dark:text-green-300 text-sm">
              ✅ Now page is connected to your CMS and showing live data!
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

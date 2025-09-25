"use client";

import { useState, useEffect } from "react";
import { DomeGallery } from "@/components/reactbits";
import { sanityClient } from "@/lib/sanity/client";
import { TRAVEL_POSTS_QUERY, TRAVEL_POST_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/config";
import { AdminAccess } from "@/components/admin-access";

interface TravelPost {
  _id: string;
  title: string;
  slug: { current: string };
  location: string;
  country: string;
  date: string;
  coverImage?: {
    asset: { _id: string; url: string };
    alt?: string;
  };
  excerpt: string;
  duration?: string;
  featured: boolean;
  images?: Array<{
    asset: { _id: string; url: string };
    alt?: string;
    caption?: string;
  }>;
  highlights?: string[];
  travelBuddies?: string[];
}

export default function TravelPage() {
  const [travelPosts, setTravelPosts] = useState<TravelPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTravelPosts() {
      try {
        // Fetch all travel posts
        const posts =
          await sanityClient.fetch<TravelPost[]>(TRAVEL_POSTS_QUERY);
        console.log("Fetched travel posts:", posts);

        // Fetch detailed data including images for each post
        const detailedPosts = await Promise.all(
          posts.map(async (post) => {
            const detailedPost = await sanityClient.fetch(TRAVEL_POST_QUERY, {
              slug: post.slug.current,
            });
            return detailedPost;
          })
        );

        setTravelPosts(detailedPosts.filter(Boolean));
      } catch (error) {
        console.error("Error fetching travel posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTravelPosts();
  }, []);

  const processTravelImages = (images?: TravelPost["images"]) => {
    if (!images) return [];

    return images.map((img, index) => ({
      id: `${index}`,
      src: urlFor(img.asset).width(1200).height(800).url(),
      alt: img.alt || "Travel photo",
      title: img.caption || "Travel memory",
      description: img.caption || "",
    }));
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading travel stories...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-16">
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Travel</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Adventures and stories from around the world, captured in immersive
            photo collections.
          </p>
        </div>

        {travelPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">✈️</div>
            <h2 className="text-2xl font-bold mb-4">No travel posts yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Travel stories will appear here once they are added through the
              CMS.
            </p>
            <AdminAccess>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                🔒 Admin: Go to Studio →
              </button>
            </AdminAccess>
          </div>
        ) : (
          <div className="space-y-20">
            {travelPosts.map((post) => (
              <div key={post._id} className="space-y-8">
                {/* Travel post header */}
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
                    <span>✈️</span>
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    {post.title}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {post.location}, {post.country}
                  </p>
                  <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                    {post.excerpt}
                  </p>
                  {post.duration && (
                    <p className="text-sm text-muted-foreground">
                      Duration: {post.duration}
                    </p>
                  )}
                </div>

                {/* Dome Gallery for this travel post */}
                {post.images && post.images.length > 0 && (
                  <div>
                    <DomeGallery images={processTravelImages(post.images)} />
                  </div>
                )}

                {/* Travel stats or additional info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-card rounded-xl border">
                    <div className="text-2xl mb-2">📍</div>
                    <h3 className="font-medium mb-1">Locations</h3>
                    <p className="text-muted-foreground text-sm">
                      {post.location}
                    </p>
                  </div>
                  <div className="text-center p-6 bg-card rounded-xl border">
                    <div className="text-2xl mb-2">📸</div>
                    <h3 className="font-medium mb-1">Photos</h3>
                    <p className="text-muted-foreground text-sm">
                      {post.images?.length || 0} captured
                    </p>
                  </div>
                  <div className="text-center p-6 bg-card rounded-xl border">
                    <div className="text-2xl mb-2">⭐</div>
                    <h3 className="font-medium mb-1">Highlights</h3>
                    <p className="text-muted-foreground text-sm">
                      {post.highlights?.length || 0} memories
                    </p>
                  </div>
                </div>

                {/* Highlights section */}
                {post.highlights && post.highlights.length > 0 && (
                  <div className="bg-card rounded-xl border p-6">
                    <h3 className="font-bold mb-4">✨ Trip Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {post.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <p className="text-muted-foreground text-sm">
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Success message */}
        {travelPosts.length > 0 && (
          <div className="mt-20 p-6 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl text-center">
            <p className="text-green-700 dark:text-green-300 text-sm">
              ✅ Travel section is now connected to your CMS! Showing{" "}
              {travelPosts.length} travel{" "}
              {travelPosts.length === 1 ? "story" : "stories"}.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { DomeGallery } from "@/components/reactbits";
import { sanityClient } from "@/lib/sanity/client";
import { TRAVEL_POSTS_QUERY, TRAVEL_POST_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/config";
import { AdminAccess } from "@/components/admin-access";
import Image from "next/image";

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
  const [selectedPost, setSelectedPost] = useState<TravelPost | null>(null);

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
          <>
            {/* Travel Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {travelPosts.map((post) => (
                <div
                  key={post._id}
                  className="group cursor-pointer bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => setSelectedPost(post)}>
                  {/* Cover Image */}
                  {post.coverImage ? (
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <Image
                        src={urlFor(post.coverImage.asset)
                          .width(600)
                          .height(400)
                          .url()}
                        alt={post.coverImage.alt || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-6xl">✈️</span>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    {/* Date Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                      <span>📅</span>
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    {/* Location */}
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                      <span>📍</span>
                      {post.location}, {post.country}
                    </p>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <span>📸</span>
                        {post.images?.length || 0} photos
                      </span>
                      {post.duration && (
                        <span className="flex items-center gap-1">
                          <span>⏱️</span>
                          {post.duration}
                        </span>
                      )}
                    </div>

                    {/* Click to view indicator */}
                    <div className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to view full story →
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for selected post */}
            {selectedPost && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-background rounded-xl border max-w-4xl max-h-[90vh] overflow-y-auto w-full">
                  {/* Modal Header */}
                  <div className="sticky top-0 bg-background border-b p-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {selectedPost.title}
                      </h2>
                      <p className="text-muted-foreground">
                        {selectedPost.location}, {selectedPost.country}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <span className="text-xl">✕</span>
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6 space-y-8">
                    {/* Post Details */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span>📅</span>
                          {new Date(selectedPost.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                        {selectedPost.duration && (
                          <span className="flex items-center gap-1">
                            <span>⏱️</span>
                            {selectedPost.duration}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <span>📸</span>
                          {selectedPost.images?.length || 0} photos
                        </span>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">
                        {selectedPost.excerpt}
                      </p>
                    </div>

                    {/* Photo Gallery */}
                    {selectedPost.images && selectedPost.images.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          📸 Photo Gallery
                        </h3>
                        <div style={{ height: "500px" }}>
                          <DomeGallery
                            images={processTravelImages(selectedPost.images)}
                          />
                        </div>
                      </div>
                    )}

                    {/* Travel Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-card rounded-lg border">
                        <div className="text-2xl mb-2">📍</div>
                        <h4 className="font-medium mb-1">Location</h4>
                        <p className="text-muted-foreground text-sm">
                          {selectedPost.location}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-card rounded-lg border">
                        <div className="text-2xl mb-2">📸</div>
                        <h4 className="font-medium mb-1">Photos</h4>
                        <p className="text-muted-foreground text-sm">
                          {selectedPost.images?.length || 0} captured
                        </p>
                      </div>
                      <div className="text-center p-4 bg-card rounded-lg border">
                        <div className="text-2xl mb-2">⭐</div>
                        <h4 className="font-medium mb-1">Highlights</h4>
                        <p className="text-muted-foreground text-sm">
                          {selectedPost.highlights?.length || 0} memories
                        </p>
                      </div>
                    </div>

                    {/* Highlights */}
                    {selectedPost.highlights &&
                      selectedPost.highlights.length > 0 && (
                        <div className="bg-card rounded-lg border p-6">
                          <h3 className="font-bold mb-4 flex items-center gap-2">
                            <span>✨</span>
                            Trip Highlights
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {selectedPost.highlights.map((highlight, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <p className="text-muted-foreground text-sm">
                                  {highlight}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Travel Buddies */}
                    {selectedPost.travelBuddies &&
                      selectedPost.travelBuddies.length > 0 && (
                        <div className="bg-card rounded-lg border p-6">
                          <h3 className="font-bold mb-4 flex items-center gap-2">
                            <span>👥</span>
                            Travel Buddies
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedPost.travelBuddies.map((buddy, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                {buddy}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

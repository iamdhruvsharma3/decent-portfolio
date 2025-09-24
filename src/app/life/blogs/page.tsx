"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity/client";
import { BLOG_POSTS_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/config";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage?: {
    asset: { _id: string; url: string };
    alt?: string;
  };
  tags?: string[];
  readingTime?: number;
  publishedAt: string;
  featured: boolean;
}

export default function BlogsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const posts = await sanityClient.fetch<BlogPost[]>(BLOG_POSTS_QUERY);
        console.log("Fetched blog posts:", posts);
        setBlogPosts(posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-16">
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Blogs</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            My thoughts, insights, and experiences shared through writing.
          </p>
        </div>

        {blogPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold mb-4">No blog posts yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Blog posts will appear here once they are published through the
              CMS.
            </p>
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Go to Studio →
            </a>
          </div>
        ) : (
          <>
            {/* Featured posts section */}
            {blogPosts.some((post) => post.featured) && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-8">✨ Featured Posts</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {blogPosts
                    .filter((post) => post.featured)
                    .slice(0, 2)
                    .map((post) => (
                      <Link
                        key={post._id}
                        href={`/life/blogs/${post.slug.current}`}
                        className="group block">
                        <article className="h-full bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                          {post.coverImage && (
                            <div className="aspect-video overflow-hidden">
                              <img
                                src={urlFor(post.coverImage.asset)
                                  .width(600)
                                  .height(400)
                                  .url()}
                                alt={post.coverImage.alt || post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <div className="flex items-center gap-4 mb-3">
                              <time className="text-sm text-muted-foreground">
                                {new Date(post.publishedAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </time>
                              {post.readingTime && (
                                <span className="text-sm text-muted-foreground">
                                  {post.readingTime} min read
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </article>
                      </Link>
                    ))}
                </div>
              </div>
            )}

            {/* All posts section */}
            <div>
              <h2 className="text-2xl font-bold mb-8">
                {blogPosts.some((post) => post.featured)
                  ? "All Posts"
                  : "Recent Posts"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/life/blogs/${post.slug.current}`}
                    className="group block">
                    <article className="h-full bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      {post.coverImage && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={urlFor(post.coverImage.asset)
                              .width(400)
                              .height(250)
                              .url()}
                            alt={post.coverImage.alt || post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-3">
                          <time className="text-sm text-muted-foreground">
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </time>
                          {post.readingTime && (
                            <span className="text-sm text-muted-foreground">
                              {post.readingTime}min
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>

            {/* Success message */}
            <div className="mt-16 p-6 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl text-center">
              <p className="text-green-700 dark:text-green-300 text-sm">
                ✅ Blog section is now connected to your CMS! Showing{" "}
                {blogPosts.length} {blogPosts.length === 1 ? "post" : "posts"}.
              </p>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity/client";
import { BLOG_POST_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/config";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import Image from "next/image";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  body: PortableTextBlock[];
  coverImage?: {
    asset: { _id: string; url: string };
    alt?: string;
  };
  tags?: string[];
  readingTime?: number;
  publishedAt: string;
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // Fetch blog post data from CMS based on slug
  const post: BlogPost | null = await sanityClient.fetch(BLOG_POST_QUERY, {
    slug,
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-16">
      <article className="py-20 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-[2/1] mb-12 rounded-xl overflow-hidden">
            <Image
              src={urlFor(post.coverImage.asset).width(1200).height(600).url()}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{post.title}</h1>

          <div className="flex items-center gap-4 text-muted-foreground mb-6">
            <span>By Dhruv Sharma</span>
            <span>•</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {post.readingTime && (
              <>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {post.body ? (
            <PortableText
              value={post.body}
              components={{
                types: {
                  image: ({ value }) => (
                    <div className="relative aspect-video my-8 rounded-lg overflow-hidden">
                      <Image
                        src={urlFor(value.asset).width(800).height(450).url()}
                        alt={value.alt || "Blog image"}
                        fill
                        className="object-cover"
                      />
                      {value.caption && (
                        <p className="text-center text-sm text-muted-foreground mt-2">
                          {value.caption}
                        </p>
                      )}
                    </div>
                  ),
                },
                block: {
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
                  ),
                  normal: ({ children }) => (
                    <p className="mb-4 leading-relaxed">{children}</p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-6 italic my-6 text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-2">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-2">
                      {children}
                    </ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => (
                    <li className="mb-1">{children}</li>
                  ),
                  number: ({ children }) => (
                    <li className="mb-1">{children}</li>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-bold">{children}</strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                  code: ({ children }) => (
                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                      {children}
                    </code>
                  ),
                  link: ({ children, value }) => (
                    <a
                      href={value.href}
                      className="text-primary hover:underline"
                      target={
                        value.href.startsWith("http") ? "_blank" : "_self"
                      }
                      rel={
                        value.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }>
                      {children}
                    </a>
                  ),
                },
              }}
            />
          ) : (
            <p className="text-muted-foreground">
              No content available for this blog post.
            </p>
          )}
        </div>

        {/* Article Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex justify-between items-center">
            <Link href="/life/blogs" className="text-primary hover:underline">
              ← Back to all blogs
            </Link>
            <div className="flex gap-4">
              <span className="text-muted-foreground">Share:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary">
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

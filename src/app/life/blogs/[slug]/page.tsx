import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // TODO: Fetch blog post data from CMS based on slug
  // For now, show placeholder

  return (
    <main className="min-h-screen pt-16">
      <article className="py-20 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Blog Post: {slug}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground mb-6">
            <span>By Dhruv Sharma</span>
            <span>•</span>
            <span>Published on {new Date().toLocaleDateString()}</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              Technology
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              React
            </span>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead text-xl text-muted-foreground mb-8">
            This is a placeholder for the blog post content. Once the CMS is
            configured, the actual blog content will be fetched and displayed
            here.
          </p>

          <h2>Coming Soon</h2>
          <p>
            This blog post will be dynamically loaded from the CMS. The slug for
            this post is: <code>{slug}</code>
          </p>

          <p>Features that will be available:</p>
          <ul>
            <li>Rich text content from CMS</li>
            <li>Code syntax highlighting</li>
            <li>Image galleries</li>
            <li>Social sharing buttons</li>
            <li>Related posts</li>
            <li>Comments system</li>
          </ul>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex justify-between items-center">
            <a href="/life/blogs" className="text-primary hover:underline">
              ← Back to all blogs
            </a>
            <div className="flex gap-4">
              <span className="text-muted-foreground">Share:</span>
              {/* TODO: Add social sharing buttons */}
              <button className="text-muted-foreground hover:text-primary">
                Twitter
              </button>
              <button className="text-muted-foreground hover:text-primary">
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

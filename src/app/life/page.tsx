export default function LifePage() {
  return (
    <main className="min-h-screen pt-16">
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Life Beyond Code ✨
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Welcome to my personal space where I share my passions, travels, and
            experiences beyond the world of development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <a
            href="/life/blogs"
            className="group p-8 bg-card rounded-xl border hover:border-primary transition-colors">
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
              Blogs
            </h2>
            <p className="text-muted-foreground">
              Thoughts, insights, and experiences from my journey
            </p>
          </a>

          <a
            href="/life/travel"
            className="group p-8 bg-card rounded-xl border hover:border-primary transition-colors">
            <div className="text-4xl mb-4">🌍</div>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
              Travel
            </h2>
            <p className="text-muted-foreground">
              Adventures and stories from around the world
            </p>
          </a>

          <a
            href="/life/gallery"
            className="group p-8 bg-card rounded-xl border hover:border-primary transition-colors">
            <div className="text-4xl mb-4">📸</div>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
              Gallery
            </h2>
            <p className="text-muted-foreground">
              Visual moments captured through my lens
            </p>
          </a>

          <a
            href="/life/hobbies"
            className="group p-8 bg-card rounded-xl border hover:border-primary transition-colors">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
              Hobbies
            </h2>
            <p className="text-muted-foreground">
              Books, music, photography, and other passions
            </p>
          </a>

          <a
            href="/now"
            className="group p-8 bg-card rounded-xl border hover:border-primary transition-colors md:col-span-2 lg:col-span-2">
            <div className="text-4xl mb-4">⚡</div>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
              What I'm doing now
            </h2>
            <p className="text-muted-foreground">
              Current projects, learning goals, and life updates
            </p>
          </a>
        </div>
      </section>
    </main>
  );
}

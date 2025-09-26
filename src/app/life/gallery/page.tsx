"use client";

import { useState, useEffect } from "react";
import { Masonry, DomeGallery } from "@/components/reactbits";
import { sanityClient } from "@/lib/sanity/client";
import { GALLERY_IMAGES_QUERY } from "@/lib/sanity/queries";
import imageUrlBuilder from "@sanity/image-url";
import { AdminAccess } from "@/components/admin-access";

// Initialize image URL builder
const builder = imageUrlBuilder(sanityClient);

function urlFor(source: { _id: string; url: string }) {
  return builder.image(source);
}

interface GalleryImage {
  _id: string;
  title: string;
  image: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  caption?: string;
  category: string;
  featured: boolean;
}

// Categories will be dynamically generated from CMS data

// Helper function to capitalize category names
const capitalizeCategory = (category: string) => {
  if (category === "All") return category;
  return category.charAt(0).toUpperCase() + category.slice(1);
};

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState<"masonry" | "dome">("masonry");
  // Removed selectedImage state as it's not used with the new Masonry component
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch images from Sanity
  useEffect(() => {
    async function fetchImages() {
      try {
        const images =
          await sanityClient.fetch<GalleryImage[]>(GALLERY_IMAGES_QUERY);
        console.log("Fetched gallery images:", images); // Debug log
        setGalleryImages(images);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  // Image click handling is now done by the Masonry component directly

  // Convert Sanity images to component format
  const allProcessedImages = galleryImages.map((img) => {
    const imageUrl = urlFor(img.image.asset).width(800).height(600).url();

    return {
      src: imageUrl,
      alt: img.image.alt || img.title,
      width: 400,
      height: 300,
      category: img.category,
      title: img.title,
      caption: img.caption,
    };
  });

  // Filter images based on selected category
  const processedImages =
    selectedCategory === "All"
      ? allProcessedImages
      : allProcessedImages.filter((img) => img.category === selectedCategory);

  // Transform images for Masonry component with varied dimensions
  const masonryItems = processedImages.map((img, index) => {
    // Create different aspect ratios for aesthetic variety (much larger sizes)
    const aspectRatios = [
      { width: 500, height: 330 }, // Landscape 3:2
      { width: 420, height: 590 }, // Portrait 5:7
      { width: 450, height: 450 }, // Square 1:1
      { width: 550, height: 310 }, // Wide landscape 16:9
      { width: 380, height: 630 }, // Tall portrait 3:5
      { width: 500, height: 400 }, // Landscape 5:4
    ];

    // Use a deterministic approach based on index to ensure consistency
    const ratio = aspectRatios[index % aspectRatios.length];

    return {
      id: `image-${index}`,
      img: img.src,
      url: img.src, // For now, clicking will open the image
      height: ratio.height,
    };
  });

  // Generate categories dynamically from CMS data
  const categories = Array.from(
    new Set(galleryImages.map((img) => img.category))
  ).filter(Boolean);

  // Filter dome gallery images based on category
  const filteredGalleryImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  // Transform images for 3D DomeGallery component (expects ImageItem[])
  const domeGalleryImages = filteredGalleryImages.map((img) => ({
    src: urlFor(img.image.asset).width(800).height(600).url(),
    alt: img.image.alt || img.title,
  }));

  // Debug: Log the data to see what's being passed
  console.log("Dome Gallery Images:", domeGalleryImages);
  console.log("Sample image URL:", domeGalleryImages[0]?.src);

  return (
    <main className="min-h-screen pt-16">
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Visual moments captured through my lens, organized in beautiful
            layouts.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="mb-8 flex items-center gap-4">
          <span className="text-sm text-muted-foreground">View:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("masonry")}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                viewMode === "masonry"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border hover:bg-primary hover:text-primary-foreground"
              }`}>
              Masonry
            </button>
            <button
              onClick={() => setViewMode("dome")}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                viewMode === "dome"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border hover:bg-primary hover:text-primary-foreground"
              }`}>
              Dome Gallery
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading gallery images...</p>
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-xl font-bold mb-2">No images yet</h3>
            <p className="text-muted-foreground mb-4">
              Upload some images through your Sanity Studio to see them here!
            </p>
            <AdminAccess>
              <button className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                🔒 Admin: Go to Studio →
              </button>
            </AdminAccess>
          </div>
        ) : (
          <>
            {viewMode === "masonry" ? (
              <div>
                {/* Category filters */}
                <div className="mb-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedCategory === "All"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border hover:bg-primary hover:text-primary-foreground"
                    }`}>
                    All ({allProcessedImages.length})
                  </button>
                  {categories.map((category) => {
                    const categoryCount = allProcessedImages.filter(
                      (img) => img.category === category
                    ).length;
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm transition-colors ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground"
                            : "bg-card border hover:bg-primary hover:text-primary-foreground"
                        }`}>
                        {capitalizeCategory(category)} ({categoryCount})
                      </button>
                    );
                  })}
                </div>

                {/* Masonry Grid */}
                {processedImages.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No images found in the &ldquo;
                      {capitalizeCategory(selectedCategory)}&rdquo; category.
                    </p>
                  </div>
                ) : (
                  <div
                    style={{ height: "1600px", minHeight: "1400px" }}
                    className="w-full">
                    <Masonry
                      items={masonryItems}
                      ease="power3.out"
                      duration={0.6}
                      stagger={0.05}
                      animateFrom="bottom"
                      scaleOnHover={true}
                      hoverScale={0.95}
                      blurToFocus={true}
                      colorShiftOnHover={false}
                    />
                  </div>
                )}
              </div>
            ) : domeGalleryImages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No images found in the &ldquo;
                  {capitalizeCategory(selectedCategory)}
                  &rdquo; category.
                </p>
              </div>
            ) : (
              <div
                style={{
                  height: "600px",
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}>
                <DomeGallery
                  images={
                    domeGalleryImages.length > 0 ? domeGalleryImages : undefined
                  }
                  fit={0.5}
                  grayscale={false}
                  segments={25}
                />
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

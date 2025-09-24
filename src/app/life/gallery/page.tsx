"use client";

import { useState, useEffect } from "react";
import { DomeGallery } from "@/components/reactbits";
import { sanityClient } from "@/lib/sanity/client";
import { GALLERY_IMAGES_QUERY } from "@/lib/sanity/queries";
import imageUrlBuilder from "@sanity/image-url";

// Initialize image URL builder
const builder = imageUrlBuilder(sanityClient);

function urlFor(source: any) {
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

interface ProcessedImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  category: string;
  title: string;
  caption?: string;
}

// Categories will be dynamically generated from CMS data

// Helper function to capitalize category names
const capitalizeCategory = (category: string) => {
  if (category === "All") return category;
  return category.charAt(0).toUpperCase() + category.slice(1);
};

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState<"masonry" | "dome">("masonry");
  const [selectedImage, setSelectedImage] = useState<ProcessedImage | null>(
    null
  );
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

  const handleImageClick = (image: ProcessedImage, index: number) => {
    setSelectedImage({ ...image, index });
  };

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

  // Generate categories dynamically from CMS data
  const categories = Array.from(
    new Set(galleryImages.map((img) => img.category))
  ).filter(Boolean);

  // Filter dome gallery images as well
  const allDomeGalleryImages = galleryImages.map((img) => ({
    id: img._id,
    src: urlFor(img.image.asset).width(1200).height(800).url(),
    alt: img.image.alt || img.title,
    title: img.title,
    description: img.caption || img.category,
    category: img.category,
  }));

  const domeGalleryImages =
    selectedCategory === "All"
      ? allDomeGalleryImages
      : allDomeGalleryImages.filter((img) => img.category === selectedCategory);

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
            <a
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Go to Studio →
            </a>
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

                {/* Simple Grid Fallback */}
                {processedImages.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No images found in the "
                      {capitalizeCategory(selectedCategory)}" category.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {processedImages.map((img, index) => (
                      <div
                        key={index}
                        className="group cursor-pointer overflow-hidden rounded-lg bg-card border hover:shadow-lg transition-all duration-300"
                        onClick={() => handleImageClick(img, index)}>
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        {img.title && (
                          <div className="p-4">
                            <h3 className="font-medium text-sm">{img.title}</h3>
                            {img.caption && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {img.caption}
                              </p>
                            )}
                            {img.category && (
                              <span className="inline-block mt-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                {img.category}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Original MasonryGrid (commented out for debugging) */}
                {/* <MasonryGrid
                  images={processedImages}
                  categories={categories}
                  onImageClick={handleImageClick}
                /> */}
              </div>
            ) : domeGalleryImages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No images found in the "{capitalizeCategory(selectedCategory)}
                  " category.
                </p>
              </div>
            ) : (
              <DomeGallery images={domeGalleryImages} />
            )}

            {/* Success message */}
            <div className="mt-12 p-6 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl text-center">
              <p className="text-green-700 dark:text-green-300 text-sm">
                ✅ Gallery is now connected to your CMS! Showing{" "}
                {galleryImages.length} image(s) from Sanity Studio.
              </p>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

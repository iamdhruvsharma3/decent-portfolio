"use client";

import { Grid } from "react-visual-grid";
import { useState } from "react";

interface MasonryGridProps {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
    category?: string;
  }>;
  categories?: string[];
  onImageClick?: (image: any, index: number) => void;
}

export function MasonryGrid({
  images,
  categories = [],
  onImageClick,
}: MasonryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const gridImages = filteredImages.map((img, index) => ({
    src: img.src,
    alt: img.alt,
    width: img.width || 400,
    height: img.height || 300,
    id: `image-${index}`,
    onClick: () => onImageClick?.(img, index),
  }));

  return (
    <div className="w-full">
      {/* Category filters */}
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedCategory === "All"
                ? "bg-primary text-primary-foreground"
                : "bg-card border hover:bg-primary hover:text-primary-foreground"
            }`}>
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border hover:bg-primary hover:text-primary-foreground"
              }`}>
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Masonry Grid */}
      <div className="w-full">
        <Grid
          images={gridImages}
          width="100%"
          height={600}
          gap={16}
          enableResize={true}
          showProgressBar={false}
          imageSizes={{
            "1X": { width: 200, height: 150 },
            "2X": { width: 300, height: 225 },
            "3X": { width: 400, height: 300 },
          }}
        />
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No images found in this category.
          </p>
        </div>
      )}
    </div>
  );
}

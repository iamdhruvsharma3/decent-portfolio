"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface DomeGalleryProps {
  images: {
    id: string;
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }[];
  className?: string;
}

export function DomeGallery({ images, className = "" }: DomeGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;

    if (direction === "prev") {
      setSelectedImage(
        selectedImage > 0 ? selectedImage - 1 : images.length - 1
      );
    } else {
      setSelectedImage(
        selectedImage < images.length - 1 ? selectedImage + 1 : 0
      );
    }
  };

  return (
    <>
      {/* Gallery Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square"
            onClick={() => openLightbox(index)}>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {image.title && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <h3 className="text-white font-medium text-sm">
                  {image.title}
                </h3>
              </div>
            )}

            {/* Dome effect overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}>
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10">
                <X size={24} />
              </button>

              {/* Navigation buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage("prev")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2 z-10">
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => navigateImage("next")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2 z-10">
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Image */}
              <div className="relative max-w-full max-h-full">
                <Image
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>

              {/* Image info */}
              {(images[selectedImage].title ||
                images[selectedImage].description) && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                  {images[selectedImage].title && (
                    <h3 className="text-lg font-medium mb-1">
                      {images[selectedImage].title}
                    </h3>
                  )}
                  {images[selectedImage].description && (
                    <p className="text-sm text-gray-300">
                      {images[selectedImage].description}
                    </p>
                  )}
                </div>
              )}

              {/* Image counter */}
              <div className="absolute top-4 left-4 text-white text-sm bg-black/50 rounded-full px-3 py-1">
                {selectedImage + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

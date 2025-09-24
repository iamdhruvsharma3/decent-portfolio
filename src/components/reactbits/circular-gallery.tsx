"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CircularGalleryProps {
  items: {
    id: string;
    image: string;
    title: string;
    subtitle?: string;
  }[];
  className?: string;
  onActiveChange?: (index: number) => void;
}

export function CircularGallery({
  items,
  className = "",
  onActiveChange,
}: CircularGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newIndex = (activeIndex + 1) % items.length;
    setActiveIndex(newIndex);
    onActiveChange?.(newIndex);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newIndex = (activeIndex - 1 + items.length) % items.length;
    setActiveIndex(newIndex);
    onActiveChange?.(newIndex);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleItemClick = (index: number) => {
    if (index === activeIndex || isAnimating) return;
    setActiveIndex(index);
    onActiveChange?.(index);
  };

  const getItemPosition = (index: number) => {
    const activeIdx = activeIndex;
    const totalItems = items.length;
    let relativeIndex = index - activeIdx;

    if (relativeIndex > totalItems / 2) {
      relativeIndex -= totalItems;
    } else if (relativeIndex < -totalItems / 2) {
      relativeIndex += totalItems;
    }

    const angle = (relativeIndex * 360) / totalItems;
    const radius = 120;
    const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
    const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

    return { x, y, angle };
  };

  return (
    <div
      className={`relative w-full h-96 flex items-center justify-center ${className}`}>
      {/* Central display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="text-center z-10">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary">
              <Image
                src={items[activeIndex]?.image}
                alt={items[activeIndex]?.title}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold">{items[activeIndex]?.title}</h3>
            {items[activeIndex]?.subtitle && (
              <p className="text-sm text-muted-foreground">
                {items[activeIndex]?.subtitle}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Circular items */}
      <div className="absolute inset-0 flex items-center justify-center">
        {items.map((item, index) => {
          const { x, y } = getItemPosition(index);
          const isActive = index === activeIndex;

          return (
            <motion.button
              key={item.id}
              className={`absolute w-12 h-12 rounded-full overflow-hidden transition-all duration-300 ${
                isActive ? "ring-2 ring-primary" : "opacity-60 hover:opacity-80"
              }`}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              onClick={() => handleItemClick(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}>
              <Image
                src={item.image}
                alt={item.title}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </motion.button>
          );
        })}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border hover:bg-accent transition-colors z-20">
        ←
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border hover:bg-accent transition-colors z-20">
        →
      </button>
    </div>
  );
}

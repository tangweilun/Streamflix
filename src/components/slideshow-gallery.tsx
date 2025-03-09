"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Plus, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedItem {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  genre: string[];
}

interface FeaturedSlideshowProps {
  items: FeaturedItem[];
  autoplaySpeed?: number;
  className?: string;
}

export function FeaturedSlideshow({
  items,
  autoplaySpeed = 5000,
  className,
}: FeaturedSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  }, [items.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    //resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  //handle autoplay
  useEffect(() => {
    if (!isAutoPlaying || isHovering || items.length <= 1) return;

    const interval = setInterval(nextSlide, autoplaySpeed);
    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlaying, isHovering, items.length, autoplaySpeed]);

  //pause autoplay when hovering
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  if (!items || items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex];

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Slideshow */}
      <div className="relative w-full h-[500px] md:h-[600px]">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <div className="absolute inset-0">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                priority={index === currentIndex}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-3">
                  {item.type === "series" ? (
                    <span className="bg-orange-500 text-white px-2 py-0.5 text-xs font-medium rounded">
                      TV SERIES
                    </span>
                  ) : (
                    <span className="bg-orange-500 text-white px-2 py-0.5 text-xs font-medium rounded">
                      MOVIE
                    </span>
                  )}
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  {item.title}
                </h2>

                {item.genre && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.genre.map((g) => (
                      <span
                        key={g}
                        className="bg-gray-800 text-gray-300 px-2 py-0.5 text-xs rounded"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-gray-300 mb-6 line-clamp-3 md:line-clamp-none">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Play className="mr-2 h-4 w-4" />
                    Play Now
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-gray-800"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add to My List
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-gray-800"
                  >
                    <Info className="mr-2 h-4 w-4" />
                    More Info
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                index === currentIndex
                  ? "bg-orange-500 w-8"
                  : "bg-gray-400/50 hover:bg-gray-300/70"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

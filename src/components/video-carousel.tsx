"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react";

type Video = {
  id: string | number;
  title: string;
  image: string;
};

type VideoCarouselProps = {
  title: string;
  videos?: Video[];
};

export function VideoCarousel({ title, videos = [] }: VideoCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);

  if (!videos || videos.length === 0) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-semibold mb-4 px-8 text-orange-500">
          {title}
        </h2>
        <div className="px-8">
          <p className="text-gray-400">No videos available</p>
        </div>
      </section>
    );
  }

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevSlide = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
  };

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-4 px-8 text-orange-500">
        {title}
      </h2>
      <div className="relative">
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-75 transition-colors"
        >
          <ChevronLeft />
        </button>
        <div className="flex overflow-x-hidden px-8">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="flex-shrink-0 w-1/4 px-2 transition-transform duration-300 ease-in-out transform hover:scale-105"
              style={{ transform: `translateX(-${startIndex * 100}%)` }}
            >
              <div className="relative group">
                <div className="w-full h-[200px] relative">
                  <Image
                    src={video.image || "/placeholder.svg"}
                    alt={video.title}
                    fill={true}
                    style={{ objectFit: "cover" }}
                    className="rounded-md"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Link
                    href={`/watch/${video.id}`}
                    className="text-white hover:text-orange-500 transition-colors mr-4"
                  >
                    <Play />
                  </Link>
                  <button className="text-white hover:text-orange-500 transition-colors">
                    <Plus />
                  </button>
                </div>
              </div>
              <h3 className="mt-2 text-sm font-medium text-white group-hover:text-orange-500 transition-colors">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-75 transition-colors"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}

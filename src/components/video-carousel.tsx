"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Video {
  id: string;
  title: string;
  image: string;
}

interface VideoCarouselProps {
  title: string;
  videos: Video[];
}

export function VideoCarousel({ title, videos }: VideoCarouselProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {videos.map((video) => (
            <CarouselItem
              key={video.id}
              className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="relative">
                <Image
                  src={video.image}
                  alt={video.title}
                  className="w-full h-[200px] object-cover rounded-lg"
                  width={400}
                  height={200}
                />
                <h3 className="mt-2 text-lg">{video.title}</h3>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

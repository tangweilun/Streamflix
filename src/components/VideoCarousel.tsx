"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react"

type Video = {
  id: number
  title: string
  thumbnail: string
}

type VideoCarouselProps = {
  title: string
  videos: Video[]
}

export default function VideoCarousel({ title, videos }: VideoCarouselProps) {
  const visibleCount = 4 // Show 4 videos at a time
  const [startIndex, setStartIndex] = useState(0)

  const nextSlide = () => {
    if (startIndex + visibleCount < videos.length) {
      setStartIndex(startIndex + visibleCount)
    }
  }

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - visibleCount)
    }
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-4 px-8 text-orange-500">{title}</h2>
      <div className="relative">
        <button
          onClick={prevSlide}
          disabled={startIndex === 0}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-75 transition-colors ${startIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <ChevronLeft />
        </button>

        <div className="overflow-hidden px-8">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${startIndex * (100 / visibleCount)}%)` }}
          >
            {videos.map((video) => (
              <div key={video.id} className="w-1/4 flex-shrink-0 px-2">
                <div className="relative group">
                  <div className="w-full h-[200px] bg-gray-700 flex items-center justify-center rounded-md">
                    {video.thumbnail ? (
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        width={350}
                        height={200}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Link href={`/watch/${video.id}`} className="text-white hover:text-orange-500 transition-colors mr-4">
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
        </div>

        <button
          onClick={nextSlide}
          disabled={startIndex + visibleCount >= videos.length}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-75 transition-colors ${startIndex + visibleCount >= videos.length ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  )
}

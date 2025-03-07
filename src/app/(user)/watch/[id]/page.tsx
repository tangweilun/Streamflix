import Link from "next/link";
import Image from "next/image";
import { Play, Plus, ThumbsUp, Share2 } from "lucide-react";
import Navbar from "../../../components/navbar/video-navbar";

export default function WatchPage() {
  // Fake video data
  const video = {
    title: "Sample Video",
    src: "/samplevideo/samplevideo.mp4",
    thumbnail: "/samplevideos/underrated.jpg",
    description: "This is a sample description for the video.",
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    director: "John Doe",
    duration: "10m",
    year: 2024,
    rating: "PG",
  };

  // Fake related videos
  const relatedVideos = [
    { id: 1, title: "Sample Video 1", thumbnail: "/placeholder.svg?height=200&width=350" },
    { id: 2, title: "Sample Video 2", thumbnail: "/placeholder.svg?height=200&width=350" },
    { id: 3, title: "Sample Video 3", thumbnail: "/placeholder.svg?height=200&width=350" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-16">
        <div className="aspect-video w-full">
          <video src={video.src} poster={video.thumbnail} controls className="w-full h-full">
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-4 text-orange-500">{video.title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span>{video.year}</span>
            <span>{video.duration}</span>
            <span>{video.rating}</span>
          </div>
          <p className="text-gray-300 mb-6">{video.description}</p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-orange-400">Cast</h2>
            <p>{video.cast.join(", ")}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-orange-400">Director</h2>
            <p>{video.director}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-4">
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-600 hover:bg-orange-500">
              <Play />
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700">
              <Plus />
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700">
              <ThumbsUp />
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700">
              <Share2 />
            </button>
          </div>

          {/* Related Videos */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-orange-500">More Like This</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedVideos.map((relatedVideo) => (
                <Link key={relatedVideo.id} href="#" className="group">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={relatedVideo.thumbnail}
                      alt={relatedVideo.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-white group-hover:text-orange-500">
                    {relatedVideo.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

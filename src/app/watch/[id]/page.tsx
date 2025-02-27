import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Play, Plus, ThumbsUp, Share2 } from "lucide-react"
import Navbar from "../../../components/navbar/video-navbar"

// This would typically come from an API or database
const videos = [
  {
    id: 1,
    title: "Big Buck Bunny",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "/placeholder.svg?height=400&width=700",
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.",
    cast: ["Bunny", "Squirrel", "Rodents"],
    director: "Sacha Goedegebure",
    duration: "10m",
    year: 2008,
    rating: "PG",
  },
  // Add more videos as needed
]

const relatedVideos = [
  { id: 2, title: "Elephant Dream", thumbnail: "/placeholder.svg?height=200&width=350" },
  { id: 3, title: "Sintel", thumbnail: "/placeholder.svg?height=200&width=350" },
  { id: 4, title: "Tears of Steel", thumbnail: "/placeholder.svg?height=200&width=350" },
]

export default function WatchPage({ params }: { params: { id: string } }) {
  const video = videos.find((v) => v.id === Number.parseInt(params.id))

  if (!video) {
    notFound()
  }

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
          <div className="flex justify-between items-start">
            <div className="max-w-2xl">
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
            </div>
            <div className="flex space-x-4">
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-600 text-black hover:bg-orange-500 transition-colors">
                <Play />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors">
                <Plus />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors">
                <ThumbsUp />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors">
                <Share2 />
              </button>
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-orange-500">More Like This</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedVideos.map((relatedVideo) => (
                <Link href={`/watch/${relatedVideo.id}`} key={relatedVideo.id} className="group">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={relatedVideo.thumbnail || "/placeholder.svg"}
                      alt={relatedVideo.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-white group-hover:text-orange-500 transition-colors">
                    {relatedVideo.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


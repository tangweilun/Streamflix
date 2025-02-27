import Image from "next/image"
import Link from "next/link"
import { PlayCircle, Info } from "lucide-react"
import Navbar from "@/components/navbar/video-navbar"
import VideoCarousel from "@/components/VideoCarousel"

// This would typically come from an API or database
const featuredVideo = {
  id: 1,
  title: "勇士王朝",
  description:
    "A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.",
  thumbnail: "/placeholder.svg?height=1080&width=1920",
}

const categories = [
  {
    name: "Trending Now",
    videos: [
      { id: 1, title: "Big Buck Bunny", thumbnail: "/placeholder.svg?height=200&width=350" },
      { id: 2, title: "Elephant Dream", thumbnail: "/placeholder.svg?height=200&width=350" },
      { id: 3, title: "Sintel", thumbnail: "/placeholder.svg?height=200&width=350" },
      // Add more videos as needed
    ],
  },
  {
    name: "New Releases",
    videos: [
      { id: 4, title: "Tears of Steel", thumbnail: "/placeholder.svg?height=200&width=350" },
      { id: 5, title: "Cosmos Laundromat", thumbnail: "/placeholder.svg?height=200&width=350" },
      { id: 6, title: "Caminandes", thumbnail: "/placeholder.svg?height=200&width=350" },
      // Add more videos as needed
    ],
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
      <section className="relative h-[80vh]">
        <div className="relative w-full h-full bg-gray-700 flex items-center justify-center">
            <Image
            src={featuredVideo.thumbnail || ""}
            alt={featuredVideo.title}
            fill
            className="object-cover"
            />
            {!featuredVideo.thumbnail && <span className="absolute text-gray-400">No Image</span>}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 space-y-4">
            <h1 className="text-5xl font-bold">{featuredVideo.title}</h1>
            <p className="text-lg max-w-2xl">{featuredVideo.description}</p>
            <div className="space-x-4">
            <Link
                href={`/watch/${featuredVideo.id}`}
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-black rounded-md hover:bg-orange-500 transition-colors"
            >
                <PlayCircle className="mr-2" />
                Play
            </Link>
            <button className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">
                <Info className="mr-2" />
                More Info
            </button>
            </div>
        </div>
        </section>
        {categories.map((category) => (
          <VideoCarousel key={category.name} title={category.name} videos={category.videos} />
        ))}
      </main>
    </div>
  )
}


import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import Image from 'next/image';
//import { VideoCarousel } from "@/components/video-carousel";

// Mock data for featured content and categories
const featuredContent = {
  title: 'Stranger Things',
  description:
    'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
  image: '/placeholder.svg?height=600&width=1200',
};

// const trendingVideos = [
//   {
//     id: "1",
//     title: "Big Buck Bunny",
//     image: "/placeholder.svg?height=200&width=350",
//   },
//   {
//     id: "2",
//     title: "Elephant Dream",
//     image: "/placeholder.svg?height=200&width=350",
//   },
//   {
//     id: "3",
//     title: "Sintel",
//     image: "/placeholder.svg?height=200&width=350",
//   },
//   {
//     id: "4",
//     title: "Tears of Steel",
//     image: "/placeholder.svg?height=200&width=350",
//   },
//   {
//     id: "5",
//     title: "The Daily Life",
//     image: "/placeholder.svg?height=200&width=350",
//   },
// ];

// const popularVideos = [
//   {
//     id: "6",
//     title: "The Crown",
//     image: "/placeholder.svg?height=200&width=350",
//   },
//   {
//     id: "7",
//     title: "Bridgerton",
//     image: "/placeholder.svg?height=200&width=350",
//   },
//   {
//     id: "8",
//     title: "Money Heist",
//     image: "/placeholder.svg?height=200&width=350",
//   },
//   {
//     id: "9",
//     title: "The Witcher",
//     image: "/placeholder.svg?height=200&width=350",
//   },
//   {
//     id: "10",
//     title: "Wednesday",
//     image: "/placeholder.svg?height=200&width=350",
//   },
// ];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="relative mb-8">
        <Image
          src={featuredContent.image || '/placeholder.svg'}
          alt={featuredContent.title}
          fill={true}
          className="w-full h-[600px] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
          <h1 className="text-4xl font-bold mb-2">{featuredContent.title}</h1>
          <p className="text-lg mb-4 max-w-2xl">
            {featuredContent.description}
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <PlayCircle className="mr-2 h-5 w-5" />
            Play Now
          </Button>
        </div>
      </div>

      {/* <div className="container mx-auto px-4 space-y-8">
        <VideoCarousel title="Trending Now" videos={trendingVideos} />
        <VideoCarousel title="Popular on StreamFlix" videos={popularVideos} />
      </div> */}
    </div>
  );
}

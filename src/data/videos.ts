export interface Video {
  id: number
  title: string
  description: string
  src: string
  thumbnail: string
  year: number
  duration: string
  rating: string
  cast: string[]
  director: string
}

export const videos: Video[] = [
  {
    id: 1,
    title: "The Great Adventure",
    description: "An epic journey through uncharted territories, where a group of explorers discover more than they bargained for.",
    src: "/videos/sample1.mp4",
    thumbnail: "/thumbnails/great-adventure.jpg",
    year: 2023,
    duration: "2h 15min",
    rating: "PG-13",
    cast: ["John Smith", "Emma Watson", "Michael Brown"],
    director: "Christopher Wilson"
  },
  {
    id: 2,
    title: "City Lights",
    description: "A modern romance set against the backdrop of a bustling metropolis.",
    src: "/videos/sample2.mp4",
    thumbnail: "/thumbnails/city-lights.jpg",
    year: 2023,
    duration: "1h 55min",
    rating: "PG",
    cast: ["Sarah Parker", "James Wilson", "Lisa Rodriguez"],
    director: "David Miller"
  }
]

// Helper function to get related videos (excluding the current video)
export const getRelatedVideos = (currentVideoId: number): Video[] => {
  return videos.filter(video => video.id !== currentVideoId)
} 
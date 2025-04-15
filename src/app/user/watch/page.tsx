"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { VideoCarousel } from "@/components/video-carousel";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

type Show = {
  id: string;
  title: string;
  thumbnail: string;
  episodeCount: number;
  seasons: number;
  lastUpdated: string;
};

type Video = {
  id: string;
  title: string;
  image: string;
};

export default function HomePage() {
  const router = useRouter(); // Initialize router
  const [trendingVideos, setTrendingVideos] = useState<Video[]>([]);
  const [popularVideos, setPopularVideos] = useState<Video[]>([]);
  const [featuredVideo, setFeaturedVideo] = useState<Show | null>(null);
  const defaultShow: Show = {
    id: "default",
    title: "Underrated",
    thumbnail: "/samplevideo/underrated.jpg",
    episodeCount: 0,
    seasons: 0,
    lastUpdated: "",
  };
  
  const fallbackTrendingVideos: Video[] = [
    {
      id: "trending1",
      title: "Spider Man",
      image: "/samplevideo/spiderman.jpeg",
    },
    {
      id: "trending2",
      title: "Stranger Things",
      image: "/samplevideo/strangerthings.jpeg",
    },
    {
      id: "trending3",
      title: "Avengers - EndGame",
      image: "/samplevideo/avengers.jpg",
    },
  ];
  
  const fallbackPopularVideos: Video[] = [
    {
      id: "popular1",
      title: "Batman",
      image: "/samplevideo/badman.jpeg",
    },
    {
      id: "popular2",
      title: "Prison Break",
      image: "/samplevideo/yueyu.jpeg",
    },
    {
      id: "popular3",
      title: "Python",
      image: "/samplevideo/python.jpg",
    }  
  ];
  
  const fetchShows = async (): Promise<Show[]> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/files/list-shows?bucketName=streamflixtest`
    );
    if (!res.ok) throw new Error("Failed to fetch shows");
    return res.json();
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: fetchShows,
    onSuccess: (data: Show[]) => {
      if (data.length > 0) {
        setFeaturedVideo(data[0]);
        const videos: Video[] = data.map((show) => ({
          id: show.id,
          title: show.title,
          image: show.thumbnail || "/placeholder.svg",
        }));
        setTrendingVideos(videos.slice(1, 4));
        setPopularVideos(videos.slice(4, 9));
      } else {
        setFeaturedVideo(defaultShow);
        setTrendingVideos(fallbackTrendingVideos);
        setPopularVideos(fallbackPopularVideos);
      }
    },    
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  const handleCardClick = (id: string, title: string) => {
    if (id.startsWith("default") || id.startsWith("trending") || id.startsWith("popular")) return;
    router.push(`/user/watch/${id}?title=${encodeURIComponent(title)}`);
  };
  

  if (isPending || !featuredVideo) {
    return(
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-white text-lg">Loading...</span>
      </div>
    );
  }
  if (error) return <div className="text-red-500 p-8">Error loading shows</div>;

  return (
    <div className="min-h-screen bg-black">
      <div className="relative mb-8">
        <div className="w-full h-[600px] relative">
          <Image
            src={featuredVideo.thumbnail || "/placeholder.svg"}
            alt={featuredVideo.title}
            fill={true}
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
          <h1 className="text-4xl font-bold mb-2">{featuredVideo.title}</h1>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => handleCardClick(featuredVideo.id, featuredVideo.title)} // Use handleCardClick
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            Play Now
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 space-y-8">
        <VideoCarousel title="Trending Now" videos={trendingVideos} />
        <VideoCarousel title="Popular on StreamFlix" videos={popularVideos} />
      </div>
    </div>
  );
}

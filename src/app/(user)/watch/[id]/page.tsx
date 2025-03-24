"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, Plus } from "lucide-react";
import Image from "next/image";

const video = {
  id: "1",
  title: "UNDERRATED",
  description:
    "The remarkable coming-of-age story of Stephen Curry-one of the most influential, dynamic, and unexpected players in basketball history-and his rise from an undersized collage player to a four-time NBA CHAMPION.",
  src: "/samplevideo/samplevideo.mp4",
  thumbnail: "/samplevideo/underrated.jpg",
};

const relatedVideos = [
  {
    id: "456",
    title: "Stranger Things - Chapter Two: The Weirdo on Maple Street",
    thumbnail: "/placeholder.svg",
    episode: "S1:E2",
  },
  {
    id: "789",
    title: "Stranger Things - Chapter Three: Holly, Jolly",
    thumbnail: "/placeholder.svg",
    episode: "S1:E3",
  },
  {
    id: "101",
    title: "Stranger Things - Chapter Four: The Body",
    thumbnail: "/placeholder.svg",
    episode: "S1:E4",
  },
];

export default function VideoPage() {
  const [isLiked, setIsLiked] = useState(false);
  const [inMyList, setInMyList] = useState(false);

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <video
            src={video.src}
            poster={video.thumbnail}
            controls
            className="w-full"
          >
            Your browser does not support the video tag.
          </video>
          <h1 className="text-2xl font-bold text-white">{video.title}</h1>
          <div className="flex items-center space-x-4">
            <Button
              size="default"
              onClick={() => setIsLiked(!isLiked)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              {isLiked ? "Liked" : "Like"}
            </Button>
            <Button
              size="default"
              onClick={() => setInMyList(!inMyList)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              {inMyList ? "In My List" : "Add to My List"}
            </Button>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-white">{video.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Next Episodes</h2>
          {relatedVideos.map((video) => (
            <Card key={video.id} className="bg-gray-800">
              <CardContent className="p-4 flex space-x-4">
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  height={100}
                  width={100}
                  className="w-40 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="text-white font-semibold">{video.title}</h3>
                  <p className="text-sm text-gray-400">{video.episode}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { VideoPlayer } from "@/components/video-player";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, Plus, Flag } from "lucide-react";
import Image from "next/image";

const videoData = {
  id: "1",
  title: "UNDERRATED",
  description:
    "The remarkable coming-of-age story of Stephen Curry-one of the most influential, dynamic, and unexpected players in basketball history-and his rise from an undersized collage player to a four-time NBA CHAMPION.",
  src: "/samplevideo/samplevideo.mp4",
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
  useEffect(() => {
    const originalStyle = document.body.style.overflow;

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const [isLiked, setIsLiked] = useState(false);
  const [inMyList, setInMyList] = useState(false);

  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <VideoPlayer src={videoData.src} />
          <h1 className="text-2xl font-bold text-white">{videoData.title}</h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "bg-orange-500 text-white" : ""}
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              {isLiked ? "Liked" : "Like"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInMyList(!inMyList)}
              className={inMyList ? "bg-orange-500 text-white" : ""}
            >
              <Plus className="w-4 h-4 mr-2" />
              {inMyList ? "In My List" : "Add to My List"}
            </Button>
            <Button variant="outline" size="sm">
              <Flag className="w-4 h-4 mr-2" />
              Report
            </Button>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-white">{videoData.description}</p>
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
                  fill={true}
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

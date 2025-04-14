"use client";

import { useState, useEffect, useRef } from "react";
import { VideoPlayer } from "@/components/video-player";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Plus, Flag } from "lucide-react";
import { getUserId } from "@/lib/action";
import { useMutation, useQuery } from "@tanstack/react-query";
import router from "next/router";

const video = {
  id: "1",
  title: "UNDERRATED",
  description:
    "The remarkable coming-of-age story of Stephen Curry-one of the most influential, dynamic, and unexpected players in basketball history-and his rise from an undersized college player to a four-time NBA CHAMPION.",
  src: "/samplevideo/samplevideo.mp4",
  thumbnail: "/samplevideo/underrated.jpg",
};

export default function VideoPage() {
  // Add this effect to lock scrolling when watching videos
  useEffect(() => {
    // We're not locking scrolling anymore to allow users to scroll the page
    // If you want to prevent background scrolling but allow content scrolling,
    // you could use a different approach with a scrollable container
  }, []);

  const [isLiked, setIsLiked] = useState(false);
  const [inMyList, setInMyList] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const currentTimeRef = useRef(0); // Store video progress to avoid triggering re-renders

  const sendProgressUpdate = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/watch/update-progress`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            userId: await getUserId(),
            videoId: parseInt("1"),
            currentPosition: currentTimeRef.current,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update watch progress.");

      return response.text();
    },

    onError: (error) => console.error("Error updating progress:", error),
    onSuccess: (data) => console.log("Progress update sent:", data),
  });

  const captureProgress = () => {
    if (videoRef.current) {
      currentTimeRef.current = Math.floor(videoRef.current.currentTime);
      sendProgressUpdate.mutate();
    }
  };

  const fetchProgress = async (): Promise<number> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/watch/get-progress`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: await getUserId(),
          videoId: parseInt("1"),
        }),
      }
    );

    if (!response.ok) throw new Error("Failed to fetch progress.");

    const data = await response.json();

    return data.currentPosition || 0;
  };

  const { data: previousProgress, isLoading } = useQuery({
    queryKey: ["video-progress", video.id],
    queryFn: fetchProgress,
    staleTime: Infinity,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || isLoading || previousProgress === undefined) return;

    const handleLoadedMetadata = () => {
      if (previousProgress > 0) {
        video.currentTime = previousProgress;
      }
    };

    // Call immediately if already loaded
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    const handlePause = () => captureProgress();
    const handleEnded = () => captureProgress();
    const handleBeforeUnload = () => sendProgressUpdate.mutate();
    const handleRouteChange = () => sendProgressUpdate.mutate();

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    window.addEventListener("beforeunload", handleBeforeUnload);
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [previousProgress, isLoading]);

  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen overflow-y-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <video
            ref={videoRef}
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
            <p className="text-white">{video.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

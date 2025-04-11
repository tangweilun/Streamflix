"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { getUserId } from "@/lib/action";
import router from "next/router";

interface Show {
  id: string;
  title: string;
  thumbnail: string;
  episodeCount: number;
  seasons: number;
  lastUpdated: string;
}

interface Episode {
  episode: string;
  url: string;
}

interface Actor {
  name: string;
}

interface VideoDetails {
  title: string;
  description: string;
  thumbnail: string;
  actors: Actor[];
}

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { id } = useParams();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "Unknown Show";

  const [shows, setShows] = useState<Show[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);

  const updateInterval = 30000;
  const currentTime = useRef(0); // Store video progress to avoid triggering re-renders
  const updateTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch the list of shows
  useEffect(() => {
    async function fetchShows() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/files/list-shows?bucketName=streamflixtest`
        );
        if (!response.ok) throw new Error("Failed to fetch shows");
        const data = await response.json();
        setShows(data);
      } catch {
        setError("Failed to load shows. Please try again.");
        console.error("Failed to load shows:");
      } finally {
        setLoading(false);
      }
    }
    fetchShows();
  }, []);

  const show = shows.find((s) => s.title === title);

  // Fetch video details
  useEffect(() => {
    async function fetchVideoDetails() {
      if (!title) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/videos/title/${encodeURIComponent(
            title
          )}`
        );
        if (!response.ok) throw new Error("Failed to fetch video details");
        const data = await response.json();
        setVideoDetails(data);
      } catch {
        setError("Failed to load video details. Please try again.");
      }
    }
    fetchVideoDetails();
  }, [title]);

  // Fetch episodes
  useEffect(() => {
    async function fetchEpisodes() {
      if (!show) return;
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/files/watch?showName=${encodeURIComponent(show.title)}`
        );
        if (!res.ok) throw new Error("Failed to fetch episodes");
        const data = await res.json();
        setEpisodes(Array.isArray(data.episodes) ? data.episodes : []);
      } catch {}
    }
    fetchEpisodes();
  }, [show]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error && !episodes.length)
    return <div className="text-red-500">{error}</div>;
  if (!show) return <div className="text-white">Show not found</div>;

  const video = {
    id: id as string,
    title,
    description: videoDetails?.description || "No description available.",
    thumbnail: show.thumbnail || "/default-thumbnail.jpg",
  };

  const handleEpisodeSelect = (episodeUrl: string) => {
    setVideoUrl(episodeUrl);
  };

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
            videoId: parseInt(video.id),
            currentPosition: Math.floor(currentTime.current),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update watch progress.");
      }

      return response.text();
    },

    onSuccess: (data) => {
      console.log("Progress update sent:", data);
    },

    onError: (error) => {
      console.error("Error updating progress:", error);
    },
  });

  const updateCurrentTime = () => {
    if (videoRef.current) {
      currentTime.current = Math.floor(videoRef.current.currentTime);
    }
  };

  const startProgressBatching = () => {
    if (!updateTimerRef.current) {
      updateTimerRef.current = setInterval(() => {
        sendProgressUpdate.mutate();
      }, updateInterval);
    }
  };

  const stopProgressBatching = () => {
    alert("Stop");
    if (updateTimerRef.current) {
      clearInterval(updateTimerRef.current);
      updateTimerRef.current = null;
      sendProgressUpdate.mutate();
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.addEventListener("timeupdate", updateCurrentTime);
    video.addEventListener("play", startProgressBatching);
    video.addEventListener("pause", stopProgressBatching);
    video.addEventListener("ended", stopProgressBatching);

    const handleBeforeUnload = () => sendProgressUpdate.mutate();
    const handleRouteChange = () => sendProgressUpdate.mutate();

    window.addEventListener("beforeunload", handleBeforeUnload);
    router.events.on("routeChangeStart", handleRouteChange); // Trigger update on page navigation

    return () => {
      video.removeEventListener("timeupdate", updateCurrentTime);
      video.removeEventListener("play", startProgressBatching);
      video.removeEventListener("pause", stopProgressBatching);
      video.removeEventListener("ended", stopProgressBatching);

      stopProgressBatching();
    };
  }, []);

  return (
    <div className="container mx-auto p-8 min-h-screen flex justify-center items-center">
      <div className="space-y-4 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-white">{video.title}</h1>
        <div className="relative w-full">
          {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              poster={video.thumbnail}
              style={{ objectFit: "cover" }}
              controls
              className="absolute top-0 left-0 w-full h-full"
              key={videoUrl}
            >
              {/* <source src={videoUrl} type="video/mp4" /> */}
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
              priority
            />
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-bold text-white">Episodes</h3>
          {episodes.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 mt-2 sm:grid-cols-3 md:grid-cols-4">
              {episodes.map((episode) => (
                <button
                  key={episode.episode}
                  onClick={() => handleEpisodeSelect(episode.url)}
                  className="text-sm bg-orange-500 rounded hover:bg-orange-600 text-white truncate"
                  title={`Play ${episode.episode}`}
                  aria-label={`Play ${episode.episode}`}
                >
                  {episode.episode}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 mt-2">
              Episodes will be available soon. Stay tuned!
            </p>
          )}
        </div>

        {/* Description */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-white">{video.description}</p>
        </div>

        {/* Actors */}
        <div className="mt-4">
          <h3 className="text-xl font-bold text-white">Actors</h3>
          {videoDetails?.actors.length ? (
            <ul className="list-disc pl-6 text-white">
              {videoDetails.actors.map((actor, index) => (
                <li key={index} className="text-sm">
                  {actor.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 mt-2">No actors listed.</p>
          )}
        </div>

        {/* Metadata and Like/Save Buttons */}
        <div className="flex items-center space-x-4 mt-4">
          <Button
            onClick={() => setIsLiked(!isLiked)}
            className="bg-orange-500 hover:bg-orange-600"
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            {isLiked ? "Liked" : "Like"}
          </Button>
          <Button
            onClick={() => setInMyList(!inMyList)}
            className="bg-orange-500 hover:bg-orange-600"
            aria-label={inMyList ? "Remove from List" : "Add to List"}
          >
            <Plus className="w-4 h-4 mr-2" />
            {inMyList ? "In List" : "Add to List"}
          </Button>
        </div>
      </div>
    </div>
  );
}

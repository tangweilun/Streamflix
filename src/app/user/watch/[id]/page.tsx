"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

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
  const [error, setError] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);

  // Fetch Shows
  const fetchShowsMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/files/list-shows?bucketName=streamflixtest`
      );
      if (!res.ok) throw new Error("Failed to fetch shows");
      return res.json();
    },
    onSuccess: (data) => {
      setShows(data);
    },
    onError: () => {
      setError("Failed to load shows. Please try again.");
    },
  });

  const show = shows.find((s) => s.title === title);

  // Fetch Video Details
  const fetchVideoDetailsMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/videos/title/${encodeURIComponent(title)}`
      );
      if (!res.ok) throw new Error("Failed to fetch video details");
      return res.json();
    },
    onSuccess: (data) => {
      setVideoDetails(data);
    },
    onError: () => {
      setError("Failed to load video details. Please try again.");
    },
  });

  // Fetch Episodes
  const fetchEpisodesMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/files/watch?showName=${encodeURIComponent(title)}`
      );
      if (!res.ok) throw new Error("Failed to fetch episodes");
      return res.json();
    },
    onSuccess: (data) => {
      setEpisodes(Array.isArray(data.episodes) ? data.episodes : []);
    },
    onError: () => {
      // Optional: handle episode fetch errors
    },
  });

  // Call all mutations on mount
  useEffect(() => {
    fetchShowsMutation.mutate();
  }, []);

  useEffect(() => {
    if (title) fetchVideoDetailsMutation.mutate();
  }, [title]);

  useEffect(() => {
    if (show) fetchEpisodesMutation.mutate();
  }, [show]);

  if (fetchShowsMutation.isPending) return <div className="text-white">Loading...</div>;
  if (error && !episodes.length) return <div className="text-red-500">{error}</div>;
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

  return (
    <div className="container mx-auto p-8 min-h-screen flex justify-center items-center">
      <div className="space-y-4 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-white">{video.title}</h1>

        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          {videoUrl ? (
            <video
              ref={videoRef}
              controls
              className="absolute top-0 left-0 w-full h-full"
              key={videoUrl}
            >
              <source src={videoUrl} type="video/mp4" />
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

        {/* Episodes */}
        <div className="mt-4">
          <h3 className="text-xl font-bold text-white">Episodes</h3>
          {episodes.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 mt-2 sm:grid-cols-3 md:grid-cols-4">
              {episodes.map((episode) => (
                <button
                  key={episode.episode}
                  onClick={() => handleEpisodeSelect(episode.url)}
                  className="p-2 text-sm bg-orange-500 rounded hover:bg-orange-600 text-white truncate"
                  title={`Play ${episode.episode}`}
                  aria-label={`Play ${episode.episode}`}
                >
                  {episode.episode}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 mt-2">Episodes will be available soon. Stay tuned!</p>
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
                <li key={index} className="text-sm">{actor.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 mt-2">No actors listed.</p>
          )}
        </div>

        {/* Like / Add Buttons */}
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

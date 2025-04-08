"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";
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

export default function VideoPage() {
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

  // Fetch the list of shows
  useEffect(() => {
    async function fetchShows() {
      try {
        const response = await fetch(
          "https://localhost:7230/api/files/list-shows?bucketName=streamflixtest"
        );
        if (!response.ok) throw new Error("Failed to fetch shows");
        const data = await response.json();
        setShows(data);
      } catch (err) {
        setError("Failed to load shows. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchShows();
  }, []);

  // Find the show matching the title
  const show = shows.find((s) => s.title === title);

  // Fetch episodes only when "show" is defined.
  useEffect(() => {
    async function fetchEpisodes() {
      if (!show) return; // Guard: do nothing if show is undefined
      try {
        const res = await fetch(
          `https://localhost:7230/api/files/watch?showName=${encodeURIComponent(
            show.title
          )}`
        );
        if (!res.ok) throw new Error("Failed to fetch episodes");
        const data = await res.json();
        setEpisodes(data.episodes || []);
      } catch (err) {
        setError("Failed to load episodes. Please try again.");
      }
    }
    fetchEpisodes();
  }, [show]);

  // Always render the hooks, but conditionally return early if we don't have valid data.
  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!show) return <div className="text-white">Show not found</div>;

  // At this point, "show" is defined for sure.
  const video = {
    id: id as string,
    title,
    description: "The remarkable coming-of-age story of Stephen Curry...",
    thumbnail: show.thumbnail || "/placeholder.svg",
  };

  const handleEpisodeSelect = (episodeUrl: string) => {
    setVideoUrl(episodeUrl);
  };

  return (
    <div className="container mx-auto p-8 min-h-screen flex justify-center items-center">
      <div className="space-y-4 w-full max-w-4xl">
        {/* Video Player Section */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          {videoUrl ? (
            <video
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
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          )}
        </div>

        {/* Episodes List */}
        <div className="mt-4">
          <h3 className="text-xl font-bold text-white">Episodes</h3>
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
        </div>

        {/* Show Metadata */}
        <h1 className="text-2xl font-bold text-white mt-4">{video.title}</h1>
        <div className="flex items-center space-x-4">
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

        {/* Description */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-white">{video.description}</p>
        </div>
      </div>
    </div>
  );
}

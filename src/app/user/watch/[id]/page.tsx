"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Plus, Heart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserId } from "@/lib/action";

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
  const [isFavorite, setIsFavorite] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  // Fetch user ID on component mount
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserId();
        if (id) {
          setUserId(parseInt(id, 10));
        } else {
          console.error("Failed to get user ID");
          toast.error("Authentication error. Please sign in again.");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // Fetch Shows
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const fetchShowsMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/files/list-shows?bucketName=${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}`
        );
        if (!res.ok) throw new Error("Failed to fetch shows");
        return res.json();
      } catch (error) {
        console.error("Error fetching shows:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      setShows(data);
    },
    onError: () => {
      setError("Failed to load shows. Please try again.");
    },
  });
=======
=======
>>>>>>> Stashed changes
  // const fetchShowsMutation = useMutation({
  //   mutationFn: async () => {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/files/list-shows?bucketName=streamflixtest`
  //     );
  //     if (!response.ok) throw new Error("Failed to fetch shows");
  //     return response.json();
  //   },
  //   onSuccess: (data) => {
  //     setShows(data);
  //   },
  //   onError: () => {
  //     setError("Failed to load shows. Please try again.");
  //   },
  // });

  const fetchShows = async (): Promise<Show> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/files/list-shows?bucketName=streamflixtest`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users.");
    }

    alert(response.json());

    return response.json();
  };
<<<<<<< Updated upstream
>>>>>>> Stashed changes

  const fetchShows = async (): Promise<Show> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/files/list-shows?bucketName=${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users.");
    }

    alert(response.json());

    return response.json();
  };
=======
>>>>>>> Stashed changes

  const show = shows.find((s) => s.title === title);

  // Fetch Video Details
  const fetchVideoDetailsMutation = useMutation({
    mutationFn: async () => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/videos/title/${encodeURIComponent(
            title
          )}`
        );
        if (!res.ok) throw new Error("Failed to fetch video details");
        return res.json();
      } catch (error) {
        console.error("Error fetching video details:", error);
        throw error;
      }
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/videos/title/${encodeURIComponent(
          title
        )}`
      );
      if (!response.ok) throw new Error("Failed to fetch video details");
      return response.json();
    },
    onSuccess: (data) => {
      setVideoDetails(data);
      // We don't need to set videoId anymore
    },
    onError: () => {
      setError("Failed to load video details. Please try again.");
    },
  });

  // Fetch Episodes
  const fetchEpisodesMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/files/watch?showName=${encodeURIComponent(title)}`
        );
        if (!res.ok) throw new Error("Failed to fetch episodes");
        return res.json();
      } catch (error) {
        console.error("Error fetching episodes:", error);
        throw error;
      }
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/files/watch?showName=${encodeURIComponent(title)}`
      );
      if (!res.ok) throw new Error("Failed to fetch episodes");
      return res.json();
    },
    onSuccess: (data) => {
      setEpisodes(Array.isArray(data.episodes) ? data.episodes : []);
    },
    onError: (error) => {
      console.error("Episode fetch error:", error);
      // Optional: handle episode fetch errors
    },
  });

<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // Check if video is in favorites - Updated to use userId
  const checkFavoriteMutation = useMutation({
    mutationFn: async () => {
      if (!title || !userId) return false;

      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/favorite-videos/Check/${encodeURIComponent(
            title
          )}?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Failed to check favorite status");
        return res.json();
      } catch (error) {
        console.error("Error checking favorite status:", error);
        return false;
      }
    },
    onSuccess: (data) => {
      setIsFavorite(data);
    },
    onError: (error) => {
      console.error("Failed to check favorite status:", error);
    },
  });

  // Toggle favorite status - Updated to use userId
  const toggleFavoriteMutation = useMutation({
    mutationFn: async () => {
      if (!title) {
        throw new Error("Video title not available");
      }

      if (!userId) {
        throw new Error("User ID not available");
      }

      try {
        const method = isFavorite ? "DELETE" : "POST";
        let url = `${
          process.env.NEXT_PUBLIC_API_URL
        }/favorite-videos/${encodeURIComponent(title)}`;

        // For DELETE requests, add userId as query parameter
        if (method === "DELETE") {
          url += `?userId=${userId}`;
        }

        const options: RequestInit = {
          method,
          headers: {
            "Content-Type": "application/json",
          },
        };

        // For POST requests, add userId in the request body
        if (method === "POST") {
          options.body = JSON.stringify({ userId });
        }

        const res = await fetch(url, options);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Favorite API error response:", errorText);
          throw new Error(
            `Failed to ${isFavorite ? "remove from" : "add to"} favorites`
          );
        }
        return res.ok;
      } catch (error) {
        console.error("Error toggling favorite:", error);
        throw error;
      }
    },
    onSuccess: () => {
      setIsFavorite(!isFavorite);
      toast.success(
        isFavorite
          ? `${title} has been removed from your favorites.`
          : `${title} has been added to your favorites.`
      );
    },
    onError: (error) => {
      console.error("Favorite error:", error);
      toast.error(
        `Failed to ${
          isFavorite ? "remove from" : "add to"
        } favorites. Please try again.`
      );
    },
  });

  // Call mutations with error handling
  useEffect(() => {
    try {
      fetchShowsMutation.mutate();
    } catch (error) {
      console.error("Error in fetchShowsMutation:", error);
    }
  }, []);
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  // Call all mutations on mount
  // useEffect(() => {
  //   fetchShowsMutation.mutate();
  // }, []);

  useEffect(() => {
    if (title && userId) {
      try {
        fetchVideoDetailsMutation.mutate();
        // Check favorite status when title and userId are available
        checkFavoriteMutation.mutate();
      } catch (error) {
        console.error("Error in fetchVideoDetailsMutation:", error);
      }
    }
  }, [title, userId]);

  useEffect(() => {
    if (show) {
      try {
        fetchEpisodesMutation.mutate();
      } catch (error) {
        console.error("Error in fetchEpisodesMutation:", error);
      }
    }
  }, [show]);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // We don't need this useEffect anymore since we're checking favorites based on title
  // useEffect(() => {
  //   if (videoId) {
  //     try {
  //       checkFavoriteMutation.mutate();
  //     } catch (error) {
  //       console.error("Error in checkFavoriteMutation:", error);
  //     }
  //   }
  // }, [videoId]);

  if (fetchShowsMutation.isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-white text-lg">Loading...</span>
      </div>
    );
  }
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  // if (fetchShowsMutation.isPending) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <span className="text-white text-lg">Loading...</span>
  //     </div>
  //   );
  // }
  if (error && !episodes.length) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <Alert variant="destructive" className="max-w-md w-full">
          <AlertDescription className="flex flex-col space-y-2">
            <span>Failed to load video details. Please try again.</span>
          </AlertDescription>
        </Alert>
      </div>
    );
  }
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

<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const handleToggleFavorite = () => {
    if (!title) {
      toast.error(
        "Video information is not available. Please try again later."
      );
      return;
    }

    if (!userId) {
      toast.error("Please sign in to add favorites.");
      return;
    }

    toggleFavoriteMutation.mutate();
  };
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  const {
    data: s,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["show"],
    queryFn: fetchShows,
  });

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

        {/*  Favorite Buttons */}
        {/* Favorite Button */}
        <div className="flex items-center space-x-4 mt-4">
          <Button
            onClick={handleToggleFavorite}
            className={`${
              isFavorite
                ? "bg-red-500 hover:bg-red-600"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
            aria-label={
              isFavorite ? "Remove from Favorites" : "Add to Favorites"
            }
            disabled={toggleFavoriteMutation.isPending || !userId}
          >
            <Heart
              className={`w-4 h-4 mr-2 ${isFavorite ? "fill-white" : ""}`}
            />
            {toggleFavoriteMutation.isPending
              ? "Processing..."
              : !userId
              ? "Sign in to favorite"
              : isFavorite
              ? "Favorited"
              : "Favorite"}
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getUserId } from "@/lib/action";

// Define props interface
interface FavoriteButtonProps {
  videoTitle: string; // Changed from videoId to videoTitle
}

// API functions with TypeScript types
const checkIsFavorite = async (videoTitle: string, userId: number): Promise<boolean> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorite-videos/check/${encodeURIComponent(videoTitle)}?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to check favorite status");
  }

  return response.json();
};

const addToFavorites = async (videoTitle: string, userId: number): Promise<boolean> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorite-videos/${encodeURIComponent(videoTitle)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to add to favorites");
  }

  return true;
};

const removeFromFavorites = async (videoTitle: string, userId: number): Promise<boolean> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorite-videos/${encodeURIComponent(videoTitle)}?userId=${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to remove from favorites");
  }

  return true;
};

export default function FavoriteButton({ videoTitle }: FavoriteButtonProps) {
  const queryClient = useQueryClient();
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

  // Query to check if video is favorited
  const { data: isFavorite, isLoading } = useQuery<boolean, Error>({
    queryKey: ["favorite", videoTitle, userId],
    queryFn: () => userId ? checkIsFavorite(videoTitle, userId) : Promise.resolve(false),
    enabled: !!userId, // Only run query when userId is available
    refetchOnWindowFocus: false,
  });

  // Add to favorites mutation
  const addMutation = useMutation({
    mutationFn: () => addToFavorites(videoTitle, userId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite", videoTitle] });
      queryClient.invalidateQueries({ queryKey: ["favoriteVideos"] });
      toast.success("Added to favorites");
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  // Remove from favorites mutation
  const removeMutation = useMutation({
    mutationFn: () => removeFromFavorites(videoTitle, userId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite", videoTitle] });
      queryClient.invalidateQueries({ queryKey: ["favoriteVideos"] });
      toast.success("Removed from favorites");
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleToggleFavorite = () => {
    if (!userId) {
      toast.error("Please sign in to manage favorites");
      return;
    }
    
    if (isFavorite) {
      removeMutation.mutate();
    } else {
      addMutation.mutate();
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={`flex items-center gap-2 ${
        isFavorite
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-gray-800 hover:bg-gray-700"
      }`}
      onClick={handleToggleFavorite}
      disabled={isLoading || addMutation.isPending || removeMutation.isPending || !userId}
    >
      <Heart className={`h-4 w-4 ${isFavorite ? "fill-white" : ""}`} />
      {!userId ? "Sign in to favorite" : isFavorite ? "Favorited" : "Add to favorites"}
    </Button>
  );
}

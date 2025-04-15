"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, LayoutGrid, List, Filter, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getUserId } from "@/lib/action";

// Define TypeScript interfaces
interface Video {
  id: number;
  title: string;
  thumbnail: string;
  views: string;
  uploadedAt: string;
  duration: string;
  year: number;
  genre: string;
  contentType: "Movie" | "Series";
}

// API functions with TypeScript types
const getFavoriteVideos = async (userId: number): Promise<Video[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorite-videos?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch favorite videos");
  }
  return response.json();
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

const genres = [
  "All",
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Thriller",
  "War",
  "Western",
];

export default function FavoriteVideosPage() {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("title");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [userId, setUserId] = useState<number | null>(null);

  // Initialize query client
  const queryClient = useQueryClient();

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

  // Fetch favorite videos
  const {
    data: likedVideos = [],
    isLoading,
    error,
  } = useQuery<Video[], Error>({
    queryKey: ["favoriteVideos", userId],
    queryFn: () => userId ? getFavoriteVideos(userId) : Promise.resolve([]),
    enabled: !!userId, // Only run query when userId is available
  });

  // Remove from favorites mutation
  const removeMutation = useMutation({
    mutationFn: ({ videoTitle }: { videoTitle: string }) => {
      if (!userId) throw new Error("User ID not available");
      return removeFromFavorites(videoTitle, userId);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["favoriteVideos"] });
      toast.success("Video removed from favorites");
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  // Handle remove from favorites
  const handleRemoveFromFavorites = (videoTitle: string) => {
    if (!userId) {
      toast.error("Please sign in to manage favorites");
      return;
    }
    removeMutation.mutate({ videoTitle });
  };

  const filteredVideos = useMemo(() => {
    if (!likedVideos || likedVideos.length === 0) return [];

    return likedVideos
      .filter((video) => {
        //video search function
        if (
          searchQuery &&
          !video.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        //genre filter function
        if (selectedGenre !== "All" && video.genre !== selectedGenre) {
          return false;
        }

        //content type filter(movies, series)
        if (filter === "movies") {
          return video.contentType === "Movie";
        } else if (filter === "series") {
          return video.contentType === "Series";
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "dateAdded") {
          // Using uploadedAt as a proxy for dateAdded
          return (
            new Date(b.uploadedAt || Date.now()).getTime() -
            new Date(a.uploadedAt || Date.now()).getTime()
          );
        } else if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        }

        return 0;
      });
  }, [likedVideos, searchQuery, selectedGenre, filter, sortBy]);

  // Show loading state
  if (!userId) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p>Please sign in to view your favorite videos</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p>Loading your favorite videos...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-red-500">
          Error loading favorite videos: {error.message}
        </p>
        <Button
          className="mt-4 bg-orange-500 hover:bg-orange-600"
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["favoriteVideos"] })
          }
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-start gap-6 mb-8">
        <div className="relative w-[280px] h-[157px] rounded-lg overflow-hidden bg-gray-800">
          <Image
            src={likedVideos[0]?.thumbnail || "/placeholder.svg"}
            alt="Playlist thumbnail"
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 text-orange-500">
            Favorite Videos
          </h1>
          <div className="text-gray-400 text-sm space-y-1">
            <p>{likedVideos.length} videos</p>
            <p>Last updated on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search in favorite videos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700"
          />
        </div>

        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="dateAdded">Sort by: Date Added</SelectItem>
              <SelectItem value="title">Sort by: Title</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-700 text-black">
                <Filter className="w-4 h-4 mr-2" />
                Genre
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
              <DropdownMenuLabel>Select Genre</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              {genres.map((genre) => (
                <DropdownMenuCheckboxItem
                  key={genre}
                  checked={selectedGenre === genre}
                  onCheckedChange={() => setSelectedGenre(genre)}
                >
                  {genre}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex border border-gray-700 rounded-md overflow-hidden">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              className={
                viewMode === "list"
                  ? "bg-orange-500 hover:bg-orange-600 rounded-none"
                  : "bg-gray-800 hover:bg-gray-700 rounded-none"
              }
              onClick={() => setViewMode("list")}
              size="sm"
            >
              <List className="w-4 h-4" />
            </Button>

            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              className={
                viewMode === "grid"
                  ? "bg-orange-500 hover:bg-orange-600 rounded-none"
                  : "bg-gray-800 hover:bg-gray-700 rounded-none"
              }
              onClick={() => setViewMode("grid")}
              size="sm"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="all" onClick={() => setFilter("all")}>
            All
          </TabsTrigger>
          <TabsTrigger value="movies" onClick={() => setFilter("movies")}>
            Movies
          </TabsTrigger>
          <TabsTrigger value="series" onClick={() => setFilter("series")}>
            Series
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {viewMode === "list" && (
        <div className="space-y-4">
          {filteredVideos.map((video, index) => (
            <div
              key={video.id}
              className="flex gap-4 group p-2 rounded-lg hover:bg-gray-800 hover:shadow-lg transition duration-300"
            >
              <div className="w-8 text-center text-gray-400 pt-2">
                {index + 1}
              </div>

              <div className="relative w-[160px] h-[90px]">
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  fill={true}
                  style={{ objectFit: "cover" }}
                  className="rounded"
                />
              </div>

              <div className="flex-1">
                <Link
                  href={`/user/watch/${video.id}?title=${encodeURIComponent(video.title)}`}
                  className="hover:text-orange-500"
                >
                  <h3 className="font-medium text-sm line-clamp-2">
                    {video.title}
                  </h3>
                </Link>

                <span className="text-xs bg-gray-700 px-1.5 py-0.5 rounded">
                  {video.genre}
                </span>

                <div className="text-sm text-gray-400">
                  {video.views} views • {video.uploadedAt}
                </div>
              </div>

              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-600"
                  onClick={() => handleRemoveFromFavorites(video.title)}
                  disabled={removeMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredVideos.map((video) => (
            <div key={video.id} className="group relative">
              <div className="relative">
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  width={320}
                  height={180}
                  style={{ objectFit: "cover" }}
                  className="rounded"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 bg-black bg-opacity-60 text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveFromFavorites(video.title)}
                  disabled={removeMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-2">
                <Link
                  href={`/user/watch/${video.id}?title=${encodeURIComponent(video.title)}`}
                  className="hover:text-orange-500"
                >
                  <h3 className="font-medium text-sm line-clamp-2">
                    {video.title}
                  </h3>
                </Link>
                <span className="text-xs bg-gray-700 px-1.5 py-0.5 rounded">
                  {video.genre}
                </span>
                <div className="text-xs text-gray-400">
                  {video.views} views • {video.uploadedAt}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredVideos.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-2">
            {likedVideos.length === 0
              ? "You haven't added any videos to your favorites yet"
              : "No videos match your search result"}
          </p>
          {likedVideos.length > 0 && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("All");
                setFilter("all");
              }}
              className="bg-orange-500 hover:bg-orange-600 border-orange-500"
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

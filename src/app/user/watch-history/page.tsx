"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  LayoutGrid,
  List,
  Filter,
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { getUserId } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface Video {
  id: number;
  videoTitle: string;
  description: string;
  duration: number;
  maturityRating: string;
  genre: string;
  contentType: "Movie" | "Series";
  releaseDate: string;
  thumbnailUrl: string;
  contentUrl: string;
  lastUpdated: Date;
  currentPosition?: number;
  watchedAt?: Date;
  progress?: number;
}

interface BucketThumbnail {
  id: string;
  title: string;
  thumbnail: string;
  episodeCount: number;
  seasons: number;
  lastUpdated: Date;
}

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

const getWatchHistories = async (userId: number): Promise<Video[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/watch-history/get-all-history?userId=${userId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch watch histories.");
  }
  return response.json();
};

const getThumbnailsFromBucket = async (): Promise<BucketThumbnail[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/files/list-shows?bucketName=${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}`
    );
    if (!response.ok) throw new Error("Failed to fetch thumbnails");
    return await response.json();
  } catch (error) {
    console.error("Error fetching thumbnails:", error);
    return [];
  }
};

export default function WatchHistoryPage() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [dateSortAscending, setDateSortAscending] = useState(false);
  const [bucketThumbnails, setBucketThumbnails] = useState<BucketThumbnail[]>(
    []
  );

  const userIdQuery = useQuery({
    queryKey: ["userId"],
    queryFn: getUserId,
    staleTime: Infinity,
  });

  const { data: rawWatchHistories = [] } = useQuery({
    queryKey: ["watch-history", userIdQuery.data],
    queryFn: async () => {
      const data = await getWatchHistories(Number(userIdQuery.data));
      return data.map((video) => ({
        ...video,
        watchedAt: new Date(video.lastUpdated || new Date()),
        progress: video.currentPosition ?? 0,
      }));
    },
    enabled: !!userIdQuery.data,
  });

  // Merge favorite videos with bucket thumbnails
  const watchedVideos = useMemo(() => {
    // First filter favorite videos that exist in bucket thumbnails
    const validTitles = new Set(
      bucketThumbnails.map((t) => t.title.toLowerCase())
    );
    const filteredFavorites = rawWatchHistories.filter((video) =>
      validTitles.has(video.videoTitle.toLowerCase())
    );

    // Then merge with thumbnail data
    return filteredFavorites.map((video) => {
      const matchingThumbnail = bucketThumbnails.find(
        (item) => item.title.toLowerCase() === video.videoTitle.toLowerCase()
      );

      return {
        ...video,
        thumbnailUrl: matchingThumbnail?.thumbnail || "/placeholder.svg",
        episodeCount: matchingThumbnail?.episodeCount || 0,
        lastUpdated: matchingThumbnail?.lastUpdated || "",
        bucketId: matchingThumbnail?.id || "", // Add the bucket ID
      };
    });
  }, [rawWatchHistories, bucketThumbnails]);

  const filteredVideos = useMemo(() => {
    if (!watchedVideos) return [];

    return watchedVideos
      .filter((video) => {
        // Video search function
        if (
          searchQuery &&
          !video.videoTitle.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Genre filter function
        if (selectedGenre !== "All" && video.genre !== selectedGenre) {
          return false;
        }

        // Content type filter(movies, series)
        if (filter === "movies") {
          return video.contentType === "Movie";
        } else if (filter === "series") {
          return video.contentType === "Series";
        }

        return true;
      })
      .sort((a, b) => {
        return dateSortAscending
          ? a.watchedAt.getTime() - b.watchedAt.getTime()
          : b.watchedAt.getTime() - a.watchedAt.getTime();
      });
  }, [watchedVideos, searchQuery, selectedGenre, filter, dateSortAscending]);

  // Group videos by month and year
  const groupedVideos = useMemo(() => {
    const groups: Record<string, typeof filteredVideos> = {};

    filteredVideos.forEach((video) => {
      const date = new Date(video.lastUpdated);
      const monthYear = `${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }

      groups[monthYear].push(video);
    });

    return groups;
  }, [filteredVideos]);

  const toggleDateSort = () => {
    setDateSortAscending(!dateSortAscending);
  };

  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const thumbnails = await getThumbnailsFromBucket();
        setBucketThumbnails(thumbnails);
      } catch (error) {
        console.error("Error fetching thumbnails:", error);
        toast.error("Failed to load thumbnails");
      }
    };

    fetchThumbnails();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-orange-500">
          Watch History
        </h1>
        <div className="text-gray-400 text-sm space-y-1">
          <p>{watchedVideos.length} videos</p>
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
          <Button
            variant="outline"
            onClick={toggleDateSort}
            className="border-gray-700 text-black"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Date
            {dateSortAscending ? (
              <ArrowUp className="w-4 h-4 ml-2" />
            ) : (
              <ArrowDown className="w-4 h-4 ml-2" />
            )}
          </Button>

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

      {Object.keys(groupedVideos).length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-2">
            No videos match your search criteria
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setSelectedGenre("All");
              setFilter("all");
            }}
            className="text-black"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {Object.entries(groupedVideos).map(([monthYear, videos]) => (
        <div key={monthYear} className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">{monthYear}</h2>

          {viewMode === "list" && (
            <div className="space-y-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="flex gap-4 group p-2 rounded-lg hover:bg-gray-800 hover:shadow-lg transition duration-300"
                >
                  <div className="relative w-[160px] h-[90px]">
                    <Image
                      src={video.thumbnailUrl || "/placeholder.svg"}
                      alt={video.videoTitle}
                      fill={true}
                      style={{ objectFit: "cover" }}
                      className="rounded"
                    />

                    <div className="absolute bottom-1 right-1 bg-black/80 px-1 text-xs rounded">
                      {video.duration}
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
                      <div
                        className="h-full bg-orange-500"
                        style={{ width: `${video.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <Link
                      href={`/user/watch/${
                        video.bucketId || video.id
                      }?title=${encodeURIComponent(video.videoTitle)}`}
                      className="hover:text-orange-500"
                    >
                      <h3 className="font-medium text-sm line-clamp-2">
                        {video.videoTitle}
                      </h3>
                    </Link>

                    <div className="text-sm text-gray-400">
                      {new Date(video.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="group bg-gray-800 rounded-lg overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={video.thumbnailUrl || "/placeholder.svg"}
                      alt={video.videoTitle}
                      width={320}
                      height={180}
                      layout="responsive"
                      className="rounded-t"
                    />

                    <div className="absolute bottom-1 right-1 bg-black/80 px-1 text-xs rounded">
                      {video.duration}
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
                      <div
                        className="h-full bg-orange-500"
                        style={{ width: `${video.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-3">
                    <Link
                      href={`/user/watch/${
                        video.bucketId || video.id
                      }?title=${encodeURIComponent(video.videoTitle)}`}
                      className="hover:text-orange-500"
                    >
                      <h3 className="font-medium text-sm line-clamp-2">
                        {video.videoTitle}
                      </h3>
                    </Link>
                    <div className="text-xs text-gray-400">
                      {new Date(video.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

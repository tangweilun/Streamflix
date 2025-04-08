"use client";

import { useState, useMemo } from "react";
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
  Search,
  LayoutGrid,
  List,
  Filter,
  Trash2,
  Calendar,
  ArrowUp,
  ArrowDown,
  X,
} from "lucide-react";

const initialWatchHistory = [
  {
    id: "1",
    title: "Stranger Things Season 4 - Official Trailer",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "2.3M",
    uploadedAt: "2 weeks ago",
    watchedAt: new Date("2023-03-28"),
    duration: "2:47",
    year: 2022,
    genre: "Sci-Fi",
    contentType: "Movie",
    progress: 20,
  },
  {
    id: "2",
    title: "The Witcher: Blood Origin - Behind the Scenes",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "892K",
    uploadedAt: "1 month ago",
    watchedAt: new Date("2023-03-25"),
    duration: "5:16",
    year: 2022,
    genre: "Fantasy",
    contentType: "Series",
    progress: 80,
  },
  {
    id: "3",
    title: "Wednesday - Thing's Best Moments",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "1.1M",
    uploadedAt: "3 weeks ago",
    watchedAt: new Date("2023-02-15"),
    duration: "3:42",
    year: 2023,
    genre: "Comedy",
    contentType: "Series",
    progress: 75,
  },
  {
    id: "4",
    title: "The Crown Season 5 Recap",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "567K",
    uploadedAt: "1 month ago",
    watchedAt: new Date("2023-01-20"),
    duration: "8:15",
    year: 2022,
    genre: "Drama",
    contentType: "Series",
    progress: 100,
  },
  {
    id: "5",
    title: "Squid Game - Final Game Explained",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "3.4M",
    uploadedAt: "6 months ago",
    watchedAt: new Date("2023-02-10"),
    duration: "10:22",
    year: 2021,
    genre: "Thriller",
    contentType: "Series",
    progress: 30,
  },
  {
    id: "6",
    title: "Money Heist - The Professor's Plan",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "1.8M",
    uploadedAt: "8 months ago",
    watchedAt: new Date("2022-12-15"),
    duration: "7:33",
    year: 2021,
    genre: "Crime",
    contentType: "Movie",
    progress: 50,
  },
];

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

export default function WatchHistoryPage() {
  const [watchHistory, setWatchHistory] = useState(initialWatchHistory);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  //const [sortBy, setSortBy] = useState("recent");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [dateSortAscending, setDateSortAscending] = useState(false);

  const filteredVideos = useMemo(() => {
    return watchHistory
      .filter((video) => {
        // Video search function
        if (
          searchQuery &&
          !video.title.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [watchHistory, searchQuery, selectedGenre, filter, dateSortAscending]);

  // Group videos by month and year
  const groupedVideos = useMemo(() => {
    const groups: Record<string, typeof filteredVideos> = {};

    filteredVideos.forEach((video) => {
      const date = video.watchedAt;
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

  const removeFromHistory = (id: string) => {
    setWatchHistory(watchHistory.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-orange-500">
          Watch History
        </h1>
        <div className="text-gray-400 text-sm space-y-1">
          <p>{watchHistory.length} videos</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search in liked videos"
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
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
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
                      href={`/watch/${video.id}`}
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
                      {video.views} views •{" "}
                      {video.watchedAt.toLocaleDateString()}
                    </div>
                  </div>

                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromHistory(video.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-600"
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
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="group bg-gray-800 rounded-lg overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
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

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromHistory(video.id)}
                      className="absolute top-1 right-1 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="p-3">
                    <Link
                      href={`/watch/${video.id}`}
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
                      {video.views} views •{" "}
                      {video.watchedAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-2">
            No videos match your search result
          </p>
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
        </div>
      )} */}
    </div>
  );
}

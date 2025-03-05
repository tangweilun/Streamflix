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
  DropdownMenuItem,
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
import {
  MoreVertical,
  ThumbsDown,
  Search,
  LayoutGrid,
  List,
  Filter,
} from "lucide-react";

const likedVideos = [
  {
    id: 1,
    title: "Stranger Things Season 4 - Official Trailer",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "2.3M",
    uploadedAt: "2 weeks ago",
    duration: "2:47",
    year: 2022,
    genre: "Sci-Fi",
    contentType: "Movie",
  },
  {
    id: 2,
    title: "The Witcher: Blood Origin - Behind the Scenes",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "892K",
    uploadedAt: "1 month ago",
    duration: "5:16",
    year: 2022,
    genre: "Fantasy",
    contentType: "Series",
  },
  {
    id: 3,
    title: "Wednesday - Thing's Best Moments",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "1.1M",
    uploadedAt: "3 weeks ago",
    duration: "3:42",
    year: 2023,
    genre: "Comedy",
    contentType: "Series",
  },
  {
    id: 4,
    title: "The Crown Season 5 Recap",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "567K",
    uploadedAt: "1 month ago",
    duration: "8:15",
    year: 2022,
    genre: "Drama",
    contentType: "Series",
  },
  {
    id: 5,
    title: "Squid Game - Final Game Explained",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "3.4M",
    uploadedAt: "6 months ago",
    duration: "10:22",
    year: 2021,
    genre: "Thriller",
    contentType: "Series",
  },
  {
    id: 6,
    title: "Money Heist - The Professor's Plan",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "1.8M",
    uploadedAt: "8 months ago",
    duration: "7:33",
    year: 2021,
    genre: "Crime",
    contentType: "Movie",
  },
];

const genres = [
  "All",
  "Sci-Fi",
  "Fantasy",
  "Comedy",
  "Drama",
  "Thriller",
  "Crime",
];

export default function LikedVideosPage() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filteredVideos = useMemo(() => {
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
          return (
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
          );
        } else if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        } else if (sortBy === "year") {
          return b.year - a.year;
        }

        return 0;
      });
  }, [searchQuery, selectedGenre, filter, sortBy]);

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
          <h1 className="text-3xl font-bold mb-2">Liked Videos</h1>
          <div className="text-gray-400 text-sm space-y-1">
            <p>{likedVideos.length} videos</p>
            <p>Last updated on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform-translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search in liked videos"
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
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="dateAdded">Sort by: Date Added</SelectItem>
              <SelectItem value="title">Sort by: Title</SelectItem>
              <SelectItem value="year">Sort by: Year</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-700">
                <Filter className="w-4 h-4 mr-2" />
                Genre
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700">
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
            <div key={video.id} className="flex gap-4 group">
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
                <span className="text-sx bg-gray-700 px-1.5 py-0.5 rounded">
                  {video.genre}
                </span>

                <div className="text-sm text-gray-400">
                  {video.views} views • {video.uploadedAt}
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-5 h-5"></MoreVertical>
                    </Button>
                  </DropdownMenuTrigger>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

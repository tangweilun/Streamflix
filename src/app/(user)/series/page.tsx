"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
import { LayoutGrid, List, Filter, Loader2 } from "lucide-react";
import { PaginationControl } from "@/components/pagination";

interface Video {
  id: string;
  title: string;
  type: string;
  image: string;
  genres: string[];
  uploadedAt: string;
}

const fetchSeriesData = async (
  page = 1,
  pageSize = 12,
  genre = "All",
  sortBy = "title"
) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Generate a large dataset for testing
  const allResults = [];
  const totalItems = 20000; // Simulating 200 series

  // Generate mock data
  for (let i = 1; i <= totalItems; i++) {
    const isMovie = i % 2 === 0;
    const item = {
      id: `${isMovie ? "m" : "s"}${i}`,
      title: `${isMovie ? "Movie" : "Series"} ${i}`,
      type: isMovie ? "movie" : "series",
      image: `/samplevideo/underrated.jpg`,
      genres: [
        ["Action", "Adventure", "Comedy", "Drama", "Horror", "Sci-Fi"][i % 6],
        ["Thriller", "Romance", "Fantasy", "Mystery", "Crime"][i % 5],
      ],
      uploadedAt: new Date(2023, 0, (i % 31) + 1).toISOString(),
    };

    allResults.push(item);
  }

  const allSeries = allResults.filter((item) => item.type === "series");

  // Filter by genre if needed
  let filteredSeries = allSeries;
  if (genre !== "All") {
    filteredSeries = allSeries.filter((item) => item.genres.includes(genre));
  }

  // Sort the data
  filteredSeries.sort((a, b) => {
    if (sortBy === "dateAdded") {
      // Compare by the uploadedAt property as a Date
      return (
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Calculate pagination
  const totalResults = filteredSeries.length;
  const totalPages = Math.ceil(totalResults / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedResults = filteredSeries.slice(startIndex, endIndex);

  return {
    series: paginatedResults,
    pagination: {
      currentPage: page,
      totalPages,
      totalResults,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
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

export default function SeriesVideosPage() {
  const [sortBy, setSortBy] = useState("title");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [seriesData, setSeriesData] = useState<Video[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // const filteredVideos = useMemo((): typeof videos => {
  //   return videos
  //     .filter((video) => video.contentType === "Series")
  //     .filter((video) => {
  //       //genre filter function
  //       if (selectedGenre !== "All" && video.genre !== selectedGenre) {
  //         return false;
  //       }

  //       return true;
  //     })
  //     .sort((a, b) => {
  //       if (sortBy === "dateAdded") {
  //         return (
  //           new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  //         );
  //       } else if (sortBy === "title") {
  //         return a.title.localeCompare(b.title);
  //       }

  //       return 0;
  //     });
  // }, [selectedGenre, sortBy]);

  // Fetch series data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { series, pagination } = await fetchSeriesData(
        currentPage,
        12,
        selectedGenre,
        sortBy
      );
      setSeriesData(series);
      setPagination(pagination);
    } catch (error) {
      console.error("Error fetching series data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, selectedGenre, sortBy]);

  // Fetch data when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto p-6 pt-10 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-orange-500 mb-2">TV Series</h1>
        </div>
      </div>

      <div className="flex items-center justify-end mb-6 gap-3">
        <Select
          value={sortBy}
          onValueChange={(value) => {
            setSortBy(value);
            setCurrentPage(1);
          }}
        >
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
                onCheckedChange={() => {
                  setSelectedGenre(genre);
                  setCurrentPage(1);
                }}
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

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 text-orange-500 animate-spin mr-3" />
          <span className="text-white text-lg">Loading series...</span>
        </div>
      ) : (
        <>
          {viewMode === "list" && (
            <div className="space-y-4">
              {seriesData.map((video, index) => (
                <div
                  key={video.id}
                  className="flex gap-4 group p-2 rounded-lg hover:bg-gray-800 hover:shadow-lg transition duration-300"
                >
                  <div className="w-8 text-center text-gray-400 pt-2">
                    {(pagination.currentPage - 1) * 12 + index + 1}
                  </div>

                  <div className="relative w-[160px] h-[90px]">
                    <Link href={`/watch/${video.id}`}>
                      <Image
                        src={video.image || "/placeholder.svg"}
                        alt={video.title}
                        fill={true}
                        style={{ objectFit: "cover" }}
                        className="rounded"
                      />
                    </Link>
                  </div>

                  <div className="flex-1">
                    <Link
                      href={`/watch/${video.id}`}
                      className="hover:text-orange-500"
                    >
                      <h3 className="text-white hover:text-orange-500 transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mt-1">
                      {video.genres
                        .slice(0, 2)
                        .map((genre: string, idx: number) => (
                          <span
                            key={`${genre}-${idx}`}
                            className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                          >
                            {genre}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {seriesData.map((video) => (
                <div key={video.id} className="group">
                  <div className="relative">
                    <Link href={`/watch/${video.id}`}>
                      <Image
                        src={video.image || "/placeholder.svg"}
                        alt={video.title}
                        width={320}
                        height={180}
                        layout="responsive"
                        className="rounded"
                      />
                    </Link>
                  </div>

                  <div className="mt-2">
                    <Link
                      href={`/watch/${video.id}`}
                      className="hover:text-orange-500"
                    >
                      <h3 className="text-white hover:text-orange-500 transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      {video.genres
                        .slice(0, 2)
                        .map((genre: string, idx: number) => (
                          <span
                            key={`${genre}-${idx}`}
                            className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                          >
                            {genre}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-8">
              <PaginationControl
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                hasNextPage={pagination.hasNextPage}
                hasPrevPage={pagination.hasPrevPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          {seriesData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-6xl mb-4">📺</div>
              <h2 className="text-xl font-semibold text-white mb-2">
                No TV series found
              </h2>
              <p className="text-gray-400">
                Try selecting a different genre or check back later for new
                content.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, Tv, Loader2 } from "lucide-react";
import { PaginationControl } from "@/components/pagination";

interface SearchResult {
  id: string;
  title: string;
  type: string;
  image: string;
  genres: string[];
}

const fetchSearchResults = async (
  query: string,
  type = "all",
  page = 1,
  pageSize = 12
) => {
  //simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const allResults = [];
  const totalItems = 20000; // Simulating 20,000 items

  // Generate mock data based on the query
  for (let i = 1; i <= totalItems; i++) {
    const isMovie = i % 2 === 0;
    const item = {
      id: `${isMovie ? "m" : "s"}${i}`,
      title: `${isMovie ? "Movie" : "Series"} ${i}`,
      type: isMovie ? "movie" : "series",
      image: `/placeholder.svg?height=200&width=350&text=${
        isMovie ? "Movie" : "Series"
      }+${i}`,
      genres: [
        ["Action", "Adventure", "Comedy", "Drama", "Horror", "Sci-Fi"][i % 6],
        ["Thriller", "Romance", "Fantasy", "Mystery", "Crime"][i % 5],
      ],
    };

    // Only include items that match the search query (if provided)
    if (!query || item.title.toLowerCase().includes(query.toLowerCase())) {
      allResults.push(item);
    }
  }

  // Filter by type if needed
  let filteredResults = allResults;
  if (type === "movies") {
    filteredResults = allResults.filter((item) => item.type === "movie");
  } else if (type === "series") {
    filteredResults = allResults.filter((item) => item.type === "series");
  }

  // Calculate pagination
  const totalResults = filteredResults.length;
  const totalPages = Math.ceil(totalResults / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedResults = filteredResults.slice(startIndex, endIndex);

  return {
    results: paginatedResults,
    pagination: {
      currentPage: page,
      totalPages,
      totalResults,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

export default function SearchResultPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResultContent />
    </Suspense>
  );
}

function SearchResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const initialPage = Number.parseInt(searchParams.get("page") || "1");
  const initialType = searchParams.get("type") || "all";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState(initialType);
  const [, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    totalPages: 1,
    totalResults: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Memoize the search function to avoid recreating it on every render
  const performSearch = useCallback(
    async (query: string, type = "all", page = 1) => {
      if (!query.trim()) {
        setResults([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalResults: 0,
          hasNextPage: false,
          hasPrevPage: false,
        });
        return;
      }

      setIsLoading(true);

      try {
        const { results, pagination } = await fetchSearchResults(
          query,
          type,
          page
        );
        setResults(results);
        setPagination(pagination);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Ensure that searchQuery state updates when the initialQuery changes
  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  // Effect to perform search on mount or when URL parameters change
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery, initialType, initialPage);
      setActiveTab(initialType);
      setCurrentPage(initialPage);
    }
  }, [initialQuery, initialType, initialPage, performSearch]);

  // Update URL when search parameters change
  const updateUrl = useCallback(
    (query: string, type: string, page: number) => {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (type !== "all") params.set("type", type);
      if (page > 1) params.set("page", page.toString());

      router.push(`/user/search?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    performSearch(searchQuery, value, 1);
    updateUrl(searchQuery, value, 1);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    performSearch(searchQuery, activeTab, page);
    updateUrl(searchQuery, activeTab, page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto p-6 pt-10 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-orange-500 mb-2">
            Search Results
          </h1>
          {initialQuery && (
            <p className="text-gray-400 text-lg">
              Results for &quot;
              <span className="text-white">{initialQuery}</span>&quot;
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={handleTabChange}
          >
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="movies">Movies</TabsTrigger>
              <TabsTrigger value="series">Series</TabsTrigger>
            </TabsList>
          </Tabs>

          {pagination.totalResults > 0 && (
            <div className="text-gray-400">
              Showing {(pagination.currentPage - 1) * 12 + 1}-
              {Math.min(pagination.currentPage * 12, pagination.totalResults)}{" "}
              of {pagination.totalResults} results
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 text-orange-500 animate-spin mr-3" />
            <span className="text-white text-lg">Searching...</span>
          </div>
        ) : results.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((item, index) => (
                <Card
                  key={`${item.id}-${index}`}
                  className="bg-gray-800 border-gray-700 overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 hover:scale-105"
                      loading="lazy" // Enable lazy loading
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full p-1">
                      {item.type === "movie" ? (
                        <Film className="h-4 w-4 text-orange-500" />
                      ) : (
                        <Tv className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Link href={`/user/watch/${item.id}`}>
                      <h3 className="font-semibold text-white hover:text-orange-500 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.genres
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
                  </CardContent>
                </Card>
              ))}
            </div>

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
          </>
        ) : initialQuery ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-white mb-2">
              No results found
            </h2>
            <p className="text-gray-400">
              We couldn&apos;t find anything matching &quot;{initialQuery}
              &quot;. Try different keywords or browse our categories.
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-6xl mb-4">🎬</div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Start your search
            </h2>
            <p className="text-gray-400">
              Search for movies, TV shows, actors, directors, or genres to find
              what you&apos;re looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

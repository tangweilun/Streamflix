"use client";

import type React from "react";
import { Suspense } from "react";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, Tv, Loader2 } from "lucide-react";

const movies = [
  {
    id: "m1",
    title: "The Irishman",
    type: "movie",
    image: "/placeholder.svg?height=200&width=350",
    genres: ["Crime", "Drama", "Biography"],
  },
  {
    id: "m2",
    title: "Bird Box",
    type: "movie",
    image: "/placeholder.svg?height=200&width=350",
    genres: ["Horror", "Sci-Fi", "Thriller"],
  },
  {
    id: "m3",
    title: "Marriage Story",
    type: "movie",
    image: "/samplevideo/underrated.jpg",
    genres: ["Drama", "Comedy", "Romance"],
  },
  {
    id: "m4",
    title: "The Power of the Dog",
    type: "movie",
    image: "/placeholder.svg?height=200&width=350",
    genres: ["Drama", "Western"],
  },
];

const series = [
  {
    id: "s1",
    title: "Stranger Things",
    type: "series",
    image: "/placeholder.svg?height=200&width=350",
    genres: ["Drama", "Fantasy", "Horror"],
  },
  {
    id: "s2",
    title: "The Crown",
    type: "series",
    image: "/samplevideo/underrated.jpg",
    genres: ["Drama", "History", "Biography"],
  },
  {
    id: "s3",
    title: "Bridgerton",
    type: "series",
    image: "/placeholder.svg?height=200&width=350",
    genres: ["Drama", "Romance"],
  },
  {
    id: "s4",
    title: "Wednesday",
    type: "series",
    image: "/placeholder.svg?height=200&width=350",
    genres: ["Comedy", "Fantasy", "Horror"],
  },
];

interface SearchResult {
  id: string;
  title: string;
  type: string;
  image: string;
  genres: string[];
}

export default function SearchResultPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResultContent />
    </Suspense>
  );
}

function SearchResultContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const performSearch = useCallback(
    (query: string) => {
      setIsLoading(true);

      setTimeout(() => {
        const lowerQuery = query.toLowerCase();

        const filteredMovies = movies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(lowerQuery) ||
            movie.genres.some((genre) =>
              genre.toLowerCase().includes(lowerQuery)
            )
        );

        const filteredSeries = series.filter(
          (series) =>
            series.title.toLowerCase().includes(lowerQuery) ||
            series.genres.some((genre) =>
              genre.toLowerCase().includes(lowerQuery)
            )
        );

        if (activeTab === "movies") {
          setResults(filteredMovies);
        } else if (activeTab === "series") {
          setResults(filteredSeries);
        } else {
          setResults([...filteredMovies, ...filteredSeries]);
        }

        setIsLoading(false);
      }, 800);
    },
    [activeTab]
  );

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery, performSearch]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);

    //re-filter results based on the selected tab
    if (value === "movies") {
      setResults(
        movies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.genres.some((genre) =>
              genre.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
      );
    } else if (value === "series") {
      setResults(
        series.filter(
          (series) =>
            series.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            series.genres.some((genre) =>
              genre.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
      );
    } else {
      performSearch(searchQuery);
    }
  };

  return (
    <div className="container mx-auto p-6 pt-10 min-h-screen bg-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">
          Search Results
        </h1>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={handleTabChange}
          className="mb-6"
        >
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="series">Series</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 text-orange-500 animate-spin mr-3" />
            <span className="text-white text-lg">Searching...</span>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((item) => (
              <Card
                key={item.id}
                className="bg-gray-800 border-gray-700 overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300 hover:scale-105"
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
                  <Link href={`/watch/${item.id}`}>
                    <h3 className="font-semibold text-white hover:text-orange-500 transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.genres.slice(0, 2).map((genre: string) => (
                      <span
                        key={genre}
                        className="tetx-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : initialQuery ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-white mb-2">
              No results found
            </h2>
            <p className="tetx-gray-400">
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
              {" "}
              Search for movies, TV shows, actors, directors, or genres to find
              what you&apos;re looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

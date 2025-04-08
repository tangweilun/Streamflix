"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import React from "react";

// Define the type for series data
type SeriesItem = {
  id: string;
  title: string;
  thumbnail: string;
  genres: string[];
};

export default function TVSeriesPage() {
  const [series, setSeries] = useState<SeriesItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const router = useRouter();

  useEffect(() => {
    async function fetchSeries() {
      try {
        const response = await fetch(
          "https://localhost:7230/api/files/list-shows?bucketName=streamflixtest"
        );
        if (!response.ok) throw new Error("Failed to fetch series");

        const data: SeriesItem[] = await response.json();
        setSeries(data);
      } catch (error) {
        console.error("Error loading series:", error);
        setError("Failed to load series. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchSeries();
  }, []);

  const sortedSeries = [...series].sort((a, b) =>
    sortBy === "title" ? a.title.localeCompare(b.title) : 0
  );

  const handleCardClick = (id: string, title: string) => {
    router.push(`/watch/${id}?title=${encodeURIComponent(title)}`);
  };
  

  return (
    <div className="min-h-screen bg-black text-black">
      <main className="container mx-auto px-6 py-8 pt-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500">TV Series</h1>
          <div className="flex gap-3">
            <Select onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by: Title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Sort by: Title</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Genre</Button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg bg-gray-800" />
            ))}
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-6">
            {sortedSeries.map((show, index) => (
              <Card
                key={show.id}
                onClick={() => handleCardClick(show.id, show.title)}
                className="p-4 bg-black hover:bg-gray-800 group cursor-pointer border-0 shadow-none"
              >
                <CardContent className="flex items-center gap-4">
                  <span className="text-xl text-white">{index + 1}</span>
                  <Image
                    src={show.thumbnail}
                    alt={show.title}
                    width={150}
                    height={90}
                    className="rounded-md object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-white group-hover:text-orange-500">
                      {show.title}
                    </h2>
                    <div className="flex gap-2 mt-2">
                      {show.genres?.map((genre) => (
                        <span
                          key={genre}
                          className="bg-gray-700 text-sm text-white px-3 py-1 rounded-md"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

"use client";

import { CardFooter } from "@/components/ui/card";
import Image from "next/image";

import { useState } from "react";
import {
  Search,
  Star,
  Trash2,
  Filter,
  Grid,
  List,
  Film,
  Tv,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Sample media data
const mediaItems = [
  {
    id: "1",
    title: "Inception",
    type: "movie",
    poster: "/placeholder.svg?height=400&width=300",
    year: 2010,
    rating: 8.8,
    genres: ["Sci-Fi", "Action", "Thriller"],
    director: "Christopher Nolan",
  },
  {
    id: "2",
    title: "Breaking Bad",
    type: "series",
    poster: "/placeholder.svg?height=400&width=300",
    year: 2008,
    rating: 9.5,
    genres: ["Crime", "Drama", "Thriller"],
    creator: "Vince Gilligan",
  },
  {
    id: "3",
    title: "The Shawshank Redemption",
    type: "movie",
    poster: "/placeholder.svg?height=400&width=300",
    year: 1994,
    rating: 9.3,
    genres: ["Drama"],
    director: "Frank Darabont",
  },
  {
    id: "4",
    title: "Game of Thrones",
    type: "series",
    poster: "/placeholder.svg?height=400&width=300",
    year: 2011,
    rating: 9.2,
    genres: ["Action", "Adventure", "Drama"],
    creator: "David Benioff, D.B. Weiss",
  },
  {
    id: "5",
    title: "The Dark Knight",
    type: "movie",
    poster: "/placeholder.svg?height=400&width=300",
    year: 2008,
    rating: 9.0,
    genres: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
  },
  {
    id: "6",
    title: "Stranger Things",
    type: "series",
    poster: "/placeholder.svg?height=400&width=300",
    year: 2016,
    rating: 8.7,
    genres: ["Drama", "Fantasy", "Horror"],
    creator: "The Duffer Brothers",
  },
  {
    id: "7",
    title: "Interstellar",
    type: "movie",
    poster: "/placeholder.svg?height=400&width=300",
    year: 2014,
    rating: 8.6,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    director: "Christopher Nolan",
  },
  {
    id: "8",
    title: "The Mandalorian",
    type: "series",
    poster: "/placeholder.svg?height=400&width=300",
    year: 2019,
    rating: 8.8,
    genres: ["Action", "Adventure", "Fantasy"],
    creator: "Jon Favreau",
  },
];

export default function LikedMedia() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mediaType, setMediaType] = useState<"all" | "movie" | "series">("all");
  const [sortBy, setSortBy] = useState<"rating" | "year" | "title">("rating");

  // Filter and sort media items
  const filteredMedia = mediaItems
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (mediaType === "all" || item.type === mediaType)
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "year") return b.year - a.year;
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="theme-custom">
      <Card className="border-none shadow-none">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">
                My Favourite Media
              </CardTitle>
              <CardDescription>
                Your collection of favorite movies and TV series
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Tabs
                defaultValue="all"
                className="w-[200px]"
                onValueChange={(value: string) =>
                  setMediaType(value as "all" | "movie" | "series")
                }
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger
                    value="movie"
                    className="flex items-center gap-1"
                  >
                    <Film className="h-3 w-3" />
                    Movies
                  </TabsTrigger>
                  <TabsTrigger
                    value="series"
                    className="flex items-center gap-1"
                  >
                    <Tv className="h-3 w-3" />
                    Series
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className={
                    viewMode === "grid"
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={
                    viewMode === "list"
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 mt-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search your liked media..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select
                defaultValue="rating"
                onValueChange={(value) =>
                  setSortBy(value as "rating" | "year" | "title")
                }
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Sort by Rating</SelectItem>
                  <SelectItem value="year">Sort by Year</SelectItem>
                  <SelectItem value="title">Sort by Title</SelectItem>
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Genre</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Action</DropdownMenuItem>
                  <DropdownMenuItem>Drama</DropdownMenuItem>
                  <DropdownMenuItem>Sci-Fi</DropdownMenuItem>
                  <DropdownMenuItem>Comedy</DropdownMenuItem>
                  <DropdownMenuItem>Horror</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredMedia.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No media found matching your search criteria
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image
                      src={item.poster || "/placeholder.svg"}
                      alt={item.title}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                      layout="fill"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Badge className="bg-accent hover:bg-accent/90">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {item.rating}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-black/70 backdrop-blur-sm"
                      >
                        {item.type === "movie" ? (
                          <Film className="h-3 w-3" />
                        ) : (
                          <Tv className="h-3 w-3" />
                        )}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-3">
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    <CardDescription className="text-xs">
                      {item.year} •{" "}
                      {item.type === "movie" ? item.director : item.creator}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-3 pt-0 flex-col items-start gap-2">
                    <div className="flex flex-wrap gap-1">
                      {item.genres.map((genre) => (
                        <Badge
                          key={genre}
                          variant="secondary"
                          className="text-xs"
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-end w-full mt-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMedia.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="w-[100px] h-[150px] flex-shrink-0">
                      <Image
                        src={item.poster || "/placeholder.svg"}
                        alt={item.title}
                        className="object-cover w-full h-full"
                        layout="fill"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.year} •{" "}
                            {item.type === "movie"
                              ? item.director
                              : item.creator}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-accent hover:bg-accent/90">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            {item.rating}
                          </Badge>
                          <Badge variant="outline">
                            {item.type === "movie" ? "Movie" : "TV Series"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 my-2">
                        {item.genres.map((genre) => (
                          <Badge
                            key={genre}
                            variant="secondary"
                            className="text-xs"
                          >
                            {genre}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-end mt-auto">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

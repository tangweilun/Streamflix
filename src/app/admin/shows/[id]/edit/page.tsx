"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, ImageIcon, Loader2, Plus, Save, X } from "lucide-react";

const availableGenres = [
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

export default function EditShowPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState<number | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const [cast, setCast] = useState<string[]>([]);
  const [newCastMember, setNewCastMember] = useState("");
  const [creators, setCreators] = useState<string[]>([]);
  const [newCreator, setNewCreator] = useState("");
  const [directors, setDirectors] = useState<string[]>([]);
  const [newDirector, setNewDirector] = useState("");

  const [posterImage, setPosterImage] = useState<string | null>(null);
  const posterInputRef = useRef<HTMLInputElement>(null);

  // UI state
  const [activeTab, setActiveTab] = useState("basic");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  //shows poster image selection
  const handlePosterSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setPosterImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addCastMember = () => {
    if (newCastMember.trim() && !cast.includes(newCastMember.trim())) {
      setCast([...cast, newCastMember.trim()]);
      setNewCastMember("");
    }
  };

  const removeCastMember = (member: string) => {
    setCast(cast.filter((m) => m !== member));
  };

  const addCreator = () => {
    if (newCreator.trim() && !creators.includes(newCreator.trim())) {
      setCreators([...creators, newCreator.trim()]);
      setNewCreator("");
    }
  };

  const removeCreator = (creator: string) => {
    setCreators(creators.filter((c) => c !== creator));
  };

  const addDirector = () => {
    if (newDirector.trim() && !directors.includes(newDirector.trim())) {
      setDirectors([...directors, newDirector.trim()]);
      setNewDirector("");
    }
  };

  const removeDirector = (director: string) => {
    setDirectors(directors.filter((d) => d !== director));
  };

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !releaseYear || selectedGenres.length === 0) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real application, you would send the data to your API here
    // console.log({
    //   id: "",
    //   type: "",
    //   title,
    //   description,
    //   releaseYear,
    //   releaseDate,
    //   genres: selectedGenres,
    //   rating,
    //   featured,
    //   status,
    //   seasons,
    //   episodes,
    //   duration,
    //   cast,
    //   creators,
    //   directors,
    //   // In a real app, you'd handle file uploads differently
    //   posterImage: posterImage ? "Updated" : "Unchanged",
    //   bannerImage: bannerImage ? "Updated" : "Unchanged",
    // });

    setIsSaving(false);
    setSaveSuccess(true);

    // Reset success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-orange-500">Edit Show</h1>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
            <span className="ml-3 text-white">Loading show information...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  Show Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* <div className="space-y-2">
                  <label htmlFor="show-type" className="text-white">
                    Show Type
                  </label>
                  <RadioGroup
                    id="show-type"
                    value={showType}
                    onValueChange={(value) =>
                      setShowType(value as "series" | "movie")
                    }
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="series"
                        id="series"
                      />
                      <label
                        htmlFor="series"
                        className="text-white cursor-pointer"
                      >
                        TV Series
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="movie" id="movie" />
                      <label
                        htmlFor="movie"
                        className="text-white cursor-pointer"
                      >
                        Movie
                      </label>
                    </div>
                  </RadioGroup>
                </div> */}

                <div className="space-y-2">
                  <label htmlFor="title" className="text-white">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-white">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="release-year" className="text-white">
                      Release Year<span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="release-year"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear() + 5}
                      value={releaseYear || ""}
                      onChange={(e) =>
                        setReleaseYear(Number.parseInt(e.target.value) || null)
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-white">
                    Genres <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {availableGenres.map((genre) => (
                      <div key={genre} className="flex items-center space-x-2">
                        <Checkbox
                          id={`genre-${genre}`}
                          checked={selectedGenres.includes(genre)}
                          onCheckedChange={() => toggleGenre(genre)}
                          className="data-[state=unchecked]:border-white
                          data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                        />
                        <label
                          htmlFor={`genre-${genre}`}
                          className="text-white cursor-pointer text-sm"
                        >
                          {genre}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-white">Poster Image</label>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-4">
                      {posterImage ? (
                        <div className="relative">
                          <div className="relative w-full h-[300px]">
                            <Image
                              src={posterImage || "/placeholder.svg"}
                              alt="Poster preview"
                              fill={true}
                              style={{ objectFit: "contain" }}
                              className="rounded"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => setPosterImage(null)}
                          >
                            <X className="h-2 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                          <p className="text-white mb-2">Upload poster image</p>
                          <p className="text-gray-400 text-sm mb-4">
                            Recommended size: 2000x3000px
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            className="bg-orange-500 hover:bg-orange-600 border-gray-700 text-whit"
                            onClick={() => posterInputRef.current?.click()}
                          >
                            Select Image
                          </Button>
                          <input
                            type="file"
                            ref={posterInputRef}
                            onChange={handlePosterSelect}
                            accept="image/*"
                            className="hidden"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-white">Cast Members</label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cast.map((member) => (
                        <div
                          key={member}
                          className="flex items-center bg-gray-800 rounded-full px-3 py-1"
                        >
                          <span className="text-white text-sm mr-2">
                            {member}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 rounded-full hover:bg-gray-700"
                            onClick={() => removeCastMember(member)}
                          >
                            <X className="h-2 w-3 text-white" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add cast member..."
                        value={newCastMember}
                        onChange={(e) => setNewCastMember(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addCastMember();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={addCastMember}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-white">Creators</label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {creators.map((creator) => (
                        <div
                          key={creator}
                          className="flex items-center bg-gray-800 rounded-full px-3 py-1"
                        >
                          <span className="text-white text-sm mr-2">
                            {creator}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 rounded-full hover:bg-gray-700"
                            onClick={() => removeCreator(creator)}
                          >
                            <X className="h-2 w-3 text-white" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add creator..."
                        value={newCreator}
                        onChange={(e) => setNewCreator(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addCreator();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={addCreator}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4 mt-6">
              <Button
                type="button"
                variant="outline"
                className="border-gray-700 bg-black  hover:bg-gray-800 text-white hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 min-w-[120px]"
                disabled={isSaving}
              >
                {isSaving ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center">
                    {saveSuccess ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}{" "}
                    {saveSuccess ? "Saved!" : "Save Changes"}
                  </span>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

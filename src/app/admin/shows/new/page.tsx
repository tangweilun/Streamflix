"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  X,
  Plus,
  ChevronRight,
  ImageIcon,
  Users,
  Info,
  Layout,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type FormStep = "basic" | "media" | "cast" | "seasons" | "preview";

interface CastMember {
  id: string;
  name: string;
  role: string;
  character?: string;
}

interface Season {
  number: number;
  title: string;
  episodes: number;
  releaseYear: string;
}

export default function NewShow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<FormStep>("basic");
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState({
    thumbnail: null as string | null,
    poster: null as string | null,
    banner: null as string | null,
  });
  const [castMembers, setCastMembers] = useState<CastMember[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);

  const handleImageChange = (
    type: keyof typeof images,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => ({ ...prev, [type]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addCastMember = () => {
    const newMember: CastMember = {
      id: Date.now().toString(),
      name: "",
      role: "actor",
      character: "",
    };
    setCastMembers((prev) => [...prev, newMember]);
  };

  const removeCastMember = (id: string) => {
    setCastMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const addSeason = () => {
    const newSeason: Season = {
      number: seasons.length + 1,
      title: "",
      episodes: 0,
      releaseYear: new Date().getFullYear().toString(),
    };
    setSeasons((prev) => [...prev, newSeason]);
  };

  const removeSeason = (number: number) => {
    setSeasons((prev) => prev.filter((season) => season.number !== number));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/admin");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "basic":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter show title"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                required
                rows={4}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter show description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Genre</label>
                <select
                  multiple
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="action">Action</option>
                  <option value="comedy">Comedy</option>
                  <option value="drama">Drama</option>
                  <option value="scifi">Sci-Fi</option>
                  <option value="thriller">Thriller</option>
                  <option value="horror">Horror</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Content Rating</label>
                <select className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="">Select rating</option>
                  <option value="G">G</option>
                  <option value="PG">PG</option>
                  <option value="PG-13">PG-13</option>
                  <option value="R">R</option>
                  <option value="NC-17">NC-17</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Release Year</label>
                <input
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter release year"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <select className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="">Select language</option>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="ja">Japanese</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "media":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Show Thumbnail (16:9)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-orange-500">
                  {images.thumbnail ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={images.thumbnail || "/placeholder.svg"}
                        alt="Thumbnail preview"
                        fill
                        className="object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setImages((prev) => ({ ...prev, thumbnail: null }))
                        }
                        className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageChange("thumbnail", e)}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Show Poster (2:3)</label>
              <div className="flex items-center justify-center w-full">
                <label className="relative flex flex-col items-center justify-center w-64 h-96 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-orange-500">
                  {images.poster ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={images.poster || "/placeholder.svg"}
                        alt="Poster preview"
                        fill
                        className="object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setImages((prev) => ({ ...prev, poster: null }))
                        }
                        className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or GIF (MAX. 400x600px)
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageChange("poster", e)}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Banner Image (21:9)</label>
              <div className="flex items-center justify-center w-full">
                <label className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-orange-500">
                  {images.banner ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={images.banner || "/placeholder.svg"}
                        alt="Banner preview"
                        fill
                        className="object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setImages((prev) => ({ ...prev, banner: null }))
                        }
                        className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or GIF (MAX. 1920x820px)
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageChange("banner", e)}
                  />
                </label>
              </div>
            </div>
          </div>
        );

      case "cast":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Cast & Crew</h3>
              <button
                type="button"
                onClick={addCastMember}
                className="inline-flex items-center px-3 py-1.5 bg-orange-600 text-black rounded-md hover:bg-orange-500 transition-colors text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </button>
            </div>

            {castMembers.map((member, index) => (
              <div
                key={member.id}
                className="p-4 bg-gray-800 rounded-lg space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Cast Member #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeCastMember(member.id)}
                    className="p-1 hover:bg-gray-700 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter name"
                      value={member.name}
                      onChange={(e) => {
                        const updated = [...castMembers];
                        updated[index].name = e.target.value;
                        setCastMembers(updated);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <select
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={member.role}
                      onChange={(e) => {
                        const updated = [...castMembers];
                        updated[index].role = e.target.value;
                        setCastMembers(updated);
                      }}
                    >
                      <option value="actor">Actor</option>
                      <option value="director">Director</option>
                      <option value="producer">Producer</option>
                      <option value="writer">Writer</option>
                    </select>
                  </div>

                  {member.role === "actor" && (
                    <div className="space-y-2 col-span-2">
                      <label className="text-sm font-medium">
                        Character Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter character name"
                        value={member.character || ""}
                        onChange={(e) => {
                          const updated = [...castMembers];
                          updated[index].character = e.target.value;
                          setCastMembers(updated);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {castMembers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No cast members added yet. Click the button above to add cast &
                crew members.
              </div>
            )}
          </div>
        );

      case "seasons":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Seasons</h3>
              <button
                type="button"
                onClick={addSeason}
                className="inline-flex items-center px-3 py-1.5 bg-orange-600 text-black rounded-md hover:bg-orange-500 transition-colors text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Season
              </button>
            </div>

            {seasons.map((season, index) => (
              <div
                key={season.number}
                className="p-4 bg-gray-800 rounded-lg space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Season {season.number}</h4>
                  <button
                    type="button"
                    onClick={() => removeSeason(season.number)}
                    className="p-1 hover:bg-gray-700 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Season Title</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter season title"
                      value={season.title}
                      onChange={(e) => {
                        const updated = [...seasons];
                        updated[index].title = e.target.value;
                        setSeasons(updated);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Number of Episodes
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={season.episodes}
                      onChange={(e) => {
                        const updated = [...seasons];
                        updated[index].episodes = Number.parseInt(
                          e.target.value
                        );
                        setSeasons(updated);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Release Year</label>
                    <input
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={season.releaseYear}
                      onChange={(e) => {
                        const updated = [...seasons];
                        updated[index].releaseYear = e.target.value;
                        setSeasons(updated);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}

            {seasons.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No seasons added yet. Click the button above to add seasons.
              </div>
            )}
          </div>
        );

      case "preview":
        return (
          <div className="space-y-6">
            <div className="relative aspect-[21/9] rounded-lg overflow-hidden">
              {images.banner ? (
                <Image
                  src={images.banner || "/placeholder.svg"}
                  alt="Show banner"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-600" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-1">
                {images.poster ? (
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                    <Image
                      src={images.poster || "/placeholder.svg"}
                      alt="Show poster"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-600" />
                  </div>
                )}
              </div>

              <div className="col-span-3 space-y-4">
                <h3 className="text-2xl font-bold">Show Title</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>2024</span>
                  <span>•</span>
                  <span>Drama, Action</span>
                  <span>•</span>
                  <span>{seasons.length} Seasons</span>
                </div>
                <p className="text-gray-300">
                  Show description will appear here...
                </p>
              </div>
            </div>

            {castMembers.length > 0 && (
              <div>
                <h4 className="text-lg font-medium mb-4">Cast & Crew</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {castMembers.slice(0, 4).map((member) => (
                    <div key={member.id} className="text-center">
                      <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-2">
                        <Users className="w-8 h-8 text-gray-600" />
                      </div>
                      <div className="text-sm font-medium">{member.name}</div>
                      <div className="text-xs text-gray-400">
                        {member.role === "actor"
                          ? member.character
                          : member.role}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {seasons.length > 0 && (
              <div>
                <h4 className="text-lg font-medium mb-4">Seasons</h4>
                <div className="space-y-4">
                  {seasons.map((season) => (
                    <div
                      key={season.number}
                      className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg"
                    >
                      <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold">
                          {season.number}
                        </span>
                      </div>
                      <div>
                        <h5 className="font-medium">
                          {season.title || `Season ${season.number}`}
                        </h5>
                        <p className="text-sm text-gray-400">
                          {season.episodes} Episodes • {season.releaseYear}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  const steps: { id: FormStep; label: string; icon: React.ReactNode }[] = [
    { id: "basic", label: "Basic Info", icon: <Info className="w-5 h-5" /> },
    { id: "media", label: "Media", icon: <ImageIcon className="w-5 h-5" /> },
    { id: "cast", label: "Cast & Crew", icon: <Users className="w-5 h-5" /> },
    { id: "seasons", label: "Seasons", icon: <Layout className="w-5 h-5" /> },
    {
      id: "preview",
      label: "Preview",
      icon: <ChevronRight className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-6 py-8 pt-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-orange-500">Add New Show</h1>
            <div className="flex items-center space-x-4">
              {currentStep !== "basic" && (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = steps.findIndex(
                      (step) => step.id === currentStep
                    );
                    setCurrentStep(steps[currentIndex - 1].id);
                  }}
                  className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Back
                </button>
              )}
              {currentStep !== "preview" ? (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = steps.findIndex(
                      (step) => step.id === currentStep
                    );
                    setCurrentStep(steps[currentIndex + 1].id);
                  }}
                  className="px-4 py-2 bg-orange-600 text-black rounded-md hover:bg-orange-500 transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 bg-orange-600 text-black rounded-md hover:bg-orange-500 transition-colors disabled:bg-orange-800 disabled:cursor-not-allowed"
                >
                  {uploading ? "Creating Show..." : "Create Show"}
                </button>
              )}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-700 -z-10" />
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep === step.id
                      ? "bg-orange-600 text-black"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {step.icon}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {steps.map((step) => (
                <span key={step.id} className="text-sm text-gray-400">
                  {step.label}
                </span>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>{renderStepContent()}</form>
        </div>
      </main>
    </div>
  );
}

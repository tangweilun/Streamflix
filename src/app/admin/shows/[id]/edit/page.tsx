"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Actor = {
  name: string;
  biography: string;
  birthDate: string;
};

export default function UpdateVideoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [maturityRating, setMaturityRating] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [actors, setActors] = useState<Actor[]>([{ name: "", biography: "", birthDate: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleActorChange = (index: number, field: string, value: string) => {
    const updated = [...actors];
    updated[index][field as keyof Actor] = value;
    setActors(updated);
  };

  const handleAddActor = () => {
    setActors([...actors, { name: "", biography: "", birthDate: "" }]);
  };

  const handleRemoveActor = (index: number) => {
    const updated = actors.filter((_, i) => i !== index);
    setActors(updated);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast.error("Title is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title,
        description,
        duration: parseInt(duration),
        maturityRating,
        releaseDate,  // Ensure this is in the correct format (YYYY-MM-DD)   
        thumbnailUrl: "",  
        contentUrl: "",  
        genre,
        actors: actors.map((actor) => ({
          name: actor.name,
          biography: actor.biography,
          birthDate: actor.birthDate,  // This should also be a string, ideally in the format YYYY-MM-DD
        })),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/videos/title/${title}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update video");
      }

      toast.success(" Video updated successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        toast.error(`Update failed: ${err.message}`);
      } else {
        console.error('Unexpected error', err);
        toast.error('Update failed: Unexpected error');
      }
    }    
  };

  return (
    <div className="bg-black text-[#eee] min-h-screen p-8">
      <h1 className="text-2xl font-bold text-center text-orange-500 mb-8">Update Video</h1>

      <form onSubmit={handleUpdate} className="max-w-3xl mx-auto p-8 bg-[#111] rounded-lg shadow-lg">
        {/* Title */}
        <div className="mb-5">
          <label className="block font-bold text-orange-500 mb-1">Title (existing):</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 text-white border border-[#555] rounded"
            style={{ backgroundColor: "oklch(20.8% 0.042 265.755)" }}
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block font-bold text-orange-500 mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-24 p-2 text-white border border-[#555] rounded"
            style={{ backgroundColor: "oklch(20.8% 0.042 265.755)" }}
          />
        </div>

        {/* Duration & Maturity Rating */}
        <div className="mb-5 flex gap-4">
          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="flex-1 p-2 text-white border border-[#555] rounded"
            style={{ backgroundColor: "oklch(20.8% 0.042 265.755)" }}
          />
          <select
            value={maturityRating}
            onChange={(e) => setMaturityRating(e.target.value)}
            className="flex-1 p-2 text-white border border-[#555] rounded"
            style={{ backgroundColor: "oklch(20.8% 0.042 265.755)" }}
          >
            <option value="">Maturity Rating</option>
            <option value="E">E (EVERYONE)</option>
            <option value="E10+">E10+ (EVERYONE 10+)</option>
            <option value="T">T (TEEN)</option>
            <option value="M">M (MATURE 17+)</option>
            <option value="AO">AO (ADULTS ONLY 18+)</option>
          </select>
        </div>

        {/* Release Date */}
        <div className="mb-5">
          <label className="block font-bold text-orange-500 mb-1">Release Date:</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="w-full p-2 text-white border border-[#555] rounded"
            style={{ backgroundColor: "oklch(20.8% 0.042 265.755)" }}
          />
        </div>

        {/* Genre */}
        <div className="mb-5">
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full p-2 text-white border border-[#555] rounded"
          style={{ backgroundColor: "oklch(20.8% 0.042 265.755)" }}
        >
          <option value="">Select Genre</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
          <option value="Horror">Horror</option>
        </select>

        </div>

        {/* Actors */}
        <div className="mb-5">
          <label className="block font-bold text-orange-500 mb-1">Actors:</label>
          {actors.map((actor, index) => (
            <div key={index} className="mb-3 border border-[#555] p-2 rounded">
              <input
                type="text"
                placeholder="Name"
                value={actor.name}
                onChange={(e) => handleActorChange(index, "name", e.target.value)}
                className="w-full mb-1 p-1 text-white rounded bg-[#222]"
              />
              <input
                type="text"
                placeholder="Biography"
                value={actor.biography}
                onChange={(e) => handleActorChange(index, "biography", e.target.value)}
                className="w-full mb-1 p-1 text-white rounded bg-[#222]"
              />
              <input
                type="date"
                placeholder="Birth Date"
                value={actor.birthDate}
                onChange={(e) => handleActorChange(index, "birthDate", e.target.value)}
                className="w-full p-1 text-white rounded bg-[#222]"
              />
              <div className="flex justify-between items-center mt-1">
                <button
                  type="button"
                  onClick={handleAddActor}
                  className="text-sm text-orange-400 hover:underline"
                >
                   Add Actor
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveActor(index)}
                  className="text-sm text-red-400 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full p-3 bg-orange-500 text-white rounded hover:bg-orange-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Video"}
        </button>
      </form>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

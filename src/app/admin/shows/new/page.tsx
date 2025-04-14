"use client";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

type Actor = {
  [key: string]: string;
};

export default function CreateVideoWithThumbnail() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [maturityRating, setMaturityRating] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [actors, setActors] = useState<Actor[]>([{ name: "", biography: "", birthDate: "" }]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [imageName, setImageName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // step control (1 = video info, 2 = cast & crew)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setThumbnail(file);
      setImageName(file.name);
    }
  };

  const handleAddActor = () => {
    setActors([...actors, { name: "", biography: "", birthDate: "" }]);
  };

  const handleRemoveActor = (index: number) => {
    const updatedActors = actors.filter((_, i) => i !== index);
    setActors(updatedActors);
  };

  const handleActorChange = (index: number, field: string, value: string) => {
    const updatedActors = [...actors];
    updatedActors[index][field] = value;
    setActors(updatedActors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (isSubmitting) return; // Avoid submitting if already submitting
    setIsSubmitting(true);
  
    if (!title || !thumbnail) {
      setMessage("Title and thumbnail are required.");
      setIsSubmitting(false); // Reset submitting state
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("showId", title);
      formData.append("thumbnail", thumbnail);
  
      const uploadRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/files/create-show?bucketName=streamflixtest`,
        {
          method: "POST",
          body: formData,
          mode: "cors",
        }
      );
  
      if (!uploadRes.ok) throw new Error(await uploadRes.text());
  
      const videoData = {
        title,
        description,
        duration,
        maturityRating,
        releaseDate,
        thumbnailUrl: "",
        genre,
        actors,
      };
  
      const dbRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/videos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(videoData),
      });
  
      if (!dbRes.ok) throw new Error("Database error");
  
      toast.success("Video created successfully!");
  
      // Reset form fields and step
      setTitle("");
      setDescription("");
      setDuration("");
      setMaturityRating("");
      setReleaseDate("");
      setGenre("");
      setThumbnail(null);
      setImageName("");
      setActors([{ name: "", biography: "", birthDate: "" }]);
      setStep(1); // Reset to step 1
      setMessage(""); // Clear message
  
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setMessage(`Error: ${error.message}`);
      } else {
        console.error(error);
        setMessage('Unknown error');
      }
    } finally {
      setIsSubmitting(false); // Reset submitting state regardless of success/failure
    }
  };
  

  return (
    <div className="bg-black text-[#eee] min-h-screen p-8">
      <h1 className="text-2xl font-bold text-center text-orange-500 mb-8">Create New Video</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-[#111] rounded-lg shadow-lg">
        {step === 1 && (
          <>
            {/* Title */}
            <div className="mb-5">
              <label className="block font-bold text-orange-500 mb-1">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 text-white border border-[#555] rounded"
                style={{ backgroundColor: "oklch(20.8% 0.042 265.755)" }}
              />
            </div>

            {/* Thumbnail */}
            <div className="mb-5">
              <label className="block font-bold text-orange-500 mb-1">Upload Thumbnail:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 text-white border border-[#555] rounded"
                style={{ backgroundColor: "oklch(20.8% 0.042 265.755)" }}
              />
              {imageName && <p className="text-sm text-gray-400 mt-1">Selected: {imageName}</p>}
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="block font-bold text-orange-500 mb-1">Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full h-24 p-2 text-white border border-[#555] rounded"
                style={{ backgroundColor: "oklch(20.8% 0.042 265.755)" }}
              />
            </div>

            <div className="mb-5 flex gap-5">
              <div className="flex-1">
                <label className="block font-bold text-orange-500 mb-1">Duration:</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  className="w-full p-2 text-white border border-[#555] rounded"
                  style={{ backgroundColor: "oklch(20.8% 0.042 265.755)" }}
                />
              </div>
              <div className="flex-1">
                <label className="block font-bold text-orange-500 mb-1">Maturity Rating:</label>
                <select
                  value={maturityRating}
                  onChange={(e) => setMaturityRating(e.target.value)}
                  required
                  className="w-full p-2 text-white border border-[#555] rounded"
                  style={{ backgroundColor: "oklch(20.8% 0.042 265.755)" }}
                >
                  <option value="">Select Rating</option>
                  <option value="E">E (EVERYONE)</option>
                  <option value="E10+">E10+ (EVERYONE 10+)</option>
                  <option value="T">T (TEEN)</option>
                  <option value="M">M (MATURE 17+)</option>
                  <option value="AO">AO (ADULTS ONLY 18+)</option>
                </select>
              </div>
            </div>

            <div className="mb-5 flex gap-5">
              <div className="flex-1">
                <label className="block font-bold text-orange-500 mb-1">Release Date:</label>
                <input
                  type="date"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                  required
                  className="w-full p-2 text-white border border-[#555] rounded"
                  style={{ backgroundColor: "oklch(20.8% 0.042 265.755)" }}
                />
              </div>
              <div className="flex-1">
                <label className="block font-bold text-orange-500 mb-1">Genre:</label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  required
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

            </div>

            {/* Continue Button */}
            <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-orange-700 hover:bg-orange-800 text-white font-medium py-3 px-6 rounded-xl shadow-sm transition-colors duration-200 mt-6"
                >
                Continue to Cast & Crew
                </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="border-t border-[#555] pt-6 mb-8">
              <h3 className="text-orange-500 mb-4 text-lg">Cast & Crew</h3>
              {actors.map((actor, index) => (
                <div key={index} className="mb-5 p-4 bg-[#222] rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Actor {index + 1}</h4>
                  <div className="mb-3">
                    <label className="block font-bold text-orange-500 mb-1">Name:</label>
                    <input
                      type="text"
                      value={actor.name}
                      onChange={(e) => handleActorChange(index, "name", e.target.value)}
                      required
                      className="w-full p-2 text-white border border-[#555] rounded"
                      style={{ backgroundColor: "oklch(20.8% 0.042 265.755)" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold text-orange-500 mb-1">Biography:</label>
                    <textarea
                      value={actor.biography}
                      onChange={(e) => handleActorChange(index, "biography", e.target.value)}
                      className="w-full h-20 p-2 text-white border border-[#555] rounded"
                      style={{ backgroundColor: "oklch(20.8% 0.042 265.755)" }}
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-orange-500 mb-1">Birth Date:</label>
                    <input
                      type="date"
                      value={actor.birthDate}
                      onChange={(e) => handleActorChange(index, "birthDate", e.target.value)}
                      className="w-full p-2 text-white border border-[#555] rounded"
                      style={{ backgroundColor: "oklch(20.8% 0.042 265.755)" }}
                    />
                  </div>
                  {actors.length > 1 && (
                    <button
                        type="button"
                        onClick={() => handleRemoveActor(index)}
                        className="bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-6 rounded-xl shadow-sm transition-colors duration-200 mt-6"
                        >
                        Remove Actor
                    </button>
                  )}
                </div>
              ))}
                <button
                    type="button"
                    onClick={handleAddActor}
                    className="bg-orange-700 hover:bg-orange-800 text-white font-medium py-3 px-6 rounded-xl shadow-sm transition-colors duration-200 mt-6"
                    >
                    Add Actor
                </button>
            </div>

            <div className="flex justify-between items-center mt-6">
            <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl shadow-sm transition-colors duration-200 mt-6"
                >
                Back
            </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-700 hover:bg-orange-500 text-white font-medium py-3 px-6 rounded-xl shadow-sm transition-colors duration-200 mt-6"
                    >
                    {isSubmitting ? "Uploading..." : "Upload Video"}
                </button>
            </div>

            {message && <p className="mt-4 text-yellow-400">{message}</p>}
          </>
        )}
      </form>
    </div>
  );
}

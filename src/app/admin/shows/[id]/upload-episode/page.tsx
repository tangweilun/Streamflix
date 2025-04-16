"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function UploadEpisodePage() {
  const searchParams = useSearchParams();
  const showTitle = searchParams.get("folderName") || "Unknown Show"; // Using folderName as showTitle

  const [episodeNumber, setEpisodeNumber] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  // Mutation for handling file upload
  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!file || !episodeNumber) {
        setError("Please select a file and enter an episode number.");
        throw new Error("Please select a file and enter an episode number.");
      }

      setError(""); // Clear previous errors
      setIsUploading(true);

      const formData = new FormData();
      formData.append("bucketName", process.env.S3_BUCKET_NAME || "streamflixtest");
      formData.append("showTitle", showTitle);
      formData.append("episodeNumber", episodeNumber);
      formData.append("file", file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/upload-episode`, {
        method: "POST",
        body: formData,
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });

      if (!response.ok) throw new Error("Upload failed.");

      return response.text();
    },
    onSuccess: () => {
      toast.success("Upload successful!");
      setIsUploading(false);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Upload failed.");
      setIsUploading(false);
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="text-3xl font-semibold text-orange-600 text-center mb-6">
        Upload Episode for {showTitle}
      </h1>

      <div className="p-6 bg-[#111] rounded-lg shadow-lg w-full max-w-lg">
        <div className="mt-4">
          <label className="block text-sm font-bold text-orange-500 ">Episode Number:</label>
          <input
            type="number"
            className="w-full p-3 mt-1 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={episodeNumber}
            onChange={(e) => setEpisodeNumber(e.target.value)}
            disabled={isUploading}
            style={{ backgroundColor: "oklch(20.8% 0.042 265.755)" }}

          />
          {error && <p className="mt-2 text-red-500 text-xs">{error}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-bold text-orange-500 ">Select File:</label>
          <input
            type="file"
            className="w-full p-3 mt-1 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            disabled={isUploading}
            style={{ backgroundColor: "oklch(20.8% 0.042 265.755)" }}

          />
        </div>

        <button
          className={`w-full bg-orange-700 hover:bg-orange-800 text-white font-medium py-3 px-6 rounded-xl shadow-sm transition-colors duration-200 mt-6  ${
            isUploading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-500"
          } flex items-center justify-center`}
          onClick={() => uploadMutation.mutate()}
          disabled={isUploading}
        >
          {isUploading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Upload Episode"
          )}
        </button>
      </div>
    </div>
  );
}

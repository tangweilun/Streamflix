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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Mutation for handling file upload
  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!file || !episodeNumber) {
        throw new Error("Please select a file and enter an episode number.");
      }

      setIsUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("bucketName", "streamflixtest");
      formData.append("showTitle", showTitle);
      formData.append("episodeNumber", episodeNumber);
      formData.append("file", file);

      const response = await fetch("https://localhost:7230/api/files/upload-episode", {
        method: "POST",
        body: formData,
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });

      if (!response.ok) throw new Error("Upload failed.");

      return response.text();
    },
    onSuccess: (data) => {
      toast.success("Upload successful!");
      setUploadProgress(100);
      setIsUploading(false);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Upload failed.");
      setIsUploading(false);
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-orange-500">
        Upload Episode for {showTitle}
      </h1>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-300">Episode Number:</label>
        <input
          type="number"
          className="w-full p-2 mt-1 bg-gray-800 text-white rounded-md"
          value={episodeNumber}
          onChange={(e) => setEpisodeNumber(e.target.value)}
          disabled={isUploading}
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-300">Select File:</label>
        <input
          type="file"
          className="w-full p-2 mt-1 bg-gray-800 text-white rounded-md"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          disabled={isUploading}
        />
      </div>

      <button
        className={`mt-4 px-4 py-2 rounded-md transition-colors flex items-center justify-center ${
          isUploading ? "bg-gray-500" : "bg-orange-600 hover:bg-orange-500"
        } text-black`}
        onClick={() => uploadMutation.mutate()}
        disabled={isUploading}
      >
        {isUploading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          "Upload"
        )}
      </button>

      {isUploading && (
        <div className="w-full bg-gray-700 mt-4 rounded-md">
          <div
            className="h-2 bg-orange-500 rounded-md"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}

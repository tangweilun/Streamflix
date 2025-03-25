"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function UploadEpisodePage() {
  const searchParams = useSearchParams();
  const showId = searchParams.get("showId") || "";
  const folderName = searchParams.get("folderName") || "Unknown Show";

  const [episodeNumber, setEpisodeNumber] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file || !episodeNumber) {
      setMessage("Please select a file and enter an episode number.");
      return;
    }

    const formData = new FormData();
    formData.append("bucketName", "your-s3-bucket-name"); // Change this!
    formData.append("showId", showId);
    formData.append("episodeNumber", episodeNumber);
    formData.append("file", file);

    try {
      const res = await fetch("http://your-api-url/upload-episode", {
        method: "POST",
        body: formData,
      });

      const data = await res.text();
      setMessage(data);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Upload failed.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-orange-500">
        Upload Episode for {folderName}
      </h1>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-300">Episode Number:</label>
        <input
          type="number"
          className="w-full p-2 mt-1 bg-gray-800 text-white rounded-md"
          value={episodeNumber}
          onChange={(e) => setEpisodeNumber(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-300">Select File:</label>
        <input
          type="file"
          className="w-full p-2 mt-1 bg-gray-800 text-white rounded-md"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <button
        className="mt-4 px-4 py-2 bg-orange-600 text-black rounded-md hover:bg-orange-500 transition-colors"
        onClick={handleUpload}
      >
        Upload
      </button>

      {message && <p className="mt-4 text-sm text-white">{message}</p>}
    </div>
  );
}

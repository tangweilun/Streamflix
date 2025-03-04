"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import AdminNav from "@/components/AdminNav";

export default function UploadEpisode() {
  const router = useRouter();
  const params = useParams(); // ✅ Correct way to get dynamic route params in client components
  const { id } = params; // Extract show ID

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      console.error("Error: id is undefined.");
    }
  }, [id]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const allowedFormats = ["video/mp4", "video/webm", "video/mkv"];
      if (!allowedFormats.includes(file.type)) {
        setError("Invalid file format. Only MP4, WebM, and MKV are allowed.");
        return;
      }
      if (file.size > 4 * 1024 * 1024 * 1024) {
        setError("File size exceeds the 4GB limit.");
        return;
      }

      setSelectedFile(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) {
      setError("Invalid show ID.");
      return;
    }
    if (!selectedFile) {
      setError("No file selected.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => (prev >= 100 ? 100 : prev + 10));
    }, 500);

    await new Promise((resolve) => setTimeout(resolve, 5000));
    clearInterval(interval);

    router.push(`/admin/shows/${id}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav />
      <main className="container mx-auto px-6 py-8 pt-24">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-orange-500 mb-8">
            Upload New Episode
          </h1>
          {!id && <p className="text-red-500 mb-4">Error: Invalid show ID.</p>}
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Episode Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter episode title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Season Number</label>
                <input
                  type="number"
                  min="1"
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Season #"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Episode Number</label>
                <input
                  type="number"
                  min="1"
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Episode #"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Episode Description</label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter episode description"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Video File</label>
              <div className="flex items-center justify-center w-full">
                <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-orange-500">
                  {selectedFile ? (
                    <div className="flex items-center justify-between w-full px-4">
                      <span className="text-sm truncate">
                        {selectedFile.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        className="p-1 hover:bg-gray-700 rounded-full"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        MP4, WebM, or MKV (MAX. 4GB)
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="video/mp4,video/webm,video/mkv"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
            </div>

            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Upload progress</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={uploading || !selectedFile || !id}
              className="w-full px-4 py-2 bg-orange-600 text-black rounded-md hover:bg-orange-500 transition-colors disabled:bg-orange-800 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Upload Episode"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

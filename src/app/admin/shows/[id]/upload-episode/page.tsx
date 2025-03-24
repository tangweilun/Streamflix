"use client"

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";

export default function UploadEpisode() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

export default function UploadEpisode({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [episodeData, setEpisodeData] = useState({
    title: "",
    seasonNumber: 1,
    episodeNumber: 1,
    description: "",
  })
  const [showTitle, setShowTitle] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEpisodeData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUploading(true)
    setError(null)
    setSuccess(null)

    // Start progress simulation
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return 95 // Hold at 95% until actual completion
        }
        return prev + 5
      })
    }, 500)

    try {
      if (!selectedFile) {
        throw new Error("Please select a video file to upload")
      }

      // Create FormData for the API request
      const formData = new FormData()
      formData.append("bucketName", "streamflixtest") // Replace with your actual bucket name
      formData.append("showId", params.id)
      formData.append("episodeNumber", episodeData.episodeNumber.toString())
      formData.append("file", selectedFile)

      // Call the API to upload the episode
      const response = await fetch("/api/Files/upload-episode", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to upload episode")
      }

      // Complete the progress
      setUploadProgress(100)
      setSuccess(`Episode ${episodeData.episodeNumber} uploaded successfully!`)

      // Redirect after a short delay
      setTimeout(() => {
        router.push(`/admin/shows/${params.id}`)
      }, 2000)
    } catch (err) {
      console.error("Error uploading episode:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      clearInterval(interval)
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container px-6 py-8 pt-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-orange-500 mb-8">
            Upload New Episode
          </h1>

          {!id && <p className="text-red-500 mb-4">Error: Invalid show ID.</p>}
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Episode Title<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={episodeData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter episode title"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Episode Number<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Episode #"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Episode Description<span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={episodeData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter episode description"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Video File<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-orange-500">
                  {selectedFile ? (
                    <div className="flex items-center justify-between w-full px-4">
                      <span className="text-sm truncate">{selectedFile.name}</span>
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
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">MP4, WebM or MKV (MAX. 4GB)</p>
                    </div>
                  )}
                  <input type="file" className="hidden" accept="video/*" onChange={handleFileSelect} />
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

            <div className="bg-gray-800 p-4 rounded-md">
              <h4 className="font-medium mb-2">API Integration Information</h4>
              <p className="text-sm text-gray-400">When you submit this form, the following will happen:</p>
              <ul className="list-disc list-inside text-sm text-gray-400 mt-2 space-y-1">
                <li>The video file will be uploaded to Amazon S3 in the show's episodes folder</li>
                <li>The file will be named according to the episode number</li>
                <li>You'll be redirected to the show details page after successful upload</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="w-full px-4 py-2 bg-orange-600 text-black rounded-md hover:bg-orange-500 transition-colors disabled:bg-orange-800 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Upload Episode"}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
}

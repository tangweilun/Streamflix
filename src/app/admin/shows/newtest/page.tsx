"use client";

import { useState } from "react";

export default function CreateShow() {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [imageName, setImageName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setThumbnail(file);
      setImageName(file.name);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !thumbnail) {
      setMessage("Title and thumbnail are required.");
      return;
    }

    const formData = new FormData();
    formData.append("showId", title); // Must match backend parameter name
    formData.append("thumbnail", thumbnail); // Must match backend parameter name

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/files/create-show?bucketName=streamflixtest`, // BucketName stays in query
        {
          method: "POST",
          body: formData,
          mode: "cors",
        }
      );

      if (!response.ok) throw new Error(await response.text());

      const result = await response.text();
      setMessage(`Success: ${result}`);
    } catch (error: unknown) {
      setMessage(
        error instanceof Error
          ? `Error: ${error.message}`
          : "An unknown error occurred."
      );
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Create Show</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter show title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 w-full"
        />
        {imageName && (
          <p className="text-sm text-gray-600">Selected file: {imageName}</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Show
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}

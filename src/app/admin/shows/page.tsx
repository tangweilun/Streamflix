"use client";

import { useEffect, useState } from "react";
import ShowGrid from "@/components/shows-grid";

export default function AdminDashboard() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchShows() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/files/list-shows?bucketName=${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}`
        );
        if (!response.ok) throw new Error("Failed to fetch shows");

        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error("Error loading shows:", error);
        setError("Failed to load shows. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchShows();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-6 py-8 pt-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500">
            TV Shows Management
          </h1>
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading shows...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <ShowGrid shows={shows} />
        )}
      </main>
    </div>
  );
}

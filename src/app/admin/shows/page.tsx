"use client";

import { useEffect, useState } from "react";
import ShowGrid from "@/components/shows-grid";

export default function AdminDashboard() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    async function fetchShows() {
      try {
        const response = await fetch(
          "https://localhost:7230/api/files/list-shows?bucketName=streamflixtest"
        );
        if (!response.ok) throw new Error("Failed to fetch shows");

        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error("Error loading shows:", error);
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
        <ShowGrid shows={shows} />
      </main>
    </div>
  );
}

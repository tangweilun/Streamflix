import Link from "next/link";
import { Plus } from "lucide-react";
import AdminNav from "@/components/AdminNav";
import ShowGrid from "@/components/adminupload/ShowGrid";

const shows = [
  {
    id: 1,
    title: "Stranger Things",
    thumbnail: "/placeholder.svg?height=400&width=600",
    episodeCount: 25,
    seasons: 4,
    lastUpdated: "2024-02-27",
  },
  {
    id: 2,
    title: "Breaking Bad",
    thumbnail: "/placeholder.svg?height=400&width=600",
    episodeCount: 62,
    seasons: 5,
    lastUpdated: "2024-02-26",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav />
      <main className="container mx-auto px-6 py-8 pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500">
            TV Show Management
          </h1>
          <Link
            href="/admin/shows/new"
            className="inline-flex items-center px-4 py-2 bg-orange-600 text-black rounded-md hover:bg-orange-500 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Show
          </Link>
        </div>
        <ShowGrid shows={shows} />
      </main>
    </div>
  );
}

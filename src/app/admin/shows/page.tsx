import ShowGrid from "@/components/shows-grid";

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

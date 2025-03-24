import Image from "next/image";
import Link from "next/link";
import { Plus, Edit, Trash } from "lucide-react";

type Show = {
  id: number;
  title: string;
  thumbnail: string;
  episodeCount: number;
  seasons: number;
  lastUpdated: string;
};

export default function ShowGrid({ shows }: { shows: Show[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shows.map((show) => (
        <div key={show.id} className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="relative aspect-video">
            <Image
              src={show.thumbnail || "/placeholder.svg"}
              alt={show.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{show.title}</h3>
            <div className="text-sm text-gray-400 space-y-1">
              <p>Episodes: {show.episodeCount}</p>
              <p>Seasons: {show.seasons}</p>
              <p>Last Updated: {show.lastUpdated}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <Link
                href={`/admin/shows/${show.id}/upload-episode`}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-orange-600 text-black rounded-md hover:bg-orange-500 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Episode
              </Link>
              <Link
                href={`/admin/shows/${show.id}/edit`}
                className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <Edit className="w-4 h-4 mt-1" />
              </Link>
              <button className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Plus, Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Show = {
  id: number;
  title: string;
  thumbnail: string;
  episodeCount: number;
  lastUpdated: string;
  genres: string[];
};

export default function ShowGrid({ shows }: { shows: Show[] }) {
  const [showsWithGenres, setShowsWithGenres] = useState<Show[]>([]);
  const [showsWithGenresAndEpisodes, setShowsWithGenresAndEpisodes] = useState<
    Show[]
  >([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch genres
  useEffect(() => {
    const fetchGenresForShows = async () => {
      const updatedShows = await Promise.all(
        shows.map(async (show) => {
          try {
            const genresResponse = await fetch(
              `${
                process.env.NEXT_PUBLIC_API_URL
              }/videos/title/${encodeURIComponent(show.title)}`
            );
            if (!genresResponse.ok) throw new Error("Failed to fetch genres");

            const genresData = await genresResponse.json();
            const genres = genresData.genre
              ? genresData.genre.split(", ").map((g: string) => g.trim())
              : [];

            return { ...show, genres };
          } catch (error: unknown) {
            console.error(`Error fetching genres for "${show.title}":`, error);
            return { ...show, genres: [] };
          }
        })
      );

      setShowsWithGenres(updatedShows);
    };

    fetchGenresForShows();
  }, [shows]);

  // Fetch episodes
  useEffect(() => {
    const fetchEpisodesForShows = async () => {
      const updatedShows = await Promise.all(
        showsWithGenres.map(async (show) => {
          try {
            const episodesResponse = await fetch(
              `${
                process.env.NEXT_PUBLIC_API_URL
              }/files/watch?showName=${encodeURIComponent(show.title)}`
            );
            if (!episodesResponse.ok) return { ...show, episodeCount: 0 };

            const episodesData = await episodesResponse.json();
            const episodeCount = episodesData.episodes.length;

            return { ...show, episodeCount };
          } catch (error) {
            console.error(
              `Error fetching episodes for "${show.title}":`,
              error
            );
            return { ...show, episodeCount: 0 };
          }
        })
      );

      setShowsWithGenresAndEpisodes(updatedShows);
    };

    if (showsWithGenres.length > 0) {
      fetchEpisodesForShows();
    }
  }, [showsWithGenres]);

  // Delete show from both S3 and DB
  const deleteShow = async (showTitle: string) => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      // Step 1: Delete files from S3
      const s3Response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Files?bucketName=${
          process.env.NEXT_PUBLIC_S3_BUCKET_NAME
        }&prefix=shows/${encodeURIComponent(showTitle)}`,
        {
          method: "DELETE",
        }
      );

      if (!s3Response.ok)
        throw new Error("Failed to delete show files from S3.");

      // Step 2: Delete video record from database
      const dbResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/videos/title/${encodeURIComponent(
          showTitle
        )}`,
        {
          method: "DELETE",
        }
      );

      if (!dbResponse.ok)
        throw new Error("Failed to delete show record from database.");

      toast.success(`Show "${showTitle}" was deleted successfully.`, {
        position: "bottom-right",
      });

      // Update UI
      setShowsWithGenresAndEpisodes((prev) =>
        prev.filter((show) => show.title !== showTitle)
      );
    } catch (error) {
      toast.error("Failed to delete the show. Please try again.", {
        position: "bottom-right",
      });
      console.error("Deletion error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showsWithGenresAndEpisodes.map((show) => (
          <div key={show.id} className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={show.thumbnail || "/default-thumbnail.jpg"}
                alt={show.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{show.title}</h3>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Episodes: {show.episodeCount}</p>
                <p>Last Updated: {show.lastUpdated}</p>
                <div>
                  <strong>Genres:</strong>{" "}
                  {show.genres.length > 0
                    ? show.genres.join(", ")
                    : "No genres available"}
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/admin/shows/${show.id}/upload-episode?showId=${
                    show.id
                  }&folderName=${encodeURIComponent(show.title)}`}
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
                <button
                  onClick={() => deleteShow(show.title)}
                  disabled={isDeleting}
                  className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}

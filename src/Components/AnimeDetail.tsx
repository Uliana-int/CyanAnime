import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Anime } from "../types/index";

interface Params {
  id: string;
}

interface JikanAnimeResponse {
  data: Anime;
}

export default function AnimeDetail() {
  const { id } = useParams<keyof Params>() as Params;
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${id}/full`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch anime details");
        }
        const result: JikanAnimeResponse = await response.json();
        setAnime(result.data);
      } catch (err) {
        setError((err as Error).message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">
            Error: {error || "Anime not found"}
          </p>
          <Link
            to="/"
            className="bg-cyan-600 text-white px-4 py-2 rounded-full hover:bg-cyan-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Unknown";
    try {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return dateString;
    }
  };

  const imageSrc =
    anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;
  const score = anime.score;
  const status = anime.status;
  const episodes = anime.episodes;
  const year = anime.year;
  const season = anime.season;
  const synopsis = anime.synopsis;
  const airedFrom = anime.aired?.from;
  const airedTo = anime.aired?.to;
  const genres = anime.genres;
  const studios = anime.studios;
  const producers = anime.producers;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 text-slate-800 font-sans">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="mb-6 inline-flex items-center text-cyan-600 hover:text-cyan-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          <div className="h-64 md:h-96 w-full relative">
            <img
              src={imageSrc}
              alt={anime.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {anime.title}
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              {score !== undefined && score !== null && (
                <div className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full font-semibold">
                  Rating: {score}
                </div>
              )}
              {status && (
                <div className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full">
                  Status: {status}
                </div>
              )}
              {episodes !== undefined && episodes !== null && (
                <div className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full">
                  Episodes: {episodes}
                </div>
              )}
              {year && (
                <div className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full">
                  Year: {year}
                </div>
              )}
              {season && year && (
                <div className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full">
                  Season: {season} {year}
                </div>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">
                Synopsis
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {synopsis || "No synopsis available."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
              {airedFrom && (
                <div>
                  <span className="font-semibold text-slate-800">Aired:</span>{" "}
                  {formatDate(airedFrom)} to {formatDate(airedTo)}
                </div>
              )}

              {genres && genres.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-800">Genres:</span>{" "}
                  {genres.map((g) => g.name).join(", ")}
                </div>
              )}

              {studios && studios.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-800">Studios:</span>{" "}
                  {studios.map((s) => s.name).join(", ")}
                </div>
              )}

              {producers && producers.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-800">
                    Producers:
                  </span>{" "}
                  {producers.map((p) => p.name).join(", ")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

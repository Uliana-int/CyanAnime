import type { Anime } from "../types/index";
import { Link } from "react-router-dom";

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const imageUrl = anime.images?.jpg?.image_url;

  return (
    <Link
      to={`/anime/${anime.mal_id}`}
      className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full border border-slate-200"
    >
      <div className="relative">
        <img
          className="w-full h-full object-cover"
          src={imageUrl || "https://placehold.co/300x400?text=No+Image"}
          alt={anime.title}
        />

        {anime.score !== undefined && anime.score !== null && (
          <div className="absolute top-2 right-2 bg-cyan-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            ⭐ {anime.score}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">
          {anime.title}
        </h2>
        <p className="text-slate-600 text-sm line-clamp-3 flex-grow">
          {anime.synopsis || "No synopsis available :("}
        </p>
      </div>
    </Link>
  );
}

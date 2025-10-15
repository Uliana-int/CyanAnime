import type { Anime } from '../types/index'
 
interface AnimeCardProps { anime: Anime}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <div className="flex flex-col mx-4 border rounded-2xl p-4 mb-6 pb-20 bg-purple-900 text-white max-w-4xl">
      <h2 className="text-2xl font-bold mb-2">{anime.title}</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <img
          className="rounded-2xl w-full md:w-64 h-auto object-cover"
          src={anime.images.jpg.image_url}
          alt={anime.title}
        />
        <p className="text-sm md:text-base flex-1">{anime.synopsis}</p>
      </div>
    </div>
  );
}
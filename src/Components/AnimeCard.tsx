import type { Anime } from '../types/index'
 
interface AnimeCardProps { anime: Anime}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full border border-slate-200">
      
      <div className="relative">
        <img
          className="w-full h-full object-cover"
          src={anime.images.jpg.image_url}
          alt={anime.title}
        />
      </div>

    <div className="p-5 flex flex-col flex-grow">
    <h2 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">{anime.title}</h2>
    <p className="text-slate-600 text-sm line-clamp-3 flex-grow">
      {anime.synopsis || 'No synopsis available :('}
      </p>
    </div>
    </div>
  );
}
import { useState} from 'react';
import AnimeCard from './Components/AnimeCard';
import SearchAnime from './Components/SearchAnime';
import allAnimeData from './data/all-anime.json';
import type { Anime, AnimeApiResponse} from './types/index'
import { filterAnime } from './utils/filterAnime'


const initialData = allAnimeData as AnimeApiResponse;

export default function App() {
  const animeList = initialData.data
  const [filteredAnime, setFilteredAnime] = useState<Anime[]>(initialData.data)

  const handleSearch = (query: string) => {
    const result = filterAnime(animeList, query)
    setFilteredAnime(result)
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 text-slate-800 font-sans">
      <div className='max-w-6xl mx-auto px-4 py-8'>
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-cyan-700 tracking-tight">Anime Collection</h1>
      
      <SearchAnime onSearch={handleSearch} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {filteredAnime.length > 0 ? (
          filteredAnime.map((anime) => (
            <AnimeCard
              key={anime.mal_id}
              anime = {anime}
            />
          ))
        ) : (
          <p className="text-xl text-center text-slate-500 col-span-full mt-10">No anime found...</p>
        )}
      </div>
      </div>
    </div>
  );
}

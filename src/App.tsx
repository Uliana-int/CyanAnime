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
      <div className="relative flex justify-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-cyan-800 z-10
                          bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent">
                            CyanAnime
                            </h1>
            <div className='absolute inset-x-0 top-1/2 h-6 -z-0 bg-gradient-to-b from-cyan-200/30 to-transparent rounded-full blur-xl opacity-50'></div>
      </div>
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

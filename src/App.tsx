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
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center my-6">Bleach Anime Collection</h1>
      <SearchAnime onSearch={handleSearch} />
      <div className="flex flex-col items-center">
        {filteredAnime.length > 0 ? (
          filteredAnime.map((anime) => (
            <AnimeCard
              key={anime.mal_id}
              anime = {anime}
            />
          ))
        ) : (
          <p className="text-xl mt-10">No anime found...</p>
        )}
      </div>
    </div>
  );
}
